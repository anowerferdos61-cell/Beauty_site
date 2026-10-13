import React, { useState } from 'react';

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  freeDeliveryThreshold,
  onOrderSuccess
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    deliveryArea: 'inside', // 'inside' or 'outside'
    paymentMethod: 'cod'    // 'cod' or 'bkash'
  });

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  let deliveryFee = formData.deliveryArea === 'inside' ? 60 : 120;
  if (subtotal >= freeDeliveryThreshold) {
    deliveryFee = 0;
  }
  const grandTotal = subtotal + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert('Please fill out all required delivery fields.');
      return;
    }

    const orderData = {
      orderId: 'GLOW-' + Math.floor(10000 + Math.random() * 90000),
      customerName: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      deliveryArea: formData.deliveryArea === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka',
      paymentMethod: formData.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'bKash / Nagad',
      subtotal,
      deliveryFee,
      grandTotal,
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    onOrderSuccess(orderData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-inner-card checkout-card" onClick={(e) => e.stopPropagation()}>
        <button className="btn-modal-close" onClick={onClose} aria-label="Close dialog">
          &times;
        </button>

        <div className="checkout-header">
          <h3>Quick Checkout (দ্রুত অর্ডার করুন)</h3>
          <p>অর্ডারটি কনফার্ম করতে অনুগ্রহ করে আপনার সঠিক ডেলিভারি তথ্য দিন।</p>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="fullName">আপনার পুরো নাম (Full Name) *</label>
            <input 
              type="text" 
              id="fullName" 
              placeholder="যেমন: আয়েশা রহমান / Ayesha Rahman" 
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">মোবাইল নম্বর (Phone Number) *</label>
            <input 
              type="tel" 
              id="phone" 
              placeholder="017XXXXXXXX" 
              pattern="01[3-9][0-9]{8}"
              title="অনুগ্রহ করে ১১ ডিজিটের সঠিক মোবাইল নম্বর দিন"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">ডেলিভারির সম্পূর্ণ ঠিকানা (Delivery Address) *</label>
            <textarea 
              id="address" 
              rows="2" 
              placeholder="বাড়ি/ফ্ল্যাট নম্বর, রোড, এলাকা, থানা ও জেলা..."
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>

          {/* Delivery Area Option */}
          <div className="form-group">
            <label>ডেলিভারি এলাকা (Delivery Area) *</label>
            <div className="radio-tiles-group">
              <label 
                className={`radio-tile ${formData.deliveryArea === 'inside' ? 'selected' : ''}`}
                onClick={() => setFormData({ ...formData, deliveryArea: 'inside' })}
              >
                <div>
                  <span className="radio-tile-title">ঢাকার ভিতরে (Inside Dhaka)</span>
                  <span className="radio-tile-desc">ডেলিভারি চার্জ: {subtotal >= freeDeliveryThreshold ? 'FREE' : '৳৬০'} (২৪-৪৮ ঘণ্টা)</span>
                </div>
              </label>

              <label 
                className={`radio-tile ${formData.deliveryArea === 'outside' ? 'selected' : ''}`}
                onClick={() => setFormData({ ...formData, deliveryArea: 'outside' })}
              >
                <div>
                  <span className="radio-tile-title">ঢাকার বাইরে (Outside Dhaka)</span>
                  <span className="radio-tile-desc">ডেলিভারি চার্জ: {subtotal >= freeDeliveryThreshold ? 'FREE' : '৳১২০'} (২-৩ দিন)</span>
                </div>
              </label>
            </div>
          </div>

          {/* Payment Method Option */}
          <div className="form-group">
            <label>পেমেন্ট মেথড (Payment Method)</label>
            <div className="radio-tiles-group">
              <label 
                className={`radio-tile ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}
                onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
              >
                <div>
                  <span className="radio-tile-title">Cash on Delivery</span>
                  <span className="radio-tile-desc">পণ্য হাতে পেয়ে টাকা দিন</span>
                </div>
              </label>

              <label 
                className={`radio-tile ${formData.paymentMethod === 'bkash' ? 'selected' : ''}`}
                onClick={() => setFormData({ ...formData, paymentMethod: 'bkash' })}
              >
                <div>
                  <span className="radio-tile-title">bKash / Nagad</span>
                  <span className="radio-tile-desc">অনলাইন ডেমো পেমেন্ট</span>
                </div>
              </label>
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="checkout-recap-box">
            <div className="recap-row">
              <span>পণ্যগুলোর মোট মূল্য (Subtotal):</span>
              <strong>৳{subtotal.toLocaleString()}</strong>
            </div>
            <div className="recap-row">
              <span>ডেলিভারি চার্জ (Delivery Fee):</span>
              <span>{deliveryFee === 0 ? 'FREE' : `৳${deliveryFee}`}</span>
            </div>
            <div className="recap-row recap-total">
              <span>সর্বমোট পরিশোধযোগ্য (Grand Total):</span>
              <span style={{ color: 'var(--gold-dark)' }}>৳{grandTotal.toLocaleString()}</span>
            </div>
          </div>

          <button type="submit" className="btn-confirm-order">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            অর্ডার কনফার্ম করুন (Confirm Order)
          </button>

        </form>
      </div>
    </div>
  );
}
