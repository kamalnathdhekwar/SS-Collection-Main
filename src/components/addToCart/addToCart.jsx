import React, { useState, useEffect } from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { FaShoppingCart, FaTrashAlt, FaTag, FaShieldAlt, FaBroom } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function AddToCart() {
  const { 
    selectedProduct, 
    quantity, 
    resetCheckout,
    couponCode,
    applyCoupon,
    removeCoupon,
    couponError,
    appliedCoupon
  } = useCheckout();
  
  const navigate = useNavigate();

  // Load existing basket rows inside persistent storage matrix
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('ss_collection_persistent_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // Track state session changes securely without collision overrides
  useEffect(() => {
    if (selectedProduct) {
      setCartItems((prevItems) => {
        const exists = prevItems.find(item => item.id === selectedProduct.id);
        let updatedItems;
        
        if (exists) {
          updatedItems = prevItems.map(item => 
            item.id === selectedProduct.id ? { ...item, quantity: item.quantity + quantity } : item
          );
        } else {
          updatedItems = [...prevItems, { ...selectedProduct, quantity: quantity }];
        }
        
        localStorage.setItem('ss_collection_persistent_cart', JSON.stringify(updatedItems));
        return updatedItems;
      });
      
      resetCheckout(); // Release the context hold lock safely
    }
  }, [selectedProduct, quantity, resetCheckout]);

  const updateLocalQty = (id, delta) => {
    setCartItems(prev => {
      const updated = prev.map(item => {
        if (item.id === id) {
          return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
      });
      localStorage.setItem('ss_collection_persistent_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const removeLocalItem = (id) => {
    setCartItems(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem('ss_collection_persistent_cart', JSON.stringify(updated));
      return updated;
    });
  };

  // FIXED UPGRADE: Clear Entire Basket feature for flexible demo restarts
  const clearFullCart = () => {
    localStorage.removeItem('ss_collection_persistent_cart');
    setCartItems([]);
    resetCheckout();
  };

  // ACCUMULATIVE CALCULATIONS
  const totalUnits = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const aggregateSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const aggregateMrpPrice = cartItems.reduce((acc, item) => {
    const baseMrp = item.mrp || item.originalPrice || item.price * 1.25;
    return acc + (baseMrp * item.quantity);
  }, 0);

  const productDiscount = Math.max(0, aggregateMrpPrice - aggregateSubtotal);
  
  let couponDiscountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === "percentage") {
      couponDiscountAmount = Math.round((aggregateSubtotal * appliedCoupon.discount) / 100);
    } else {
      couponDiscountAmount = appliedCoupon.discount;
    }
  }

  const ultimateTotalDiscount = Math.round(productDiscount + couponDiscountAmount);
  const grandTotal = Math.max(0, aggregateMrpPrice - ultimateTotalDiscount);

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const code = formData.get('couponCodeSlot');
    applyCoupon(code);
  };

  if (cartItems.length === 0) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-white px-4 pt-32 pb-12 font-sans">
        <div className="p-6 bg-slate-50 rounded-full mb-4 border border-slate-100">
          <FaShoppingCart className="text-4xl text-slate-300" />
        </div>
        <h1 className="text-xl font-bold text-slate-800">Your Cart is Empty</h1>
        <p className="text-xs text-slate-500 mt-1 max-w-xs text-center">Explore our trending assets to stack selections.</p>
        <button onClick={() => navigate('/')} className="mt-6 px-6 py-2.5 bg-neutral-900 text-white font-medium text-xs rounded transition-all active:scale-95 cursor-pointer">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-32 pb-16 px-4 md:px-6 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Title Section with Clear Trigger */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-200 pb-4">
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FaShoppingCart className="text-neutral-800 text-lg" /> 
            Shopping Basket <span className="text-sm font-normal text-slate-500">({totalUnits} items loaded)</span>
          </h1>
          <button 
            onClick={clearFullCart}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition-all active:scale-95 cursor-pointer"
          >
            <FaBroom /> Clear Entire Basket
          </button>
        </div>

        {/* RESPONSIVE LAYOUT GRID: Stacks vertically on mobile, double column layout on desktop screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Block - Items Stacked Cards Rows */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg border border-slate-100 bg-slate-50 flex-shrink-0"
                />
                
                <div className="flex-grow space-y-1 w-full min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-bold text-slate-900 text-sm md:text-base truncate">{item.name}</h2>
                    <button 
                      onClick={() => removeLocalItem(item.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                    >
                      <FaTrashAlt className="text-xs md:text-sm" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Category: {item.category || "Premium Segment"}</p>
                  
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-sm md:text-base font-black text-slate-900">₹{item.price}</span>
                    <span className="text-xs line-through text-slate-400">₹{Math.round(item.mrp || item.originalPrice || item.price * 1.25)}</span>
                  </div>

                  {/* Tactile Counter Increments Block */}
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-xs text-slate-500 font-bold">Qty:</span>
                    <div className="flex items-center border border-slate-300 rounded bg-white shadow-inner">
                      <button onClick={() => updateLocalQty(item.id, -1)} className="px-2 py-0.5 text-xs font-bold border-r border-slate-200 hover:bg-slate-100 active:bg-slate-200 cursor-pointer text-slate-600">-</button>
                      <span className="px-3 text-xs font-bold text-slate-900 select-none">{item.quantity}</span>
                      <button onClick={() => updateLocalQty(item.id, 1)} className="px-2 py-0.5 text-xs font-bold border-l border-slate-200 hover:bg-slate-100 active:bg-slate-200 cursor-pointer text-slate-600">+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Block - Price Breakdown Summary Ledger Box */}
          <div className="space-y-4">
            
            {/* Promo Voucher block */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><FaTag /> Promotional Coupons</h3>
              {!appliedCoupon ? (
                <form onSubmit={handleCouponSubmit} className="flex gap-2">
                  <input 
                    type="text" 
                    name="couponCodeSlot"
                    placeholder="Enter Coupon (e.g. SAVE10)" 
                    defaultValue={couponCode}
                    className="flex-1 px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none uppercase font-mono tracking-wider text-slate-900 bg-white"
                  />
                  <button type="submit" className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded active:scale-95 cursor-pointer">Apply</button>
                </form>
              ) : (
                <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-200 rounded text-xs">
                  <span className="font-mono font-bold text-emerald-800">✓ CODE {couponCode} ACTIVE</span>
                  <button onClick={removeCoupon} className="text-emerald-700 font-bold hover:underline cursor-pointer">Remove</button>
                </div>
              )}
              {couponError && <p className="text-[10px] font-medium text-rose-600 pl-0.5">{couponError}</p>}
            </div>

            {/* Calculations metrics card dashboard */}
            <div className="bg-white p-5 rounded-xl border border-slate-300 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">Order Financial Ledger</h3>
              <div className="space-y-2.5 text-xs font-medium text-slate-600">
                <div className="flex justify-between">
                  <span>Total Items Quantities</span>
                  <span className="text-slate-900 font-bold">{totalUnits} units</span>
                </div>
                <div className="flex justify-between">
                  <span>Gross Base Price (MRP)</span>
                  <span className="text-slate-900">₹{Math.round(aggregateMrpPrice)}</span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span>Catalog Product Discount</span>
                  <span>- ₹{Math.round(productDiscount)}</span>
                </div>
                {couponDiscountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Coupon Reward Code Offset</span>
                    <span>- ₹{Math.round(couponDiscountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-dashed border-slate-200 pt-2 text-emerald-700 font-bold">
                  <span>Total Accumulated Discount</span>
                  <span>- ₹{ultimateTotalDiscount}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-3 text-sm font-black text-slate-900">
                  <span>Grand Final Payable</span>
                  <span className="text-base">₹{Math.round(grandTotal)}</span>
                </div>
              </div>

              <button onClick={() => navigate('/login')} className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded border border-neutral-950 transition-all active:scale-[0.98] text-center block cursor-pointer">
                Proceed To Secure Checkout
              </button>
              
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1"><FaShieldAlt /><span>Encrypted 256-bit multibrand escrow lock.</span></div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;