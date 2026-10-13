import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../data/products';

export default function ProductCatalogSection({
  activeCategory,
  searchQuery,
  wishlist,
  onToggleWishlist,
  onOpenQuickView,
  onAddToCart
}) {
  const [sortBy, setSortBy] = useState('featured');

  // Filter products
  let filtered = PRODUCTS.filter((prod) => {
    const matchCat = activeCategory === 'all' || prod.category === activeCategory;
    const matchSearch = !searchQuery || 
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      prod.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // Sort products
  if (sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <section className="section-products" id="collection" aria-label="Curated Products">
      <div className="section-header">
        <span className="section-pill">Our Formulations</span>
        <h2 className="section-title">The Radiance Ritual Collection</h2>
        <p className="section-desc">
          Experience clinical potency and organic indulgence designed to rejuvenate, firm, and glaze your complexion.
        </p>
      </div>

      {/* Catalog Toolbar */}
      <div className="catalog-toolbar">
        <div className="catalog-count-info">
          Showing <strong>{filtered.length}</strong> formulations 
          {searchQuery && <span> for "<em>{searchQuery}</em>"</span>}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label htmlFor="catalogSort" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Sort by:</label>
          <select 
            id="catalogSort" 
            className="catalog-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Featured & Best Selling</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated ★</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>No products found</p>
          <p style={{ fontSize: '0.875rem' }}>Try clearing your search query or switching categories.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              isWishlisted={wishlist.includes(prod.id)}
              onToggleWishlist={onToggleWishlist}
              onOpenQuickView={onOpenQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
}
