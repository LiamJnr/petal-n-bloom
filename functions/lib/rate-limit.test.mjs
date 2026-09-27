import assert from 'node:assert/strict'
import test from 'node:test'
import { buildRateLimitScope, consumeRateLimit } from './rate-limit.js'

function request(ip) {
  return new Request('https://petalbloom.pages.dev/api/checkout', {
    headers: ip ? { 'CF-Connecting-IP': ip } : {},
  })
}

test('hashes client identity rather than storing a raw IP address in the scope', async () => {
  const scope = await buildRateLimitScope({ request: request('198.51.100.42'), salt: 'test-salt', namespace: 'checkout' })
  assert.match(scope, /^checkout:[a-f0-9]{64}$/)
  assert.doesNotMatch(scope, /198\.51\.100\.42/)
})

test('changes scopes for different endpoints and identities', async () => {
  const first = await buildRateLimitScope({ request: request('198.51.100.42'), salt: 'test-salt', namespace: 'checkout' })
  const second = await buildRateLimitScope({ request: request('198.51.100.43'), salt: 'test-salt', namespace: 'checkout' })
  const third = await buildRateLimitScope({ request: request('198.51.100.42'), salt: 'test-salt', namespace: 'order-status' })
  assert.notEqual(first, second)
  assert.notEqual(first, third)
})

test('permits requests within the limit and rejects the next request', async () => {
  let count = 0
  const db = {
    prepare() {
      return {
        bind() {
          return { first: async () => ({ request_count: ++count }) }
        },
      }
    },
  }
  const options = { request: request('198.51.100.42'), db, salt: 'test-salt', namespace: 'checkout', limit: 2 }
  assert.equal((await consumeRateLimit(options)).allowed, true)
  assert.equal((await consumeRateLimit(options)).allowed, true)
  assert.equal((await consumeRateLimit(options)).allowed, false)
})
