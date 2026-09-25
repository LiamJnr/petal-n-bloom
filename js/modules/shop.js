/**
 * Petal & Bloom — Dedicated Shop Page Module
 * Handles multi-criteria filtering, live search, occasion filtering, price ranges, sorting, active chips, and product grid.
 */

import { PRODUCTS, getAllOccasions } from "../data/products.js";
import { isInWishlist, toggleWishlist } from "./wishlist.js";
import { ICONS } from "../lib/icons.js";

let activeCategory = "all";
let activeOccasion = "all";
let activePriceRange = "all";
let activeSearchQuery = "";
let activeSort = "bestseller";

let productClickHandler = null;
let quickAddHandler = null;
let isInitialized = false;

export function initShop({ onProductClick, onQuickAdd }) {
  productClickHandler = onProductClick;
  quickAddHandler = onQuickAdd;

  const categoryPills = document.querySelectorAll(".shop-category-pill");
  const occasionSelect = document.getElementById("shop-occasion-select");
  const pricePills = document.querySelectorAll(".shop-price-pill");
  const sortSelect = document.getElementById("shop-sort-select");
  const searchInput = document.querySelector(".shop-search-input");
  const searchClearBtn = document.querySelector(".shop-search-clear-btn");
  const grid = document.getElementById("shop-product-grid");

  if (!isInitialized) {
    // 1. Category filter pills
    categoryPills.forEach(button => {
      button.addEventListener("click", () => {
        categoryPills.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        activeCategory = button.dataset.category || "all";
        updateShopUrlParams();
        renderShopGrid();
      });
    });

    // 2. Occasion dropdown
    occasionSelect?.addEventListener("change", (e) => {
      activeOccasion = e.target.value;
      updateShopUrlParams();
      renderShopGrid();
    });

    // 3. Price range pills
    pricePills.forEach(button => {
      button.addEventListener("click", () => {
        pricePills.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        activePriceRange = button.dataset.price || "all";
        renderShopGrid();
      });
    });

    // 4. Sort dropdown
    sortSelect?.addEventListener("change", (e) => {
      activeSort = e.target.value;
      updateShopUrlParams();
      renderShopGrid();
    });

    // 5. In-shop search input with debounce
    let searchDebounceTimer;
    searchInput?.addEventListener("input", (e) => {
      const query = e.target.value.trim();
      if (searchClearBtn) {
        searchClearBtn.classList.toggle("visible", query.length > 0);
      }
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(() => {
        activeSearchQuery = query;
        updateShopUrlParams();
        renderShopGrid();
      }, 200);
    });

    searchClearBtn?.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
        searchClearBtn.classList.remove("visible");
        activeSearchQuery = "";
        updateShopUrlParams();
        renderShopGrid();
        searchInput.focus();
      }
    });

    // 6. Event delegation on grid for card clicks & wishlist toggle
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
        const product = PRODUCTS.find(p => p.slug === slug);
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

      // Default card click or "VIEW OPTIONS" -> Open PDP
      if (typeof productClickHandler === "function") {
        e.preventDefault();
        productClickHandler(slug);
      }
    });

    isInitialized = true;
  }
}

/**
 * Filter and sort products according to current shop criteria
 */
