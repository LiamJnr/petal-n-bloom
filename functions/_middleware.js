import { applySecurityHeaders } from './lib/security-headers.js'

export async function onRequest(context) {
  const response = await context.next()
  const headers = new Headers(response.headers)
  applySecurityHeaders(headers)

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}
