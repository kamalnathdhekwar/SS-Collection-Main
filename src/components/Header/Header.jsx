import React, { useEffect, useRef, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import { isUserLoggedIn, getAuthData, clearAuthData } from "../../utils/authValidation";

function Header({ onViewChange }) {
  const [menuOpen, setMenuOpen] = useState(false); 
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cartBadgeCount, setCartBadgeCount] = useState(0); // FIXED: Added Cart Badge tracking state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const navRef = useRef(null);
  const navigate = useNavigate();

  // FIXED: Check if user is logged in
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = isUserLoggedIn();
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        const data = getAuthData();
        setUserData(data);
      }
    };

    checkLoginStatus();
    
    // Listen for storage changes to sync login status
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);
  
  // FIXED: Syncs Cart Item units dynamically for navigation visibility
  useEffect(() => {
    const syncCartCount = () => {
      try {
        const savedCart = localStorage.getItem('ss_collection_persistent_cart');
        if (savedCart) {
          const items = JSON.parse(savedCart);
          const totalUnits = items.reduce((acc, item) => acc + item.quantity, 0);
          setCartBadgeCount(totalUnits);
        } else {
          setCartBadgeCount(0);
        }
      } catch {
        setCartBadgeCount(0);
      }
    };

    // Initial check on render
    syncCartCount();

    // Listen to local changes or state mutations periodic interval
    const interval = setInterval(syncCartCount, 800);
    window.addEventListener('storage', syncCartCount);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', syncCartCount);
    };
  }, []);
  
  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const handleMouseEnter = (name) => {
    setActiveDropdown(name);
  };

  const handleMouseLeave = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : prev));
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const closeAllMenus = () => {
    setMenuOpen(false);
    closeDropdown();
    setProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    clearAuthData();
    setIsLoggedIn(false);
    setUserData(null);
    setProfileDropdownOpen(false);
    navigate("/");
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const footwearItems = ["Running Shoes", "Casual Shoes", "Sneakers", "Sports Shoes", "Sandals & Slippers"];
  const clothingItems = ["T-Shirts", "Shirts", "Jeans", "Shorts", "Track Pants", "Jackets", "Sportswear", "Men's Fashion", "Women's Fashion"];
  const sportsEquipmentItems = ["Cricket Bats", "Cricket Balls", "Batting Pads", "Gloves", "Badminton Rackets", "Shuttlecocks", "Footballs", "Volleyballs"];
  const accessoriesItems = ["Sunglasses", "Caps", "Socks", "Wallets", "Belts", "Bags"];
  const brandsItems = ["Nike", "Puma", "Reebok", "Raymond", "Levi's", "Other Premium Brands"];

  // Close navigation menu when clicking outside nav area (but not on profile menu)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
          closeAllMenus();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg mb-11">

      {/* Promo Banner */}
      <div className="bg-blue-600 text-white text-center py-2 text-sm font-medium">
        🔥 Flat 20% OFF on Nike & Puma Collections
      </div>

      {/* Main Navbar */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-4 w-full">

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="md:hidden flex items-center justify-center text-neutral-700 hover:text-blue-600 transition focus:outline-none"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>

          <button 
             onClick={() => { closeAllMenus(); navigate("/"); }}
            className="flex flex-col text-left focus:outline-none cursor-pointer group select-none flex-shrink-0"
            aria-label="Navigate to Home"
          >
            <div className="flex flex-col text-left">
              <h1 className="text-base sm:text-2xl font-black tracking-tight text-neutral-900 uppercase">
                SS <span className="font-light text-neutral-500">Collection</span>
              </h1>
              <p className="text-[9px] sm:text-xs tracking-widest uppercase font-bold text-neutral-400 -mt-0.5 whitespace-nowrap">
                A Multibrand Store
              </p>
            </div>
          </button>

          {/* Search Bar */}
          <div className="flex-1 min-w-0 order-3 md:order-none w-full md:w-auto flex-shrink-0 md:flex-shrink">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products, brands and more..."
                className="w-full border border-neutral-300 rounded-lg px-2 sm:px-4 py-2 pr-10 sm:pr-12 text-xs sm:text-sm focus:outline-none"
              />
              <FaSearch className="absolute right-3 top-2.5 text-neutral-500" />
            </div>
          </div>

          {/* User Actions Menu */}
          <div className="flex items-center justify-end gap-2 md:gap-4 text-xs md:text-sm font-medium ml-auto md:ml-0">

            <button className="flex items-center gap-1 hover:text-blue-600 transition px-0.5 md:px-0">
              <FaHeart className="text-base" />
              <span className="hidden sm:inline">Wishlist</span>
            </button>

            {/* Cart with Responsive Micro Badge Counter */}
            <button 
              onClick={() => { closeAllMenus(); navigate("/cart"); }}
              className="flex items-center gap-1 text-neutral-900 hover:text-blue-600 transition cursor-pointer relative font-medium px-0.5 md:px-0"
            >
              <div className="relative p-1">
                <FaShoppingCart className="text-base" />
                {cartBadgeCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-white font-bold rounded-full text-[9px] h-4 w-4 flex items-center justify-center animate-bounce shadow">
                    {cartBadgeCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
            </button>

            {isLoggedIn && userData ? (
              // Profile Dropdown for Logged-in Users
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="hidden sm:flex items-center gap-2 text-neutral-900 hover:text-blue-600 transition cursor-pointer font-medium px-3 py-2 rounded-lg hover:bg-neutral-100"
                  aria-label="Profile menu"
                >
                  <FaUser className="text-base" />
                  <span className="text-sm truncate max-w-[120px]">{userData.fullName || userData.email || "Profile"}</span>
                  <FaChevronDown className={`text-xs transition-transform ${profileDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 z-50">
                    <div className="p-3 border-b border-neutral-200">
                      <p className="text-sm font-semibold text-neutral-900">{userData.fullName || "My Account"}</p>
                      <p className="text-xs text-neutral-600">{userData.email}</p>
                    </div>
                    <button
                      onClick={() => { closeAllMenus(); navigate("/profile"); }}
                      className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-blue-600 transition flex items-center gap-2"
                    >
                      <FaUser className="text-base" />
                      My Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-2 border-t border-neutral-200"
                    >
                      <FaSignOutAlt className="text-base" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Sign In/Sign Up Buttons for Not Logged-in Users
              <>
                <button 
                   onClick={() => { closeAllMenus(); navigate("/login"); }} 
                  className="hidden sm:flex items-center gap-1 text-neutral-900 hover:text-blue-600 transition cursor-pointer font-medium px-0.5 md:px-0"
                >
                  <FaUser className="text-base" />
                  <span>Sign In</span>
                </button>

                <button 
                   onClick={() => { closeAllMenus(); navigate("/create-account"); }} 
                  className="hidden sm:flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer font-medium px-3 py-1.5 rounded text-xs md:text-sm"
                >
                  Sign Up
                </button>
              </>
            )}

            {/* Mobile Account Button */}
            <button 
               onClick={() => { closeAllMenus(); isLoggedIn ? setProfileDropdownOpen(!profileDropdownOpen) : navigate("/login"); }} 
              className="sm:hidden flex items-center gap-1 text-neutral-900 hover:text-blue-600 transition cursor-pointer font-medium px-0.5"
            >
              <FaUser className="text-base" />
            </button>

          </div>

        </div>
      </div>

      {/* Navigation Menu Links */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 pb-1">
          <ul ref={navRef}
            className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 text-sm font-medium text-neutral-700
            absolute md:static bg-white md:bg-transparent w-full md:w-auto left-0 top-[140px] md:top-auto px-4 md:px-0 py-4 md:py-0 shadow-md md:shadow-none
            transition-all duration-300 ease-in-out
            ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible md:opacity-100 md:visible"}`}
          >
            <li onClick={() => { closeAllMenus(); navigate("/"); }} className="relative group cursor-pointer hover:text-blue-600 transition">
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </li>

            <li className="relative group" onMouseEnter={() => handleMouseEnter("footwear")} onMouseLeave={() => handleMouseLeave("footwear")}>
              <button type="button" onClick={() => { closeAllMenus(); navigate("/footwear"); }} className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition focus:outline-none">
                Footwear <span className="text-xs">▼</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === "footwear" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <ul className="absolute left-0 top-full mt-2 w-48 rounded-md border border-neutral-200 bg-white p-2 shadow-lg z-20">
                  {footwearItems.map((item) => (<li key={item} onClick={closeDropdown} className="cursor-pointer rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-blue-50 hover:text-blue-600">{item}</li>))}
                </ul>
              </div>
            </li>

            <li className="relative group" onMouseEnter={() => handleMouseEnter("clothing")} onMouseLeave={() => handleMouseLeave("clothing")}>
              <button type="button" onClick={() => { closeAllMenus(); navigate("/clothings"); }} className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition focus:outline-none">
                Clothing <span className="text-xs">▼</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === "clothing" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <ul className="absolute left-0 top-full mt-2 w-48 rounded-md border border-neutral-200 bg-white p-2 shadow-lg z-20">
                  {clothingItems.map((item) => (<li key={item} onClick={closeDropdown} className="cursor-pointer rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-blue-50 hover:text-blue-600">{item}</li>))}
                </ul>
              </div>
            </li>

            <li className="relative group" onMouseEnter={() => handleMouseEnter("sports")} onMouseLeave={() => handleMouseLeave("sports")}>
              <button type="button" onClick={() => { closeAllMenus(); navigate("/sports-equipment"); }} className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition focus:outline-none">
                Sports Equipment <span className="text-xs">▼</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === "sports" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <ul className="absolute left-0 top-full mt-2 w-48 rounded-md border border-neutral-200 bg-white p-2 shadow-lg z-20">
                  {sportsEquipmentItems.map((item) => (<li key={item} onClick={closeDropdown} className="cursor-pointer rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-blue-50 hover:text-blue-600">{item}</li>))}
                </ul>
              </div>
            </li>

            <li className="relative group" onMouseEnter={() => handleMouseEnter("accessories")} onMouseLeave={() => handleMouseLeave("accessories")}>
              <button type="button" onClick={() => { closeAllMenus(); navigate("/accessories"); }} className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition focus:outline-none">
                Accessories <span className="text-xs">▼</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === "accessories" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <ul className="absolute left-0 top-full mt-2 w-48 rounded-md border border-neutral-200 bg-white p-2 shadow-lg z-20">
                  {accessoriesItems.map((item) => (<li key={item} onClick={closeDropdown} className="cursor-pointer rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-blue-50 hover:text-blue-600">{item}</li>))}
                </ul>
              </div>
            </li>

            <li className="relative group" onMouseEnter={() => handleMouseEnter("brands")} onMouseLeave={() => handleMouseLeave("brands")}>
              <button type="button" onClick={() => toggleDropdown("brands")} className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition focus:outline-none">
                Brands <span className="text-xs">▼</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === "brands" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <ul className="absolute left-0 top-full mt-2 w-48 rounded-md border border-neutral-200 bg-white p-2 shadow-lg z-20">
                  {brandsItems.map((item) => (<li key={item} onClick={closeDropdown} className="cursor-pointer rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-blue-50 hover:text-blue-600">{item}</li>))}
                </ul>
              </div>
            </li>

            <li onClick={closeAllMenus} className="relative group cursor-pointer hover:text-blue-600 transition">Stores</li>
            <li onClick={() => { closeAllMenus(); navigate("/contact"); }} className="relative group cursor-pointer hover:text-blue-600 transition">Contact</li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;