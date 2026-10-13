/**
 * AURA & GLOW — ULTRA-LUXURY BEAUTY E-COMMERCE CLIENT DEMO
 * Modular Interactive Application Logic
 */

// Application State
const state = {
  cart: JSON.parse(localStorage.getItem('auraglow_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('auraglow_wishlist')) || [],
  currentCategory: 'all',
  searchQuery: '',
  deliveryArea: 'inside', // 'inside' = 60, 'outside' = 120
  freeDeliveryThreshold: 1500,
  activeQuickViewProduct: null,
};

// DOM Element References
const elements = {
  productGrid: document.getElementById('productGrid'),
  filterButtons: document.querySelectorAll('.filter-btn'),
  searchInput: document.getElementById('searchInput'),
  cartCounter: document.getElementById('cartCounter'),
  cartDrawer: document.getElementById('cartDrawer'),
  cartDrawerBackdrop: document.getElementById('cartDrawerBackdrop'),
  cartItemsList: document.getElementById('cartItemsList'),
  cartSubtotal: document.getElementById('cartSubtotal'),
  cartTotal: document.getElementById('cartTotal'),
  freeShippingText: document.getElementById('freeShippingText'),
  freeShippingBar: document.getElementById('freeShippingBar'),
  openCartBtn: document.getElementById('openCartBtn'),
  closeCartBtn: document.getElementById('closeCartBtn'),
  btnCheckoutTrigger: document.getElementById('btnCheckoutTrigger'),
  
  // Dialogs
  quickViewDialog: document.getElementById('quickViewDialog'),
  checkoutDialog: document.getElementById('checkoutDialog'),
  successDialog: document.getElementById('successDialog'),
  
  // Quick View Elements
  qvImage: document.getElementById('qvImage'),
  qvBadge: document.getElementById('qvBadge'),
  qvTitle: document.getElementById('qvTitle'),
  qvPrice: document.getElementById('qvPrice'),
  qvOriginalPrice: document.getElementById('qvOriginalPrice'),
  qvDesc: document.getElementById('qvDesc'),
  qvIngredients: document.getElementById('qvIngredients'),
  qvUsage: document.getElementById('qvUsage'),
  qvQtyInput: document.getElementById('qvQtyInput'),
  qvMinusBtn: document.getElementById('qvMinusBtn'),
  qvPlusBtn: document.getElementById('qvPlusBtn'),
  qvAddBtn: document.getElementById('qvAddBtn'),
  
  // Checkout Elements
  checkoutForm: document.getElementById('checkoutForm'),
  recapSubtotal: document.getElementById('recapSubtotal'),
  recapDelivery: document.getElementById('recapDelivery'),
  recapTotal: document.getElementById('recapTotal'),
  
  // Success Elements
  successOrderToken: document.getElementById('successOrderToken'),
  successCustomerName: document.getElementById('successCustomerName'),
  successPhone: document.getElementById('successPhone'),
  successAddress: document.getElementById('successAddress'),
  successTotal: document.getElementById('successTotal'),
  successDate: document.getElementById('successDate'),
  
  // Toast container
  toastContainer: document.getElementById('toastContainer'),
};

// ==========================================================
// INITIALIZATION
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  setupEventListeners();
});

