/**
 * Order Details & Recipient Information Checkout Module
 * Gathers recipient delivery logistics, address, date/time window, and gift note.
 * Styled to conform with the Product Detail Page (PDP) design system.
 */
import { getCartItems, getCartSubtotal, getTotalItemCount, openCart } from "./cart.js";
import { navigateToHome } from "./router.js";
import { showToast } from "./toast.js";
import { getProductBySlug } from "../data/products.js";
import { startCheckout } from "../lib/checkout.js";
import { ICONS } from "../lib/icons.js";
import { getInternationalEstimates } from "../lib/currency.js";
import { getDeliveryCountdownState } from "../lib/delivery-timer.js";

let selectedTimeWindow = "morning";
let selectedLocationType = "residential";

// SVG Assets for Location Types
const homeSvg = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
`;

const businessSvg = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
    <path d="M9 22v-4h6v4"/>
    <path d="M8 6h.01"/>
    <path d="M16 6h.01"/>
    <path d="M12 6h.01"/>
    <path d="M12 10h.01"/>
    <path d="M12 14h.01"/>
    <path d="M16 10h.01"/>
    <path d="M16 14h.01"/>
    <path d="M8 10h.01"/>
    <path d="M8 14h.01"/>
  </svg>
`;

const hospitalSvg = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 6v12"/>
    <path d="M6 12h12"/>
    <rect width="18" height="18" x="3" y="3" rx="2"/>
  </svg>
`;

const venueSvg = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5.8 11.3 2 22l10.7-3.79"/>
    <path d="M4 3h.01"/>
    <path d="M22 8h.01"/>
    <path d="M15 2h.01"/>
    <path d="M22 20h.01"/>
    <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38e-1a3 3 0 0 1-3.07-2.93 2.9 2.9 0 0 0-3.18-2.84L7.8 2"/>
  </svg>
`;

// SVG Assets for Delivery Time Windows
const sunSvg = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2"/>
    <path d="M12 20v2"/>
    <path d="m4.93 4.93 1.41 1.41"/>
    <path d="m17.66 17.66 1.41 1.41"/>
    <path d="M2 12h2"/>
    <path d="M20 12h2"/>
    <path d="m6.34 17.66-1.41 1.41"/>
    <path d="m19.07 4.93-1.41 1.41"/>
  </svg>
`;

const afternoonSvg = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"/>
    <path d="M9 21h6"/>
  </svg>
`;

const moonSvg = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  </svg>
`;

// Trust Strip SVGs
const leafSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor">
    <path d="M0 0h16v16H0z" fill="none" />
    <path fill="currentColor" d="M1.4 1.7c.217.289.65.84 1.725 1.274c1.093.44 2.885.774 5.834.528c2.02-.168 3.431.51 4.326 1.556C14.161 6.082 14.5 7.41 14.5 8.5q0 .344-.027.734C13.387 8.252 11.877 7.76 10.39 7.5c-2.016-.288-4.188-.445-5.59-2.045c-.142-.162-.402-.102-.379.112c.108.985 1.104 1.82 1.844 2.308c2.37 1.566 5.772-.118 7.6 3.071c.505.8 1.374 2.7 1.75 4.292c.07.298-.066.611-.354.715a.7.7 0 0 1-.161.042a1 1 0 0 1-1.08-.794c-.13-.97-.396-1.913-.868-2.77C12.173 13.386 10.565 14 8 14c-1.854 0-3.32-.544-4.45-1.435c-1.124-.887-1.889-2.095-2.39-3.383c-1-2.562-1-5.536-.65-7.28L.73.806z" />
  </svg>
`;

const ribbonSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 64 64" fill="currentColor">
    <path d="M0 0h64v64H0z" fill="none" />
    <path fill="currentColor" d="m50.245 25.553l1.208.167c6.916.959 11.574-1.293 10.352-5.004c-1.223-3.709-1.223-9.782 0-13.491c1.223-3.711-3.436-5.963-10.352-5.004l-5.537.769c-3.914.542-7.414 2.363-9.723 4.759c-.59-1.621-1.827-.518-4.192-.518s-3.603-1.104-4.193.518C25.5 5.353 21.999 3.532 18.086 2.99l-5.537-.769C5.632 1.262.973 3.514 2.195 7.225c1.225 3.709 1.225 9.782 0 13.491c-1.223 3.711 3.437 5.963 10.354 5.004l1.207-.167C12.105 32.051 8.766 39.892 2 46h13v16s11.145-15.834 13.212-40.953c.69.596 1.867-.132 3.789-.132c1.921 0 3.098.727 3.788.132C37.856 46.166 49 62 49 62V46h13c-6.766-6.108-10.105-13.949-11.755-20.447m-32.432-2.406l-5.537.769c-.968.134-1.904.202-2.785.202c-3.064 0-4.764-.794-5.332-1.536c-.189-.245-.814-.797-.271-1.316c6.43-6.149 23.231-3.101 23.231-3.101c-1.949 2.466-5.431 4.445-9.306 4.982m28.376 0c-3.875-.537-7.357-2.517-9.307-4.982c0 0 16.803-3.049 23.23 3.101c.545.52-.082 1.071-.27 1.316c-.568.742-2.268 1.536-5.332 1.536c-.881 0-1.818-.068-2.785-.202z" />
  </svg>
`;

const cardSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor">
    <path d="M0 0h20v20H0z" fill="none" />
    <path fill="currentColor" d="m1.574 5.286l7.5 4.029c.252.135.578.199.906.199s.654-.064.906-.199l7.5-4.029c.489-.263.951-1.286.054-1.286H1.521c-.897 0-.435 1.023.053 1.286m17.039 2.203l-7.727 4.027c-.34.178-.578.199-.906.199s-.566-.021-.906-.199s-7.133-3.739-7.688-4.028C.996 7.284 1 7.523 1 7.707V15c0 .42.566 1 1 1h16c.434 0 1-.58 1-1V7.708c0-.184.004-.423-.387-.219" />
  </svg>
`;

