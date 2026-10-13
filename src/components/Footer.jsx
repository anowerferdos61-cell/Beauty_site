import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        
        <div className="footer-brand">
          <h3>AURA & GLOW</h3>
          <p>
            Dedicated to luxury botanical formulations, sustainable glass vessels, and dermatologist-tested clinical efficacy. Made for timeless confidence.
          </p>
        </div>

        <div className="footer-col">
          <h4>Customer Care</h4>
          <ul className="footer-links">
            <li><a href="#collection">Order Tracking</a></li>
            <li><a href="#collection">Shipping & Delivery Policies</a></li>
            <li><a href="#collection">Beauty Consultant Hotline: +880 1700-000000</a></li>
            <li><a href="#collection">Boutique Locations: Gulshan & Banani</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Client Demo Notice</h4>
          <p style={{ fontSize: '0.8125rem', color: '#9A9188', lineHeight: 1.6 }}>
            This React web application is designed specifically for pitching luxury beauty and cosmetic e-commerce solutions with a seamless 1-click cash-on-delivery checkout flow.
          </p>
          <div style={{ marginTop: '14px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px' }}>Cash on Delivery</span>
            <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px' }}>bKash</span>
            <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px' }}>Nagad</span>
            <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px' }}>Visa / MC</span>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AURA & GLOW Cosmetics Ltd. All rights reserved.</p>
        <p>Built with React & Vanilla CSS for Ultra-Luxury E-Commerce</p>
      </div>
    </footer>
  );
}
