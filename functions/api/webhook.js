import { paymentMatchesOrder } from '../lib/paystack-payment.js'

export async function onRequestPost({ request, env }) {
  const rawBody = await request.text()
  const signature = request.headers.get('x-paystack-signature') || ''
  const valid = await verifySignature(rawBody, signature, env.PAYSTACK_SECRET_KEY)
  if (!valid) return new Response('Invalid signature', { status: 401 })

  let event
  try {
    event = JSON.parse(rawBody)
  } catch {
    return new Response('Invalid JSON', { status: 400 })
  }

  const eventName = event.event
  const payment = event.data
  const orderRef = payment?.metadata?.order_ref
  if (!orderRef) return new Response('OK', { status: 200 })

  if (eventName === 'charge.success') {
    const order = await env.DB.prepare(
      `SELECT id, ps_reference, total_cents, payment_currency FROM orders WHERE id = ?`,
    ).bind(orderRef).first()

    if (!order || !paymentMatchesOrder(payment, order)) {
      console.error('Rejected Paystack payment event because it did not match its order.', {
        orderRef,
        reference: payment?.reference,
      })
      return new Response('OK', { status: 200 })
    }

    await env.DB.prepare(
      `UPDATE orders
       SET status = 'paid', paid_at = datetime('now')
       WHERE id = ? AND ps_reference = ? AND total_cents = ? AND payment_currency = ? AND status = 'pending'`,
    ).bind(order.id, order.ps_reference, order.total_cents, order.payment_currency).run()
  }

  return new Response('OK', { status: 200 })
}

async function verifySignature(rawBody, signatureHex, secret) {
  if (!signatureHex || !secret) return false
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-512' },
    false,
    ['sign'],
  )
  const mac = await crypto.subtle.sign('HMAC', key, encoder.encode(rawBody))
  const macHex = [...new Uint8Array(mac)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
  if (macHex.length !== signatureHex.length) return false

  let mismatch = 0
  for (let index = 0; index < macHex.length; index += 1) {
    mismatch |= macHex.charCodeAt(index) ^ signatureHex.charCodeAt(index)
  }
  return mismatch === 0
}
