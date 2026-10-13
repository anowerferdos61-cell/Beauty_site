import React from 'react';
import { CATEGORIES } from '../data/categories';

export default function Header({ 
  cartCount, 
  onOpenCart, 
  searchQuery, 
  onSearchChange,
  activeCategory, 
  onSelectCategory,
  wishlistCount
}) {
  return (
    <>
      {/* Main Header */}
      <header className="site-header">
        <div className="header-container">
          
          {/* Brand Logo */}
          <a href="#" className="brand-logo" aria-label="Aura & Glow Home">
            <span className="brand-name">
              AURA & GLOW
              <span className="logo-sparkle">✦</span>
            </span>
            <span className="brand-tagline">PARIS &bull; DHAKA</span>
          </a>

          {/* Search Bar */}
          <div className="nav-search-bar">
            <span className="nav-search-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Search serums, creams, fragrances..." 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              autoComplete="off"
            />
          </div>

          {/* Actions */}
          <div className="header-actions">
            {/* Wishlist Pill/Counter */}
            <div className="btn-header-action" title="Saved Wishlist" aria-label="Wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlistCount > 0 ? "#E53935" : "none"} stroke={wishlistCount > 0 ? "#E53935" : "currentColor"} strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {wishlistCount > 0 && (
                <span className="cart-counter-badge" style={{ background: '#E53935' }}>
                  {wishlistCount}
                </span>
              )}
            </div>

            {/* Shopping Bag / Cart Button */}
            <button 
              className="btn-header-action" 
              onClick={onOpenCart} 
              aria-label="Shopping Bag"
              title="View Shopping Bag"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span className="cart-counter-badge">
                {cartCount}
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* Sticky Navbar Category Bar — Stays fixed at the top during scroll */}
      <nav className="sticky-category-nav" aria-label="Categories Sticky Navigation">
        <div className="category-nav-container">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                className={`nav-cat-pill ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onSelectCategory(cat.id);
                  const el = document.getElementById('collection');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className="nav-cat-badge">{cat.badge}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
