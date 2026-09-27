ALTER TABLE orders ADD COLUMN last_payment_check_at TEXT;

CREATE TABLE IF NOT EXISTS api_rate_limits (
  bucket_start TEXT NOT NULL,
  scope TEXT NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 0 CHECK (request_count >= 0),
  PRIMARY KEY (bucket_start, scope)
);
