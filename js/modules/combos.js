/**
 * Petal & Bloom — Curated Gift Combos Module
 * Renders the gift combo showcase section on the homepage with clean, uncluttered styling matching the best seller cards.
 */

import { getGiftCombosForGrid, getHomepageComboBanner, getProductBySlug } from "../data/products.js";
import { isInWishlist, toggleWishlist } from "./wishlist.js";

let productClickHandler = null;
let quickAddHandler = null;

export function initCombos({ onProductClick, onQuickAdd }) {
  productClickHandler = onProductClick;
  quickAddHandler = onQuickAdd;

  const grid = document.getElementById("combos-grid");
  if (grid) renderCombosGrid();
  renderHomepageComboBanner();

  if (!grid) return;

  // Event delegation on combos grid
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    if (!card) return;

    const slug = card.dataset.slug;
    if (!slug) return;

    // Wishlist button click
    const wishlistBtn = e.target.closest(".product-card-wishlist-btn");
    if (wishlistBtn) {
      e.stopPropagation();
      e.preventDefault();
      const product = getProductBySlug(slug);
      if (product) {
        const saved = toggleWishlist(product);
        wishlistBtn.classList.toggle("active", saved);
        const svg = wishlistBtn.querySelector("svg");
        if (svg) svg.setAttribute("fill", saved ? "currentColor" : "none");
      }
      return;
    }

    // Quick Add button click
    const quickAddBtn = e.target.closest(".product-card-quick-add-btn");
    if (quickAddBtn) {
      e.stopPropagation();
      e.preventDefault();
      if (typeof quickAddHandler === "function") {
        quickAddHandler(slug);
      }
      return;
    }

    // Default card or "VIEW SET" click -> navigate to PDP
    if (typeof productClickHandler === "function") {
      e.preventDefault();
      productClickHandler(slug);
    }
  });

  // Keyboard accessibility
  grid.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const card = e.target.closest(".product-card");
      if (card && typeof productClickHandler === "function") {
        e.preventDefault();
        productClickHandler(card.dataset.slug);
      }
    }
  });
}

/**
 * Render curated gift combos into the grid matching the clean boutique card design
 */
