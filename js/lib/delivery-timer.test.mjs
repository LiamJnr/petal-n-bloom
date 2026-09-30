import assert from 'node:assert/strict'
import test from 'node:test'
import { getDeliveryCountdownState } from './delivery-timer.js'

test('uses Edmonton time instead of the visitor timezone for the daily cut-off', () => {
  const beforeCutoff = getDeliveryCountdownState(14, new Date('2026-09-27T19:59:30.000Z')) // 1:59:30 PM Edmonton (MDT)
  const atCutoff = getDeliveryCountdownState(14, new Date('2026-09-27T20:00:00.000Z')) // 2:00 PM Edmonton (MDT)

  assert.equal(beforeCutoff.isSameDayAvailable, true)
  assert.equal(beforeCutoff.formattedCountdown, '0h 00m 30s')
  assert.equal(beforeCutoff.earliestDateStr, '2026-09-27')
  assert.equal(atCutoff.isSameDayAvailable, false)
  assert.equal(atCutoff.earliestDateStr, '2026-09-28')
  assert.equal(beforeCutoff.timeZone, 'America/Edmonton')
})

test('automatically uses Edmonton standard time after the daylight-saving change', () => {
  const beforeCutoff = getDeliveryCountdownState(14, new Date('2026-11-02T20:59:30.000Z')) // 1:59:30 PM Edmonton (MST)
  const atCutoff = getDeliveryCountdownState(14, new Date('2026-11-02T21:00:00.000Z')) // 2:00 PM Edmonton (MST)

  assert.equal(beforeCutoff.isSameDayAvailable, true)
  assert.equal(atCutoff.isSameDayAvailable, false)
})
