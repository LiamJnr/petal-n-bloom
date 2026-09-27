const TOKEN_BYTES = 32
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/

export function createReceiptToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(TOKEN_BYTES))
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '')
}

export function isReceiptToken(value) {
  return TOKEN_PATTERN.test(String(value || ''))
}

export async function hashReceiptToken(token) {
  if (!isReceiptToken(token)) return null
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token))
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

export async function receiptTokenMatches(token, storedHash) {
  const candidateHash = await hashReceiptToken(token)
  if (!candidateHash || typeof storedHash !== 'string' || candidateHash.length !== storedHash.length) {
    return false
  }

  let mismatch = 0
  for (let index = 0; index < candidateHash.length; index += 1) {
    mismatch |= candidateHash.charCodeAt(index) ^ storedHash.charCodeAt(index)
  }
  return mismatch === 0
}
