/**
 * Petal & Bloom — Home Featured & Best Sellers Catalog Module
 * Renders the curated showcase grid on the home page.
 */
import { getFeaturedProducts, getProductBySlug } from "../data/products.js";
import { isInWishlist, toggleWishlist } from "./wishlist.js";
import { ICONS } from "../lib/icons.js";

let activeFeaturedCategory = "all";
let productClickHandler = null;
let quickAddHandler = null;

export function initCatalog({ onProductClick, onQuickAdd, onExploreShop }) {
  productClickHandler = onProductClick;
  quickAddHandler = onQuickAdd;

  const filterButtons = document.querySelectorAll(".featured-filter-pill");
  const grid = document.getElementById("featured-product-grid") || document.getElementById("product-grid");

  // Category filter pills for featured showcase
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      activeFeaturedCategory = button.dataset.filter || "all";
      renderFeaturedCatalog();
    });
  });

  // Explore Shop CTA buttons
  document.querySelectorAll(".btn-explore-full-shop, #btn-home-view-all-shop").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof onExploreShop === "function") {
        onExploreShop();
      }
    });
  });

  // Event delegation on grid for card clicks & wishlist toggle
  grid?.addEventListener("click", (e) => {
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

    // Default card or "VIEW OPTIONS" click -> Open PDP
    if (typeof productClickHandler === "function") {
      e.preventDefault();
      productClickHandler(slug);
    }
  });

  // Keyboard accessibility (Enter / Space to view)
  grid?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const card = e.target.closest(".product-card");
      if (card && typeof productClickHandler === "function") {
        e.preventDefault();
        productClickHandler(card.dataset.slug);
      }
    }
  });

  // Initial render of featured flowers
  renderFeaturedCatalog();
}

/**
 * Filter featured products by selected tag/category
 */
export function getFeaturedList() {
  let list = getFeaturedProducts();

  if (activeFeaturedCategory !== "all") {
    list = list.filter(p => p.category === activeFeaturedCategory);
  }

  return list;
}

/**
 * Render curated featured cards into the home page grid matching design mockup
 */
export function renderFeaturedCatalog() {
  const grid = document.getElementById("featured-product-grid") || document.getElementById("product-grid");
  const countEl = document.getElementById("featured-product-count");

  if (!grid) return;

  const items = getFeaturedList();

  if (countEl) {
    countEl.textContent = `Curated Highlights (${items.length})`;
  }

  // Generate cards HTML matching boutique design
  grid.innerHTML = items.map(product => {
    const minPrice = Math.min(...product.sizes.map(s => s.price));
    const isSaved = isInWishlist(product.slug);
    const ratingDisplay = (product.rating || 4.8).toFixed(1);

    return `
      <article class="product-card" data-slug="${product.slug}" tabindex="0" role="button" aria-label="View details for ${product.name}">
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
            <h3 class="product-card-title">${product.name}</h3>
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
  }).join("");
}

export function setSearchQuery(query) {
  // Pass-through if called
}

