import React from 'react';
import { INGREDIENTS_SPOTLIGHT } from '../data/products';

export default function IngredientsSpotlight() {
  return (
    <section className="ingredients-section" aria-label="Ingredients Science">
      <div className="section-header">
        <span className="section-pill">Clinical Formulation</span>
        <h2 className="section-title">The Science of Botanical Actives</h2>
        <p className="section-desc">
          We combine time-tested botanical essences with dermatologist-grade bio-peptides for undeniable results.
        </p>
      </div>

      <div className="ingredients-grid">
        {INGREDIENTS_SPOTLIGHT.map((ing) => (
          <div key={ing.name} className="ingredient-card">
            <span className="ing-icon">{ing.icon}</span>
            <span className="ing-role">{ing.role}</span>
            <h3 className="ing-name">{ing.name}</h3>
            <p className="ing-benefit">{ing.benefit}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
