import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Hero_Section from "./components/Hero_Section/Hero_Section";
import ProductsMain from "./components/Products/ProductsMain";
import LoginPage from "./components/LoginPage/LoginPage";

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

      <main className="flex-1">
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* Login */}
          <Route path="/login" element={<LoginPage />} />

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