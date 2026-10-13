import React from 'react';

export default function ProductCard({ 
  product, 
  isWishlisted, 
  onToggleWishlist, 
  onOpenQuickView, 
  onAddToCart 
}) {
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <article className="product-card" data-id={product.id}>
      <div className="card-image-wrap">
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy" 
        />
        <span className="card-badge">{product.badge}</span>
        
        <button 
          className={`btn-wishlist ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          aria-label="Add to Wishlist"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        <div className="card-overlay-actions">
          <button 
            className="btn-quick-view" 
            onClick={() => onOpenQuickView(product.id)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            Quick View
          </button>
        </div>
      </div>

      <div className="card-content">
        <span className="card-category">{product.category}</span>
        <h3 className="card-title">{product.name}</h3>
        
        <div className="card-rating">
          <span className="rating-stars">★★★★★</span>
          <span className="rating-count">({product.reviewsCount})</span>
        </div>

        <div className="card-pricing-row">
          <span className="price-current">৳{product.price.toLocaleString()}</span>
          <span className="price-original">৳{product.originalPrice.toLocaleString()}</span>
          <span className="price-discount-pill">-{discountPercent}%</span>
        </div>

        <button 
          className="btn-card-add" 
          onClick={() => onAddToCart(product.id, 1)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          Add to Bag
        </button>
      </div>
    </article>
  );
}
