ALTER TABLE orders ADD COLUMN receipt_access_hash TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_receipt_access_hash_unique
  ON orders(receipt_access_hash)
  WHERE receipt_access_hash IS NOT NULL;
