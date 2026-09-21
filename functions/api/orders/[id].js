export async function onRequestGet({ params, env }) {
  const id = String(params.id || '')
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    return json({ error: 'Invalid order reference.' }, 400)
  }

  let order = await env.DB.prepare(
    'SELECT id, status, purchaser_email, ps_reference, total_cents, cart_json, buyer_json, delivery_json, created_at, paid_at FROM orders WHERE id = ?',
  ).bind(id).first()

  if (!order) return json({ error: 'Order not found.' }, 404)

  // If order is pending, actively verify with Paystack in case webhook is delayed or dropped
  if (order.status === 'pending' && env.PAYSTACK_SECRET_KEY && order.ps_reference) {
    try {
      const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(order.ps_reference)}`, {
        headers: {
          Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      })
      if (verifyRes.ok) {
        const verifyData = await verifyRes.json()
        if (verifyData?.data?.status === 'success') {
          await env.DB.prepare(
            `UPDATE orders
             SET status = 'paid', paid_at = datetime('now')
             WHERE id = ? AND status = 'pending'`,
          ).bind(id).run()
          order.status = 'paid'
        }
      }
    } catch (err) {
      console.warn('Paystack active verification check error:', err)
    }
  }

  return json({ order })
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}
