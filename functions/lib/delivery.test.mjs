import assert from 'node:assert/strict'
import test from 'node:test'
import { validateDelivery } from './delivery.js'

const now = new Date('2026-09-27T12:00:00.000Z')
const delivery = {
  recipient_name: 'Clara Harrington',
  street: '742 Evergreen Terrace',
  city: 'Accra',
  state: 'Greater Accra',
  zip: 'GA-001-2345',
  location_type: 'residential',
  delivery_date: '2026-09-27',
  time_window: 'morning',
  courier_notes: 'Ring the bell',
}

test('accepts a complete delivery request for today or later', () => {
  assert.deepEqual(validateDelivery(delivery, 'Happy birthday', now), { ...delivery, card_note: 'Happy birthday' })
})

for (const [name, update, message] of [
  ['a missing recipient name', { recipient_name: '' }, /recipient name and complete delivery address/],
  ['a missing street address', { street: '' }, /recipient name and complete delivery address/],
  ['a missing city', { city: '' }, /recipient name and complete delivery address/],
  ['a missing state', { state: '' }, /recipient name and complete delivery address/],
  ['a missing postal code', { zip: '' }, /recipient name and complete delivery address/],
  ['an unsupported location type', { location_type: 'airport' }, /valid delivery location type/],
  ['an unsupported time window', { time_window: 'overnight' }, /valid delivery time window/],
  ['a past delivery date', { delivery_date: '2026-09-26' }, /not in the past/],
  ['an impossible calendar date', { delivery_date: '2026-02-30' }, /not in the past/],
]) {
  test(`rejects ${name}`, () => {
    assert.throws(() => validateDelivery({ ...delivery, ...update }, '', now), message)
  })
}

test('rejects same-day delivery after the 2:00 PM Edmonton cut-off', () => {
  const afterEdmontonCutoff = new Date('2026-09-27T20:00:00.000Z') // 2:00 PM MDT
  assert.throws(
    () => validateDelivery(delivery, '', afterEdmontonCutoff),
    /valid delivery date that is not in the past/,
  )
})