// ==========================================================
// EVENT LISTENERS
// ==========================================================
function setupEventListeners() {
  // Category Filtering
  elements.filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      elements.filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentCategory = btn.dataset.category;
      renderProducts();
    });
  });

  // Search Input
  if (elements.searchInput) {
    elements.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }

  // Cart Drawer open/close
  elements.openCartBtn?.addEventListener('click', openCartDrawer);
  elements.closeCartBtn?.addEventListener('click', closeCartDrawer);
  elements.cartDrawerBackdrop?.addEventListener('click', closeCartDrawer);

  // Quick View Quantity handlers
  elements.qvMinusBtn?.addEventListener('click', () => {
    let val = parseInt(elements.qvQtyInput.value, 10) || 1;
    if (val > 1) elements.qvQtyInput.value = val - 1;
  });
  elements.qvPlusBtn?.addEventListener('click', () => {
    let val = parseInt(elements.qvQtyInput.value, 10) || 1;
    if (val < 10) elements.qvQtyInput.value = val + 1;
  });
  elements.qvAddBtn?.addEventListener('click', () => {
    if (state.activeQuickViewProduct) {
      const qty = parseInt(elements.qvQtyInput.value, 10) || 1;
      addToCart(state.activeQuickViewProduct.id, qty);
      elements.quickViewDialog?.close();
    }
  });

  // Open Checkout Modal
  elements.btnCheckoutTrigger?.addEventListener('click', () => {
    if (state.cart.length === 0) {
      showToast('Your cart is empty! Add a product first.');
      return;
    }
    closeCartDrawer();
    openCheckoutDialog();
  });

  // Radio Tile Selection for Delivery & Payment
  document.querySelectorAll('input[name="delivery_area"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      document.querySelectorAll('.delivery-tile').forEach(t => t.classList.remove('selected'));
      e.target.closest('.radio-tile').classList.add('selected');
      state.deliveryArea = e.target.value;
      updateCheckoutRecap();
    });
  });

  document.querySelectorAll('input[name="payment_method"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      document.querySelectorAll('.payment-tile').forEach(t => t.classList.remove('selected'));
      e.target.closest('.radio-tile').classList.add('selected');
    });
  });

  // Checkout Form Submission
  elements.checkoutForm?.addEventListener('submit', handleCheckoutSubmit);

  // Close modals on click outside
  [elements.quickViewDialog, elements.checkoutDialog, elements.successDialog].forEach(dialog => {
    if (!dialog) return;
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        dialog.close();
      }
    });
  });

  // Close buttons in dialogs
  document.querySelectorAll('.btn-modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const dialog = btn.closest('dialog');
      if (dialog) dialog.close();
    });
  });

  // Continue shopping button in success dialog
  document.getElementById('btnSuccessContinue')?.addEventListener('click', () => {
    elements.successDialog?.close();
  });
}

