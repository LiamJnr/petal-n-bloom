import assert from 'node:assert/strict'
import test from 'node:test'
import { calculatePromotion } from './promotions.js'

const beforeExpiry = new Date('2026-11-01T05:59:59.998Z')

test('calculates BLOOM10 from merchandise only', () => {
  assert.deepEqual(calculatePromotion(' bloom10 ', 10_000, beforeExpiry), {
    code: 'BLOOM10',
    discountUsdCents: 1_000,
    firstPaidOrderOnly: true,
  })
})

test('caps BLOOM10 at $18', () => {
  assert.equal(calculatePromotion('BLOOM10', 50_000, beforeExpiry).discountUsdCents, 1_800)
})

for (const [name, code, subtotal, now, message] of [
  ['unknown code', 'PETAL5', 10_000, beforeExpiry, 'not valid'],
  ['order below the minimum', 'BLOOM10', 4_999, beforeExpiry, 'requires at least \\$50\\.00'],
  ['expired code', 'BLOOM10', 10_000, new Date('2026-11-01T06:00:00.000Z'), 'expired'],
]) {
  test(`rejects a ${name}`, () => {
    assert.throws(() => calculatePromotion(code, subtotal, now), new RegExp(message))
  })
}

test('does not apply a promotion when no code is supplied', () => {
  assert.equal(calculatePromotion('', 10_000, beforeExpiry), null)
})
