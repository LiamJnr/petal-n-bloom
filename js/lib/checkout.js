export async function startCheckout({ items, buyer, delivery, card_note, onCancel }) {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items, buyer, delivery, card_note }),
  })

  if (!response.ok) {
    const { error } = await response.json().catch(() => ({ error: 'Checkout could not be started.' }))
    throw new Error(error || 'Checkout could not be started.')
  }

  const data = await response.json()
  const { url, access_code: accessCode, orderId } = data
  if (!accessCode && !url) throw new Error('Checkout could not be started.')

  const targetCallbackUrl = `/?view=order-confirmed&order=${encodeURIComponent(orderId || '')}`

  // 1. Paystack v2 Popup (new PaystackPop().resumeTransaction)
  if (accessCode && typeof window.PaystackPop !== 'undefined') {
    try {
      const popup = new window.PaystackPop()
      if (typeof popup.resumeTransaction === 'function') {
        popup.resumeTransaction(accessCode, {
          onSuccess: () => {
            window.location.assign(targetCallbackUrl)
          },
          onCancel: () => {
            if (typeof onCancel === 'function') onCancel()
          },
        })
        return
      }
    } catch (e) {
      console.warn('PaystackPop v2 failed, falling back:', e)
    }

    // 2. Paystack v1 Popup fallback
    if (typeof window.PaystackPop.setup === 'function') {
      const handler = window.PaystackPop.setup({
        access_code: accessCode,
        callback: () => {
          window.location.assign(targetCallbackUrl)
        },
        onClose: () => {
          if (typeof onCancel === 'function') onCancel()
        },
      })
      handler.openIframe()
      return
    }
  }

  // 3. Fallback to standard URL redirect
  if (url) {
    window.location.assign(url)
  }
}
