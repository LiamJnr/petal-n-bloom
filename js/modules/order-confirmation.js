import { clearCart } from './cart.js'
import { navigateToHome, scrollToTop } from './router.js'
import { ICONS } from '../lib/icons.js'
import { downloadReceipt } from '../lib/receipt.js'

const POLL_INTERVAL_MS = 2000
const MAX_POLLS = 15

export function renderOrderConfirmationPage() {
  const confirmationView = document.getElementById('order-confirmation-view')
  const homeView = document.getElementById('home-view')
  const pdpView = document.getElementById('pdp-view')
  const checkoutView = document.getElementById('checkout-view')
  if (!confirmationView) return

  if (homeView) homeView.style.display = 'none'
  if (pdpView) pdpView.style.display = 'none'
  if (checkoutView) checkoutView.style.display = 'none'
  confirmationView.style.display = 'block'
  document.title = 'Order Confirmation — Petal & Bloom'
  scrollToTop()

  const orderId = new URLSearchParams(window.location.search).get('order') || ''
  if (!isOrderId(orderId)) {
    renderMessage(confirmationView, {
      eyebrow: 'Order reference unavailable',
      title: 'We could not find this order',
      message: 'Please check the link in your receipt or contact our studio team for assistance.',
      action: 'Return to the flower shop',
    })
    return
  }

  renderMessage(confirmationView, {
    eyebrow: 'Securing your order',
    title: 'Confirming your payment',
    message: 'We are receiving the payment confirmation from our secure checkout.',
    loading: true,
    reference: orderId,
  })
  pollOrderStatus(confirmationView, orderId)
}

async function pollOrderStatus(view, orderId) {
  for (let attempt = 0; attempt < MAX_POLLS; attempt += 1) {
    try {
      const response = await fetch(`/api/orders/${encodeURIComponent(orderId)}`, { cache: 'no-store' })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'Unable to retrieve order status.')

      if (payload.order.status === 'paid') {
        clearCart()
        renderMessage(view, {
          eyebrow: 'Payment confirmed',
          title: 'Your order is confirmed',
          message: 'Thank you for your order. Our studio team will now prepare your arrangement.',
          action: 'Continue shopping',
          reference: orderId,
          receiptAvailable: hasReceiptToken(orderId),
        })
        return
      }

      if (payload.order.status === 'refunded') {
        renderMessage(view, {
          eyebrow: 'Order refunded',
          title: 'This order has been refunded',
          message: 'If you have questions, please contact our studio team.',
          action: 'Return to the flower shop',
          reference: orderId,
        })
        return
      }
    } catch (error) {
      renderMessage(view, {
        eyebrow: 'Order status unavailable',
        title: 'We could not confirm your order yet',
        message: error.message || 'Please refresh this page in a moment.',
        action: 'Return to the flower shop',
        reference: orderId,
      })
      return
    }

    await delay(POLL_INTERVAL_MS)
  }

  renderMessage(view, {
    eyebrow: 'Order received',
    title: 'Your payment is still being confirmed',
    message: 'Please keep this page open or keep your order reference handy. Your flower bag remains saved until payment confirmation arrives.',
    action: 'Return to the flower shop',
    reference: orderId,
  })
}

function renderMessage(view, { eyebrow, title, message, action, loading = false, reference = '', receiptAvailable = false }) {
  const safeReference = reference ? `Order reference: ${reference.slice(0, 8).toUpperCase()}` : ''
  view.innerHTML = `
    <section class="order-confirmation">
      <div class="order-confirmation-card">
        <div class="order-confirmation-mark${loading ? ' is-loading' : ''}" aria-hidden="true">${loading ? '✦' : ICONS.check}</div>
        <p class="order-confirmation-eyebrow">${eyebrow}</p>
        <h1>${title}</h1>
        <p class="order-confirmation-message">${message}</p>
        ${safeReference ? `<p class="order-confirmation-reference">${safeReference}</p>` : ''}
        <div class="order-confirmation-actions">
          ${action ? '<button type="button" class="button button-dark" id="btn-order-confirmation-home">' + action + '</button>' : ''}
          ${receiptAvailable ? '<button type="button" class="button button-outline" id="btn-download-receipt">Download receipt</button>' : ''}
        </div>
      </div>
    </section>
  `
  document.getElementById('btn-order-confirmation-home')?.addEventListener('click', () => navigateToHome())
  document.getElementById('btn-download-receipt')?.addEventListener('click', () => downloadOrderReceipt(reference))
}

function hasReceiptToken(orderId) {
  try {
    return Boolean(sessionStorage.getItem(`petal_bloom_receipt_${orderId}`))
  } catch {
    return false
  }
}

async function downloadOrderReceipt(orderId) {
  const button = document.getElementById('btn-download-receipt')
  let token
  try {
    token = sessionStorage.getItem(`petal_bloom_receipt_${orderId}`)
  } catch {
    token = null
  }
  if (!token) return

  const originalLabel = button?.textContent || 'Download receipt'
  if (button) {
    button.disabled = true
    button.textContent = 'Preparing receipt…'
  }

  try {
    const response = await fetch(`/api/orders/${encodeURIComponent(orderId)}/receipt`, {
      method: 'POST',
      headers: { 'X-Receipt-Token': token },
      cache: 'no-store',
    })
    const payload = await response.json()
    if (!response.ok) throw new Error(payload.error || 'Receipt could not be downloaded.')
    downloadReceipt(payload.order)
  } catch (error) {
    window.alert(error.message || 'Receipt could not be downloaded.')
  } finally {
    if (button) {
      button.disabled = false
      button.textContent = originalLabel
    }
  }
}

function isOrderId(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}

function delay(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds))
}
