import assert from 'node:assert/strict'
import test from 'node:test'
import { paymentMatchesOrder } from './paystack-payment.js'

const order = {
  id: 'f0f113d6-7d5b-47a4-9e9b-2b130ffc5ef5',
  ps_reference: 'petal-bloom-transaction-123',
  total_cents: 125430,
  payment_currency: 'GHS',
}

const payment = {
  status: 'success',
  reference: order.ps_reference,
  amount: order.total_cents,
  currency: 'ghs',
  metadata: { order_ref: order.id },
}

test('accepts an exactly matching successful Paystack payment', () => {
  assert.equal(paymentMatchesOrder(payment, order), true)
})

for (const [name, mutation] of [
  ['an unsuccessful payment', { status: 'failed' }],
  ['a different transaction reference', { reference: 'another-transaction' }],
  ['a different amount', { amount: 125431 }],
  ['a different currency', { currency: 'NGN' }],
  ['a different order reference in metadata', { metadata: { order_ref: 'different-order' } }],
]) {
  test(`rejects ${name}`, () => {
    assert.equal(paymentMatchesOrder({ ...payment, ...mutation }, order), false)
  })
}
