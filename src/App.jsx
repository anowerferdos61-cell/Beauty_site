import React, { useState, useEffect } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FlashDealSection from './components/FlashDealSection';
import CategoryVisualShowcase from './components/CategoryVisualShowcase';
import ProductCatalogSection from './components/ProductCatalogSection';
import SkincareRitualGuide from './components/SkincareRitualGuide';
import IngredientsSpotlight from './components/IngredientsSpotlight';
import CustomerReviewsSection from './components/CustomerReviewsSection';
import TrustGuarantees from './components/TrustGuarantees';
import NewsletterVIP from './components/NewsletterVIP';
import Footer from './components/Footer';

import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import ToastContainer from './components/ToastContainer';

import { PRODUCTS } from './data/products';

export default function App() {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('auraglow_react_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('auraglow_react_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  // Toasts
  const [toasts, setToasts] = useState([]);

  const freeDeliveryThreshold = 1500;

  // Persist cart
  useEffect(() => {
    localStorage.setItem('auraglow_react_cart', JSON.stringify(cart));
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    localStorage.setItem('auraglow_react_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Show Toast
  const showToast = (message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  // Cart operations
  const addToCart = (productId, qty = 1) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    setCart((prev) => {
      const index = prev.findIndex((item) => item.id === productId);
      if (index > -1) {
        const next = [...prev];
        next[index] = { ...next[index], qty: next[index].qty + qty };
        return next;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            volume: product.volume,
            qty
          }
        ];
      }
    });

    showToast(`Added "${product.name}" to bag ✨`);
    setIsCartOpen(true);
  };

  const updateCartQty = (productId, delta) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === productId) {
            return { ...item, qty: item.qty + delta };
          }
          return item;
        })
        .filter((item) => item.qty > 0);
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    showToast('Item removed from bag');
  };

  // Wishlist toggle
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to wishlist ❤️');
        return [...prev, productId];
      }
    });
  };

  // Quick view handler
  const handleOpenQuickView = (productId) => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    if (prod) {
      setQuickViewProduct(prod);
    }
  };

  // Checkout flow
  const handleProceedCheckout = () => {
    if (cart.length === 0) {
      showToast('Your bag is empty! Add a formulation first.');
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (orderData) => {
    setCompletedOrder(orderData);
    setIsCheckoutOpen(false);
    setCart([]); // Clear cart after successful order
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="aura-glow-app">
      {/* Top Banner */}
      <AnnouncementBar />

      {/* Main Header & Sticky Categories Navbar */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        wishlistCount={wishlist.length}
      />

      <main>
        {/* 1. Hero Showcase */}
        <HeroSection onOpenQuickView={handleOpenQuickView} />

        {/* 2. Limited-Time Flash Bundle with Live Timer */}
        <FlashDealSection 
          onAddToCart={addToCart} 
          onOpenQuickView={handleOpenQuickView} 
        />

        {/* 3. Visual Categories Circular Showcase */}
        <CategoryVisualShowcase 
          onSelectCategory={setActiveCategory} 
        />

        {/* 4. Complete Product Catalog Section */}
        <ProductCatalogSection
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onOpenQuickView={handleOpenQuickView}
          onAddToCart={addToCart}
        />

        {/* 5. 4-Step Skincare Routine Layering Guide */}
        <SkincareRitualGuide onOpenQuickView={handleOpenQuickView} />

        {/* 6. Clinical & Botanical Actives Science */}
        <IngredientsSpotlight />

        {/* 7. Client Reviews & Social Proof */}
        <CustomerReviewsSection />

        {/* 8. Brand Guarantees & Trust Badges */}
        <TrustGuarantees />

        {/* 9. VIP Newsletter Sign up */}
        <NewsletterVIP onShowToast={showToast} />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={updateCartQty}
        onRemove={removeFromCart}
        freeDeliveryThreshold={freeDeliveryThreshold}
        onProceedCheckout={handleProceedCheckout}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
      />

      {/* One-Page Instant Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        freeDeliveryThreshold={freeDeliveryThreshold}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Success Confirmation & Receipt */}
      <OrderSuccessModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} />
    </div>
  );
}
