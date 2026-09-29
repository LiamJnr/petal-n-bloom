/**
 * Petal & Bloom — Petite Luxuries & Affordable Buys Carousel Module
 * Handles dynamic rendering, smooth scroll snap controls, and product interactions.
 */

import { getAffordableProducts, getProductBySlug } from "../data/products.js";
import { isInWishlist, toggleWishlist } from "./wishlist.js";

let productClickHandler = null;
let quickAddHandler = null;

export function initAffordableCarousel({ onProductClick, onQuickAdd }) {
  productClickHandler = onProductClick;
  quickAddHandler = onQuickAdd;

  const track = document.getElementById("affordable-carousel-track");
  const prevBtn = document.getElementById("affordable-carousel-prev");
  const nextBtn = document.getElementById("affordable-carousel-next");

  if (!track) return;

  // 1. Initial Render
  renderAffordableCarousel();

  // 2. Carousel Arrow Controls
  const updateButtonStates = () => {
    if (!prevBtn || !nextBtn) return;
    const isAtStart = track.scrollLeft <= 5;
    const isAtEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;

    prevBtn.disabled = isAtStart;
    nextBtn.disabled = isAtEnd;
  };

  const scrollTrack = (direction) => {
    const cardWidth = track.querySelector(".affordable-card")?.offsetWidth || 285;
    const scrollAmount = (cardWidth + 20) * 1.5; // Scroll approx 1.5 - 2 cards
    track.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth"
    });
  };

  prevBtn?.addEventListener("click", () => scrollTrack("prev"));
  nextBtn?.addEventListener("click", () => scrollTrack("next"));

  // Track scroll listener to update button disabled states
  track.addEventListener("scroll", updateButtonStates, { passive: true });
  window.addEventListener("resize", updateButtonStates, { passive: true });

  // Initial button state check
  setTimeout(updateButtonStates, 150);

  // 3. Event Delegation for Card Clicks, Wishlist & Quick Add
  track.addEventListener("click", (e) => {
    const card = e.target.closest(".affordable-card");
    if (!card) return;

    const slug = card.dataset.slug;
    if (!slug) return;

    // Wishlist button click
    const wishlistBtn = e.target.closest(".affordable-card-wishlist");
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
    const quickAddBtn = e.target.closest(".affordable-card-quick-add");
    if (quickAddBtn) {
      e.stopPropagation();
      e.preventDefault();
      if (typeof quickAddHandler === "function") {
        quickAddHandler(slug);
      }
      return;
    }

    // Default card click -> Open PDP
    if (typeof productClickHandler === "function") {
      e.preventDefault();
      productClickHandler(slug);
    }
  });

  // Keyboard accessibility
  track.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const card = e.target.closest(".affordable-card");
      if (card && typeof productClickHandler === "function") {
        e.preventDefault();
        productClickHandler(card.dataset.slug);
      }
    }
  });
}

/**
 * Render affordable products into the carousel track
 */
export function renderAffordableCarousel() {
  const track = document.getElementById("affordable-carousel-track");
  if (!track) return;

  const items = getAffordableProducts();

  track.innerHTML = items.map(product => {
    const minPrice = Math.min(...product.sizes.map(s => s.price));
    const isSaved = isInWishlist(product.slug);
    const ratingDisplay = (product.rating || 4.8).toFixed(1);
    const tagText = product.tag || "Petite Edit";

    return `
      <article 
        class="affordable-card" 
        data-slug="${product.slug}" 
        tabindex="0" 
        role="button" 
        aria-label="View details for ${product.name}, starting from $${minPrice}"
      >
        <div class="affordable-card-media">
          <img src="${product.images.primary}" alt="${product.name}" loading="lazy" />
          <span class="affordable-tag-badge">${tagText}</span>
          
          <button 
            class="affordable-card-wishlist ${isSaved ? 'active' : ''}" 
            type="button" 
            aria-label="${isSaved ? 'Remove from wishlist' : 'Add to wishlist'}" 
            title="${isSaved ? 'Saved in wishlist' : 'Add to wishlist'}"
            data-slug="${product.slug}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>

          <button 
            class="affordable-card-quick-add" 
            type="button" 
            data-slug="${product.slug}"
            aria-label="Quick add ${product.name} to cart"
            title="Quick add to bag"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"/><path d="M12 5v14"/>
            </svg>
            <span>Quick Add</span>
          </button>
        </div>

        <div class="affordable-card-body">
          <div class="affordable-card-meta">
            <div class="affordable-card-title-row">
              <h3 class="affordable-card-title">${product.name}</h3>
              <span class="affordable-card-rating">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                ${ratingDisplay}
              </span>
            </div>
            <p class="affordable-card-subtitle">${product.subtitle || product.shortDescription}</p>
          </div>

          <div class="affordable-card-footer">
            <div class="affordable-price-wrap">
              <span class="affordable-price-label">FROM</span>
              <span class="affordable-price-val">$${minPrice}</span>
            </div>
            <span class="affordable-card-btn">
              View &rarr;
            </span>
          </div>
        </div>
      </article>
    `;
  }).join("");
}
