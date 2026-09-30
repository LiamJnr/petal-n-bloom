import { PRODUCTS, GIFT_ADDONS } from '../../js/data/products.js'

const allProducts = [...PRODUCTS, ...(GIFT_ADDONS || [])]
const productBySlug = new Map(allProducts.map((product) => [product.slug, product]))

function cents(price) {
  return Math.round(Number(price) * 100)
}

function findOption(product, key, id) {
  return product?.[key]?.find((option) => option.id === id)
}

function curatedComboPrice(combo) {
  const size = combo.sizes?.find((option) => option.default) || combo.sizes?.[0]
  const vase = combo.vases?.[0]
  if (!size || !vase) throw new Error(`${combo.name} is not configured for checkout.`)
  return { size, vase, totalCents: cents(size.price + vase.price) }
}

/**
 * Converts one client-selected gift set into the individual fulfillment items
 * the set contains. Prices and component choices come only from the catalogue.
 */
export function expandCuratedCombo({ combo, quantity, giftMessage = '' }) {
  if (!combo?.isCombo || !Array.isArray(combo.comboItems) || combo.comboItems.length < 2) {
    throw new Error('This gift set is not configured for checkout.')
  }

  const { totalCents: comboTotalCents } = curatedComboPrice(combo)
  const components = combo.comboItems.map((selection) => {
    const product = productBySlug.get(selection.slug)
    const size = findOption(product, 'sizes', selection.sizeId)
    const vase = findOption(product, 'vases', selection.vaseId)
    if (!product || product.isCombo || !size || !vase) {
      throw new Error(`${combo.name} has an invalid curated item.`)
    }
    return { product, size, vase, listPriceCents: cents(size.price + vase.price) }
  })

  const listTotalCents = components.reduce((sum, component) => sum + component.listPriceCents, 0)
  const savingCents = listTotalCents - comboTotalCents
  if (savingCents < 0 || savingCents !== cents(combo.comboSavings)) {
    throw new Error(`${combo.name} has inconsistent pricing.`)
  }

  return components.map((component, index) => {
    const componentSavingCents = index === 0 ? savingCents : 0
    const unitPriceCents = component.listPriceCents - componentSavingCents
    return {
      slug: component.product.slug,
      name: component.product.name,
      size: { id: component.size.id, name: component.size.name },
      vase: { id: component.vase.id, name: component.vase.name },
      quantity,
      gift_message: index === 0 ? giftMessage : '',
      unit_price_usd: unitPriceCents / 100,
      unit_price_cents: unitPriceCents,
      combo_id: combo.id,
      combo_name: combo.name,
      combo_savings_cents: componentSavingCents,
    }
  })
}

export function validateCuratedComboCatalog() {
  for (const combo of PRODUCTS.filter((product) => product.isCombo)) {
    const { totalCents } = curatedComboPrice(combo)
    const expanded = expandCuratedCombo({ combo, quantity: 1 })
    const expandedTotalCents = expanded.reduce((sum, item) => sum + item.unit_price_cents, 0)
    if (expandedTotalCents !== totalCents) {
      throw new Error(`${combo.name} does not expand to its advertised price.`)
    }
  }
}

export function getCheckoutProduct(slug) {
  return productBySlug.get(slug)
}
