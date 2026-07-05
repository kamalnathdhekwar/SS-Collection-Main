import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getProductRouteId } from "../../utils/getProductById";
import { handleProductNavigation } from "../../utils/productNavigation";

const ProductCard = ({ product, onAddToCart }) => {
  const {
    image,
    brand,
    name,
    rating,
    reviews,
    price,
    originalPrice,
    discount,
  } = product || {};
  const navigate = useNavigate();
  const routeId = useMemo(() => getProductRouteId(product), [product]);

  const renderStars = () => {
    const stars = [];
    const roundedRating = Math.round(rating || 0);

    for (let i = 0; i < 5; i += 1) {
      stars.push(
        <span
          key={i}
          className={`text-sm ${i < roundedRating ? "text-amber-400" : "text-gray-300"}`}
        >
          ★
        </span>,
      );
    }

    return stars;
  };

  const formatPrice = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

  // RESTORED: Main card layout template trigger to open product details flawlessly
  const openProduct = useCallback(
    (event) => {
      handleProductNavigation(navigate, { ...product, routeId }, event);
    },
    [navigate, product, routeId],
  );

  const handleAddToCart = useCallback(
    (event) => {
      event.stopPropagation(); // SAFE: Prevents opening details page when clicking button
      
      // FIXED: Maps originalPrice to mrp key to explicitly satisfy priceCalculator expectation
      const structuredProduct = {
        ...product,
        mrp: product.originalPrice || product.price
      };
      
      onAddToCart?.(structuredProduct);
    },
    [onAddToCart, product],
  );

  return (
    <div className="group h-full w-full">
      <div className="flex h-full cursor-pointer flex-col overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-[0_10px_35px_-20px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_-20px_rgba(15,23,42,0.45)]">
        {/* Main interactive node for navigation */}
        <button type="button" onClick={openProduct} className="w-full cursor-pointer text-left focus:outline-none">
          <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-5">
            <img
              src={image}
              alt={name}
              className="h-56 w-full rounded-[20px] object-cover transition-transform duration-500 group-hover:scale-110 sm:h-60"
            />
            {discount ? (
              <span className="absolute left-5 top-5 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                {discount}% OFF
              </span>
            ) : null}
          </div>

          <div className="flex flex-1 flex-col px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">{brand}</p>
            <h3 className="mt-1 line-clamp-2 text-base font-bold text-slate-800 sm:text-lg">{name}</h3>

            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center rounded-full bg-emerald-50 px-2.5 py-1">
                <span className="mr-1 text-sm font-semibold text-emerald-600">{rating}</span>
                <div className="flex">{renderStars()}</div>
              </div>
              <span className="text-sm text-gray-500">({reviews} reviews)</span>
            </div>

            <div className="mt-4 flex items-end gap-2">
              <span className="text-xl font-bold text-slate-900">{formatPrice(price)}</span>
              <span className="text-sm text-gray-400 line-through">{formatPrice(originalPrice)}</span>
            </div>
          </div>
        </button>

        {/* Separate isolated button node for actions */}
        <div className="px-4 pb-4 sm:px-5">
          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-black hover:shadow-lg cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;