-- SQLite cannot add CHECK constraints to an existing table, so rebuild the
-- orders table. Cloudflare D1 automatically runs migrations in an atomic batch.

CREATE TABLE orders_new (
  id TEXT PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'paid', 'checkout_failed', 'refunded')),
  purchaser_email TEXT NOT NULL,
  cart_json TEXT NOT NULL,
  buyer_json TEXT NOT NULL,
  delivery_json TEXT NOT NULL DEFAULT '{}',
  total_cents INTEGER NOT NULL CHECK (total_cents > 0),
  payment_currency TEXT NOT NULL CHECK (payment_currency GLOB '[A-Z][A-Z][A-Z]'),
  ps_reference TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  paid_at TEXT,
  CHECK (status <> 'paid' OR paid_at IS NOT NULL)
);

INSERT INTO orders_new (
  id, status, purchaser_email, cart_json, buyer_json, delivery_json,
  total_cents, payment_currency, ps_reference, created_at, paid_at
)
SELECT
  id, status, purchaser_email, cart_json, buyer_json, delivery_json,
  total_cents, payment_currency, ps_reference, created_at, paid_at
FROM orders;

DROP TABLE orders;
ALTER TABLE orders_new RENAME TO orders;

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_ps_reference ON orders(ps_reference);
CREATE UNIQUE INDEX idx_orders_ps_reference_unique ON orders(ps_reference) WHERE ps_reference IS NOT NULL;

