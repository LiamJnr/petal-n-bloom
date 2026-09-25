/**
 * Petal & Bloom — Recently Viewed Products Module
 * Tracks user browsing history in localStorage and renders an elegant, interactive carousel.
 */
import { getProductBySlug } from "../data/products.js";
import { isInWishlist, toggleWishlist } from "./wishlist.js";
import { ICONS } from "../lib/icons.js";

const RECENTLY_VIEWED_STORAGE_KEY = "petal_bloom_recently_viewed";
const MAX_HISTORY_ITEMS = 8;

/**
 * Record a viewed product by slug into localStorage (deduped, newest first)
 */
export function recordProductView(slug) {
  if (!slug) return;
  try {
    const raw = localStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY);
    let items = raw ? JSON.parse(raw) : [];

    // Remove if already exists to push to front
    items = items.filter(s => s !== slug);
    items.unshift(slug);

    // Limit array length
    if (items.length > MAX_HISTORY_ITEMS) {
      items = items.slice(0, MAX_HISTORY_ITEMS);
    }

    localStorage.setItem(RECENTLY_VIEWED_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.warn("Could not save recently viewed item:", err);
  }
}

/**
 * Retrieve list of recently viewed product objects
 */
export function getRecentlyViewedProducts(excludeSlug = null) {
  try {
    const raw = localStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY);
    const slugs = raw ? JSON.parse(raw) : [];

    return slugs
      .filter(slug => slug && slug !== excludeSlug)
      .map(slug => getProductBySlug(slug))
      .filter(Boolean);
  } catch {
    return [];
  }
}

/**
 * Clear the browsing history
 */
export function clearRecentlyViewed() {
  try {
    localStorage.removeItem(RECENTLY_VIEWED_STORAGE_KEY);
  } catch (err) {
    console.warn("Could not clear recently viewed items:", err);
  }
}

/**
 * Render Recently Viewed carousel into a container
 */
