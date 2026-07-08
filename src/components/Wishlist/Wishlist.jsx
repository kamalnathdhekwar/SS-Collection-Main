import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaTrashAlt, FaShoppingCart, FaArrowRight } from 'react-icons/fa';

function Wishlist() {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);

  const loadWishlist = () => {
    try {
      const savedWishlist = localStorage.getItem('ss_collection_wishlist');
      setWishlistItems(savedWishlist ? JSON.parse(savedWishlist) : []);
    } catch {
      setWishlistItems([]);
    }
  };

  useEffect(() => {
    loadWishlist();
    window.addEventListener('storage', loadWishlist);
    return () => window.removeEventListener('storage', loadWishlist);
  }, []);

  const removeWishlistItem = (id) => {
    try {
      const updatedList = wishlistItems.filter(item => item.id !== id);
      localStorage.setItem('ss_collection_wishlist', JSON.stringify(updatedList));
      setWishlistItems(updatedList);
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.error(e);
    }
  };

  const handleMoveToCart = (item) => {
    try {
      const savedCart = localStorage.getItem('ss_collection_persistent_cart');
      let cartItems = savedCart ? JSON.parse(savedCart) : [];
      
      const exists = cartItems.find(c => c.id === item.id);
      if (!exists) {
        cartItems.push({ ...item, quantity: 1 });
        localStorage.setItem('ss_collection_persistent_cart', JSON.stringify(cartItems));
      }

      const updatedWishlist = wishlistItems.filter(w => w.id !== item.id);
      localStorage.setItem('ss_collection_wishlist', JSON.stringify(updatedWishlist));
      setWishlistItems(updatedWishlist);

      window.dispatchEvent(new Event('storage'));
      navigate('/cart');
    } catch (e) {
      console.error(e);
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center bg-white px-4 pt-32 pb-12 font-sans">
        <div className="p-6 bg-rose-50 rounded-full mb-4 border border-rose-100">
          <FaHeart className="text-4xl text-rose-300" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Your Wishlist is Empty</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-xs text-center">Save items that you like here to purchase them later.</p>
        <button onClick={() => navigate('/')} className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded transition-all active:scale-95 cursor-pointer">
          Discover Products
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-36 pb-16 px-4 md:px-6 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="border-b border-slate-200 pb-4 mb-8">
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FaHeart className="text-rose-500 text-lg md:text-xl" /> 
            My Personal Favourites <span className="text-sm font-normal text-slate-500">({wishlistItems.length} items saved)</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group relative">
              <button 
                onClick={() => removeWishlistItem(item.id)}
                className="absolute top-3 right-3 bg-white/80 backdrop-blur-xs p-2 rounded-full text-slate-400 hover:text-rose-600 border border-slate-100 shadow-xs transition-all duration-200 hover:scale-110 cursor-pointer z-10"
              >
                <FaTrashAlt className="text-xs" />
              </button>

              <div className="w-full aspect-square bg-slate-100 overflow-hidden relative cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
                <img src={item.image || item.images?.[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>

              <div className="p-4 flex flex-col flex-grow space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded w-max">{item.brand}</span>
                <h2 className="font-bold text-slate-900 text-sm md:text-base truncate cursor-pointer hover:text-blue-600 transition-colors" onClick={() => navigate(`/product/${item.id}`)}>{item.name}</h2>
                <div className="flex items-baseline gap-2 pt-0.5 flex-grow">
                  <span className="text-sm md:text-base font-black text-slate-900">₹{item.price}</span>
                  {item.mrp && <span className="text-xs line-through text-slate-400">₹{Math.round(item.mrp)}</span>}
                </div>
                <button onClick={() => handleMoveToCart(item)} className="w-full mt-3 inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded transition-all active:scale-[0.98] cursor-pointer shadow-xs">
                  <FaShoppingCart className="text-xs" /> Move To Cart <FaArrowRight className="text-[10px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;