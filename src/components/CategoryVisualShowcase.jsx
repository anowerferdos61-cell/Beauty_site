import React from 'react';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';

export default function CategoryVisualShowcase({ onSelectCategory }) {
  // Count items per category
  const getCount = (catId) => {
    if (catId === 'all') return PRODUCTS.length;
    return PRODUCTS.filter(p => p.category === catId).length;
  };

  return (
    <section className="category-visual-section" aria-label="Visual Categories">
      <div className="section-header" style={{ marginBottom: '28px' }}>
        <span className="section-pill">Bespoke Rituals</span>
        <h2 className="section-title" style={{ fontSize: '1.875rem' }}>Explore By Skin Ritual</h2>
      </div>

      <div className="visual-cat-grid">
        {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
          <div 
            key={cat.id} 
            className="visual-cat-card"
            onClick={() => {
              onSelectCategory(cat.id);
              const el = document.getElementById('collection');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="visual-cat-icon">
              {cat.icon}
            </div>
            <h3 className="visual-cat-name">{cat.name}</h3>
            <span className="visual-cat-count">{getCount(cat.id)} Formulations</span>
          </div>
        ))}
      </div>
    </section>
  );
}
