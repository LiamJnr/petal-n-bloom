ALTER TABLE orders ADD COLUMN subtotal_usd_cents INTEGER NOT NULL DEFAULT 0;
ALTER TABLE orders ADD COLUMN delivery_fee_usd_cents INTEGER NOT NULL DEFAULT 0;
ALTER TABLE orders ADD COLUMN discount_usd_cents INTEGER NOT NULL DEFAULT 0;
ALTER TABLE orders ADD COLUMN promo_code TEXT;

CREATE INDEX IF NOT EXISTS idx_orders_purchaser_email_status
  ON orders(purchaser_email, status);