// ==========================================================
// PRODUCT RENDERING
// ==========================================================
function renderProducts() {
  if (!elements.productGrid) return;

  const filtered = PRODUCTS.filter(prod => {
    const matchCategory = state.currentCategory === 'all' || prod.category === state.currentCategory;
    const matchSearch = !state.searchQuery || 
      prod.name.toLowerCase().includes(state.searchQuery) || 
      prod.shortDesc.toLowerCase().includes(state.searchQuery);
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    elements.productGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <p style="font-size: 1.25rem; font-weight: 600; margin-bottom: 8px;">No products found</p>
        <p style="font-size: 0.875rem;">Try another search keyword or select another category.</p>
      </div>
    `;
    return;
  }

  elements.productGrid.innerHTML = filtered.map(prod => {
    const isWishlisted = state.wishlist.includes(prod.id);
    const discountPercent = Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100);

    return `
      <article class="product-card" data-id="${prod.id}">
        <div class="card-image-wrap">
          <img src="${prod.image}" alt="${prod.name}" loading="lazy">
          <span class="card-badge">${prod.badge}</span>
          <button class="btn-wishlist ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${prod.id}', event)" aria-label="Add to Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <div class="card-overlay-actions">
            <button class="btn-quick-view" onclick="openQuickView('${prod.id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              Quick View
            </button>
          </div>
        </div>

        <div class="card-content">
          <span class="card-category">${prod.category}</span>
          <h3 class="card-title">${prod.name}</h3>
          
          <div class="card-rating">
            <span class="rating-stars">★★★★★</span>
            <span class="rating-count">(${prod.reviewsCount})</span>
          </div>

          <div class="card-pricing-row">
            <span class="price-current">৳${prod.price.toLocaleString()}</span>
            <span class="price-original">৳${prod.originalPrice.toLocaleString()}</span>
            <span class="price-discount-pill">-${discountPercent}%</span>
          </div>

          <button class="btn-card-add" onclick="addToCart('${prod.id}', 1)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            Add to Bag
          </button>
        </div>
      </article>
    `;
  }).join('');
}

// ==========================================================
// CART ENGINE
// ==========================================================
function addToCart(productId, qty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = state.cart.findIndex(item => item.id === productId);

  if (existingIndex > -1) {
    state.cart[existingIndex].qty += qty;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      volume: product.volume,
      qty: qty
    });
  }

  saveCart();
  updateCartUI();
  bumpCartBadge();
  showToast(`Added "${product.name}" to bag ✨`);
  openCartDrawer();
}

function updateCartQty(productId, delta) {
  const itemIndex = state.cart.findIndex(i => i.id === productId);
  if (itemIndex === -1) return;

  state.cart[itemIndex].qty += delta;

  if (state.cart[itemIndex].qty <= 0) {
    state.cart.splice(itemIndex, 1);
  }

  saveCart();
  updateCartUI();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(i => i.id !== productId);
  saveCart();
  updateCartUI();
  showToast('Item removed from bag');
}

function saveCart() {
  localStorage.setItem('auraglow_cart', JSON.stringify(state.cart));
}

function updateCartUI() {
  const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // Update Header Counter
  if (elements.cartCounter) {
    elements.cartCounter.textContent = totalItems;
  }

  // Update Drawer Subtotal & Total
  if (elements.cartSubtotal) elements.cartSubtotal.textContent = `৳${subtotal.toLocaleString()}`;
  if (elements.cartTotal) elements.cartTotal.textContent = `৳${subtotal.toLocaleString()}`;

  // Update Free Shipping Bar
  if (elements.freeShippingBar && elements.freeShippingText) {
    if (subtotal >= state.freeDeliveryThreshold) {
      elements.freeShippingBar.style.width = '100%';
      elements.freeShippingText.innerHTML = '🎉 <strong>Congratulations!</strong> You unlocked <strong>FREE Delivery</strong>!';
    } else {
      const remaining = state.freeDeliveryThreshold - subtotal;
      const progressPercent = Math.min(100, Math.round((subtotal / state.freeDeliveryThreshold) * 100));
      elements.freeShippingBar.style.width = `${progressPercent}%`;
      elements.freeShippingText.innerHTML = `Add <strong>৳${remaining.toLocaleString()}</strong> more to get <strong>FREE Delivery</strong>!`;
    }
  }

  // Render Drawer Items List
  if (!elements.cartItemsList) return;

  if (state.cart.length === 0) {
    elements.cartItemsList.innerHTML = `
      <div class="empty-cart-view">
        <div class="empty-cart-icon">🛍️</div>
        <p style="font-weight: 700; color: var(--text-main);">Your bag is currently empty</p>
        <p style="font-size: 0.8125rem;">Explore our radiant skincare collection and treat yourself today.</p>
      </div>
    `;
    return;
  }

  elements.cartItemsList.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.name}</h4>
        <span class="cart-item-volume">${item.volume}</span>
        <span class="cart-item-price">৳${(item.price * item.qty).toLocaleString()}</span>
        <div class="qty-controls">
          <button class="btn-qty" onclick="updateCartQty('${item.id}', -1)">-</button>
          <span class="qty-display">${item.qty}</span>
          <button class="btn-qty" onclick="updateCartQty('${item.id}', 1)">+</button>
        </div>
      </div>
      <button class="btn-remove-item" onclick="removeFromCart('${item.id}')" aria-label="Remove item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    </div>
  `).join('');
}

function openCartDrawer() {
  elements.cartDrawer?.classList.add('open');
  elements.cartDrawerBackdrop?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  elements.cartDrawer?.classList.remove('open');
  elements.cartDrawerBackdrop?.classList.remove('open');
  document.body.style.overflow = '';
}

function bumpCartBadge() {
  if (elements.cartCounter) {
    elements.cartCounter.classList.add('bump');
    setTimeout(() => elements.cartCounter.classList.remove('bump'), 400);
  }
}

// ==========================================================
// QUICK VIEW MODAL
// ==========================================================
function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product || !elements.quickViewDialog) return;

  state.activeQuickViewProduct = product;

  elements.qvImage.src = product.image;
  elements.qvImage.alt = product.name;
  elements.qvBadge.textContent = product.badge;
  elements.qvTitle.textContent = product.name;
  elements.qvPrice.textContent = `৳${product.price.toLocaleString()}`;
  elements.qvOriginalPrice.textContent = `৳${product.originalPrice.toLocaleString()}`;
  elements.qvDesc.textContent = product.description;
  elements.qvIngredients.textContent = product.ingredients;
  elements.qvUsage.textContent = product.usage;
  elements.qvQtyInput.value = 1;

  elements.quickViewDialog.showModal();
}

