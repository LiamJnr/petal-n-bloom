/**
 * Currency Exchange Rates & International Conversion Utilities
 * Single source of truth for multi-currency display across Petal & Bloom.
 */

export const EXCHANGE_RATES = {
  CAD: 1.36,
  GBP: 0.79,
  GHS: 11.17,
};

export const CURRENCY_CONFIG = {
  USD: { code: "USD", symbol: "$", label: "US Dollar" },
  CAD: { code: "CAD", symbol: "CA$ ", label: "Canadian Dollar" },
  GBP: { code: "GBP", symbol: "£", label: "British Pound" },
  GHS: { code: "GHS", symbol: "GH₵ ", label: "Ghanaian Cedi" },
};

/**
 * Calculate international currency estimates for a given USD amount.
 * @param {number} usdAmount - Base amount in USD.
 * @returns {Array<{code: string, label: string, formatted: string, raw: number}>}
 */
export function getInternationalEstimates(usdAmount) {
  const amount = Number(usdAmount) || 0;
  return [
    {
      code: "CAD",
      label: "Canadian Dollar (CAD)",
      formatted: `CA$ ${(amount * EXCHANGE_RATES.CAD).toFixed(2)}`,
      raw: amount * EXCHANGE_RATES.CAD,
    },
    {
      code: "GBP",
      label: "British Pound (GBP)",
      formatted: `£${(amount * EXCHANGE_RATES.GBP).toFixed(2)}`,
      raw: amount * EXCHANGE_RATES.GBP,
    },
    {
      code: "GHS",
      label: "Ghanaian Cedi (GHS)",
      formatted: `GH₵ ${(amount * EXCHANGE_RATES.GHS).toFixed(2)}`,
      raw: amount * EXCHANGE_RATES.GHS,
    },
  ];
}
