import { memo } from "react";
import { Plus, Minus } from "lucide-react";
import { useCheckout } from "../../context/CheckoutContext";

/**
 * Quantity Selector Component
 * Allows users to increase/decrease quantity
 */
const QuantitySelector = memo(() => {
  const { quantity, updateQuantity, selectedProduct } = useCheckout();
  const stockMax = selectedProduct?.stock?.count ?? 10;
  const maxQuantity = Math.min(10, Math.max(1, stockMax));

  const handleIncrement = () => updateQuantity(quantity + 1);
  const handleDecrement = () => updateQuantity(Math.max(1, quantity - 1));

  return (
    <div className="flex items-center gap-2 border border-slate-300 rounded-lg w-fit">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= 1}
        className="p-2 hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4 text-slate-600" />
      </button>
      <span className="w-8 text-center font-semibold" aria-live="polite" aria-label={`Quantity ${quantity}`}>
        {quantity}
      </span>
      <button
        type="button"
        onClick={handleIncrement}
        disabled={quantity >= maxQuantity}
        className="p-2 hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4 text-slate-600" />
      </button>
    </div>
  );
});

QuantitySelector.displayName = "QuantitySelector";

export default QuantitySelector;
