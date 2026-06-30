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
} from "react-icons/fa";

// 1. Destructure the onViewChange prop from your parent App component
function Header({ onViewChange }) {
  const [menuOpen, setMenuOpen] = useState(false); // making it responsive
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  // Hover handlers: open on hover, close when leaving the item+dropdown
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
  };

  const footwearItems = [
    "Running Shoes",
    "Casual Shoes",
    "Sneakers",
    "Sports Shoes",
    "Sandals & Slippers",
  ];
  const clothingItems = [
    "T-Shirts",
    "Shirts",
    "Jeans",
    "Shorts",
    "Track Pants",
    "Jackets",
    "Sportswear",
    "Men's Fashion",
    "Women's Fashion",
  ];
  const sportsEquipmentItems = [
    "Cricket Bats",
    "Cricket Balls",
    "Batting Pads",
    "Gloves",
    "Badminton Rackets",
    "Shuttlecocks",
    "Footballs",
    "Volleyballs",
  ];
  const accessoriesItems = [
    "Sunglasses",
    "Caps",
    "Socks",
    "Wallets",
    "Belts",
    "Bags",
  ];
  const brandsItems = [
    "Nike",
    "Puma",
    "Reebok",
    "Raymond",
    "Levi's",
    "Other Premium Brands",
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeAllMenus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg">

      {/* Promo Banner */}
      <div className="bg-blue-600 text-white text-center py-2 text-sm font-medium">
        🔥 Flat 20% OFF on Nike & Puma Collections
      </div>

      {/* Main Navbar */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4 w-full">

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

          {/* 2. FIXED LOGO: Wrapped both title and subtitle inside a single div container inside the action button */}
          <button 
             onClick={() => navigate("/")}
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
          <div className="flex items-center justify-end gap-2 md:gap-4 text-xs md:text-sm font-medium flex-shrink-0">

            {/* Wishlist */}
            <button className="flex items-center gap-0.5 md:gap-2 hover:text-blue-600 transition px-0.5 md:px-0">
              <FaHeart className="text-base md:text-base" />
              <span className="hidden md:inline">Wishlist</span>
            </button>

            {/* Cart */}
            <button className="flex items-center gap-0.5 md:gap-2 hover:text-blue-600 transition px-0.5 md:px-0">
              <FaShoppingCart className="text-base md:text-base" />
              <span className="hidden md:inline">Cart</span>
            </button>

            {/* 3. ACCOUNT: Triggers the same view state when clicked */}
            <button 
               onClick={() => navigate("/login")} 
              className="flex items-center gap-0.5 md:gap-2 text-neutral-900 hover:text-blue-600 transition cursor-pointer font-medium px-0.5 md:px-0"
            >
              <FaUser className="text-base md:text-base" />
              <span className="hidden md:inline">Account</span>
            </button>

          </div>

        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 pb-1">

          <ul ref={navRef}
            className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 text-sm font-medium text-neutral-700
            absolute md:static bg-white md:bg-transparent w-full md:w-auto left-0 top-[140px] md:top-auto px-4 md:px-0 py-4 md:py-0 shadow-md md:shadow-none
            transition-all duration-300 ease-in-out
            ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible md:opacity-100 md:visible"}`}
          >
            {/* Added a toggle back to home view on click if required later */}
            <li onClick={() => { closeAllMenus(); onViewChange('home'); }}
                className="relative group cursor-pointer hover:text-blue-600 transition">
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </li>

            <li className="relative group" onMouseEnter={() => handleMouseEnter("footwear")} onMouseLeave={() => handleMouseLeave("footwear")}>
              <button
                type="button"
                onClick={() => toggleDropdown("footwear")}
                className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition focus:outline-none"
              >
                Footwear
                <span className={`text-xs transition-transform duration-300 ${activeDropdown === "footwear" ? "rotate-180" : ""}`}>▼</span>
              </button>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>

              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === "footwear" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <ul className="absolute left-0 top-full mt-2 w-48 rounded-md border border-neutral-200 bg-white p-2 shadow-lg z-20">
                  {footwearItems.map((item) => (
                    <li
                      key={item}
                      onClick={closeDropdown}
                      className="cursor-pointer rounded-md px-3 py-2 text-sm text-neutral-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li className="relative group" onMouseEnter={() => handleMouseEnter("clothing")} onMouseLeave={() => handleMouseLeave("clothing")}>
              <button
                type="button"
                onClick={() => navigate("/clothings")}

                className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition focus:outline-none"
              >
                Clothing
                <span className={`text-xs transition-transform duration-300 ${activeDropdown === "clothing" ? "rotate-180" : ""}`}>▼</span>
              </button>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>

              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === "clothing" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <ul className="absolute left-0 top-full mt-2 w-48 rounded-md border border-neutral-200 bg-white p-2 shadow-lg z-20">
                  {clothingItems.map((item) => (
                    <li
                      key={item}
                      onClick={closeDropdown}
                      className="cursor-pointer rounded-md px-3 py-2 text-sm text-neutral-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li className="relative group" onMouseEnter={() => handleMouseEnter("sports")} onMouseLeave={() => handleMouseLeave("sports")}>
              <button
                type="button"
                // onClick={() => toggleDropdown("sports")}
                onClick={() => navigate("/sports-equipment")}
                className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition focus:outline-none"
              >
                Sports Equipment
                <span className={`text-xs transition-transform duration-300 ${activeDropdown === "sports" ? "rotate-180" : ""}`}>▼</span>
              </button>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>

              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === "sports" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <ul className="absolute left-0 top-full mt-2 w-48 rounded-md border border-neutral-200 bg-white p-2 shadow-lg z-20">
                  {sportsEquipmentItems.map((item) => (
                    <li
                      key={item}
                      onClick={closeDropdown}
                      className="cursor-pointer rounded-md px-3 py-2 text-sm text-neutral-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li className="relative group" onMouseEnter={() => handleMouseEnter("accessories")} onMouseLeave={() => handleMouseLeave("accessories")}>
              <button
                type="button"
                onClick={() => toggleDropdown("accessories")}
                className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition focus:outline-none"
              >
                Accessories
                <span className={`text-xs transition-transform duration-300 ${activeDropdown === "accessories" ? "rotate-180" : ""}`}>▼</span>
              </button>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>

              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === "accessories" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <ul className="absolute left-0 top-full mt-2 w-48 rounded-md border border-neutral-200 bg-white p-2 shadow-lg z-20">
                  {accessoriesItems.map((item) => (
                    <li
                      key={item}
                      onClick={closeDropdown}
                      className="cursor-pointer rounded-md px-3 py-2 text-sm text-neutral-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li className="relative group" onMouseEnter={() => handleMouseEnter("brands")} onMouseLeave={() => handleMouseLeave("brands")}>
              <button
                type="button"
                onClick={() => toggleDropdown("brands")}
                className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition focus:outline-none"
              >
                Brands
                <span className={`text-xs transition-transform duration-300 ${activeDropdown === "brands" ? "rotate-180" : ""}`}>▼</span>
              </button>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>

              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === "brands" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <ul className="absolute left-0 top-full mt-2 w-48 rounded-md border border-neutral-200 bg-white p-2 shadow-lg z-20">
                  {brandsItems.map((item) => (
                    <li
                      key={item}
                      onClick={closeDropdown}
                      className="cursor-pointer rounded-md px-3 py-2 text-sm text-neutral-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li onClick={closeAllMenus}
                 className="relative group cursor-pointer hover:text-blue-600 transition flex items-center gap-1">
              Stores
              <span className="text-xs transition-transform duration-300 group-hover:rotate-180">▼</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </li>

            <li onClick={closeAllMenus}
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