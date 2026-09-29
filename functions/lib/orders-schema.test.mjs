import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { DatabaseSync } from 'node:sqlite'

const schema = await readFile(new URL('../../schema.sql', import.meta.url), 'utf8')
const integrityMigration = await readFile(
  new URL('../../migrations/0004_add_order_integrity_constraints.sql', import.meta.url),
  'utf8',
)
const abuseProtectionMigration = await readFile(
  new URL('../../migrations/0005_add_abuse_protection.sql', import.meta.url),
  'utf8',
)
const receiptAccessMigration = await readFile(
  new URL('../../migrations/0006_add_receipt_access.sql', import.meta.url),
  'utf8',
)
const promotionAuditMigration = await readFile(
  new URL('../../migrations/0007_add_promotion_audit_fields.sql', import.meta.url),
  'utf8',
)

function createDatabase() {
  const database = new DatabaseSync(':memory:')
  database.exec(schema)
  return database
}

function insertOrder(database, overrides = {}, includesReceiptAccessHash = true, includesPromotionAudit = true) {
  const order = {
    id: 'f0f113d6-7d5b-47a4-9e9b-2b130ffc5ef5',
    status: 'pending',
    purchaser_email: 'buyer@example.com',
    cart_json: '[]',
    buyer_json: '{}',
    delivery_json: '{}',
    total_cents: 125430,
    subtotal_usd_cents: 12000,
    delivery_fee_usd_cents: 1400,
    discount_usd_cents: 0,
    promo_code: null,
    payment_currency: 'GHS',
    ps_reference: null,
    created_at: '2026-09-27 12:00:00',
    paid_at: null,
    receipt_access_hash: 'f0f113d67d5b47a49e9b2b130ffc5ef5'.padEnd(64, '0'),
    ...overrides,
  }
  const columns = ['id', 'status', 'purchaser_email', 'cart_json', 'buyer_json', 'delivery_json', 'total_cents']
  const values = [
    order.id, order.status, order.purchaser_email, order.cart_json, order.buyer_json,
    order.delivery_json, order.total_cents,
  ]
  if (includesPromotionAudit) {
    columns.push('subtotal_usd_cents', 'delivery_fee_usd_cents', 'discount_usd_cents', 'promo_code')
    values.push(order.subtotal_usd_cents, order.delivery_fee_usd_cents, order.discount_usd_cents, order.promo_code)
  }
  columns.push('payment_currency', 'ps_reference', 'created_at', 'paid_at')
  values.push(order.payment_currency, order.ps_reference, order.created_at, order.paid_at)
  if (includesReceiptAccessHash) {
    columns.push('receipt_access_hash')
    values.push(order.receipt_access_hash)
  }
  database.prepare(
    `INSERT INTO orders (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`,
  ).run(...values)
}

test('accepts a valid pending and paid order', () => {
  const database = createDatabase()
  insertOrder(database)
  insertOrder(database, {
    id: '28be3494-8048-49a2-b543-ef7b4f13a7e3',
    status: 'paid',
    ps_reference: 'paystack-reference',
    paid_at: '2026-09-27 12:01:00',
    receipt_access_hash: '28be3494804849a2b543ef7b4f13a7e3'.padEnd(64, '0'),
  })
  assert.equal(database.prepare('SELECT COUNT(*) AS count FROM orders').get().count, 2)
})

for (const [name, overrides] of [
  ['an unknown order status', { status: 'processing' }],
  ['a zero total', { total_cents: 0 }],
  ['a negative total', { total_cents: -1 }],
  ['a negative merchandise subtotal', { subtotal_usd_cents: -1 }],
  ['a negative delivery fee', { delivery_fee_usd_cents: -1 }],
  ['a negative discount', { discount_usd_cents: -1 }],
  ['an invalid currency', { payment_currency: 'ghs' }],
  ['a paid order without a paid timestamp', { status: 'paid' }],
]) {
  test(`rejects ${name}`, () => {
    const database = createDatabase()
    assert.throws(() => insertOrder(database, overrides))
  })
}

test('rejects a duplicate Paystack reference', () => {
  const database = createDatabase()
  insertOrder(database, { ps_reference: 'paystack-reference' })
  assert.throws(() => insertOrder(database, {
    id: '28be3494-8048-49a2-b543-ef7b4f13a7e3',
    ps_reference: 'paystack-reference',
  }))
})

test('integrity migration preserves valid legacy orders and applies constraints', () => {
  const database = new DatabaseSync(':memory:')
  database.exec(`
    CREATE TABLE orders (
      id TEXT PRIMARY KEY, status TEXT NOT NULL DEFAULT 'pending', purchaser_email TEXT NOT NULL,
      cart_json TEXT NOT NULL, buyer_json TEXT NOT NULL, delivery_json TEXT NOT NULL DEFAULT '{}',
      total_cents INTEGER NOT NULL, payment_currency TEXT NOT NULL, ps_reference TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')), paid_at TEXT
    );
    CREATE INDEX idx_orders_status ON orders(status);
    CREATE INDEX idx_orders_ps_reference ON orders(ps_reference);
    CREATE UNIQUE INDEX idx_orders_ps_reference_unique ON orders(ps_reference) WHERE ps_reference IS NOT NULL;
  `)
  insertOrder(database, {}, false, false)
  insertOrder(database, {
    id: '28be3494-8048-49a2-b543-ef7b4f13a7e3',
    status: 'paid',
    ps_reference: 'paystack-reference',
    paid_at: '2026-09-27 12:01:00',
  }, false, false)

  database.exec(integrityMigration)
  database.exec(abuseProtectionMigration)
  database.exec(receiptAccessMigration)
  database.exec(promotionAuditMigration)

  assert.equal(database.prepare('SELECT COUNT(*) AS count FROM orders').get().count, 2)
  assert.equal(database.prepare("SELECT COUNT(*) AS count FROM pragma_table_info('orders') WHERE name = 'last_payment_check_at'").get().count, 1)
  assert.equal(database.prepare("SELECT COUNT(*) AS count FROM sqlite_master WHERE type = 'table' AND name = 'api_rate_limits'").get().count, 1)
  assert.equal(database.prepare("SELECT COUNT(*) AS count FROM pragma_table_info('orders') WHERE name = 'receipt_access_hash'").get().count, 1)
  assert.equal(database.prepare("SELECT COUNT(*) AS count FROM pragma_table_info('orders') WHERE name = 'promo_code'").get().count, 1)
  assert.throws(() => insertOrder(database, {
    id: 'aec5fda8-4f20-4560-9ba7-dedcad0a9c15',
    status: 'invalid-status',
  }))
})