const lockSvg = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
`;

/**
 * Render the full Order Details & Recipient Information Page
 */
export function renderCheckoutPage() {
  const checkoutView = document.getElementById("checkout-view");
  const homeView = document.getElementById("home-view");
  const pdpView = document.getElementById("pdp-view");
  const confirmationView = document.getElementById("order-confirmation-view");

  if (!checkoutView) return;

  // View visibility
  if (homeView) homeView.style.display = "none";
  if (pdpView) pdpView.style.display = "none";
  if (confirmationView) confirmationView.style.display = "none";
  checkoutView.style.display = "block";
  document.title = "Order Details & Recipient Information — Petal & Bloom";

  // Load items from local storage
  let cart = [];
  try {
    const raw = localStorage.getItem("petal_bloom_cart");
    cart = raw ? JSON.parse(raw) : [];
  } catch {
    cart = [];
  }

  if (cart.length === 0) {
    checkoutView.innerHTML = `
      <header class="pdp-page-header">
        <div class="container">
          <h1>Order Details</h1>
          <nav class="pdp-breadcrumb" aria-label="Breadcrumb">
            <a href="#" class="btn-checkout-home">Home</a>
            <span>/</span>
            <a href="#" class="btn-checkout-home">Shop</a>
            <span>/</span>
            <span class="pdp-breadcrumb-current">Order Details</span>
          </nav>
        </div>
      </header>

      <div class="container text-center" style="padding: 60px 0 100px;">
        <div class="cart-empty" style="max-width: 480px; margin: 0 auto;">
          <div class="cart-empty-icon" style="font-size: 3rem; margin-bottom: 16px;">${ICONS.flower}</div>
          <h2 style="font-size: 1.8rem; margin-bottom: 10px;">Your Flower Bag is Empty</h2>
          <p style="color: var(--muted); margin-bottom: 24px;">Please select a floral bouquet or botanical gift before proceeding to recipient details.</p>
          <button class="button button-dark" id="btn-empty-checkout-home">Explore Flower Collection</button>
        </div>
      </div>
    `;

    document.getElementById("btn-empty-checkout-home")?.addEventListener("click", () => {
      navigateToHome();
    });
    return;
  }

  const subtotal = getCartSubtotal();
  const deliveryState = getDeliveryCountdownState();
  const minDateStr = deliveryState.earliestDateStr;
  const isFreeDelivery = subtotal >= 75;
  const deliveryFee = isFreeDelivery ? 0 : 14;
  const totalDue = subtotal + deliveryFee;
  const ghsEstimate = getInternationalEstimates(totalDue).find(e => e.code === "GHS");
  const ghsFormatted = ghsEstimate ? ghsEstimate.formatted : `GH₵ ${(totalDue * 11.17).toFixed(2)}`;
  const usdFormatted = `$${totalDue.toFixed(2)}`;

  checkoutView.innerHTML = `
    <!-- Top PDP-Style Page Header & Breadcrumbs Banner -->
    <header class="pdp-page-header">
      <div class="container">
        <h1>Order Details</h1>
        <nav class="pdp-breadcrumb" aria-label="Breadcrumb">
          <a href="#" class="btn-checkout-home">Home</a>
          <span>/</span>
          <a href="#" class="btn-checkout-cart">Shopping Bag</a>
          <span>/</span>
          <span class="pdp-breadcrumb-current">Recipient &amp; Delivery</span>
        </nav>
      </div>
    </header>

    <div class="checkout-page-section">
      <div class="container">
        <div class="checkout-layout">
          
          <!-- Left: Recipient & Delivery Information Form -->
          <div class="checkout-form-card">
            
            <div class="checkout-header-intro">
              <h2>Customer &amp; Delivery Logistics</h2>
              <p class="checkout-subtitle">Please provide your contact details for receipt delivery, followed by the recipient and destination details.</p>
            </div>

            <form id="recipient-order-form">
              
              <!-- 1. Customer / Purchaser Information -->
              <fieldset class="checkout-fieldset">
                <legend class="checkout-legend">
                  <span class="legend-num">1</span>
                  <span>Customer Information</span>
                </legend>

                <div class="form-row">
                  <div class="form-group">
                    <label for="cust-name">Your Full Name *</label>
                    <input type="text" id="cust-name" class="form-control" placeholder="e.g. Eleanor Vance" required />
                  </div>
                  <div class="form-group">
                    <label for="cust-email">Your Email Address (For order receipt) *</label>
                    <input type="email" id="cust-email" class="form-control" placeholder="e.g. eleanor@example.com" required />
                  </div>
                </div>

                <div class="form-group">
                  <label for="cust-phone">Your Phone Number (Optional)</label>
                  <input type="tel" id="cust-phone" class="form-control" placeholder="e.g. +1 555-0199" />
                </div>
              </fieldset>

              <!-- 2. Recipient & Hand-Delivery Destination -->
              <fieldset class="checkout-fieldset">
                <legend class="checkout-legend">
                  <span class="legend-num">2</span>
                  <span>Recipient Information</span>
                </legend>

                <div class="checkout-same-as-buyer-wrap">
                  <label class="checkout-checkbox-label" for="same-as-buyer">
                    <input type="checkbox" id="same-as-buyer" class="checkout-checkbox" />
                    <span>I am the recipient (Deliver to myself)</span>
                  </label>
                </div>

                <div class="form-group">
                  <label for="rec-name">Recipient Full Name *</label>
                  <input type="text" id="rec-name" class="form-control" placeholder="e.g. Clara Harrington" required />
                </div>

                <div class="form-group">
                  <label for="rec-address">Street Address *</label>
                  <input type="text" id="rec-address" class="form-control" placeholder="e.g. 742 Evergreen Terrace" required />
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="rec-suite">Apt / Suite / Floor (Optional)</label>
                    <input type="text" id="rec-suite" class="form-control" placeholder="e.g. Apt 4B" />
                  </div>
                  <div class="form-group">
                    <label for="rec-city">City *</label>
                    <input type="text" id="rec-city" class="form-control" placeholder="e.g. Edmonton" required />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="rec-state">State / Province *</label>
                    <input type="text" id="rec-state" class="form-control" placeholder="e.g. AB" required />
                  </div>
                  <div class="form-group">
                    <label for="rec-zip">Postal / ZIP Code *</label>
                    <input type="text" id="rec-zip" class="form-control" placeholder="e.g. T5N 1R5" required />
                  </div>
                </div>

                <div class="form-group">
                  <label for="rec-notes">Courier Notes / Gate Code (Optional)</label>
                  <input type="text" id="rec-notes" class="form-control" placeholder="e.g. Leave with concierge on 1st floor, ring buzzer #4" />
                </div>
              </fieldset>

              <!-- 3. Delivery Schedule & Preferred Window -->
              <fieldset class="checkout-fieldset">
                <legend class="checkout-legend">
                  <span class="legend-num">3</span>
                  <span>Delivery Schedule &amp; Timing</span>
                </legend>

                <div class="form-group">
                  <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px 12px; margin-bottom: 6px;">
                    <label for="rec-delivery-date" style="margin-bottom: 0;">Requested Delivery Date *</label>
                    <span style="font-size: 0.72rem; font-weight: 600; padding: 2px 8px; border-radius: 9999px; background: ${deliveryState.isSameDayAvailable ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)"}; color: ${deliveryState.isSameDayAvailable ? "#047857" : "#b45309"};">
                      ${deliveryState.badgeText}
                    </span>
                  </div>
                  <input 
                    type="date" 
                    id="rec-delivery-date" 
                    class="form-control" 
                    value="${minDateStr}" 
                    min="${minDateStr}" 
                    required 
                  />
                </div>

                <div class="form-group">
                  <label>Preferred Delivery Time Window:</label>
                  <div class="time-window-grid">
                    <div class="time-window-pill active" data-window="morning">
                      <div class="time-window-icon">${sunSvg}</div>
                      <span class="time-window-title">Morning</span>
                      <span class="time-window-hours">9:00 AM – 1:00 PM</span>
                    </div>
                    <div class="time-window-pill" data-window="afternoon">
                      <div class="time-window-icon">${afternoonSvg}</div>
                      <span class="time-window-title">Afternoon</span>
                      <span class="time-window-hours">1:00 PM – 5:00 PM</span>
                    </div>
                    <div class="time-window-pill" data-window="evening">
                      <div class="time-window-icon">${moonSvg}</div>
                      <span class="time-window-title">Evening</span>
                      <span class="time-window-hours">5:00 PM – 8:00 PM</span>
                    </div>
                  </div>
                </div>
              </fieldset>

              <!-- 4. Handwritten Letterpress Card Note -->
              <fieldset class="checkout-fieldset">
                <legend class="checkout-legend">
                  <span class="legend-num">4</span>
                  <span>Letterpress Card Note</span>
                </legend>

                <div class="form-group">
                  <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px 12px; margin-bottom: 6px;">
                    <label for="rec-card-msg" style="margin-bottom: 0;">Personal Gift Note (Printed on luxury cardstock)</label>
                    ${cart[0]?.giftMessage ? `
                      <span class="badge-transferred" style="font-size: 0.72rem; font-weight: 600; color: #047857; background: rgba(16, 185, 129, 0.12); padding: 2px 8px; border-radius: 9999px;">
                        ✓ Transferred from bouquet
                      </span>
                    ` : ""}
                  </div>
                  <textarea 
                    id="rec-card-msg" 
                    class="form-control" 
                    rows="3" 
                    maxlength="250" 
                    placeholder="Write your heartfelt note for the recipient..."
                  >${cart[0]?.giftMessage || ""}</textarea>
                  <div class="checkout-gift-note-footer">
                    <span>Handwritten by our studio team</span>
                    <span id="checkout-char-count">${(cart[0]?.giftMessage || "").length} / 250</span>
                  </div>
                </div>
              </fieldset>

              <!-- International Payment Readiness & Billing Guidance -->
              <div class="checkout-billing-disclaimer" id="checkout-billing-disclaimer">
                <div class="billing-disclaimer-inner">
                  <div class="billing-disclaimer-header">
                    <svg class="billing-disclaimer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect width="20" height="14" x="2" y="5" rx="2"/>
                      <line x1="2" y1="10" x2="22" y2="10"/>
                    </svg>
                    <span>Billing &amp; Checkout Process</span>
                  </div>

                  <!-- 3-Pillar Pre-Screening Checklist -->
                  <div class="payment-readiness-checklist">
                    <div class="readiness-item">
                      <div class="readiness-icon-wrap" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="2" y1="12" x2="22" y2="12"></line>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                      </div>
                      <div class="readiness-content">
                        <strong>Online &amp; International Enabled</strong>
                        <span>Ensure your card permits foreign e-commerce in your mobile banking app.</span>
                      </div>
                    </div>

                    <div class="readiness-item">
                      <div class="readiness-icon-wrap" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
                          <path d="M12 18h.01"/>
                        </svg>
                      </div>
                      <div class="readiness-content">
                        <strong>3D Secure / OTP Authentication</strong>
                        <span>Have your device ready to approve your bank's SMS OTP or mobile app confirmation.</span>
                      </div>
                    </div>

                    <div class="readiness-item">
                      <div class="readiness-icon-wrap" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                      </div>
                      <div class="readiness-content">
                        <strong>Cross-Border Clearance</strong>
                        <span>If an initial attempt is flagged by bank security filters, approving the bank SMS alert or trying an alternate card resolves it immediately.</span>
                      </div>
                    </div>
                  </div>

                  <p class="billing-disclaimer-text">
                    All orders are billed in USD. International amounts (${ghsFormatted}, CAD, GBP etc) <strong>automatically convert when you enter your card details</strong>.
                  </p>

                  <!-- Dynamic Payment Currency Conversion Micro-Animation -->
                  <div class="disclaimer-sim-card" aria-hidden="true">
                    <div class="sim-card-form-grid">
                      <!-- Card Number Row -->
                      <div class="sim-card-field-group">
                        <span class="sim-card-label">Card Number</span>
                        <div class="sim-card-input-box">
                          <div class="sim-card-digits">
                            <span class="sim-card-hashed">•••• •••• •••• </span>
                            <span class="sim-typed-digits">2204</span>
                            <span class="sim-cursor"></span>
                          </div>
                          <div class="sim-card-brand-logos">
                            <div class="sim-card-brand-logo brand-visa">
                              <svg fill="#1A1F71" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Visa</title><path d="M9.112 8.262L5.97 15.758H3.92L2.374 9.775c-.094-.368-.175-.503-.461-.658C1.447 8.864.677 8.627 0 8.479l.046-.217h3.3a.904.904 0 01.894.764l.817 4.338 2.018-5.102zm8.033 5.049c.008-1.979-2.736-2.088-2.717-2.972.006-.269.262-.555.822-.628a3.66 3.66 0 011.913.336l.34-1.59a5.207 5.207 0 00-1.814-.333c-1.917 0-3.266 1.02-3.278 2.479-.012 1.079.963 1.68 1.698 2.04.756.367 1.01.603 1.006.931-.005.504-.602.725-1.16.734-.975.015-1.54-.263-1.992-.473l-.351 1.642c.453.208 1.289.39 2.156.398 2.037 0 3.37-1.006 3.377-2.564m5.061 2.447H24l-1.565-7.496h-1.656a.883.883 0 00-.826.55l-2.909 6.946h2.036l.405-1.12h2.488zm-2.163-2.656l1.02-2.815.588 2.815zm-8.16-4.84l-1.603 7.496H8.34l1.605-7.496z"/></svg>
                            </div>
                            <div class="sim-card-brand-logo brand-mastercard">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 18" width="100%" height="100%" role="img">
                                <title>Mastercard</title>
                                <circle cx="7.5" cy="9" r="6.5" fill="#EB001B" />
                                <circle cx="16.5" cy="9" r="6.5" fill="#F79E1B" />
                                <path d="M 12 3.895 A 6.5 6.5 0 0 0 10 9 A 6.5 6.5 0 0 0 12 14.105 A 6.5 6.5 0 0 0 14 9 A 6.5 6.5 0 0 0 12 3.895 Z" fill="#FF5F00" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- 2-Column Row: Expiry Date & Security Code -->
                      <div class="sim-card-split-row">
                        <div class="sim-card-field-group">
                          <span class="sim-card-label">Expiry Date</span>
                          <div class="sim-card-input-box">
                            <span class="sim-card-val">02 / 24</span>
                            <div class="sim-card-icon-end">
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            </div>
                          </div>
                        </div>

                        <div class="sim-card-field-group">
                          <span class="sim-card-label">Security Code</span>
                          <div class="sim-card-input-box">
                            <span class="sim-card-hashed">•••</span>
                            <div class="sim-card-icon-end">
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="sim-action-row">
                      <div class="sim-pay-btn">
                        <span class="sim-btn-content sim-btn-ghs">
                          Pay ${ghsFormatted}
                        </span>
                        <span class="sim-btn-content sim-btn-usd">
                          Pay ${usdFormatted} USD
                        </span>
                      </div>
                      <span class="sim-conversion-pill">
                        <span class="sim-pill-icon-slot">
                          <svg class="sim-pill-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity="0.25" stroke-width="2.5"/>
                            <path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" stroke-width="2.5"/>
                          </svg>
                          <svg class="sim-pill-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                            <path d="M0 0h32v32H0z" fill="none" />
                            <path fill="currentColor" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m-2 19.59l-5-5L10.59 15L14 18.41L21.41 11l1.596 1.586Z" />
                            <path fill="none" d="m14 21.591l-5-5L10.591 15L14 18.409L21.41 11l1.595 1.585z" />
                          </svg>
                        </span>
                        <span class="sim-pill-label">Auto-converts to USD</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" class="btn-proceed-payment" id="btn-submit-order-details">
                Proceed to Checkout &rarr;
              </button>
            </form>
          </div>

          <!-- Right: Sticky Order Summary Sidebar -->
          <aside class="checkout-summary-card">
            <div class="checkout-summary-header">
              <h3>Order Summary</h3>
              <button type="button" class="btn-edit-bag" id="btn-edit-cart-bag">Edit Bag</button>
            </div>

            <!-- Itemized List -->
            <div class="checkout-items-list">
              ${cart.map(item => {
                const liveProduct = getProductBySlug(item.slug);
                const itemImg = liveProduct?.images.primary || item.image;
                return `
                  <div class="checkout-item-row">
                    <div class="checkout-item-thumb">
                      <img src="${itemImg}" alt="${item.name}" loading="lazy" />
                    </div>
                    <div class="checkout-item-info">
                      <h4>${item.name}</h4>
                      <div class="checkout-item-meta">
                        <span><strong>${item.size.name}</strong> • ${item.vase.name} • Qty: ${item.quantity}</span>
                      </div>
                    </div>
                    <div class="checkout-item-price">
                      $${(item.unitPrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                `;
              }).join("")}
            </div>

            <!-- Totals & Calculations -->
            <div class="checkout-calc-rows">
              <div class="checkout-breakdown-row" style="display:flex; justify-content:space-between; font-size:0.88rem; color:var(--muted); margin-bottom:6px;">
                <span>Subtotal:</span>
                <span>$${subtotal.toFixed(2)}</span>
              </div>
              <div class="checkout-breakdown-row" style="display:flex; justify-content:space-between; font-size:0.88rem; color:var(--muted); margin-bottom:10px;">
                <span>Delivery:</span>
                <span>${isFreeDelivery ? '<strong style="color:#059669;">FREE</strong>' : '<strong>$14.00</strong>'}</span>
              </div>
              <div class="checkout-total-row">
                <div class="checkout-total-label-wrap">
                  <span>Total Due:</span>
                  <small class="checkout-delivery-note">${isFreeDelivery ? 'Complimentary delivery applied (Orders over $75)' : 'Standard delivery ($14.00) applied'}</small>
                </div>
                <strong>$${totalDue.toFixed(2)}</strong>
              </div>

              <!-- International Store Estimates -->
              <div class="checkout-intl-prices">
                <div class="checkout-intl-header">International Store Estimates</div>
                <div class="checkout-intl-strip-items">
                  ${getInternationalEstimates(totalDue).map(est => `
                    <span class="checkout-intl-item">
                      <span class="checkout-intl-code">${est.code}</span>
                      <span class="checkout-intl-val">${est.formatted}</span>
                    </span>
                  `).join('<span class="checkout-intl-sep">•</span>')}
                </div>
              </div>
            </div>

            <!-- Trust & Freshness Badges -->
            <div class="checkout-trust-badges">
              <div class="trust-badge-item">
                <div class="trust-badge-icon">${lockSvg}</div>
                <span><strong>256-Bit SSL Encrypted Checkout</strong></span>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  `;

  bindCheckoutEvents();
}

/**
 * Bind form interactions, time pills, location types, and submit flow
 */
function bindCheckoutEvents() {
  // Breadcrumb home
  document.querySelectorAll(".btn-checkout-home").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      navigateToHome();
    });
  });

  // Breadcrumb / edit cart
  document.querySelectorAll(".btn-checkout-cart, #btn-edit-cart-bag").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openCart();
    });
  });

  // Time window pills
  document.querySelectorAll(".time-window-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".time-window-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      selectedTimeWindow = pill.dataset.window || "morning";
    });
  });

  // "Same as customer" checkbox handler
  const sameAsBuyerCheckbox = document.getElementById("same-as-buyer");
  const custNameInput = document.getElementById("cust-name");
  const recNameInput = document.getElementById("rec-name");

  const syncRecipientWithBuyer = () => {
    if (sameAsBuyerCheckbox?.checked && recNameInput && custNameInput) {
      recNameInput.value = custNameInput.value;
    }
  };

  sameAsBuyerCheckbox?.addEventListener("change", () => {
    if (sameAsBuyerCheckbox.checked) {
      syncRecipientWithBuyer();
    }
  });

  custNameInput?.addEventListener("input", () => {
    if (sameAsBuyerCheckbox?.checked && recNameInput) {
      recNameInput.value = custNameInput.value;
    }
  });

  // Card note character counter & sync to storage
  const cardMsgTextarea = document.getElementById("rec-card-msg");
  const charCount = document.getElementById("checkout-char-count");
  cardMsgTextarea?.addEventListener("input", (e) => {
    const text = e.target.value;
    if (charCount) {
      charCount.textContent = `${text.length} / 250`;
    }
    // Sync back to cart in localStorage
    try {
      const raw = localStorage.getItem("petal_bloom_cart");
      if (raw) {
        const storedCart = JSON.parse(raw);
        if (storedCart.length > 0) {
          storedCart[0].giftMessage = text;
          localStorage.setItem("petal_bloom_cart", JSON.stringify(storedCart));
        }
      }
    } catch (err) {
      console.warn("Could not sync gift note to storage:", err);
    }
  });

  // Form submit handler
  const form = document.getElementById("recipient-order-form");
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Customer (Purchaser / Billing) details
    const custName = document.getElementById("cust-name")?.value.trim() || "";
    const custEmail = document.getElementById("cust-email")?.value.trim() || "";
    const custPhone = document.getElementById("cust-phone")?.value.trim() || "";

    // Flower Recipient & Delivery Destination details
    const recName = document.getElementById("rec-name")?.value.trim() || "";
    const address = document.getElementById("rec-address")?.value.trim() || "";
    const suite = document.getElementById("rec-suite")?.value.trim() || "";
    const city = document.getElementById("rec-city")?.value.trim() || "";
    const state = document.getElementById("rec-state")?.value.trim() || "";
    const zip = document.getElementById("rec-zip")?.value.trim() || "";
    const courierNotes = document.getElementById("rec-notes")?.value.trim() || "";
    const deliveryDate = document.getElementById("rec-delivery-date")?.value.trim() || "";
    const cardNote = document.getElementById("rec-card-msg")?.value.trim() || "";

    const buyer = {
      name: custName,
      email: custEmail,
      phone: custPhone
    };

    const delivery = {
      recipient_name: recName,
      street: suite ? `${address}, ${suite}` : address,
      city,
      state,
      zip,
      location_type: selectedLocationType,
      delivery_date: deliveryDate,
      time_window: selectedTimeWindow,
      courier_notes: courierNotes
    };

    const submitButton = document.getElementById("btn-submit-order-details");
    const originalLabel = submitButton?.innerHTML || "Proceed to Checkout &rarr;";

    const resetSubmitBtn = () => {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalLabel;
      }
    };

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Preparing secure checkout…";
    }

    try {
      await startCheckout({
        items: getCartItems().map(item => ({
          slug: item.slug,
          size_id: item.size.id,
          vase_id: item.vase.id,
          quantity: item.quantity,
          giftMessage: item.giftMessage || ""
        })),
        buyer,
        delivery,
        card_note: cardNote,
        onCancel: () => {
          resetSubmitBtn();
          showToast({
            title: "Checkout Closed",
            message: "Need help completing payment? Check your card readiness.",
            icon: ICONS.warning,
            duration: 5000
          });
          // Show subtle diagnostic modal after a brief pause so user can resolve bank blocks
          setTimeout(() => {
            showPaymentTroubleshootingModal();
          }, 600);
        }
      });
    } catch (error) {
      resetSubmitBtn();
      showToast({
        title: "Unable to start checkout",
        message: error.message || "Please try again in a moment.",
        icon: ICONS.warning,
        duration: 6000
      });
    }
  });

  // Observe disclaimer for scroll in-view rotating border animation
  const disclaimerEl = document.getElementById("checkout-billing-disclaimer");
  if (disclaimerEl) {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            disclaimerEl.classList.add("is-in-view");
          } else {
            disclaimerEl.classList.remove("is-in-view");
          }
        });
      }, { threshold: 0.2 });
      observer.observe(disclaimerEl);
    } else {
      disclaimerEl.classList.add("is-in-view");
    }
  }
}

/**
 * Show Card Payment Diagnostic / Troubleshooting Modal
 * Guides customers on the 3 true failure modes (online/intl enabled, 3D secure, issuer security filter)
 */
export function showPaymentTroubleshootingModal() {
  let modal = document.getElementById("payment-troubleshoot-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "payment-troubleshoot-modal";
    modal.className = "payment-troubleshoot-backdrop";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "troubleshoot-modal-title");
    modal.innerHTML = `
      <div class="payment-troubleshoot-dialog">
        <button type="button" class="troubleshoot-close-btn" id="btn-close-troubleshoot" aria-label="Close guidance">&times;</button>
        
        <div class="troubleshoot-header">
          <div class="troubleshoot-icon-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="20" height="14" x="2" y="5" rx="2"/>
              <line x1="2" y1="10" x2="22" y2="10"/>
            </svg>
          </div>
          <h3 id="troubleshoot-modal-title">Payment Didn't Go Through?</h3>
          <p>These 3 quick checks usually fix it:</p>
        </div>

        <div class="troubleshoot-steps">
          <div class="troubleshoot-step-item">
            <span class="step-badge">1</span>
            <div class="step-text">
              <strong>Enable Online &amp; International</strong>
              <p>Turn on online and foreign transactions in your banking app.</p>
            </div>
          </div>

          <div class="troubleshoot-step-item">
            <span class="step-badge">2</span>
            <div class="step-text">
              <strong>Approve the OTP / 3D Secure</strong>
              <p>Keep your phone nearby to enter the SMS code or tap approve.</p>
            </div>
          </div>

          <div class="troubleshoot-step-item">
            <span class="step-badge">3</span>
            <div class="step-text">
              <strong>Check Bank Alerts</strong>
              <p>If flagged, approve the fraud alert or try a different card.</p>
            </div>
          </div>
        </div>

        <div class="troubleshoot-actions">
          <button type="button" class="btn-troubleshoot-retry" id="btn-troubleshoot-retry">
            Retry Checkout &rarr;
          </button>
          <button type="button" class="btn-troubleshoot-dismiss" id="btn-troubleshoot-dismiss">
            Review Order Details
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector("#btn-close-troubleshoot")?.addEventListener("click", () => {
      modal.classList.remove("active");
    });
    modal.querySelector("#btn-troubleshoot-dismiss")?.addEventListener("click", () => {
      modal.classList.remove("active");
    });
    modal.querySelector("#btn-troubleshoot-retry")?.addEventListener("click", () => {
      modal.classList.remove("active");
      const submitBtn = document.getElementById("btn-submit-order-details");
      if (submitBtn) {
        submitBtn.scrollIntoView({ behavior: "smooth", block: "center" });
        submitBtn.focus();
      }
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });
  }

  requestAnimationFrame(() => {
    modal.classList.add("active");
  });
}
