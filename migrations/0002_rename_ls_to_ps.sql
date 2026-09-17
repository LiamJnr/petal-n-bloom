-- Rename the LemonSqueezy order ID column to Paystack reference.
-- Safe to skip if starting with a fresh database using the updated schema.sql.
ALTER TABLE orders RENAME COLUMN ls_order_id TO ps_reference;

DROP INDEX IF EXISTS idx_orders_ls_order_id;
CREATE INDEX IF NOT EXISTS idx_orders_ps_reference ON orders(ps_reference);
