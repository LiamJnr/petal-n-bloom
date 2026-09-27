-- Existing orders were settled in GHS under the current Paystack integration.
-- Review historical data before applying this migration if that was not true
-- for a deployed environment.
ALTER TABLE orders ADD COLUMN payment_currency TEXT NOT NULL DEFAULT 'GHS';

-- A Paystack transaction must be associated with at most one order.
CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_ps_reference_unique
  ON orders(ps_reference)
  WHERE ps_reference IS NOT NULL;
