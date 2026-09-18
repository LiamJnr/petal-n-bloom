import { PRODUCTS } from '../../js/data/products.js'

const MAX_LINE_ITEMS = 25
const MAX_QUANTITY_PER_LINE = 20
const productBySlug = new Map(PRODUCTS.map((product) => [product.slug, product]))

export async function onRequestPost(context) {
  try {
    return await createCheckout(context)
  } catch (error) {
    console.error('Checkout creation failed', error)
    const message = error instanceof Error
      ? `Checkout setup error: ${error.message}`
      : 'Checkout could not be prepared. Please try again.'
    return json({ error: message }, 500)
  }
}

async function createCheckout({ request, env }) {
  const missing = ['DB', 'PAYSTACK_SECRET_KEY'].filter((key) => !env[key])
  if (missing.length) return json({ error: `Checkout is not configured: ${missing.join(', ')}` }, 500)

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid checkout request.' }, 400)
  }

  let items
  let buyer
  try {
    items = validateItems(body.items)
    buyer = validateBuyer(body.buyer)
  } catch (error) {
    return json({ error: error.message }, 400)
  }

  const exchangeRate = Number(env.PAYSTACK_EXCHANGE_RATE || 11.17)
  const subtotalUsd = items.reduce((sum, item) => sum + item.unit_price_usd * item.quantity, 0)
  const totalGhs = Number((subtotalUsd * exchangeRate).toFixed(2))
  const totalPesewas = Math.round(totalGhs * 100)
  const orderId = crypto.randomUUID()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const siteUrl = new URL(request.url).origin
  const callbackUrl = `${siteUrl}/?view=order-confirmed&order=${encodeURIComponent(orderId)}`

  await env.DB.prepare(
    `INSERT INTO orders (id, status, purchaser_email, cart_json, buyer_json, delivery_json, total_cents)
     VALUES (?, 'pending', ?, ?, ?, '{}', ?)`
  ).bind(
    orderId,
    buyer.email,
    JSON.stringify(items),
    JSON.stringify(buyer),
    totalPesewas,
  ).run()

  const currency = String(env.PAYSTACK_CURRENCY || 'GHS').trim().toUpperCase()
  const payload = {
    email: buyer.email,
    amount: totalPesewas,
    currency,
    callback_url: callbackUrl,
    metadata: {
      order_ref: orderId,
      buyer_name: buyer.name,
      amount_usd: `$${subtotalUsd.toFixed(2)}`,
      exchange_rate: exchangeRate,
      cart_description: checkoutDescription(items),
      custom_fields: [
        { display_name: 'Order', variable_name: 'order_ref', value: orderId },
        { display_name: 'Total USD', variable_name: 'total_usd', value: `$${subtotalUsd.toFixed(2)}` },
        { display_name: 'Exchange Rate', variable_name: 'exchange_rate', value: `1 USD = ${exchangeRate} GHS` },
        { display_name: 'Items', variable_name: 'item_count', value: `${itemCount} item${itemCount === 1 ? '' : 's'}` },
      ],
    },
  }

  const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const paystackData = await paystackResponse.json().catch(() => null)
  const url = paystackData?.data?.authorization_url
  if (!paystackResponse.ok || !url) {
    await env.DB.prepare(
      `UPDATE orders SET status = 'checkout_failed' WHERE id = ? AND status = 'pending'`,
    ).bind(orderId).run()
    return json({
      error: paystackData?.message || 'Payment checkout could not be prepared. Please try again.',
    }, 502)
  }

  const accessCode = paystackData?.data?.access_code
  const reference = paystackData?.data?.reference

  if (reference) {
    await env.DB.prepare(
      `UPDATE orders SET ps_reference = ? WHERE id = ?`
    ).bind(reference, orderId).run()
  }

  return json({
    url,
    access_code: accessCode,
    reference,
    orderId,
  })
}

function validateItems(items) {
  if (!Array.isArray(items) || items.length === 0) throw new Error('Your flower bag is empty.')
  if (items.length > MAX_LINE_ITEMS) throw new Error('Your flower bag has too many different items.')

  return items.map((item) => {
    const product = productBySlug.get(String(item?.slug || ''))
    const sizeId = String(item?.size_id || '').trim()
    const vaseId = String(item?.vase_id || '').trim()
    const quantity = Number(item?.quantity)
    if (!product) throw new Error('One of the arrangements in your bag is no longer available.')
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY_PER_LINE) {
      throw new Error('Please choose a valid quantity for every arrangement.')
    }

    const size = product.sizes.find((option) => option.id === sizeId)
    const vase = product.vases.find((option) => option.id === vaseId)
    if (!size) throw new Error(`Please choose a valid size for ${product.name}.`)
    if (!vase) throw new Error(`Please choose a valid vase or wrap for ${product.name}.`)

    return {
      slug: product.slug,
      name: product.name,
      size: { id: size.id, name: size.name },
      vase: { id: vase.id, name: vase.name },
      quantity,
      unit_price_usd: size.price + vase.price,
      unit_price_cents: Math.round((size.price + vase.price) * 100),
    }
  })
}

function validateBuyer(value) {
  const clean = (field, max) => String(value?.[field] || '').trim().slice(0, max)
  const buyer = { name: clean('name', 100), email: clean('email', 254).toLowerCase() }
  if (!buyer.name || !buyer.email) throw new Error('Please enter your name and email address.')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyer.email)) throw new Error('Please enter a valid email address.')
  return buyer
}

function checkoutDescription(items) {
  const itemText = items
    .map((item) => `${item.name} — ${item.size.name}, ${item.vase.name} × ${item.quantity}`)
    .join('; ')
  return `Order: ${itemText}`.slice(0, 1000)
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}
