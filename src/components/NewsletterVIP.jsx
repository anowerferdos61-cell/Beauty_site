import React, { useState } from 'react';

export default function NewsletterVIP({ onShowToast }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    onShowToast('Welcome to the VIP Club! Use code GLOW10 for 10% off ✨');
    setEmail('');
  };

  return (
    <section className="newsletter-section" aria-label="VIP Beauty Club">
      <div className="newsletter-card">
        <span className="section-pill">Aura VIP Concierge</span>
        <h2 className="newsletter-title">Join The Glow Collective</h2>
        <p className="newsletter-desc">
          Subscribe for bespoke skincare regimens, priority access to seasonal batch releases, and an instant ৳200 welcome voucher.
        </p>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Enter your email address..." 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Join Privé</button>
        </form>
      </div>
    </section>
  );
}
