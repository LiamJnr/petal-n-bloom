const WINDOW_SECONDS = 60

export async function consumeRateLimit({ request, db, salt, namespace, limit, discriminator = '' }) {
  if (!salt) throw new Error('Rate limiting is not configured.')
  const scope = await buildRateLimitScope({ request, salt, namespace, discriminator })
  const row = await db.prepare(
    `INSERT INTO api_rate_limits (bucket_start, scope, request_count)
     VALUES (strftime('%Y-%m-%dT%H:%M:00Z', 'now'), ?, 1)
     ON CONFLICT(bucket_start, scope) DO UPDATE SET request_count = request_count + 1
     RETURNING request_count`,
  ).bind(scope).first()
  const count = Number(row?.request_count || 0)
  return { allowed: count <= limit, retryAfterSeconds: WINDOW_SECONDS }
}

export async function buildRateLimitScope({ request, salt, namespace, discriminator = '' }) {
  const clientIp = request.headers.get('CF-Connecting-IP') || 'unknown'
  const data = new TextEncoder().encode(`${salt}:${namespace}:${clientIp}:${discriminator}`)
  const digest = await crypto.subtle.digest('SHA-256', data)
  const hash = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
  return `${namespace}:${hash}`
}
