/**
 * Petal & Bloom — Dedicated Shop Page Module
 * Handles multi-criteria filtering, live search, occasion filtering, price ranges, sorting, active chips, and product grid.
 */

import { PRODUCTS, GIFT_ADDONS, getAllOccasions } from "../data/products.js";
import { isInWishlist, toggleWishlist } from "./wishlist.js";
import { ICONS } from "../lib/icons.js";
import { renderRecentlyViewed } from "./recently-viewed.js";

let activeCategory = "all";
let activeOccasion = "all";
let activePriceRange = "all";
let activeSearchQuery = "";
let activeSort = "bestseller";
let currentPage = 1;
export const ITEMS_PER_PAGE = 12;

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
        currentPage = 1;
        updateShopUrlParams();
        renderShopGrid();
      });
    });

    // 2. Occasion dropdown
    occasionSelect?.addEventListener("change", (e) => {
      activeOccasion = e.target.value;
      currentPage = 1;
      updateShopUrlParams();
      renderShopGrid();
    });

    // 3. Price range pills
    pricePills.forEach(button => {
      button.addEventListener("click", () => {
        pricePills.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        activePriceRange = button.dataset.price || "all";
        currentPage = 1;
        renderShopGrid();
      });
    });

    // 4. Sort dropdown
    sortSelect?.addEventListener("change", (e) => {
      activeSort = e.target.value;
      currentPage = 1;
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
        currentPage = 1;
        updateShopUrlParams();
        renderShopGrid();
      }, 200);
    });

    searchClearBtn?.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
        searchClearBtn.classList.remove("visible");
        activeSearchQuery = "";
        currentPage = 1;
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
  const allAvailable = [...PRODUCTS, ...GIFT_ADDONS];
  let list = activeCategory === "kingsbite"
    ? allAvailable.filter(p => p.slug.includes("kingsbite") || p.category === "kingsbite" || (p.name && p.name.toLowerCase().includes("kingsbite")) || (p.subtitle && p.subtitle.toLowerCase().includes("kingsbite")))
    : [...PRODUCTS];

  // 1. Filter by category
  if (activeCategory !== "all" && activeCategory !== "kingsbite") {
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
      if (activePriceRange === "under-40") return minPrice < 40;
      if (activePriceRange === "40-70") return minPrice >= 40 && minPrice <= 70;
      if (activePriceRange === "70-100") return minPrice > 70 && minPrice <= 100;
      if (activePriceRange === "over-100") return minPrice > 100;
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
  if (filters.page) {
    const p = parseInt(filters.page, 10);
    if (!isNaN(p) && p > 0) currentPage = p;
  }

  // Sync controls in the DOM
  syncControlElements();

  // Render cards, pagination, and chips
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
 * Render active filter chips, paginated product grid, and pagination bar
 */
export function renderShopGrid() {
  const grid = document.getElementById("shop-product-grid");
  const countEl = document.getElementById("shop-catalog-count");
  const chipsContainer = document.getElementById("shop-active-chips");
  const paginationContainer = document.getElementById("shop-pagination");

  if (!grid) return;

  const items = getFilteredShopProducts();
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  // Keep currentPage within valid bounds
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }
  if (currentPage < 1) {
    currentPage = 1;
  }

  // 1. Update count badge with clear pagination context
  if (countEl) {
    if (totalItems === 0) {
      countEl.textContent = "0 flower arrangements found";
    } else if (totalPages === 1) {
      countEl.textContent = `${totalItems} flower arrangement${totalItems === 1 ? "" : "s"} found`;
    } else {
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
      const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);
      countEl.textContent = `Showing ${startIndex}–${endIndex} of ${totalItems} arrangements (Page ${currentPage} of ${totalPages})`;
    }
  }

  // 2. Render Active Filter Chips
  if (chipsContainer) {
    const activeChips = [];

    if (activeCategory !== "all") {
      const catLabel = activeCategory === "kingsbite" ? "Kingsbite Treats" : capitalize(activeCategory);
      activeChips.push({
        type: "category",
        label: `Category: ${catLabel}`,
        onRemove: () => {
          activeCategory = "all";
          currentPage = 1;
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
          currentPage = 1;
          syncControlElements();
          updateShopUrlParams();
          renderShopGrid();
        }
      });
    }

    if (activePriceRange !== "all") {
      const priceLabels = {
        "under-40": "Under $40",
        "40-70": "$40 – $70",
        "70-100": "$70 – $100",
        "over-100": "$100+"
      };
      activeChips.push({
        type: "price",
        label: `Price: ${priceLabels[activePriceRange] || activePriceRange}`,
        onRemove: () => {
          activePriceRange = "all";
          currentPage = 1;
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
          currentPage = 1;
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
  if (totalItems === 0) {
    grid.innerHTML = `
      <div class="catalog-empty shop-empty-state">
        <div class="catalog-empty-icon">${ICONS.flower}</div>
        <h3>No matching floral arrangements</h3>
        <p>We couldn't find any flowers matching your current filter selections. Try searching with different keywords or reset your filters to see all blooms.</p>
        <button class="button button-dark" id="btn-empty-reset-shop">Reset All Filters</button>
      </div>
    `;

    if (paginationContainer) {
      paginationContainer.innerHTML = "";
    }

    document.getElementById("btn-empty-reset-shop")?.addEventListener("click", () => {
      resetShopFilters();
    });
    return;
  }

  // 4. Paginate items for current view
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // 5. Render Product Cards for the current page
  grid.innerHTML = pageItems.map(product => {
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

  // 6. Render Pagination Navigation
  renderPagination(paginationContainer, totalPages);

  // 7. Render Recently Viewed Products Strip in Shop view
  renderRecentlyViewed({
    containerId: "shop-recently-viewed-container",
    onProductClick: (slug) => {
      if (typeof productClickHandler === "function") {
        productClickHandler(slug);
      }
    },
    onQuickAdd: (slug) => {
      if (typeof quickAddHandler === "function") {
        quickAddHandler(slug);
      }
    }
  });
}

/**
 * Render pagination controls beneath the shop grid
 */
function renderPagination(container, totalPages) {
  if (!container) return;

  if (totalPages <= 1) {
    container.innerHTML = "";
    container.style.display = "none";
    return;
  }

  container.style.display = "flex";

  // Build page buttons range
  const maxButtons = 5;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  if (endPage - startPage < maxButtons - 1) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  let pagesHtml = "";

  // First page + ellipsis if needed
  if (startPage > 1) {
    pagesHtml += `<button type="button" class="shop-page-btn" data-page="1">1</button>`;
    if (startPage > 2) {
      pagesHtml += `<span class="shop-page-ellipsis" aria-hidden="true">&hellip;</span>`;
    }
  }

  // Visible page sequence
  for (let p = startPage; p <= endPage; p++) {
    const isCurrent = p === currentPage;
    pagesHtml += `
      <button 
        type="button" 
        class="shop-page-btn ${isCurrent ? 'active' : ''}" 
        data-page="${p}"
        aria-current="${isCurrent ? 'page' : 'false'}"
        aria-label="Go to page ${p}"
      >
        ${p}
      </button>
    `;
  }

  // Last page + ellipsis if needed
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pagesHtml += `<span class="shop-page-ellipsis" aria-hidden="true">&hellip;</span>`;
    }
    pagesHtml += `<button type="button" class="shop-page-btn" data-page="${totalPages}">${totalPages}</button>`;
  }

  container.innerHTML = `
    <div class="shop-pagination-wrapper">
      <button 
        type="button" 
        class="shop-pagination-nav shop-page-prev" 
        data-page="${currentPage - 1}"
        ${currentPage === 1 ? 'disabled aria-disabled="true"' : ''}
        aria-label="Previous page of arrangements"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        <span>Prev</span>
      </button>

      <div class="shop-pagination-numbers">
        ${pagesHtml}
      </div>

      <button 
        type="button" 
        class="shop-pagination-nav shop-page-next" 
        data-page="${currentPage + 1}"
        ${currentPage === totalPages ? 'disabled aria-disabled="true"' : ''}
        aria-label="Next page of arrangements"
      >
        <span>Next</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </button>
    </div>
  `;

  // Wire click events
  container.querySelectorAll("button[data-page]").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetPage = parseInt(btn.dataset.page, 10);
      if (targetPage && targetPage !== currentPage && targetPage >= 1 && targetPage <= totalPages) {
        goToShopPage(targetPage);
      }
    });
  });
}

