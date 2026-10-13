import React, { useState, useEffect } from 'react';

export default function QuickViewModal({ product, onClose, onAddToCart }) {
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setQty(1);
  }, [product]);

  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-inner-card quickview-card" onClick={(e) => e.stopPropagation()}>
        <button className="btn-modal-close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        <div className="quickview-grid">
          <div className="qv-image-box">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="qv-info-box">
            <span className="qv-badge">{product.badge}</span>
            <h3 className="qv-title">{product.name}</h3>

            <div className="card-pricing-row" style={{ marginBottom: 0 }}>
              <span className="price-current" style={{ fontSize: '1.5rem' }}>
                ৳{product.price.toLocaleString()}
              </span>
              <span className="price-original">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            </div>

            <p className="qv-desc">{product.description}</p>

            <div className="qv-ingredients">
              <p className="qv-meta-label">Key Active Ingredients</p>
              <p style={{ color: 'var(--text-secondary)' }}>{product.ingredients}</p>
            </div>

            <div className="qv-usage">
              <p className="qv-meta-label">Ritual & Usage</p>
              <p style={{ color: 'var(--text-secondary)' }}>{product.usage}</p>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '10px' }}>
              <div className="qty-controls" style={{ borderRadius: '12px', padding: '2px' }}>
                <button 
                  className="btn-qty" 
                  style={{ width: '36px', height: '36px' }}
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="qty-display" style={{ width: '36px' }}>{qty}</span>
                <button 
                  className="btn-qty" 
                  style={{ width: '36px', height: '36px' }}
                  onClick={() => setQty(q => Math.min(10, q + 1))}
                >
                  +
                </button>
              </div>

              <button 
                className="btn-card-add" 
                style={{ 
                  flex: 1, 
                  padding: '14px', 
                  background: 'linear-gradient(135deg, var(--gold-primary), var(--gold-dark))', 
                  color: '#FFF' 
                }}
                onClick={() => {
                  onAddToCart(product.id, qty);
                  onClose();
                }}
              >
                Add to Bag
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
