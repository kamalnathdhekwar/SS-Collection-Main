import { Heart, ShoppingCart, Star, Truck } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductRouteId } from "../../utils/getProductById";
import { handleProductNavigation } from "../../utils/productNavigation";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

function ProductCard({ product, onAddToCart }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();
  const routeId = useMemo(() => getProductRouteId(product), [product]);

  const openProduct = useCallback(
    (event) => {
      handleProductNavigation(navigate, { ...product, routeId }, event);
    },
    [navigate, product, routeId],
  );

  const handleContentKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProduct(event);
      }
    },
    [openProduct],
  );

  const handleAddToCart = useCallback(
    (event) => {
      event.stopPropagation();
      onAddToCart?.(product);
      handleProductNavigation(navigate, { ...product, routeId }, event);
    },
    [navigate, onAddToCart, product, routeId],
  );

  const handleBuyNow = useCallback(
    (event) => {
      event.stopPropagation();
      handleProductNavigation(navigate, { ...product, routeId }, event);
    },
    [navigate, product, routeId],
  );

  const handleWishlistToggle = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsWishlisted((value) => !value);
  }, []);

  return (
    <article className="group flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div role="button" tabIndex={0} onClick={openProduct} onKeyDown={handleContentKeyDown} className="w-full cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100">
          <img src={product.image} alt={`${product.brand} ${product.name}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />

          <div className="absolute left-2 top-2 flex max-w-[75%] flex-wrap gap-1.5">
            {product.isTrending && <span className="rounded-full bg-rose-600 px-2 py-1 text-[10px] font-bold uppercase text-white shadow">Trending</span>}
            {product.isBestSeller && <span className="rounded-full bg-emerald-600 px-2 py-1 text-[10px] font-bold uppercase text-white shadow">Best</span>}
            {product.stock === "Limited Stock" && <span className="rounded-full bg-amber-500 px-2 py-1 text-[10px] font-bold uppercase text-white shadow">Limited</span>}
          </div>

          <button type="button" aria-label="Toggle wishlist" onClick={handleWishlistToggle} className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-slate-700 shadow-md transition duration-300 hover:scale-110 hover:text-rose-600">
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-rose-600 text-rose-600" : ""}`} />
          </button>

          <button type="button" onClick={openProduct} className="absolute inset-x-2 bottom-2 translate-y-3 rounded-lg bg-white/95 px-3 py-2 text-xs font-bold text-slate-900 opacity-0 shadow-lg transition duration-300 hover:bg-slate-900 hover:text-white group-hover:translate-y-0 group-hover:opacity-100">
            Quick View
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-3 sm:p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-extrabold uppercase tracking-wide text-slate-950 sm:text-sm">{product.brand}</p>
              <h3 className="mt-1 h-10 overflow-hidden text-xs font-medium leading-5 text-slate-600 sm:text-sm">{product.name}</h3>
            </div>

            <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-emerald-600 px-1.5 py-1 text-[11px] font-bold text-white sm:px-2">
              {product.rating}
              <Star className="h-3 w-3 fill-white" />
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-sm font-extrabold text-slate-950 sm:text-lg">{formatPrice(product.price)}</span>
            <span className="text-xs text-slate-400 line-through sm:text-sm">{formatPrice(product.originalPrice)}</span>
            <span className="text-xs font-bold text-emerald-600 sm:text-sm">{product.discount}% off</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {product.sizes.slice(0, 5).map((size) => (
              <span key={size} className="rounded-md border border-slate-200 px-2 py-1 text-[11px] font-bold text-slate-600">{size}</span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between gap-2 text-[11px] font-bold text-slate-500 sm:text-xs">
            <span className="inline-flex items-center gap-1 text-emerald-700">
              <Truck className="h-3.5 w-3.5" />
              {product.delivery}
            </span>
            <span className="truncate">{product.stock}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 p-3 pt-0 sm:p-4 sm:pt-0">
        <button type="button" onClick={handleAddToCart} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-2 py-2.5 text-xs font-extrabold text-slate-900 transition duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white sm:text-sm">
          <ShoppingCart className="h-4 w-4" />
          Cart
        </button>
        <button type="button" onClick={handleBuyNow} className="rounded-lg bg-rose-600 px-2 py-2.5 text-xs font-extrabold text-white shadow-sm transition duration-300 hover:bg-rose-700 hover:shadow-md sm:text-sm">
          Buy Now
        </button>
      </div>
    </article>
  );
}

export default ProductCard;