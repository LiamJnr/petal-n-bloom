import assert from 'node:assert/strict'
import test from 'node:test'
import { escapeHtml } from '../../js/lib/html-escape.js'

test('escapes customer text for safe HTML interpolation', () => {
  assert.equal(
    escapeHtml('<img src=x onerror="alert(1)"> & \'hello\''),
    '&lt;img src=x onerror=&quot;alert(1)&quot;&gt; &amp; &#39;hello&#39;',
  )
})
