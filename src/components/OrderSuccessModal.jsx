import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function OrderSuccessModal({ order, onClose }) {
  useEffect(() => {
    if (order) {
      // Fire celebration confetti!
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C0956A', '#E7C9BC', '#D4AF37', '#1D1A18', '#842A38']
        });
      } catch (err) {
        // fallback silent
      }
    }
  }, [order]);

  if (!order) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-inner-card success-card" onClick={(e) => e.stopPropagation()}>
        <div className="success-body">
          
          <div className="success-icon-badge">✓</div>
          
          <h3 className="success-title">অর্ডার সফল হয়েছে!</h3>
          <p className="success-msg">
            ধন্যবাদ! আপনার অর্ডারটি গ্রহণ করা হয়েছে। আমাদের কাস্টমার কেয়ার প্রতিনিধি শীঘ্রই আপনাকে ফোন করে অর্ডারটি কনফার্ম করবেন।
          </p>

          {/* Digital Invoice Slip */}
          <div className="invoice-slip">
            <div className="slip-header">
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                ORDER RECEIPT
              </span>
              <span className="order-token">#{order.orderId}</span>
            </div>

            <div className="slip-detail-row">
              <span>গ্রাহকের নাম:</span>
              <strong>{order.customerName}</strong>
            </div>

            <div className="slip-detail-row">
              <span>মোবাইল নম্বর:</span>
              <strong>{order.phone}</strong>
            </div>

            <div className="slip-detail-row">
              <span>ডেলিভারি ঠিকানা:</span>
              <strong style={{ textAlign: 'right', maxWidth: '220px' }}>{order.address}</strong>
            </div>

            <div className="slip-detail-row">
              <span>ডেলিভারি এরিয়া:</span>
              <span>{order.deliveryArea} ({order.deliveryFee === 0 ? 'FREE' : `৳${order.deliveryFee}`})</span>
            </div>

            <div className="slip-detail-row">
              <span>পেমেন্ট মাধ্যম:</span>
              <span>{order.paymentMethod}</span>
            </div>

            <div className="slip-detail-row">
              <span>তারিখ:</span>
              <span>{order.date}</span>
            </div>

            <div className="slip-detail-row" style={{ borderTop: '1px dashed rgba(192, 149, 106, 0.3)', paddingTop: '8px', marginTop: '4px' }}>
              <span style={{ fontWeight: 700 }}>সর্বমোট টাকা:</span>
              <strong style={{ color: 'var(--gold-dark)', fontSize: '1.15rem' }}>
                ৳{order.grandTotal.toLocaleString()}
              </strong>
            </div>
          </div>

          <button className="btn-continue-shopping" onClick={onClose}>
            আরও কেনাকাটা করুন (Continue Shopping)
          </button>

        </div>
      </div>
    </div>
  );
}
