import React from 'react';

export default function HeroSection({ onOpenQuickView }) {
  return (
    <section className="hero-section" aria-label="Featured Collection">
      <div className="hero-banner">
        
        <div className="hero-content">
          <div className="hero-pill">
            <span>✨</span> 100% Organic Botanical Extracts & Clinical Peptides
          </div>

          <h1 className="hero-title">
            Reveal Your Skin's <em>Luminous</em> Pure Radiance
          </h1>

          <p className="hero-subtitle">
            Crafted for discerning beauty lovers. Formulated with triple-weight hyaluronic acids, 24K botanical elixirs, and dermatological bio-peptides for everlasting glass skin.
          </p>

          <div className="hero-cta-group">
            <a href="#collection" className="btn-primary-glow">
              Explore Collection
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <button className="btn-secondary-outline" onClick={() => onOpenQuickView('prod-1')}>
              <span>✦</span> Bestseller Preview
            </button>
          </div>

          <div className="hero-metrics">
            <div className="metric-item">
              <span className="metric-number">98.4%</span>
              <span className="metric-label">Reported Glow</span>
            </div>
            <div className="metric-item">
              <span className="metric-number">24K+</span>
              <span className="metric-label">Happy Clients</span>
            </div>
            <div className="metric-item">
              <span className="metric-number">0%</span>
              <span className="metric-label">Toxins & Cruelty</span>
            </div>
          </div>
        </div>

        <div className="hero-image-wrap">
          <img 
            src="/assets/images/hero_beauty.jpg" 
            alt="Glowing luxury skin model" 
            loading="eager" 
          />
          
          <div className="floating-review-card">
            <div className="review-avatar-group">
              <div className="review-avatar">S</div>
              <div className="review-avatar">R</div>
              <div className="review-avatar">N</div>
            </div>
            <div className="review-text-wrap">
              <span className="review-stars">★★★★★</span>
              <span className="review-caption">Rated 4.9/5 by 2,400+ clients</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
