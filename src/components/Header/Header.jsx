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
  const [cartBadgeCount, setCartBadgeCount] = useState(0);
  const [wishlistBadgeCount, setWishlistBadgeCount] = useState(0); // FIXED: Track Wishlist Badge dynamically
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const navRef = useRef(null);
  const navigate = useNavigate();

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
    window.addEventListener('storage', checkLoginStatus);
    window.addEventListener('ss-auth-changed', checkLoginStatus);
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('ss-auth-changed', checkLoginStatus);
    };
  }, []);
  
  // FIXED: Syncs both Cart and Wishlist Item units dynamically
  useEffect(() => {
    const syncCounts = () => {
      try {
        const savedCart = localStorage.getItem('ss_collection_persistent_cart');
        setCartBadgeCount(savedCart ? JSON.parse(savedCart).reduce((acc, item) => acc + item.quantity, 0) : 0);
        
        const savedWishlist = localStorage.getItem('ss_collection_wishlist');
        setWishlistBadgeCount(savedWishlist ? JSON.parse(savedWishlist).length : 0);
      } catch {
        setCartBadgeCount(0);
        setWishlistBadgeCount(0);
      }
    };

    syncCounts();
    const interval = setInterval(syncCounts, 800);
    window.addEventListener('storage', syncCounts);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', syncCounts);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeMouseDown("mousedown", handleClickOutside);
  }, []);

  const footwearItems = ["Running Shoes", "Casual Shoes", "Sneakers", "Sports Shoes", "Sandals & Slippers"];
  const clothingItems = ["T-Shirts", "Shirts", "Jeans", "Shorts", "Track Pants", "Jackets", "Sportswear", "Men's Fashion", "Women's Fashion"];
  const sportsEquipmentItems = ["Cricket Bats", "Cricket Balls", "Batting Pads", "Gloves", "Badminton Rackets", "Shuttlecocks", "Footballs", "Volleyballs"];
  const accessoriesItems = ["Sunglasses", "Caps", "Socks", "Wallets", "Belts", "Bags"];
  const brandsItems = ["Nike", "Puma", "Reebok", "Raymond", "Levi's", "Other Premium Brands"];

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
      <div className="bg-blue-600 text-white text-center py-2 text-sm font-medium">
        🔥 Flat 20% OFF on Nike & Puma Collections
      </div>

      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-4 w-full">
          <button type="button" onClick={(event) => { event.stopPropagation(); setMenuOpen(!menuOpen); }} className="md:hidden flex items-center justify-center text-neutral-700 hover:text-blue-600 transition focus:outline-none">
            {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>

          <button onClick={() => { closeAllMenus(); navigate("/"); }} className="flex flex-col text-left focus:outline-none cursor-pointer group select-none flex-shrink-0">
            <h1 className="text-base sm:text-2xl font-black tracking-tight text-neutral-900 uppercase">SS <span className="font-light text-neutral-500">Collection</span></h1>
            <p className="text-[9px] sm:text-xs tracking-widest uppercase font-bold text-neutral-400 -mt-0.5 whitespace-nowrap">A Multibrand Store</p>
          </button>

          <div className="flex-1 min-w-0 order-3 md:order-none w-full md:w-auto flex-shrink-0 md:flex-shrink">
            <div className="relative w-full">
              <input type="text" placeholder="Search products, brands and more..." className="w-full border border-neutral-300 rounded-lg px-2 sm:px-4 py-2 pr-10 sm:pr-12 text-xs sm:text-sm focus:outline-none" />
              <FaSearch className="absolute right-3 top-2.5 text-neutral-500" />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 md:gap-4 text-xs md:text-sm font-medium ml-auto md:ml-0">
            
            {/* FIXED WISHLIST LINK WITH LIVE BADGE MATRIX COUNTER */}
            <button onClick={() => { closeAllMenus(); navigate("/wishlist"); }} className="flex items-center gap-1 hover:text-blue-600 transition px-0.5 md:px-0 cursor-pointer relative">
              <div className="relative p-1">
                <FaHeart className="text-base text-rose-500" />
                {wishlistBadgeCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-neutral-900 text-white font-bold rounded-full text-[8px] h-3.5 w-3.5 flex items-center justify-center shadow">
                    {wishlistBadgeCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Wishlist</span>
            </button>

            <button onClick={() => { closeAllMenus(); navigate("/cart"); }} className="flex items-center gap-1 text-neutral-900 hover:text-blue-600 transition cursor-pointer relative font-medium px-0.5 md:px-0">
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
              <div className="relative" ref={profileMenuRef}>
                <button onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} className="hidden sm:flex items-center gap-2 font-medium px-3 py-2 rounded-lg transition-all duration-300" style={{ background: profileDropdownOpen ? '#e3f2fd' : 'transparent', color: profileDropdownOpen ? '#2563eb' : '#111827' }}>
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center"><FaUser className="text-white text-sm" /></div>
                  <span className="text-sm truncate max-w-[100px] font-semibold">{userData.fullName || userData.email || "Profile"}</span>
                  <FaChevronDown className={`text-xs transition-all duration-300 ${profileDropdownOpen ? "rotate-180 text-blue-600" : "text-neutral-400"}`} />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-xl shadow-2xl border border-blue-100 z-50 overflow-hidden" style={{ animation: 'slideDown 0.3s ease-out forwards' }}>
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 border-b border-blue-200">
                      <p className="text-sm font-bold text-neutral-900">{userData.fullName || "My Account"}</p>
                      <p className="text-xs text-neutral-600 truncate">{userData.email}</p>
                    </div>
                    <div className="py-2">
                      <button onClick={() => { closeAllMenus(); navigate("/profile"); }} className="w-full text-left px-4 py-3 text-sm text-neutral-700 hover:bg-blue-50 flex items-center gap-3"><FaUser className="text-blue-600" /> My Profile</button>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-neutral-700 hover:bg-red-50 flex items-center gap-3 border-t border-neutral-100"><FaSignOutAlt className="text-red-600" /> Logout</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button onClick={() => { closeAllMenus(); navigate("/login"); }} className="hidden sm:flex items-center gap-1 text-neutral-900 hover:text-blue-600 transition cursor-pointer font-medium"><FaUser /><span>Sign In</span></button>
                <button onClick={() => { closeAllMenus(); navigate("/create-account"); }} className="hidden sm:flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer font-medium px-3 py-1.5 rounded text-xs md:text-sm">Sign Up</button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Nav Dropdowns Links */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 pb-1">
          <ul ref={navRef} className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 text-sm font-medium text-neutral-700 absolute md:static bg-white w-full left-0 top-[140px] px-4 py-4 md:py-0 shadow-md md:shadow-none transition-all duration-300 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible md:opacity-100 md:visible"}`}>
            <li onClick={() => { closeAllMenus(); navigate("/"); }} className="cursor-pointer hover:text-blue-600">Home</li>
            <li className="relative group" onMouseEnter={() => handleMouseEnter("footwear")} onMouseLeave={() => handleMouseLeave("footwear")}>
              <button onClick={() => { closeAllMenus(); navigate("/footwear"); }} className="flex items-center gap-1 cursor-pointer hover:text-blue-600 focus:outline-none">Footwear ▼</button>
              {activeDropdown === "footwear" && <ul className="absolute left-0 mt-2 w-48 rounded-md border bg-white p-2 shadow-lg z-20">{footwearItems.map(item => <li key={item} className="px-3 py-2 text-sm text-neutral-700 hover:bg-blue-50 rounded">{item}</li>)}</ul>}
            </li>
            <li className="relative group" onMouseEnter={() => handleMouseEnter("clothing")} onMouseLeave={() => handleMouseLeave("clothing")}>
              <button onClick={() => { closeAllMenus(); navigate("/clothings"); }} className="flex items-center gap-1 cursor-pointer hover:text-blue-600 focus:outline-none">Clothing ▼</button>
              {activeDropdown === "clothing" && <ul className="absolute left-0 mt-2 w-48 rounded-md border bg-white p-2 shadow-lg z-20">{clothingItems.map(item => <li key={item} className="px-3 py-2 text-sm text-neutral-700 hover:bg-blue-50 rounded">{item}</li>)}</ul>}
            </li>
            <li onClick={() => navigate("/sports-equipment")} className="cursor-pointer hover:text-blue-600">Sports Equipment</li>
            <li onClick={() => navigate("/accessories")} className="cursor-pointer hover:text-blue-600">Accessories</li>
            <li onClick={() => navigate("/brands")} className="cursor-pointer hover:text-blue-600">Brands</li>
            <li className="cursor-pointer hover:text-blue-600">Stores</li>
            <li onClick={() => navigate("/contact")} className="cursor-pointer hover:text-blue-600">Contact</li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;