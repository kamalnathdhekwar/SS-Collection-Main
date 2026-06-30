import React from "react";
import { Routes, Route } from "react-router-dom";
import ClothingMix from "./components/Clothings/ClothingMix";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Hero_Section from "./components/Hero_Section/Hero_Section";
import ProductsMain from "./components/Products/ProductsMain";
import LoginPage from "./components/LoginPage/LoginPage";
import ContactPage from "./components/ContactPage/ContactPage"; // SAFE: Exact path casing matching GitHub
import SportsEquipment from "./components/sportsEquipment/SportsEquipment"; // SAFE: Lowercase 's' verification matching GitHub folder

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
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;