export function renderCombosGrid() {
  const container = document.getElementById("combos-grid");
  if (!container) return;

  const combos = getGiftCombosForGrid();
  if (!combos || combos.length === 0) return;

  container.innerHTML = combos.map(combo => {
    const isSaved = isInWishlist(combo.slug);
    const standardSize = combo.sizes.find(s => s.default) || combo.sizes[0];
    const comboPrice = standardSize.price;
    const origPrice = combo.originalPrice || (comboPrice + (combo.comboSavings || 0));
    const savings = combo.comboSavings || (origPrice - comboPrice);
    const ratingDisplay = (combo.rating || 4.9).toFixed(1);

    // Clean, readable inclusions string
    const inclusionsSummary = combo.comboIncludes 
      ? combo.comboIncludes.map(item => item.replace(" (Standard)", "").replace(" (3-pack)", "").replace(" (3-pc)", "")).join(" + ")
      : combo.subtitle;

    return `
      <article 
        class="product-card combo-product-card" 
        data-slug="${combo.slug}" 
        tabindex="0" 
        role="button" 
        aria-label="View details for ${combo.name}"
      >
        <div class="product-card-media">
          <img src="${combo.images.primary}" alt="${combo.name}" loading="lazy" />
          
          ${savings > 0 ? `
            <span class="combo-card-badge">Save $${savings}</span>
          ` : ""}

          <button 
            class="product-card-wishlist-btn ${isSaved ? 'active' : ''}" 
            type="button" 
            aria-label="${isSaved ? 'Remove from wishlist' : 'Add to wishlist'}" 
            title="${isSaved ? 'Saved in wishlist' : 'Add to wishlist'}"
            data-slug="${combo.slug}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path fill="currentColor" fill-rule="evenodd" d="M3.25 10.03c0-2.7 2.37-4.78 5.15-4.78c1.433 0 2.695.672 3.6 1.542c.905-.87 2.166-1.542 3.6-1.542c2.78 0 5.15 2.08 5.15 4.78c0 1.85-.789 3.476-1.882 4.852c-1.09 1.372-2.518 2.537-3.884 3.484c-.523.362-1.05.695-1.534.941c-.453.231-.975.443-1.45.443s-.996-.212-1.45-.443a14 14 0 0 1-1.533-.941c-1.367-.947-2.794-2.112-3.885-3.484C4.039 13.506 3.25 11.88 3.25 10.03M8.4 6.75c-2.08 0-3.65 1.53-3.65 3.28c0 1.403.596 2.71 1.556 3.918c.962 1.21 2.257 2.279 3.565 3.185c.495.343.96.634 1.36.838c.428.218.676.279.769.279s.341-.061.77-.28a12 12 0 0 0 1.36-.837c1.307-.906 2.602-1.974 3.564-3.185c.96-1.208 1.556-2.515 1.556-3.918c0-1.75-1.57-3.28-3.65-3.28c-1.194 0-2.31.713-3.005 1.619a.75.75 0 0 1-1.19 0C10.71 7.463 9.595 6.75 8.4 6.75" clip-rule="evenodd" />
            </svg>
          </button>

          <button 
            class="product-card-quick-add-btn" 
            type="button" 
            data-slug="${combo.slug}"
            aria-label="Quick add ${combo.name} to cart"
            title="Quick add set to bag"
          >
            <span>+ Quick Add Set</span>
          </button>
        </div>

        <div class="product-card-body">
          <div class="product-card-top-row">
            <h3 class="product-card-title">${combo.name}</h3>
            <span class="product-card-rating">★ ${ratingDisplay}</span>
          </div>

          <p class="combo-card-inclusions" title="${inclusionsSummary}">${inclusionsSummary}</p>

          <div class="product-card-starting-label">COMPLETE GIFT SET</div>

          <div class="product-card-bottom-row">
            <div class="combo-price-wrap">
              <span class="product-card-price">$${comboPrice}</span>
              ${origPrice > comboPrice ? `<span class="combo-orig-price">$${origPrice}</span>` : ""}
            </div>
            <span class="product-card-view-options">VIEW SET</span>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderHomepageComboBanner() {
  const container = document.getElementById("ghana-gift-banner");
  const combo = getHomepageComboBanner();
  if (!container || !combo) return;

  const price = combo.sizes.find(size => size.default)?.price ?? combo.sizes[0].price;
  const deliveredPrice = price + 14;
  container.innerHTML = `
    <section class="ghana-gift-banner" aria-labelledby="ghana-gift-banner-title">
      <div class="ghana-gift-banner-media">
        <img src="${combo.images.primary}" alt="${combo.name}" loading="lazy" />
      </div>
      <div class="ghana-gift-banner-copy">
        <span class="eyebrow">GIFTING, THE GHANAIAN WAY</span>
        <h2 id="ghana-gift-banner-title">Roses &amp; <em>Kingsbite.</em></h2>
        <p>A classic dozen roses and a medium Kingsbite chocolate pack—an easy, heartfelt gift for everyday moments.</p>
        <div class="ghana-gift-banner-pricing">
          <strong>$${price.toFixed(2)}</strong>
          <span>Save $${combo.comboSavings} · $${deliveredPrice.toFixed(2)} with standard delivery</span>
        </div>
        <button type="button" class="button button-dark btn-ghana-gift" data-slug="${combo.slug}">Send this gift &rarr;</button>
      </div>
    </section>
  `;

  container.querySelector(".btn-ghana-gift")?.addEventListener("click", () => {
    if (typeof productClickHandler === "function") productClickHandler(combo.slug);
  });
}
