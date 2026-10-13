import React, { useState, useEffect } from 'react';
import { FLASH_BUNDLE } from '../data/products';

export default function FlashDealSection({ onAddToCart, onOpenQuickView }) {
  // 6 hour ticking countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 6, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format2Digits = (num) => String(num).padStart(2, '0');

  return (
    <section className="flash-sale-section" aria-label="Limited Flash Offer">
      <div className="flash-sale-card">
        
        <div className="flash-content">
          <span className="flash-badge-pill">⚡ {FLASH_BUNDLE.badge}</span>
          
          <h2 className="flash-title">
            {FLASH_BUNDLE.name}
          </h2>

          <p className="flash-tagline">
            {FLASH_BUNDLE.tagline}
          </p>

          {/* Live Countdown */}
          <div className="countdown-timer-group">
            <div className="timer-box">
              <span className="timer-digits">{format2Digits(timeLeft.hours)}</span>
              <span className="timer-label">Hours</span>
            </div>
            <div className="timer-box">
              <span className="timer-digits">{format2Digits(timeLeft.minutes)}</span>
              <span className="timer-label">Mins</span>
            </div>
            <div className="timer-box">
              <span className="timer-digits">{format2Digits(timeLeft.seconds)}</span>
              <span className="timer-label">Secs</span>
            </div>
          </div>

          <div className="flash-pricing">
            <span className="flash-price-now">৳{FLASH_BUNDLE.dealPrice.toLocaleString()}</span>
            <span className="flash-price-old">৳{FLASH_BUNDLE.regularPrice.toLocaleString()}</span>
            <span className="flash-save-badge">Save ৳{FLASH_BUNDLE.savings.toLocaleString()}</span>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button 
              className="btn-primary-glow" 
              onClick={() => onAddToCart(FLASH_BUNDLE.id, 1)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              Claim Bundle Offer
            </button>

            <button 
              className="btn-secondary-outline"
              onClick={() => onOpenQuickView(FLASH_BUNDLE.id)}
            >
              View Bundle Details
            </button>
          </div>
        </div>

        <div className="flash-image-wrap">
          <img 
            src={FLASH_BUNDLE.image} 
            alt={FLASH_BUNDLE.name} 
          />
        </div>

      </div>
    </section>
  );
}
