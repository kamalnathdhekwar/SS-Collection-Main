import { memo } from "react";
import { Star, Truck, RotateCcw, Store } from "lucide-react";
import { useCheckout } from "../../context/CheckoutContext";
import { formatIndianPrice } from "../../utils/priceCalculator";
import QuantitySelector from "./QuantitySelector";

/**
 * Order Item Component
 * Displays the product being ordered with details and quantity selector
 */
const OrderItem = memo(() => {
  const { selectedProduct, quantity, selectedSize, selectedColor, priceSummary } = useCheckout();

  if (!selectedProduct) return null;

  const itemTotal = selectedProduct.price * quantity;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-4 p-4 sm:p-6">
        {/* Image */}
        <div className="mx-auto w-full max-w-[140px] sm:max-w-none">
          <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden">
            <img
              src={selectedProduct.images?.[0]?.src || selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between min-w-0">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 font-bold">
              {selectedProduct.brand}
            </p>
            <h3 className="text-base sm:text-lg font-bold text-slate-950 mt-1 line-clamp-2">
              {selectedProduct.name}
            </h3>

            {/* Rating */}
            <div className="mt-2 inline-flex items-center gap-1.5 rounded border border-slate-200 px-2 py-1">
              <span className="text-sm font-bold text-slate-950">{selectedProduct.rating}</span>
              <Star className="w-3.5 h-3.5 fill-teal-600 text-teal-600" aria-hidden="true" />
              <span className="text-xs text-slate-500">({selectedProduct.reviewCount})</span>
            </div>

            {/* Product Attributes */}
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedSize && (
                <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded">
                  Size: {selectedSize}
                </span>
              )}
              {selectedColor && (
                <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded">
                  Color: {selectedColor}
                </span>
              )}
            </div>

            {/* Stock Status */}
            {selectedProduct.stock && (
              <p className="mt-2 text-sm font-semibold text-emerald-600">
                ✓ {selectedProduct.stock.label || "In Stock"}
              </p>
            )}

            {/* Pricing */}
            <div className="mt-3 flex flex-wrap items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold text-slate-950">
                {formatIndianPrice(selectedProduct.price)}
              </span>
              {selectedProduct.mrp > selectedProduct.price && (
                <>
                  <span className="text-sm text-slate-400 line-through">
                    {formatIndianPrice(selectedProduct.mrp)}
                  </span>
                  <span className="text-sm font-bold text-emerald-600">
                    {selectedProduct.discount}% OFF
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm text-slate-600 font-medium">Quantity</span>
            <QuantitySelector />
          </div>
        </div>
      </div>

      {/* Delivery, Return, Seller Info */}
      <div className="border-t border-slate-200 px-4 sm:px-6 py-4 bg-slate-50/80 space-y-2.5">
        {priceSummary?.estimatedDelivery && (
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Truck className="w-4 h-4 text-blue-600 flex-shrink-0" aria-hidden="true" />
            <span>
              Delivery by{" "}
              <span className="font-semibold text-slate-950">
                {priceSummary.estimatedDelivery.min} – {priceSummary.estimatedDelivery.max}
              </span>
            </span>
          </div>
        )}
        {selectedProduct.returnPolicy && (
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <RotateCcw className="w-4 h-4 text-slate-500 flex-shrink-0" aria-hidden="true" />
            <span>{selectedProduct.returnPolicy}</span>
          </div>
        )}
        {selectedProduct.seller && (
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Store className="w-4 h-4 text-slate-500 flex-shrink-0" aria-hidden="true" />
            <span>
              Sold by <span className="font-semibold text-slate-950">{selectedProduct.seller}</span>
            </span>
          </div>
        )}
      </div>

      {/* Item Total */}
      <div className="border-t border-slate-200 px-4 sm:px-6 py-3 bg-white">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-700">Item Total</span>
          <span className="text-lg font-bold text-slate-950">{formatIndianPrice(itemTotal)}</span>
        </div>
      </div>
    </div>
  );
});

OrderItem.displayName = "OrderItem";

export default OrderItem;
