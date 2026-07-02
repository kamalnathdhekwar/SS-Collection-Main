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
import Footwear from "./components/footwear/FootwearMix";
import Accessories from "./components/accessories/Accessories";
import OfferSection from "./components/OfferSection/OfferCardShoes";

function HomePage() {
  return (
    <>
      <Hero_Section />
      <OfferSection />
      <ProductsMain />   
      
    </>
  );
}

function App() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col antialiased overflow-x-hidden">
      <Header />

      {/* CLEANED: Removed global heavy padding to fix Home Page white block */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clothings" element={<ClothingMix />} />
          <Route path="/sports-equipment" element={<SportsEquipment />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/footwear" element={<Footwear />} />
          <Route path="/accessories" element={<Accessories />} />
        </Routes>
      </main>
        
      <Footer />
    </div>
  );
}

export default App;