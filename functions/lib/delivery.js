const DELIVERY_WINDOWS = new Set(['morning', 'afternoon', 'evening'])
const LOCATION_TYPES = new Set(['residential', 'business', 'hospital', 'venue'])

export function validateDelivery(delivery, cardNote, now = new Date()) {
  const clean = (field, max) => String(delivery?.[field] || '').trim().slice(0, max)
  const result = {
    recipient_name: clean('recipient_name', 100),
    street: clean('street', 200),
    city: clean('city', 100),
    state: clean('state', 50),
    zip: clean('zip', 20),
    location_type: clean('location_type', 30),
    delivery_date: clean('delivery_date', 20),
    time_window: clean('time_window', 30),
    courier_notes: clean('courier_notes', 300),
    card_note: String(cardNote || delivery?.card_note || '').trim().slice(0, 250),
  }

  if (!result.recipient_name || !result.street || !result.city || !result.state || !result.zip) {
    throw new Error('Please provide the recipient name and complete delivery address.')
  }
  if (!LOCATION_TYPES.has(result.location_type)) {
    throw new Error('Please choose a valid delivery location type.')
  }
  if (!DELIVERY_WINDOWS.has(result.time_window)) {
    throw new Error('Please choose a valid delivery time window.')
  }
  if (!isValidDeliveryDate(result.delivery_date, now)) {
    throw new Error('Please choose a valid delivery date that is not in the past.')
  }

  return result
}

function isValidDeliveryDate(value, now) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T00:00:00.000Z`)
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) return false
  return value >= now.toISOString().slice(0, 10)
}
