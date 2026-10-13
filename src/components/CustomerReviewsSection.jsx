import React from 'react';
import { REVIEWS } from '../data/products';

export default function CustomerReviewsSection() {
  return (
    <section className="reviews-section" aria-label="Customer Testimonials">
      <div className="section-header">
        <span className="section-pill">Real Results</span>
        <h2 className="section-title">Loved by Thousands Across Bangladesh</h2>
        <p className="section-desc">
          Hear unfiltered feedback from skincare enthusiasts, corporate leaders, and beauty creators.
        </p>
      </div>

      <div className="reviews-grid">
        {REVIEWS.map((rev) => (
          <div key={rev.id} className="review-card">
            <div className="review-header">
              <div>
                <h4 className="review-author">{rev.name}</h4>
                <span className="review-role">{rev.role}</span>
              </div>
              {rev.verified && (
                <span className="review-verified">✓ Verified Client</span>
              )}
            </div>

            <div style={{ color: '#F5A623', fontSize: '0.875rem' }}>
              {"★".repeat(rev.rating)}
            </div>

            <p className="review-quote">
              "{rev.comment}"
            </p>

            <span className="review-product-tag">
              Purchased: {rev.product}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