export function renderRecentlyViewed({ containerId, excludeSlug = null, onProductClick, onQuickAdd }) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const items = getRecentlyViewedProducts(excludeSlug);

  if (items.length === 0) {
    container.innerHTML = "";
    container.style.display = "none";
    return;
  }

  container.style.display = "block";
  container.innerHTML = `
    <section class="recently-viewed-section" aria-label="Recently viewed flower arrangements">
      <div class="container">
        
        <div class="recently-viewed-header">
          <div class="recently-viewed-title-wrap">
            <span class="recently-viewed-tag">Browsing History</span>
            <h3 class="recently-viewed-title">Recently Viewed</h3>
          </div>

          <div class="recently-viewed-actions">
            <button type="button" class="btn-clear-recently-viewed" id="${containerId}-btn-clear" aria-label="Clear browsing history">
              Clear History
            </button>
            <div class="recently-viewed-arrows">
              <button type="button" class="recently-viewed-arrow prev" id="${containerId}-arrow-prev" aria-label="Scroll left">&larr;</button>
              <button type="button" class="recently-viewed-arrow next" id="${containerId}-arrow-next" aria-label="Scroll right">&rarr;</button>
            </div>
          </div>
        </div>

        <div class="recently-viewed-track-wrap">
          <div class="recently-viewed-track" id="${containerId}-track">
            ${items.map(product => {
              const minPrice = Math.min(...product.sizes.map(s => s.price));
              const isSaved = isInWishlist(product.slug);
              const ratingDisplay = (product.rating || 4.8).toFixed(1);

              return `
                <article class="product-card recently-viewed-card" data-slug="${product.slug}" tabindex="0" role="button" aria-label="View details for ${product.name}">
                  <div class="product-card-media">
                    <img src="${product.images.primary}" alt="${product.name}" loading="lazy" />
                    
                    <button 
                      class="product-card-wishlist-btn ${isSaved ? 'active' : ''}" 
                      type="button" 
                      aria-label="${isSaved ? 'Remove from wishlist' : 'Add to wishlist'}" 
                      title="${isSaved ? 'Saved in wishlist' : 'Add to wishlist'}"
                      data-slug="${product.slug}"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path fill="currentColor" fill-rule="evenodd" d="M3.25 10.03c0-2.7 2.37-4.78 5.15-4.78c1.433 0 2.695.672 3.6 1.542c.905-.87 2.166-1.542 3.6-1.542c2.78 0 5.15 2.08 5.15 4.78c0 1.85-.789 3.476-1.882 4.852c-1.09 1.372-2.518 2.537-3.884 3.484c-.523.362-1.05.695-1.534.941c-.453.231-.975.443-1.45.443s-.996-.212-1.45-.443a14 14 0 0 1-1.533-.941c-1.367-.947-2.794-2.112-3.885-3.484C4.039 13.506 3.25 11.88 3.25 10.03M8.4 6.75c-2.08 0-3.65 1.53-3.65 3.28c0 1.403.596 2.71 1.556 3.918c.962 1.21 2.257 2.279 3.565 3.185c.495.343.96.634 1.36.838c.428.218.676.279.769.279s.341-.061.77-.28a12 12 0 0 0 1.36-.837c1.307-.906 2.602-1.974 3.564-3.185c.96-1.208 1.556-2.515 1.556-3.918c0-1.75-1.57-3.28-3.65-3.28c-1.194 0-2.31.713-3.005 1.619a.75.75 0 0 1-1.19 0C10.71 7.463 9.595 6.75 8.4 6.75" clip-rule="evenodd" />
                      </svg>
                    </button>

                    <button 
                      class="product-card-quick-add-btn" 
                      type="button" 
                      data-slug="${product.slug}"
                      aria-label="Quick add ${product.name} to cart"
                      title="Quick add to bag"
                    >
                      <span>+ Quick Add</span>
                    </button>
                  </div>

                  <div class="product-card-body">
                    <div class="product-card-top-row">
                      <h4 class="product-card-title">${product.name}</h4>
                      <span class="product-card-rating">${ratingDisplay}</span>
                    </div>

                    <div class="product-card-starting-label">STARTING FROM</div>

                    <div class="product-card-bottom-row">
                      <div class="product-card-price">$${minPrice}</div>
                      <span class="product-card-view-options">VIEW OPTIONS</span>
                    </div>
                  </div>
                </article>
              `;
            }).join("")}
          </div>
        </div>

      </div>
    </section>
  `;

  // Bind track scrolling
  const track = document.getElementById(`${containerId}-track`);
  const prevBtn = document.getElementById(`${containerId}-arrow-prev`);
  const nextBtn = document.getElementById(`${containerId}-arrow-next`);
  const clearBtn = document.getElementById(`${containerId}-btn-clear`);

  prevBtn?.addEventListener("click", () => {
    track?.scrollBy({ left: -320, behavior: "smooth" });
  });

  nextBtn?.addEventListener("click", () => {
    track?.scrollBy({ left: 320, behavior: "smooth" });
  });

  clearBtn?.addEventListener("click", () => {
    clearRecentlyViewed();
    container.innerHTML = "";
    container.style.display = "none";
  });

  // Event delegation on track for card clicks, wishlist & quick add
  track?.addEventListener("click", (e) => {
    const card = e.target.closest(".recently-viewed-card");
    if (!card) return;

    const slug = card.dataset.slug;
    if (!slug) return;

    // Wishlist click
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

    // Quick add click
    const quickAddBtn = e.target.closest(".product-card-quick-add-btn");
    if (quickAddBtn) {
      e.stopPropagation();
      e.preventDefault();
      if (typeof onQuickAdd === "function") {
        onQuickAdd(slug);
      }
      return;
    }

    // Card click -> PDP
    if (typeof onProductClick === "function") {
      e.preventDefault();
      onProductClick(slug);
    }
  });
}
