import React, { useState } from "react"; 

import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSearch,
} from "react-icons/fa";

// 1. Destructure the onViewChange prop from your parent App component
function Header({ onViewChange }) {
  const [menuOpen, setMenuOpen] = useState(false); // making it responsive

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg">

      {/* Promo Banner */}
      <div className="bg-blue-600 text-white text-center py-2 text-sm font-medium">
        🔥 Flat 20% OFF on Nike & Puma Collections
      </div>

      {/* Main Navbar */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4 w-full">

          {/* 2. FIXED LOGO: Wrapped both title and subtitle inside a single div container inside the action button */}
          <button 
            onClick={() => onViewChange('home')}
            className="flex flex-col text-left focus:outline-none cursor-pointer group select-none flex-shrink-0"
            aria-label="Navigate to Home"
          >
            <div className="flex flex-col text-left">
              <h1 className="text-lg sm:text-2xl font-black tracking-tight text-neutral-900 uppercase transition-opacity group-hover:opacity-80">
                SS <span className="font-light text-neutral-500">Collection</span>
              </h1>
              <p className="text-[10px] sm:text-xs tracking-widest uppercase font-bold text-neutral-400 -mt-0.5 transition-opacity group-hover:opacity-80 whitespace-nowrap">
                A Multibrand Store
              </p>
            </div>
          </button>

          {/* Search Bar */}
          <div className="flex-1 min-w-0">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products, brands and more..."
                className="w-full border border-neutral-300 rounded-lg px-2 sm:px-4 py-2 pr-10 sm:pr-12 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <FaSearch className="absolute right-3 top-2.5 text-neutral-500" />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center justify-end gap-2 sm:gap-4 text-xs sm:text-sm font-medium flex-shrink-0">

            {/* Wishlist */}
            <button className="flex items-center gap-1 hover:text-blue-600 transition">
              <FaHeart />
              {/* FIXED: Removed hidden sm:inline so text is always visible */}
              <span>Wishlist</span>
            </button>

            {/* Cart */}
            <button className="flex items-center gap-1 hover:text-blue-600 transition">
              <FaShoppingCart />
              {/* FIXED: Removed hidden sm:inline so text is always visible */}
              <span>Cart</span>
            </button>

            {/* 3. ACCOUNT: Triggers the same view state when clicked */}
            <button 
              onClick={() => onViewChange('login')} 
              className="flex items-center gap-1 text-neutral-600 hover:text-blue-600 transition cursor-pointer font-medium"
            >
              <FaUser />
              {/* FIXED: Removed hidden sm:inline so text is always visible */}
              <span>Account</span>
            </button>

          </div>

        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 pb-1">

          <ul 
            className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 text-sm font-medium text-neutral-700
            absolute md:static bg-white md:bg-transparent w-full md:w-auto left-0 top-[140px] md:top-auto px-4 md:px-0 py-4 md:py-0 shadow-md md:shadow-none
            transition-all duration-300 ease-in-out
            ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible md:opacity-100 md:visible"}`}
          >
            {/* Added a toggle back to home view on click if required later */}
            <li onClick={() => { setMenuOpen(false); onViewChange('home'); }}
                className="relative group cursor-pointer hover:text-blue-600 transition">
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </li>

            <li onClick={() => setMenuOpen(false)}
                className="relative group cursor-pointer hover:text-blue-600 transition flex items-center gap-1">
              Footwear
              <span className="text-xs transition-transform duration-300 group-hover:rotate-180">▼</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </li>

            <li onClick={() => setMenuOpen(false)}
                 className="relative group cursor-pointer hover:text-blue-600 transition flex items-center gap-1">
              Clothing
              <span className="text-xs transition-transform duration-300 group-hover:rotate-180">▼</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </li>

            <li onClick={() => setMenuOpen(false)}
                 className="relative group cursor-pointer hover:text-blue-600 transition flex items-center gap-1">
              Sports Equipment
              <span className="text-xs transition-transform duration-300 group-hover:rotate-180">▼</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </li>

            <li onClick={() => setMenuOpen(false)}
                 className="relative group cursor-pointer hover:text-blue-600 transition flex items-center gap-1">
              Accessories
              <span className="text-xs transition-transform duration-300 group-hover:rotate-180">▼</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </li>

            <li onClick={() => setMenuOpen(false)}
                 className="relative group cursor-pointer hover:text-blue-600 transition flex items-center gap-1">
              Brands
              <span className="text-xs transition-transform duration-300 group-hover:rotate-180">▼</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </li>

            <li onClick={() => setMenuOpen(false)}
                 className="relative group cursor-pointer hover:text-blue-600 transition flex items-center gap-1">
              Stores
              <span className="text-xs transition-transform duration-300 group-hover:rotate-180">▼</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </li>

            <li onClick={() => setMenuOpen(false)}
                className="relative group cursor-pointer hover:text-blue-600 transition">
              Contact
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </li>

          </ul>
        </div>
      </div>

    </header>
  );
}

export default Header;