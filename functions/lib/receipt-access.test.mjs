import assert from 'node:assert/strict'
import test from 'node:test'
import { createReceiptToken, hashReceiptToken, isReceiptToken, receiptTokenMatches } from './receipt-access.js'

test('creates a 256-bit URL-safe receipt credential', () => {
  const token = createReceiptToken()
  assert.match(token, /^[A-Za-z0-9_-]{43}$/)
  assert.equal(isReceiptToken(token), true)
  assert.notEqual(token, createReceiptToken())
})

test('stores and compares only the receipt credential hash', async () => {
  const token = createReceiptToken()
  const hash = await hashReceiptToken(token)

  assert.match(hash, /^[a-f0-9]{64}$/)
  assert.equal(await receiptTokenMatches(token, hash), true)
  assert.equal(await receiptTokenMatches(createReceiptToken(), hash), false)
  assert.equal(await receiptTokenMatches('not-a-token', hash), false)
})
