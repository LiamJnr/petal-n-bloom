export const STANDARD_FREE_DELIVERY_THRESHOLD_USD = 100
export const KINGSBITE_FREE_DELIVERY_THRESHOLD_USD = 40
export const KINGSBITE_QUALIFYING_SLUGS = [
  'kingsbite-medium-pack',
  'kingsbite-deluxe-duo',
  'combo-kingsbite-roses',
  'combo-kingsbite-celebration',
]

export function isKingsbiteItem(item) {
  const slug = String(item?.slug || '')
  return KINGSBITE_QUALIFYING_SLUGS.includes(slug) || slug.includes('kingsbite')
}

/**
 * Determines whether a cart earns the limited Kingsbite delivery offer.
 * Prices are still calculated by the server from its validated line items.
 */
export function getKingsbiteFreeDeliveryOffer(items, subtotalUsd) {
  const subtotal = Number(subtotalUsd)
  const hasKingsbite = Array.isArray(items) && items.some(isKingsbiteItem)
  const meetsMinimum = Number.isFinite(subtotal) && subtotal >= KINGSBITE_FREE_DELIVERY_THRESHOLD_USD

  return {
    hasKingsbite,
    meetsMinimum,
    isEligible: hasKingsbite && meetsMinimum,
    amountRemainingUsd: hasKingsbite ? Math.max(0, KINGSBITE_FREE_DELIVERY_THRESHOLD_USD - subtotal) : 0,
  }
}

export function hasFreeDelivery(items, subtotalUsd) {
  return Number(subtotalUsd) >= STANDARD_FREE_DELIVERY_THRESHOLD_USD
    || getKingsbiteFreeDeliveryOffer(items, subtotalUsd).isEligible
}
