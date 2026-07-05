import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { adminRoutes } from "./admin/routes/adminRoutes";
import ClothingMix from "./components/Clothings/ClothingMix";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import HeroSection from "./components/Hero_Section/Hero_Section";
import ProductsMain from "./components/Products/ProductsMain";
import Login from "./components/LoginPage/Login";
import CreateAccount from "./components/LoginPage/CreateAccount";
import ContactPage from "./components/ContactPage/ContactPage";
import SportsEquipment from "./components/sportsEquipment/SportsEquipment";
import Footwear from "./components/footwear/FootwearMix";
import Accessories from "./components/accessories/Accessories";
import OfferSectionShoes from "./components/OfferSection/OfferCardShoes";
import OfferSectionCloths from "./components/OfferSection/OfferCardCloths";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import ScrollToTop from "./components/common/ScrollToTop";
import { CheckoutProvider } from "./context/CheckoutContext";
import AddToCart from "./components/addToCart/addToCart";

const OrderSummary = lazy(() => import("./pages/Checkout/OrderSummary"));
const Payment = lazy(() => import("./pages/Checkout/Payment"));
const OrderSuccess = lazy(() => import("./pages/Checkout/OrderSuccess"));

function CheckoutFallback() {
  return (
    <div className="grid min-h-[50vh] place-items-center bg-slate-50">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-950 border-r-transparent" />
    </div>
  );
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <OfferSectionShoes />
      <OfferSectionCloths /> 
      <ProductsMain />   
    </>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <Suspense fallback={<CheckoutFallback />}>
        <Routes>
          {adminRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element}>
              {route.children?.map((child) => (
                <Route
                  key={child.path || "index"}
                  index={child.index || false}
                  path={child.path}
                  element={child.element}
                />
              ))}
            </Route>
          ))}
        </Routes>
      </Suspense>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 md:pt-36">
        <Suspense fallback={<CheckoutFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clothings" element={<ClothingMix />} />
            <Route path="/sports-equipment" element={<SportsEquipment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/footwear" element={<Footwear />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout/:productId" element={<OrderSummary />} />
            <Route path="/payment/:productId" element={<Payment />} />
            <Route path="/order-success/:orderId" element={<OrderSuccess />} />
            <Route path="/cart" element={<AddToCart />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <CheckoutProvider>
      <div className="w-full min-h-screen bg-white flex flex-col antialiased overflow-x-hidden">
        <ScrollToTop />
        <AppContent />
      </div>
    </CheckoutProvider>
  );
}

export default App;