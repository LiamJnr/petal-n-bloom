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
  const orderRef = event.data?.metadata?.order_ref
  if (!orderRef) return new Response('OK', { status: 200 })

  if (eventName === 'charge.success') {
    const psReference = event.data?.reference || null
    await env.DB.prepare(
      `UPDATE orders
       SET status = 'paid', ps_reference = ?, paid_at = datetime('now')
       WHERE id = ? AND status = 'pending'`,
    ).bind(psReference, orderRef).run()
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
