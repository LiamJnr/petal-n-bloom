export const EDMONTON_TIME_ZONE = 'America/Edmonton'
export const EDMONTON_CUTOFF_HOUR = 14

const formatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: EDMONTON_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
})

const pad = (value) => String(value).padStart(2, '0')

export function getEdmontonParts(now = new Date()) {
  const values = Object.fromEntries(
    formatter.formatToParts(now)
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, Number(part.value)]),
  )
  return {
    year: values.year,
    month: values.month,
    day: values.day,
    hour: values.hour,
    minute: values.minute,
    second: values.second,
  }
}

export function formatEdmontonDate(parts) {
  return `${parts.year}-${pad(parts.month)}-${pad(parts.day)}`
}

/** Convert an Edmonton wall-clock time to an absolute Date, including DST. */
export function edmontonWallClockToDate(parts) {
  const wallClockAsUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute || 0, parts.second || 0)
  const targetParts = getEdmontonParts(new Date(wallClockAsUtc))
  const offsetAtTarget = Date.UTC(
    targetParts.year,
    targetParts.month - 1,
    targetParts.day,
    targetParts.hour,
    targetParts.minute,
    targetParts.second,
  ) - wallClockAsUtc
  return new Date(wallClockAsUtc - offsetAtTarget)
}

export function getEdmontonCutoffDate(cutoffHour, now = new Date()) {
  const today = getEdmontonParts(now)
  return edmontonWallClockToDate({ ...today, hour: cutoffHour, minute: 0, second: 0 })
}

export function isBeforeEdmontonCutoff(cutoffHour, now = new Date()) {
  return now.getTime() < getEdmontonCutoffDate(cutoffHour, now).getTime()
}

export function getEarliestEdmontonDeliveryDate(cutoffHour, now = new Date()) {
  const today = getEdmontonParts(now)
  if (isBeforeEdmontonCutoff(cutoffHour, now)) return formatEdmontonDate(today)

  const tomorrow = new Date(Date.UTC(today.year, today.month - 1, today.day + 1))
  return `${tomorrow.getUTCFullYear()}-${pad(tomorrow.getUTCMonth() + 1)}-${pad(tomorrow.getUTCDate())}`
}
