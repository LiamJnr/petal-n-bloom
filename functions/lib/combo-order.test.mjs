import assert from 'node:assert/strict'
import test from 'node:test'
import { getGiftComboUpgradesForCartItem, getGiftCombosForGrid, getGiftCombosForProduct, getHomepageComboBanner, PRODUCTS } from '../../js/data/products.js'
import { expandCuratedCombo, validateCuratedComboCatalog } from './combo-order.js'

const combo = (slug) => PRODUCTS.find((product) => product.slug === slug)

test('each curated gift set expands from server-owned component data at its advertised price', () => {
  assert.doesNotThrow(validateCuratedComboCatalog)

  for (const product of PRODUCTS.filter((item) => item.isCombo)) {
    const expanded = expandCuratedCombo({ combo: product, quantity: 1 })
    const chargedCents = expanded.reduce((sum, item) => sum + item.unit_price_cents, 0)
    assert.equal(chargedCents, Math.round(product.sizes[0].price * 100))
    assert.ok(expanded.every((item) => item.combo_id === product.id))
    assert.ok(expanded.every((item) => item.combo_name === product.name))
  }
})

test('gift-set component lines preserve quantity and apply the set saving exactly once', () => {
  const expanded = expandCuratedCombo({ combo: combo('combo-birthday-delights'), quantity: 2, giftMessage: 'Happy birthday!' })

  assert.deepEqual(expanded.map((item) => item.slug), [
    'birthday-bloom-box',
    'french-macarons',
    'photo-keepsake-card',
  ])
  assert.equal(expanded.reduce((sum, item) => sum + item.unit_price_cents * item.quantity, 0), 19_000)
  assert.equal(expanded.reduce((sum, item) => sum + item.combo_savings_cents, 0), 900)
  assert.equal(expanded[0].gift_message, 'Happy birthday!')
  assert.equal(expanded[1].gift_message, '')
})

test('standard showcase gift sets keep their advertised saving in the $5–$9 range', () => {
  for (const product of getGiftCombosForGrid()) {
    assert.ok(product.comboSavings >= 5 && product.comboSavings <= 9, product.slug)
  }
})

test('the Ghana gift banner is a $28 server-validated combo with a $4 saving', () => {
  const banner = getHomepageComboBanner()
  const expanded = expandCuratedCombo({ combo: banner, quantity: 1 })

  assert.equal(banner.slug, 'combo-kingsbite-roses')
  assert.equal(banner.sizes[0].price, 28)
  assert.equal(banner.comboSavings, 4)
  assert.equal(expanded.reduce((sum, item) => sum + item.unit_price_cents, 0), 2_800)
  assert.deepEqual(expanded.map((item) => item.slug), ['classic-dozen-roses', 'kingsbite-medium-pack'])
})

test('each component points to only the curated gift sets that include it', () => {
  assert.deepEqual(getGiftCombosForProduct('rose-garden').map((item) => item.slug), ['combo-sweet-indulgence'])
  assert.deepEqual(getGiftCombosForProduct('botanical-candle').map((item) => item.slug), [
    'combo-cozy-evening',
    'combo-garden-retreat',
  ])
  assert.deepEqual(getGiftCombosForProduct('not-a-product'), [])
})

test('a cart upgrade is offered only for an exact standalone component with no set duplication', () => {
  const roseGarden = {
    id: 'rose-line', slug: 'rose-garden', size: { id: 'standard' }, vase: { id: 'none' },
  }
  assert.deepEqual(getGiftComboUpgradesForCartItem(roseGarden, [roseGarden]).map((item) => item.slug), ['combo-sweet-indulgence'])
  assert.deepEqual(getGiftComboUpgradesForCartItem({ ...roseGarden, size: { id: 'deluxe' } }, [roseGarden]), [])
  assert.deepEqual(getGiftComboUpgradesForCartItem(roseGarden, [
    roseGarden,
    { id: 'strawberries-line', slug: 'chocolate-strawberries' },
  ]), [])
})
