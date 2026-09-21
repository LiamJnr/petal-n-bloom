/**
 * Receipt Generator — Petal & Bloom
 * Opens a beautifully branded, print-ready receipt in a new tab.
 * All customer-facing prices are in USD. The GHS settlement amount
 * is shown as a small footnote for Paystack compliance reference.
 */

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1254" height="1254" viewBox="0 0 1254 1254">
  <title>Petal &amp; Bloom Logo</title>
  <defs>
    <linearGradient id="rcp" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7E4AA5"/>
      <stop offset="45%" stop-color="#5B2B82"/>
      <stop offset="100%" stop-color="#3F195F"/>
    </linearGradient>
  </defs>
  <g fill="url(#rcp)" fill-rule="evenodd">
    <path d="M585 494C585 552 564 599 523 634C480 671 417 689 336 689H33V658H127V31H33V0H311V31H218V299H302C384 299 450 314 500 345C557 380 585 430 585 494ZM482 491C483 434 465 392 426 363C394 338 353 326 304 326H218V658H324C431 658 478 607 482 491Z" transform="translate(162.120,575.000) scale(0.208000,-0.208000)"/>
    <path d="M611 239C608 172 586 120 547 83C534 70 515 59 488 49C462 39 440 34 421 34L234 31V334H356C405 334 443 290 443 209H474V486H443C443 445 435 414 420 393C406 376 385 368 356 368H234V658L405 656C532 653 578 599 587 486H618L616 689H51V658H145V31H51V0H632L643 239Z" transform="translate(287.960,575.000) scale(0.208000,-0.208000)"/>
    <path d="M642 689H40L38 486H67C73 545 89 588 114 613C139 638 185 653 250 656L295 658V31H202V0H480V31H386V658L432 656C497 653 543 638 569 611C595 584 610 543 614 486H644Z" transform="translate(433.144,575.000) scale(0.208000,-0.208000)"/>
    <path d="M725 31H651L415 708H375L158 138C139 85 120 53 103 42C90 34 66 30 31 31V0H249V31C211 31 190 34 186 40C182 46 180 54 180 63C180 82 186 107 198 138L236 228H477L545 31H465V0H725ZM250 266 364 559 463 266Z" transform="translate(572.088,575.000) scale(0.208000,-0.208000)"/>
    <path d="M570 239C567 172 545 120 506 83C493 70 473 59 446 49C420 39 398 34 380 34L227 31V658H321V689H44V658H138V31H44V0H589L602 239Z" transform="translate(727.672,575.000) scale(0.208000,-0.208000)"/>
    <path d="M723 72C696 59 676 52 661 52C622 52 567 73 498 114C550 171 576 225 576 278C576 298 574 313 571 324C632 321 678 316 707 311C707 332 711 356 718 381L531 374C521 374 489 375 435 376L404 333C455 329 484 326 492 323C507 317 515 290 515 242C515 211 499 176 467 137C387 219 322 301 271 384C364 448 410 513 410 578C410 637 379 667 318 667C290 667 268 659 252 644L186 587C171 574 163 544 163 499C163 464 173 422 192 374C92 321 42 252 42 168C42 114 60 69 97 34C134 -1 183 -19 244 -19C311 -19 375 6 435 55C454 38 483 22 520 5C557 -11 586 -19 605 -19C626 -19 639 -17 644 -14L728 48ZM345 547C345 526 335 502 316 476C297 450 276 430 255 417C238 462 230 500 230 531C230 588 251 616 293 616C326 616 345 582 345 547ZM406 80C367 50 327 35 287 35C244 35 206 52 173 85C141 118 125 157 125 201C125 255 152 301 206 340C230 297 261 252 299 204C320 177 356 136 406 80Z" transform="translate(935.048,575.000) scale(0.208000,-0.208000)"/>
    <path d="M637 173C638 232 615 279 570 312C534 338 494 352 449 353C538 368 606 429 606 518C606 622 530 689 402 689H52V658H146V31H52V0H400C557 0 636 58 637 173ZM507 519C507 466 490 425 456 397C430 376 401 365 368 365H237V658H384C466 658 507 612 507 519ZM528 176C528 121 510 81 474 57C448 40 416 31 377 31H237V335H369C409 335 443 325 471 304C508 276 527 233 528 176Z" transform="translate(135.727,824.000) scale(0.255000,-0.255000)"/>
    <path d="M570 239C567 172 545 120 506 83C493 70 473 59 446 49C420 39 398 34 380 34L227 31V658H321V689H44V658H138V31H44V0H589L602 239Z" transform="translate(317.798,824.000) scale(0.255000,-0.255000)"/>
    <path d="M663 341C663 452 636 541 581 607C527 674 453 707 360 707C273 707 201 675 144 610C85 542 55 454 54 347C53 247 82 162 142 91C203 21 275 -14 360 -14C447 -14 519 20 576 89C634 158 663 242 663 341ZM552 343C552 247 537 171 506 114C473 52 425 21 363 21C231 21 165 130 165 347C165 451 178 530 205 583C237 645 289 676 360 676C427 676 477 643 510 578C538 522 552 444 552 343Z" transform="translate(745.303,824.000) scale(0.255000,-0.255000)"/>
    <path d="M848 31H755V658H848V689H657L447 169L263 689H66V658H122C140 658 150 650 152 635V117C152 82 143 56 124 40C117 34 95 31 58 31V0H278V31C239 31 217 34 210 41C193 58 185 83 185 117V617L406 10L421 11L663 620V31H570V0H848Z" transform="translate(928.393,824.000) scale(0.255000,-0.255000)"/>
  </g>
