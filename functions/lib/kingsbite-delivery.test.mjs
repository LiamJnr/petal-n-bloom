import assert from 'node:assert/strict'
import test from 'node:test'
import {
  getKingsbiteFreeDeliveryOffer,
  hasFreeDelivery,
} from '../../js/lib/kingsbite-delivery.js'

test('Kingsbite offer requires the verified add-on and $40 in merchandise', () => {
  assert.equal(getKingsbiteFreeDeliveryOffer([{ slug: 'kingsbite-medium-pack' }], 39.99).isEligible, false)
  assert.equal(getKingsbiteFreeDeliveryOffer([{ slug: 'kingsbite-medium-pack' }], 40).isEligible, true)
  assert.equal(getKingsbiteFreeDeliveryOffer([{ slug: 'kingsbite-deluxe-duo' }], 40).isEligible, true)
  assert.equal(getKingsbiteFreeDeliveryOffer([{ slug: 'combo-kingsbite-celebration' }], 44).isEligible, true)
  assert.equal(getKingsbiteFreeDeliveryOffer([{ slug: 'classic-dozen-roses' }], 60).isEligible, false)
})

test('standard $100 free delivery remains available without Kingsbite', () => {
  assert.equal(hasFreeDelivery([{ slug: 'classic-dozen-roses' }], 100), true)
})
