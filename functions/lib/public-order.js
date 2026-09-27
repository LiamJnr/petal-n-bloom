// The public confirmation route deliberately exposes no purchaser, recipient,
// cart, payment-reference, or timing data. The order id stays in the URL and
// does not need to be repeated in its response.
export function toPublicOrderStatus(order) {
  return { status: order.status }
}
