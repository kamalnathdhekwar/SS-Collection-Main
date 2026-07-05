import React from 'react';
import ProductCard from './ProductCard';
import productsData from './productsData';
import { useCheckout } from '../../context/CheckoutContext';
import { useNavigate } from 'react-router-dom';

const ProductsMain = () => {
  const { initializeCheckout } = useCheckout();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    if (!product) return;
    
    // Exact schema parsing that CheckoutContext needs
    const standardProduct = {
      ...product,
      mrp: product.originalPrice || product.price,
      sizes: product.sizes || [{ label: "Free Size", available: true }],
      colors: product.colors || [{ name: "Standard Color" }],
      stock: product.stock || { count: 10 }
    };
    
    initializeCheckout(standardProduct, { quantity: 1 });
    navigate('/cart'); // Direct routing to basket page immediately after clicking
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-8 flex flex-col items-center text-center sm:mb-10">
        <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
          SS Collection
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Featured Products
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
          Discover premium fashion, footwear and sports equipment from SS Collection.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productsData.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-900 hover:text-slate-900"
        >
          View All Products
        </button>
      </div>
    </section>
  );
};

export default ProductsMain;