export function getFilteredShopProducts() {
  let list = [...PRODUCTS];

  // 1. Filter by category
  if (activeCategory !== "all") {
    list = list.filter(p => p.category === activeCategory);
  }

  // 2. Filter by occasion
  if (activeOccasion !== "all") {
    list = list.filter(p => p.occasion.toLowerCase().includes(activeOccasion.toLowerCase()));
  }

  // 3. Filter by price range
  if (activePriceRange !== "all") {
    list = list.filter(p => {
      const minPrice = Math.min(...p.sizes.map(s => s.price));
      if (activePriceRange === "under-65") return minPrice < 65;
      if (activePriceRange === "65-90") return minPrice >= 65 && minPrice <= 90;
      if (activePriceRange === "90-120") return minPrice > 90 && minPrice <= 120;
      if (activePriceRange === "over-120") return minPrice > 120;
      return true;
    });
  }

  // 4. Filter by search query
  if (activeSearchQuery) {
    const q = activeSearchQuery.toLowerCase();
    list = list.filter(p => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchSubtitle = p.subtitle.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchOccasion = p.occasion.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchStems = p.stems.some(s => s.name.toLowerCase().includes(q));
      const matchTag = p.tag && p.tag.toLowerCase().includes(q);
      return matchName || matchSubtitle || matchDesc || matchOccasion || matchCategory || matchStems || matchTag;
    });
  }

  // 5. Sort list
  switch (activeSort) {
    case "price-low":
      list.sort((a, b) => Math.min(...a.sizes.map(s => s.price)) - Math.min(...b.sizes.map(s => s.price)));
      break;
    case "price-high":
      list.sort((a, b) => Math.min(...b.sizes.map(s => s.price)) - Math.min(...a.sizes.map(s => s.price)));
      break;
    case "rating":
      list.sort((a, b) => b.rating - a.rating);
      break;
    case "name-asc":
      list.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "bestseller":
    default:
      list.sort((a, b) => (b.tag === "Bestseller" || b.featured ? 1 : 0) - (a.tag === "Bestseller" || a.featured ? 1 : 0));
      break;
  }

  return list;
}

/**
 * Render the dedicated shop view with provided initial filters
 */
export function renderShop(filters = {}) {
  if (filters.category) activeCategory = filters.category;
  if (filters.occasion) activeOccasion = filters.occasion;
  if (filters.search) activeSearchQuery = filters.search;
  if (filters.sort) activeSort = filters.sort;

  // Sync controls in the DOM
  syncControlElements();

  // Render cards and chips
  renderShopGrid();
}

/**
 * Sync UI controls with current state
 */
function syncControlElements() {
  // Category pills
  document.querySelectorAll(".shop-category-pill").forEach(btn => {
    btn.classList.toggle("active", (btn.dataset.category || "all") === activeCategory);
  });

  // Occasion select
  const occasionSelect = document.getElementById("shop-occasion-select");
  if (occasionSelect) {
    occasionSelect.value = activeOccasion;
  }

  // Price pills
  document.querySelectorAll(".shop-price-pill").forEach(btn => {
    btn.classList.toggle("active", (btn.dataset.price || "all") === activePriceRange);
  });

  // Sort select
  const sortSelect = document.getElementById("shop-sort-select");
  if (sortSelect) {
    sortSelect.value = activeSort;
  }

  // Search input
  const searchInput = document.querySelector(".shop-search-input");
  const searchClearBtn = document.querySelector(".shop-search-clear-btn");
  if (searchInput) {
    searchInput.value = activeSearchQuery;
    if (searchClearBtn) {
      searchClearBtn.classList.toggle("visible", activeSearchQuery.length > 0);
    }
  }
}

/**
 * Render active filter chips and product grid
 */
