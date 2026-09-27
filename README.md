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
