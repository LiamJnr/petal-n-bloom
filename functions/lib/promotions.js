const BLOOM10_EXPIRES_AT = '2026-11-01T05:59:59.999Z' // Oct 31, 11:59 PM America/Edmonton

export const PROMOTIONS = {
  BLOOM10: {
    code: 'BLOOM10',
    discountPercent: 10,
    minimumMerchandiseCents: 5_000,
    maximumDiscountCents: 1_800,
    expiresAt: BLOOM10_EXPIRES_AT,
    firstPaidOrderOnly: true,
  },
}

export function calculatePromotion(input, merchandiseSubtotalCents, now = new Date()) {
  const code = String(input || '').trim().toUpperCase()
  if (!code) return null

  const promotion = PROMOTIONS[code]
  if (!promotion) throw new Error('That promo code is not valid.')
  if (!Number.isSafeInteger(merchandiseSubtotalCents) || merchandiseSubtotalCents < 0) {
    throw new Error('The promotion could not be calculated.')
  }
  if (now.getTime() > Date.parse(promotion.expiresAt)) {
    throw new Error('That promo code has expired.')
  }
  if (merchandiseSubtotalCents < promotion.minimumMerchandiseCents) {
    throw new Error(`That promo code requires at least $${(promotion.minimumMerchandiseCents / 100).toFixed(2)} in merchandise.`)
  }

  const percentageDiscountCents = Math.floor(
    merchandiseSubtotalCents * promotion.discountPercent / 100,
  )
  return {
    code: promotion.code,
    discountUsdCents: Math.min(percentageDiscountCents, promotion.maximumDiscountCents),
    firstPaidOrderOnly: promotion.firstPaidOrderOnly,
  }
}
