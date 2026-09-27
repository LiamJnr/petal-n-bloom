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

function createDatabase() {
  const database = new DatabaseSync(':memory:')
  database.exec(schema)
  return database
}

function insertOrder(database, overrides = {}) {
  const order = {
    id: 'f0f113d6-7d5b-47a4-9e9b-2b130ffc5ef5',
    status: 'pending',
    purchaser_email: 'buyer@example.com',
    cart_json: '[]',
    buyer_json: '{}',
    delivery_json: '{}',
    total_cents: 125430,
    payment_currency: 'GHS',
    ps_reference: null,
    created_at: '2026-09-27 12:00:00',
    paid_at: null,
    ...overrides,
  }
  database.prepare(
    `INSERT INTO orders
     (id, status, purchaser_email, cart_json, buyer_json, delivery_json, total_cents, payment_currency, ps_reference, created_at, paid_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    order.id, order.status, order.purchaser_email, order.cart_json, order.buyer_json,
    order.delivery_json, order.total_cents, order.payment_currency, order.ps_reference,
    order.created_at, order.paid_at,
  )
}

test('accepts a valid pending and paid order', () => {
  const database = createDatabase()
  insertOrder(database)
  insertOrder(database, {
    id: '28be3494-8048-49a2-b543-ef7b4f13a7e3',
    status: 'paid',
    ps_reference: 'paystack-reference',
    paid_at: '2026-09-27 12:01:00',
  })
  assert.equal(database.prepare('SELECT COUNT(*) AS count FROM orders').get().count, 2)
})

for (const [name, overrides] of [
  ['an unknown order status', { status: 'processing' }],
  ['a zero total', { total_cents: 0 }],
  ['a negative total', { total_cents: -1 }],
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
  insertOrder(database)
  insertOrder(database, {
    id: '28be3494-8048-49a2-b543-ef7b4f13a7e3',
    status: 'paid',
    ps_reference: 'paystack-reference',
    paid_at: '2026-09-27 12:01:00',
  })

  database.exec(integrityMigration)
  database.exec(abuseProtectionMigration)

  assert.equal(database.prepare('SELECT COUNT(*) AS count FROM orders').get().count, 2)
  assert.equal(database.prepare("SELECT COUNT(*) AS count FROM pragma_table_info('orders') WHERE name = 'last_payment_check_at'").get().count, 1)
  assert.equal(database.prepare("SELECT COUNT(*) AS count FROM sqlite_master WHERE type = 'table' AND name = 'api_rate_limits'").get().count, 1)
  assert.throws(() => insertOrder(database, {
    id: 'aec5fda8-4f20-4560-9ba7-dedcad0a9c15',
    status: 'invalid-status',
  }))
})
