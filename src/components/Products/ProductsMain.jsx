import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import productsData from './productsData';
import { useCheckout } from '../../context/CheckoutContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const ProductsMain = () => {
  const { initializeCheckout } = useCheckout();
  const navigate = useNavigate();
  const [floatingCart, setFloatingCart] = useState({ count: 0, total: 0 });

  // Sync floating bar variables instantly from local cache memory
  const updateFloatingBar = () => {
    try {
      const savedCart = localStorage.getItem('ss_collection_persistent_cart');
      if (savedCart) {
        const items = JSON.parse(savedCart);
        const count = items.reduce((acc, item) => acc + item.quantity, 0);
        const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setFloatingCart({ count, total });
      } else {
        setFloatingCart({ count: 0, total: 0 });
      }
    } catch (e) {
      setFloatingCart({ count: 0, total: 0 });
    }
  };

  useEffect(() => {
    updateFloatingBar();
    window.addEventListener('storage', updateFloatingBar);
    const interval = setInterval(updateFloatingBar, 800); // Periodic intervals fetch hook
    return () => {
      window.removeEventListener('storage', updateFloatingBar);
      clearInterval(interval);
    };
  }, []);

  const handleAddToCart = (product) => {
    if (!product) return;
    
    const standardProduct = {
      ...product,
      mrp: product.originalPrice || product.price * 1.25,
      sizes: product.sizes || [{ label: "Free Size", available: true }],
      colors: product.colors || [{ name: "Standard Color" }],
      stock: product.stock || { count: 10 }
    };
    
    try {
      const savedCart = localStorage.getItem('ss_collection_persistent_cart');
      let currentItems = savedCart ? JSON.parse(savedCart) : [];
      
      const exists = currentItems.find(item => item.id === standardProduct.id);
      if (exists) {
        currentItems = currentItems.map(item => 
          item.id === standardProduct.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        currentItems.push({ ...standardProduct, quantity: 1 });
      }
      
      localStorage.setItem('ss_collection_persistent_cart', JSON.stringify(currentItems));
      updateFloatingBar();
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.error(e);
    }
    
    initializeCheckout(standardProduct, { quantity: 1 });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 relative">
      <div className="mb-8 flex flex-col items-center text-center sm:mb-10">
        <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
          SS Collection
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Featured Products
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productsData.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>

      {/* FIXED UPGRADE: Amazon/Blinkit Style Floating Bottom Action Sheet */}
      {floatingCart.count > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center justify-between animate-slide-up border border-emerald-500 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-700 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-medium text-emerald-100">{floatingCart.count} Items Added</p>
              <p className="text-sm font-black tracking-tight">₹{floatingCart.total}</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/cart')}
            className="flex items-center gap-1 bg-white text-emerald-700 font-bold px-4 py-2 rounded-lg text-xs hover:bg-neutral-50 transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            View Cart <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductsMain;