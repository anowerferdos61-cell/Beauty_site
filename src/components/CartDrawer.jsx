import React from 'react';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemove,
  freeDeliveryThreshold,
  onProceedCheckout
}) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const remainingForFreeShipping = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <>
      <div 
        className={`cart-drawer-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      <aside className={`cart-drawer ${isOpen ? 'open' : ''}`} aria-label="Shopping Cart">
        <div className="drawer-header">
          <h3 className="drawer-title">
            <span>Shopping Bag</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--gold-dark)' }}>🌸</span>
          </h3>
          <button className="btn-drawer-close" onClick={onClose} aria-label="Close Shopping Bag">
            &times;
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="free-shipping-card">
          <p className="shipping-progress-text">
            {subtotal >= freeDeliveryThreshold ? (
              <span>🎉 <strong>Congratulations!</strong> You unlocked <strong>FREE Delivery</strong>!</span>
            ) : (
              <span>Add <strong>৳{remainingForFreeShipping.toLocaleString()}</strong> more to get <strong>FREE Delivery</strong>!</span>
            )}
          </p>
          <div className="shipping-progress-track">
            <div 
              className="shipping-progress-bar" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="drawer-items-list">
          {cart.length === 0 ? (
            <div className="empty-cart-view">
              <div className="empty-cart-icon">🛍️</div>
              <p style={{ fontWeight: 700, color: 'var(--text-main)' }}>Your bag is currently empty</p>
              <p style={{ fontSize: '0.8125rem' }}>Explore our radiant skincare formulations and treat yourself today.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-thumb" />
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{item.name}</h4>
                  <span className="cart-item-volume">{item.volume}</span>
                  <span className="cart-item-price">৳{(item.price * item.qty).toLocaleString()}</span>
                  <div className="qty-controls">
                    <button className="btn-qty" onClick={() => onUpdateQty(item.id, -1)}>-</button>
                    <span className="qty-display">{item.qty}</span>
                    <button className="btn-qty" onClick={() => onUpdateQty(item.id, 1)}>+</button>
                  </div>
                </div>
                <button 
                  className="btn-remove-item" 
                  onClick={() => onRemove(item.id)} 
                  aria-label="Remove item"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>৳{subtotal.toLocaleString()}</strong>
            </div>
            <div className="summary-row">
              <span>Estimated Delivery</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                {subtotal >= freeDeliveryThreshold ? 'FREE' : '৳60 - ৳120'}
              </span>
            </div>
            <div className="summary-row total-row">
              <span>Total Amount</span>
              <span style={{ color: 'var(--gold-dark)' }}>৳{subtotal.toLocaleString()}</span>
            </div>

            <button className="btn-checkout-trigger" onClick={onProceedCheckout}>
              <span>Proceed to Instant Order</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
