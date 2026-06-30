import React from "react";
import { Routes, Route } from "react-router-dom";
import ClothingMix from "./components/Clothings/ClothingMix";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Hero_Section from "./components/Hero_Section/Hero_Section";
import ProductsMain from "./components/Products/ProductsMain";
import LoginPage from "./components/LoginPage/LoginPage";
import ContactPage from "./components/ContactPage/ContactPage";
import SportsEquipment from "./components/sportsEquipment/SportsEquipment";
// Future Pages
// import ClothingMix from "./clothing/ClothingMix";
// import AddToCart from "./components/addToCart/addToCart";

function HomePage() {
  return (
    <>
      <Hero_Section />
      <ProductsMain />
    </>
  );
}

function App() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col antialiased overflow-x-hidden">
      <Header />

      {/* FIXED: Added absolute global top padding to push down content cleanly below the responsive sticky header */}
      <main className="flex-1 pt-[140px] md:pt-[180px]">
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />
          <Route path="/clothings" element={<ClothingMix />} />
          <Route path="/sports-equipment" element={<SportsEquipment />} />
          {/* Login */}
          <Route path="/login" element={<LoginPage />} />
          {/* Contact */}
          <Route path="/contact" element={<ContactPage />} />
          {/* <Route path="/clothings" element={<ClothingMix />} /> */}
          {/* Future Routes */}
          {/* <Route path="/clothing" element={<ClothingMix />} /> */}
          {/* <Route path="/cart" element={<AddToCart />} /> */}
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;