/**
 * Navigate to a specific shop page with smooth scroll up to the grid top
 */
function goToShopPage(page) {
  currentPage = page;
  updateShopUrlParams();
  renderShopGrid();

  // Smooth scroll up so customer lands at top of catalog
  const scrollTarget = document.querySelector(".shop-toolbar-card") || document.getElementById("shop-view");
  if (scrollTarget) {
    const yOffset = -24;
    const y = scrollTarget.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  }
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
  currentPage = 1;

  syncControlElements();
  updateShopUrlParams();
  renderShopGrid();
}

/**
 * Set Search Query externally (e.g. from header search bar)
 */
export function setShopSearchQuery(query) {
  activeSearchQuery = query;
  currentPage = 1;
  syncControlElements();
  updateShopUrlParams();
  renderShopGrid();
}

/**
 * Set Category externally (e.g. from footer links)
 */
export function setShopCategory(category) {
  activeCategory = category;
  currentPage = 1;
  syncControlElements();
  updateShopUrlParams();
  renderShopGrid();
}

/**
 * Synchronize current filter & pagination state to browser URL search params
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

  if (currentPage > 1) newUrl.searchParams.set("page", currentPage.toString());
  else newUrl.searchParams.delete("page");

  window.history.replaceState({ view: "shop" }, "", newUrl.toString());
}

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