</svg>`

/**
 * Safely escape a string for HTML output.
 * @param {string} str
 * @returns {string}
 */
function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Format a D1 UTC datetime string ("YYYY-MM-DD HH:MM:SS") to a readable date.
 * @param {string} dt
 * @returns {string}
 */
function formatDate(dt) {
  if (!dt) return '—'
  try {
    const d = new Date(dt.replace(' ', 'T') + 'Z')
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return String(dt)
  }
}

/**
 * Format a D1 UTC datetime string to date + time.
 * e.g. "September 18, 2026 at 5:12 PM UTC"
 * @param {string} dt
 * @returns {string}
 */
function formatDateTime(dt) {
  if (!dt) return '—'
  try {
    const d = new Date(dt.replace(' ', 'T') + 'Z')
    const date = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })
    return `${date} at ${time}`
  } catch {
    return String(dt)
  }
}

/**
 * Convert USD cents to a dollar string, e.g. "$68.00"
 * @param {number} cents
 * @returns {string}
 */
function usd(cents) {
  return `$${(cents / 100).toFixed(2)}`
}

/**
 * Map time window slug to readable label.
 * @param {string} window
 * @returns {string}
 */
function formatTimeWindow(window) {
  const map = {
    morning: 'Morning (9 AM – 12 PM)',
    afternoon: 'Afternoon (12 PM – 4 PM)',
    evening: 'Evening (4 PM – 8 PM)',
  }
  return map[window] || window || 'Standard'
}

/**
 * Build the complete print-ready receipt HTML for a paid order.
 * @param {object} order - Full order object from /api/orders/:id
 * @returns {string}
 */
function buildReceiptHtml(order) {
  const buyer = (() => { try { return JSON.parse(order.buyer_json || '{}') } catch { return {} } })()
  const delivery = (() => { try { return JSON.parse(order.delivery_json || '{}') } catch { return {} } })()
  const items = (() => { try { return JSON.parse(order.cart_json || '[]') } catch { return [] } })()

  // USD subtotal computed from cart items (source-of-truth USD prices)
  const subtotalUsd = items.reduce((sum, item) => {
    return sum + (Number(item.unit_price_usd) || 0) * (Number(item.quantity) || 1)
  }, 0)
  const subtotalCents = Math.round(subtotalUsd * 100)

  // GHS settled amount (DB total_cents is in pesewas)
  const ghsSettled = ((order.total_cents || 0) / 100).toFixed(2)

  // Recipient & delivery details
  const recipientName = delivery.recipient_name || buyer.name || ''
  const recipientPhone = delivery.recipient_phone || buyer.phone || ''
  const deliveryAddress = [
    delivery.address_line1,
    delivery.address_line2,
    delivery.city,
    delivery.region,
    delivery.country,
  ].filter(Boolean).join(', ')
  const deliveryDate = delivery.delivery_date ? formatDate(delivery.delivery_date) : ''
  const timeWindow = delivery.time_window ? formatTimeWindow(delivery.time_window) : ''
  const giftNote = delivery.card_note || ''

  // Short order reference (first 8 chars uppercased)
  const shortRef = (order.id || '').slice(0, 8).toUpperCase()

  // Build item rows
  const itemRows = items.map(item => {
    const lineUsd = ((Number(item.unit_price_usd) || 0) * (Number(item.quantity) || 1)).toFixed(2)
    const options = [
      item.size?.name ? `Size: ${item.size.name}` : '',
      item.vase?.name ? `Wrap / Vase: ${item.vase.name}` : '',
    ].filter(Boolean).join(' &nbsp;|&nbsp; ')
    const giftMsg = item.gift_message || item.giftMessage || ''
    return `
      <tr>
        <td>
          <div class="item-name">${esc(item.name || 'Floral Arrangement')}</div>
          ${options ? `<div class="item-options">${options}</div>` : ''}
          ${giftMsg ? `<div class="item-gift-note">💬 "${esc(giftMsg)}"</div>` : ''}
        </td>
        <td class="text-right">${esc(String(item.quantity || 1))}</td>
        <td class="text-right"><strong>$${lineUsd}</strong></td>
      </tr>`
  }).join('')

  // Delivery section rows
  const deliveryRows = [
    recipientName ? `<p><strong>Recipient:</strong> ${esc(recipientName)}</p>` : '',
    recipientPhone ? `<p><strong>Phone:</strong> ${esc(recipientPhone)}</p>` : '',
    deliveryAddress ? `<p><strong>Delivery Address:</strong> ${esc(deliveryAddress)}</p>` : '',
    deliveryDate ? `<p><strong>Scheduled Date:</strong> ${esc(deliveryDate)}</p>` : '',
    timeWindow ? `<p><strong>Time Window:</strong> ${esc(timeWindow)}</p>` : '',
  ].filter(Boolean).join('')

  const hasDeliveryInfo = deliveryRows.length > 0

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Receipt — Petal &amp; Bloom #${shortRef}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #f8fafc; color: #1e293b; padding: 40px 20px; line-height: 1.5;
      -webkit-print-color-adjust: exact; print-color-adjust: exact;
    }
    .receipt {
      max-width: 680px; margin: 0 auto; background: #fff;
      border-radius: 16px; overflow: hidden;
      box-shadow: 0 10px 40px -5px rgba(0,0,0,0.06); border: 1px solid #e8e1f5;
    }
    .receipt-header {
      background: linear-gradient(135deg, #f5f0fb 0%, #fdf8ff 100%);
      padding: 28px 40px 24px; border-bottom: 1px solid #e8e1f5;
      display: flex; align-items: center; justify-content: space-between; gap: 20px;
    }
    .brand-logo { height: 64px; width: auto; }
    .receipt-meta { text-align: right; }
    .badge-paid {
      display: inline-block; background: #ecfdf5; color: #065f46;
      font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 9999px;
      border: 1px solid #a7f3d0; text-transform: uppercase; letter-spacing: 0.5px;
    }
    .receipt-ref { font-size: 12px; color: #64748b; margin-top: 6px; font-family: monospace; }
    .receipt-date { font-size: 11px; color: #94a3b8; margin-top: 3px; }
    .receipt-body { padding: 32px 40px; }
    .section { margin-bottom: 26px; }
    .section-label {
      font-size: 10px; font-weight: 700; color: #a78bfa;
      text-transform: uppercase; letter-spacing: 1.5px;
      margin-bottom: 10px; padding-bottom: 6px; border-bottom: 1px solid #f1f5f9;
    }
    .section p { font-size: 13.5px; color: #334155; margin-bottom: 4px; }
    .section p strong { color: #0f172a; }
    .name-large { font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 4px; }
    th {
      font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase;
      letter-spacing: 0.5px; padding: 10px 14px; background: #f8fafc;
      border-bottom: 1px solid #e2e8f0; text-align: left;
    }
    td { padding: 14px 14px; font-size: 13.5px; color: #334155; border-bottom: 1px solid #f8fafc; vertical-align: top; }
    .text-right { text-align: right; }
    .item-name { font-weight: 600; color: #0f172a; font-size: 14px; }
    .item-options { font-size: 12px; color: #64748b; margin-top: 3px; }
    .item-gift-note { font-size: 12px; color: #7c3aed; font-style: italic; margin-top: 5px; }
    .totals { display: flex; justify-content: flex-end; margin-top: 8px; margin-bottom: 24px; }
    .totals-inner { width: 260px; }
    .totals-inner .row { display: flex; justify-content: space-between; font-size: 13.5px; color: #64748b; padding: 5px 0; }
    .totals-inner .row.total {
      border-top: 1.5px solid #e2e8f0; margin-top: 6px; padding-top: 10px;
      font-size: 16px; font-weight: 700; color: #0f172a;
    }
    .totals-inner .row.total .amount { color: #5b2b82; }
    .totals-inner .settled { font-size: 10.5px; color: #94a3b8; text-align: right; margin-top: 4px; }
    .free-tag { color: #10b981; font-weight: 600; }
    .gift-note-box {
      background: #fdf8ff; border: 1px solid #e8e1f5; border-left: 3px solid #a78bfa;
      border-radius: 8px; padding: 14px 16px; margin-bottom: 24px;
    }
    .gift-note-label { font-size: 10px; font-weight: 700; color: #a78bfa; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
    .gift-note-text { font-size: 13.5px; color: #3f195f; font-style: italic; line-height: 1.6; }
    .receipt-footer {
      background: #faf7ff; border-top: 1px solid #e8e1f5;
      padding: 20px 40px; text-align: center; font-size: 11.5px; color: #94a3b8; line-height: 1.7;
    }
    .receipt-footer strong { color: #5b2b82; }
    .print-bar { max-width: 680px; margin: 0 auto 18px; display: flex; justify-content: flex-end; }
    .btn-print {
      background: #5b2b82; color: #fff; border: none; padding: 10px 20px;
      font-family: inherit; font-size: 13.5px; font-weight: 600; border-radius: 8px;
      cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
      box-shadow: 0 4px 12px -2px rgba(91,43,130,0.3); transition: background 0.2s;
    }
    .btn-print:hover { background: #3f195f; }
    @media print {
      body { background: white; padding: 0; }
      .receipt { box-shadow: none; border: none; border-radius: 0; }
      .print-bar { display: none; }
    }
  </style>
</head>
<body>
  <div class="print-bar">
    <button class="btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
  </div>
  <div class="receipt">
    <div class="receipt-header">
      <div class="brand-logo">${LOGO_SVG}</div>
      <div class="receipt-meta">
        <span class="badge-paid">✓ Payment Confirmed</span>
        <div class="receipt-ref">Order #${shortRef}</div>
        <div class="receipt-date">${esc(formatDateTime(order.paid_at || order.created_at))}</div>
      </div>
    </div>
    <div class="receipt-body">
      <div class="section">
        <div class="section-label">Billed To</div>
        <div class="name-large">${esc(buyer.name || 'Customer')}</div>
        ${buyer.email ? `<p>${esc(buyer.email)}</p>` : ''}
        ${buyer.phone ? `<p>${esc(buyer.phone)}</p>` : ''}
      </div>
      <div class="section">
        <div class="section-label">Order Details</div>
        <p><strong>Order Reference:</strong> ${esc(order.id || '')}</p>
        <p><strong>Payment Method:</strong> Paystack Secure Checkout</p>
        ${order.ps_reference ? `<p><strong>Paystack Reference:</strong> ${esc(order.ps_reference)}</p>` : ''}
      </div>
      <div class="section">
        <div class="section-label">Items Ordered</div>
        <table>
          <thead>
            <tr>
              <th>Arrangement &amp; Specifications</th>
              <th class="text-right">Qty</th>
              <th class="text-right">Amount (USD)</th>
            </tr>
          </thead>
          <tbody>
            ${itemRows || '<tr><td colspan="3">No items found.</td></tr>'}
          </tbody>
        </table>
      </div>
      <div class="totals">
        <div class="totals-inner">
          <div class="row"><span>Subtotal</span><span>${usd(subtotalCents)}</span></div>
          <div class="row"><span>Delivery &amp; Handling</span><span class="free-tag">Free</span></div>
          <div class="row total"><span>Total Paid</span><span class="amount">${usd(subtotalCents)}</span></div>
          <div class="settled">Settled via Paystack: GHS ${ghsSettled}</div>
        </div>
      </div>
      ${giftNote ? `
      <div class="gift-note-box">
        <div class="gift-note-label">🌸 Gift Card Note</div>
        <div class="gift-note-text">"${esc(giftNote)}"</div>
      </div>` : ''}
      ${hasDeliveryInfo ? `
      <div class="section">
        <div class="section-label">Delivery Information</div>
        ${deliveryRows}
      </div>` : ''}
    </div>
    <div class="receipt-footer">
      <p><strong>Petal &amp; Bloom</strong> &nbsp;•&nbsp; Artisan Floral Boutique</p>
      <p>Thank you for your order! Please keep this receipt as your proof of purchase.</p>
      <p style="margin-top:4px;">For enquiries, please contact our studio team.</p>
    </div>
  </div>
</body>
</html>`
}

/**
 * Open the print receipt for a paid order in a new browser tab.
 * Uses a Blob URL for reliable cross-browser and CSP-safe rendering.
 * @param {object} order - Full order object from /api/orders/:id
 */
export function printReceipt(order) {
  const html = buildReceiptHtml(order)
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.target = '_blank'
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  // Clean up the object URL after 30s to free memory
  setTimeout(() => URL.revokeObjectURL(url), 30000)
}
