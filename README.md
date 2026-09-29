# Petal & Bloom — Florist Website

This site remains a static Cloudflare Pages project, with Cloudflare Pages
Functions and D1 added for secure server-side payment handling. GitHub pushes
continue to deploy the storefront as they do today.

## Payment architecture

- The browser sends its cart and recipient details to `/api/checkout`.
- A Pages Function validates the data, creates a pending D1 order, then
  initialises a Paystack transaction without exposing private API credentials.
- The customer completes payment on Paystack's hosted checkout page.
- Paystack notifies `/api/webhook` with a `charge.success` event; the endpoint
  verifies the HMAC-SHA-512 signature and marks the D1 order paid.
- Paystack redirects the customer back to
  `/?view=order-confirmed&order=<id>`, which polls a minimal order-status
  endpoint and clears the flower bag only after the paid status is recorded.
- Recipient and delivery details are validated server-side and stored with the
  order for fulfillment. The requested delivery schedule and card note are
  included in Paystack transaction metadata; do not treat that metadata as the
  fulfillment system of record.

### One-time Cloudflare configuration

1. In Cloudflare D1, create `petal-bloom-ps-db`.
2. The D1 database ID is recorded in `wrangler.toml`.
3. Run the schema against the remote database:

   ```bash
   npx wrangler d1 execute petal-bloom-ps-db --remote --file=./schema.sql
   ```

4. In the existing Cloudflare Pages project, add a D1 binding named `DB` that
   points to that database. `wrangler.toml` alone does not create the production
   Pages binding.
5. In Pages → Settings → Environment variables, add the values named in
   `.env.example` as encrypted secrets:
   - `PAYSTACK_SECRET_KEY` — your Paystack secret key (`sk_test_…` or `sk_live_…`)
   - `PAYSTACK_CURRENCY` — set to `GHS` (defaults to `GHS`)
   - `PAYSTACK_EXCHANGE_RATE` — USD to GHS exchange rate (defaults to `11.17` if omitted)

Do not add any of those secret values to GitHub.

### Paystack webhook

After the next GitHub deployment, create a Paystack webhook in your Paystack
Dashboard → Settings → API Keys & Webhooks, pointing to:

```
https://YOUR_PAGES_DOMAIN/api/webhook
```

Subscribe it to the `charge.success` event. Paystack uses your **Secret Key**
for both API calls and webhook signature verification — there is no separate
webhook secret. The webhook endpoint verifies the `x-paystack-signature`
HMAC-SHA-512 header before any order is updated.

### Local Pages testing

After copying `.env.example` to `.dev.vars` and filling it with your Paystack
test secret key, run:

```bash
npx wrangler d1 execute petal-and-bloom-db --local --file=./schema.sql
npx wrangler pages dev . --port=8788
```

Do not add `--d1=DB` to the Pages command: the D1 binding is read from
`wrangler.toml`, which makes Pages use the same local database initialised by
the preceding command.

### Database migration: rename LemonSqueezy column to Paystack

If migrating an existing D1 database that still has the `ls_order_id` column,
run this once against each environment's D1 database:

```bash
npx wrangler d1 execute petal-bloom-ps-db --remote --file=./migrations/0002_rename_ls_to_ps.sql
```

If starting fresh, skip this — the clean `schema.sql` already uses `ps_reference`.

### Database migration: record the expected payment currency

Existing Paystack orders need their expected payment currency stored before
strict payment verification can be enabled. The migration defaults historical
orders to GHS, so review the historical settlement currency first if the
deployment used another currency. Then run it once against each environment:

```bash
npx wrangler d1 execute petal-bloom-ps-db --remote --file=./migrations/0003_add_payment_currency.sql
```

### Database migration: order integrity constraints

This migration rebuilds the `orders` table inside a transaction to enforce
valid order states, positive totals, uppercase three-letter currencies, and a
payment timestamp for paid orders. Before applying it, verify that historical
orders satisfy these conditions:

```bash
npx wrangler d1 execute petal-bloom-ps-db --remote --command "SELECT status, COUNT(*) AS count FROM orders GROUP BY status; SELECT COUNT(*) AS invalid_total_count FROM orders WHERE total_cents <= 0; SELECT payment_currency, COUNT(*) AS count FROM orders GROUP BY payment_currency; SELECT COUNT(*) AS invalid_paid_timestamp_count FROM orders WHERE status = 'paid' AND paid_at IS NULL;"
```

Then apply the migration once:

```bash
npx wrangler d1 execute petal-bloom-ps-db --remote --file=./migrations/0004_add_order_integrity_constraints.sql
```

### Database migration: API abuse protection

This adds a short-lived, D1-backed rate-limit counter and records when a
pending order was last checked with Paystack. Set `RATE_LIMIT_SALT` as an
encrypted Pages secret before deploying; it hashes client IPs before they are
written to D1. Checkout accepts five requests per client per minute. Order
status accepts 30 requests per client and order per minute, and checks Paystack
at most once per pending order per minute.

```bash
npx wrangler d1 execute petal-bloom-ps-db --remote --file=./migrations/0005_add_abuse_protection.sql
```

### Security headers

Cloudflare Pages serves the static storefront with the policy in `_headers`.
Pages Functions do not inherit that file, so `functions/_middleware.js` applies
the same policy to API responses. The Content Security Policy permits only the
site itself plus the Paystack checkout and Google Fonts origins the storefront
uses. It deliberately uses `same-origin-allow-popups` so Paystack's checkout
window can return control to the site.

No HSTS header is set while the site uses the shared `petalbloom.pages.dev`
domain. Add HSTS only after moving to a custom domain that you control.

### Database migration: secure receipt access

New orders receive a cryptographically random receipt credential. Only its
SHA-256 hash is stored in D1; the raw value is held in the customer's browser
session and never placed in a URL. Paid receipts can therefore be downloaded
from the payment-confirmation page without exposing private order details from
the public order-status endpoint. Historical orders do not gain a receipt
credential and will remain unavailable for download.

```bash
npx wrangler d1 execute petal-bloom-ps-db --remote --file=./migrations/0006_add_receipt_access.sql
```

### Database migration: promotion audit fields

This adds immutable USD pricing audit fields for merchandise, delivery, and any
promotion, plus the applied promo code. The checkout Function calculates the
discount from trusted product prices before it creates the Paystack transaction.

```bash
npx wrangler d1 execute petal-bloom-ps-db --remote --file=./migrations/0007_add_promotion_audit_fields.sql
```

## Included

- Responsive desktop/tablet/mobile design
- Feminine florist aesthetic
- Product collection
- Bouquet/Gift filters
- Special Birthday Event Package
- Mobile navigation
- Paystack hosted checkout (GHS)
- Accessible image alt text
- SEO description
