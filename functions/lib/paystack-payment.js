const ISO_CURRENCY_CODE = /^[A-Z]{3}$/

export function normaliseCurrency(value) {
  return String(value ?? '').trim().toUpperCase()
}

export function isValidCurrency(value) {
  return ISO_CURRENCY_CODE.test(normaliseCurrency(value))
}

// Paystack amounts are in the currency's smallest unit. A payment must match
// every immutable attribute that was recorded when its checkout was created.
export function paymentMatchesOrder(payment, order) {
  const expectedAmount = Number(order?.total_cents)
  const receivedAmount = payment?.amount
  const expectedReference = String(order?.ps_reference || '')
  const receivedReference = String(payment?.reference || '')
  const expectedOrderId = String(order?.id || '')
  const receivedOrderId = String(payment?.metadata?.order_ref || '')
  const expectedCurrency = normaliseCurrency(order?.payment_currency)
  const receivedCurrency = normaliseCurrency(payment?.currency)

  return (
    payment?.status === 'success' &&
    expectedReference.length > 0 &&
    receivedReference === expectedReference &&
    expectedOrderId.length > 0 &&
    receivedOrderId === expectedOrderId &&
    Number.isSafeInteger(expectedAmount) && expectedAmount > 0 &&
    Number.isSafeInteger(receivedAmount) && receivedAmount === expectedAmount &&
    isValidCurrency(expectedCurrency) &&
    receivedCurrency === expectedCurrency
  )
}
