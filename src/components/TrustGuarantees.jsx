import React from 'react';

export default function TrustGuarantees() {
  return (
    <section className="trust-strip" aria-label="Store Guarantees">
      <div className="trust-grid">
        <div className="trust-item">
          <div className="trust-icon-box">🛡️</div>
          <div className="trust-content">
            <h4>100% Authentic</h4>
            <p>Guaranteed genuine imported skincare</p>
          </div>
        </div>

        <div className="trust-item">
          <div className="trust-icon-box">🚚</div>
          <div className="trust-content">
            <h4>Express Delivery</h4>
            <p>Within 24-48 hours across Bangladesh</p>
          </div>
        </div>

        <div className="trust-item">
          <div className="trust-icon-box">💵</div>
          <div className="trust-content">
            <h4>Cash on Delivery</h4>
            <p>Inspect products right at your doorstep</p>
          </div>
        </div>

        <div className="trust-item">
          <div className="trust-icon-box">🌿</div>
          <div className="trust-content">
            <h4>Clean Formulas</h4>
            <p>Dermatologically tested & cruelty-free</p>
          </div>
        </div>
      </div>
    </section>
  );
}
