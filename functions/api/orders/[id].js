import { paymentMatchesOrder } from '../../lib/paystack-payment.js'
import { toPublicOrderStatus } from '../../lib/public-order.js'
import { consumeRateLimit } from '../../lib/rate-limit.js'

const ORDER_STATUS_RATE_LIMIT = 30
const PAYSTACK_VERIFY_COOLDOWN_SECONDS = 60

export async function onRequestGet({ params, env, request }) {
  const id = String(params.id || '')
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    return json({ error: 'Invalid order reference.' }, 400)
  }

  try {
    const rateLimit = await consumeRateLimit({
      request,
      db: env.DB,
      salt: env.RATE_LIMIT_SALT,
      namespace: 'order-status',
      discriminator: id,
      limit: ORDER_STATUS_RATE_LIMIT,
    })
    if (!rateLimit.allowed) {
      return json({ error: 'Too many status requests. Please try again in a minute.' }, 429, {
        'Retry-After': String(rateLimit.retryAfterSeconds),
      })
    }
  } catch (error) {
    console.error('Order status rate limiter unavailable.', error)
    return json({ error: 'Order status is temporarily unavailable.' }, 503)
  }

  let order = await env.DB.prepare(
    'SELECT id, status, ps_reference, total_cents, payment_currency FROM orders WHERE id = ?',
  ).bind(id).first()

  if (!order) return json({ error: 'Order not found.' }, 404)

  // If order is pending, actively verify with Paystack in case webhook is delayed or dropped
  if (order.status === 'pending' && env.PAYSTACK_SECRET_KEY && order.ps_reference) {
    const claim = await env.DB.prepare(
      `UPDATE orders SET last_payment_check_at = datetime('now')
       WHERE id = ? AND status = 'pending'
         AND (last_payment_check_at IS NULL OR last_payment_check_at <= datetime('now', ?))`,
    ).bind(order.id, `-${PAYSTACK_VERIFY_COOLDOWN_SECONDS} seconds`).run()
    if (claim.meta.changes !== 1) return json({ order: toPublicOrderStatus(order) })

    try {
      const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(order.ps_reference)}`, {
        headers: {
          Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      })
      if (verifyRes.ok) {
        const verifyData = await verifyRes.json()
        if (paymentMatchesOrder(verifyData?.data, order)) {
          await env.DB.prepare(
            `UPDATE orders
             SET status = 'paid', paid_at = datetime('now')
             WHERE id = ? AND ps_reference = ? AND total_cents = ? AND payment_currency = ? AND status = 'pending'`,
          ).bind(order.id, order.ps_reference, order.total_cents, order.payment_currency).run()
          order.status = 'paid'
        }
      }
    } catch (err) {
      console.warn('Paystack active verification check error:', err)
    }
  }

  return json({ order: toPublicOrderStatus(order) })
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...extraHeaders },
  })
}
