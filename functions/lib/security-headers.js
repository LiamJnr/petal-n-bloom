export const SECURITY_HEADERS = {
  'Content-Security-Policy': "default-src 'self'; base-uri 'self'; object-src 'none'; script-src 'self' https://js.paystack.co; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' https://api.paystack.co https://js.paystack.co https://checkout.paystack.com; frame-src https://checkout.paystack.com https://js.paystack.co; frame-ancestors 'none'; form-action 'self'; manifest-src 'self'; media-src 'self'; worker-src 'self' blob:; upgrade-insecure-requests",
  'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
  'Permissions-Policy': 'camera=(), geolocation=(), microphone=(), usb=()',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
}

export function applySecurityHeaders(headers) {
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(name, value)
  }
  return headers
}