export function renderShopGrid() {
  const grid = document.getElementById("shop-product-grid");
  const countEl = document.getElementById("shop-catalog-count");
  const chipsContainer = document.getElementById("shop-active-chips");

  if (!grid) return;

  const items = getFilteredShopProducts();

  // 1. Update count badge
  if (countEl) {
    countEl.textContent = `${items.length} flower arrangement${items.length === 1 ? "" : "s"} found`;
  }

  // 2. Render Active Filter Chips
  if (chipsContainer) {
    const activeChips = [];

    if (activeCategory !== "all") {
      activeChips.push({
        type: "category",
        label: `Category: ${capitalize(activeCategory)}`,
        onRemove: () => {
          activeCategory = "all";
          syncControlElements();
          updateShopUrlParams();
          renderShopGrid();
        }
      });
    }

    if (activeOccasion !== "all") {
      activeChips.push({
        type: "occasion",
        label: `Occasion: ${activeOccasion}`,
        onRemove: () => {
          activeOccasion = "all";
          syncControlElements();
          updateShopUrlParams();
          renderShopGrid();
        }
      });
    }

    if (activePriceRange !== "all") {
      const priceLabels = {
        "under-65": "Under $65",
        "65-90": "$65 – $90",
        "90-120": "$90 – $120",
        "over-120": "$120+"
      };
      activeChips.push({
        type: "price",
        label: `Price: ${priceLabels[activePriceRange] || activePriceRange}`,
        onRemove: () => {
          activePriceRange = "all";
          syncControlElements();
          renderShopGrid();
        }
      });
    }

    if (activeSearchQuery) {
      activeChips.push({
        type: "search",
        label: `Search: "${activeSearchQuery}"`,
        onRemove: () => {
          activeSearchQuery = "";
          syncControlElements();
          updateShopUrlParams();
          renderShopGrid();
        }
      });
    }

    if (activeChips.length > 0) {
      chipsContainer.innerHTML = `
        <div class="shop-chips-wrapper">
          <span class="shop-chips-label">Active Filters:</span>
          ${activeChips.map((chip, idx) => `
            <span class="shop-filter-chip" data-chip-index="${idx}">
              ${chip.label}
              <button type="button" class="chip-remove-btn" aria-label="Remove filter">&times;</button>
            </span>
          `).join("")}
          <button type="button" class="shop-reset-all-btn" id="btn-shop-reset-all">Clear All</button>
        </div>
      `;

      // Wire remove button events
      chipsContainer.querySelectorAll(".shop-filter-chip").forEach((el, idx) => {
        el.querySelector(".chip-remove-btn")?.addEventListener("click", (e) => {
          e.stopPropagation();
          activeChips[idx].onRemove();
        });
      });

      chipsContainer.querySelector("#btn-shop-reset-all")?.addEventListener("click", () => {
        resetShopFilters();
      });
    } else {
      chipsContainer.innerHTML = "";
    }
  }

  // 3. Empty State
  if (items.length === 0) {
    grid.innerHTML = `
      <div class="catalog-empty shop-empty-state">
        <div class="catalog-empty-icon">${ICONS.flower}</div>
        <h3>No matching floral arrangements</h3>
        <p>We couldn't find any flowers matching your current filter selections. Try searching with different keywords or reset your filters to see all blooms.</p>
        <button class="button button-dark" id="btn-empty-reset-shop">Reset All Filters</button>
      </div>
    `;

    document.getElementById("btn-empty-reset-shop")?.addEventListener("click", () => {
      resetShopFilters();
    });
    return;
  }

  // 4. Render Product Cards
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

/**
 * Reset all active shop filters back to default
 */
export function resetShopFilters() {
  activeCategory = "all";
  activeOccasion = "all";
  activePriceRange = "all";
  activeSearchQuery = "";
  activeSort = "bestseller";

  syncControlElements();
  updateShopUrlParams();
  renderShopGrid();
}

/**
 * Set Search Query externally (e.g. from header search bar)
 */
export function setShopSearchQuery(query) {
  activeSearchQuery = query;
  syncControlElements();
  updateShopUrlParams();
  renderShopGrid();
}

/**
 * Set Category externally (e.g. from footer links)
 */
export function setShopCategory(category) {
  activeCategory = category;
  syncControlElements();
  updateShopUrlParams();
  renderShopGrid();
}

/**
 * Synchronize current filter state to browser URL search params without triggering full page reload
 */
function updateShopUrlParams() {
  const newUrl = new URL(window.location.href);
  newUrl.searchParams.set("view", "shop");

  if (activeCategory !== "all") newUrl.searchParams.set("category", activeCategory);
  else newUrl.searchParams.delete("category");

  if (activeOccasion !== "all") newUrl.searchParams.set("occasion", activeOccasion);
  else newUrl.searchParams.delete("occasion");

  if (activeSearchQuery) newUrl.searchParams.set("search", activeSearchQuery);
  else newUrl.searchParams.delete("search");

  if (activeSort !== "bestseller") newUrl.searchParams.set("sort", activeSort);
  else newUrl.searchParams.delete("sort");

  window.history.replaceState({ view: "shop" }, "", newUrl.toString());
}

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