// ==========================================================
// WISHLIST TOGGLE
// ==========================================================
function toggleWishlist(productId, event) {
  event?.stopPropagation();
  const index = state.wishlist.indexOf(productId);

  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast('Removed from wishlist');
  } else {
    state.wishlist.push(productId);
    showToast('Saved to wishlist ❤️');
  }

  localStorage.setItem('auraglow_wishlist', JSON.stringify(state.wishlist));
  renderProducts();
}

// ==========================================================
// CHECKOUT WORKFLOW
// ==========================================================
function openCheckoutDialog() {
  if (!elements.checkoutDialog) return;
  updateCheckoutRecap();
  elements.checkoutDialog.showModal();
}

function updateCheckoutRecap() {
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  let deliveryFee = state.deliveryArea === 'inside' ? 60 : 120;
  
  if (subtotal >= state.freeDeliveryThreshold) {
    deliveryFee = 0;
  }

  const grandTotal = subtotal + deliveryFee;

  if (elements.recapSubtotal) elements.recapSubtotal.textContent = `৳${subtotal.toLocaleString()}`;
  if (elements.recapDelivery) {
    elements.recapDelivery.textContent = deliveryFee === 0 ? 'FREE' : `৳${deliveryFee}`;
  }
  if (elements.recapTotal) elements.recapTotal.textContent = `৳${grandTotal.toLocaleString()}`;
}

function handleCheckoutSubmit(e) {
  e.preventDefault();

  const formData = new FormData(elements.checkoutForm);
  const fullName = formData.get('full_name');
  const phone = formData.get('phone');
  const address = formData.get('address');
  const deliveryArea = formData.get('delivery_area');
  const paymentMethod = formData.get('payment_method');

  // Simple validation
  if (!fullName || !phone || !address) {
    showToast('Please fill in all delivery details!');
    return;
  }

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const deliveryFee = (subtotal >= state.freeDeliveryThreshold) ? 0 : (deliveryArea === 'inside' ? 60 : 120);
  const grandTotal = subtotal + deliveryFee;

  // Generate realistic order code
  const randomOrderCode = 'GLOW-' + Math.floor(10000 + Math.random() * 90000);
  const orderDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Populate Success Modal
  if (elements.successOrderToken) elements.successOrderToken.textContent = `#${randomOrderCode}`;
  if (elements.successCustomerName) elements.successCustomerName.textContent = fullName;
  if (elements.successPhone) elements.successPhone.textContent = phone;
  if (elements.successAddress) elements.successAddress.textContent = address;
  if (elements.successTotal) elements.successTotal.textContent = `৳${grandTotal.toLocaleString()}`;
  if (elements.successDate) elements.successDate.textContent = orderDate;

  // Close Checkout Modal & Open Success Dialog
  elements.checkoutDialog?.close();
  elements.successDialog?.showModal();

  // Clear Cart
  state.cart = [];
  saveCart();
  updateCartUI();
  elements.checkoutForm?.reset();

  // Trigger celebration confetti
  triggerConfetti();
}

// ==========================================================
// TOAST NOTIFICATIONS
// ==========================================================
function showToast(message) {
  if (!elements.toastContainer) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>🌸</span> <span>${message}</span>`;

  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

// ==========================================================
// CELEBRATION CONFETTI
// ==========================================================
function triggerConfetti() {
  const colors = ['#C0956A', '#E7C9BC', '#D4AF37', '#1D1A18', '#842A38'];
  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.top = '-10px';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.width = Math.random() * 8 + 6 + 'px';
    confetti.style.height = Math.random() * 12 + 6 + 'px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.zIndex = '9999';
    confetti.style.borderRadius = '2px';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.pointerEvents = 'none';
    confetti.style.transition = `top ${Math.random() * 2 + 1.5}s cubic-bezier(0.25, 1, 0.5, 1), transform 2s ease-out, opacity 2.5s ease`;
    
    document.body.appendChild(confetti);

    requestAnimationFrame(() => {
      confetti.style.top = Math.random() * 80 + 20 + 'vh';
      confetti.style.transform = `rotate(${Math.random() * 720}deg) translateX(${Math.random() * 80 - 40}px)`;
      confetti.style.opacity = '0';
    });

    setTimeout(() => confetti.remove(), 2600);
  }
}
