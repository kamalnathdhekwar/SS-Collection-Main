import { Heart, Star } from "lucide-react";
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutContext";
import ActionButtons from "./ActionButtons";
import ColorSelector from "./ColorSelector";
import DeliveryChecker from "./DeliveryChecker";
import OffersSection from "./OffersSection";
import PriceSection from "./PriceSection";
import QuantitySelector from "./QuantitySelector";
import SizeSelector from "./SizeSelector";

function ProductInfo({
  product,
  selectedSize: controlledSize,
  selectedColor: controlledColor,
  quantity: controlledQuantity,
  onSizeChange,
  onColorChange,
  onQuantityChange,
  onBuyNow,
  onAddToCart, // FIXED: Destructured incoming add to cart handler from parent
}) {
  const firstAvailableSize = product.sizes.find((size) => size.available)?.label || product.sizes[0]?.label;
  const [internalSize, setInternalSize] = useState(firstAvailableSize);
  const [internalColor, setInternalColor] = useState(product.colors[0]?.name);
  const [internalQuantity, setInternalQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isCompared, setIsCompared] = useState(false);

  const navigate = useNavigate();
  const { initializeCheckout } = useCheckout();

  const selectedSize = controlledSize ?? internalSize;
  const selectedColor = controlledColor ?? internalColor;
  const quantity = controlledQuantity ?? internalQuantity;

  const setSelectedSize = onSizeChange ?? setInternalSize;
  const setSelectedColor = onColorChange ?? setInternalColor;
  const setQuantity = onQuantityChange ?? setInternalQuantity;

  // Standardize object fields before running context mutations
  const getStructuredProduct = () => {
    return {
      ...product,
      mrp: product.mrp || product.originalPrice || product.price,
      sizes: product.sizes || [{ label: selectedSize || "Free Size", available: true }],
      colors: product.colors || [{ name: selectedColor || "Standard Color" }],
      stock: product.stock || { count: 10 }
    };
  };

  const handleBuyNow = () => {
    if (onBuyNow) {
      onBuyNow();
      return;
    }
    const targetProduct = getStructuredProduct();
    initializeCheckout(targetProduct, { selectedSize, selectedColor, quantity });
    navigate(`/checkout/${product.id}`, { state: { selectedSize, selectedColor, quantity } });
  };

  // FIXED: Internal event dispatcher for desktop cart clicks
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart();
      return;
    }
    const targetProduct = getStructuredProduct();
    initializeCheckout(targetProduct, { selectedSize, selectedColor, quantity });
    navigate("/cart");
  };

  return (
    <aside className="space-y-6">
      <section>
        <h1 className="text-2xl font-extrabold text-slate-950 sm:text-3xl">{product.brand}</h1>
        <p className="mt-1 text-xl text-slate-500">{product.name}</p>

        <div className="mt-4 inline-flex items-center gap-2 border border-slate-200 px-3 py-1.5">
          <span className="inline-flex items-center gap-1 font-extrabold text-slate-950">
            {product.rating}
            <Star className="h-4 w-4 fill-teal-600 text-teal-600" />
          </span>
          <span className="h-4 w-px bg-slate-300" />
          <span className="text-slate-600">{product.reviewCount} Ratings</span>
        </div>
      </section>

      <PriceSection price={product.price} mrp={product.mrp} discount={product.discount} />

      <div className="flex flex-wrap gap-2">
        {product.tags?.map((tag) => (
          <span key={tag} className="rounded-full bg-rose-50 px-3 py-1 text-xs font-extrabold uppercase text-rose-600">
            {tag}
          </span>
        ))}
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-extrabold uppercase text-amber-700">
          {product.stock?.label}
        </span>
      </div>

      <SizeSelector sizes={product.sizes} selectedSize={selectedSize} onSelectSize={setSelectedSize} />
      <ColorSelector colors={product.colors} selectedColor={selectedColor} onSelectColor={setSelectedColor} />
      <QuantitySelector quantity={quantity} onChange={setQuantity} maxQuantity={product.stock?.count || 10} />

      <ActionButtons
        isWishlisted={isWishlisted}
        onWishlist={() => setIsWishlisted((value) => !value)}
        isCompared={isCompared}
        onCompare={() => setIsCompared((value) => !value)}
        onAddToCart={handleAddToCart} // FIXED: Dynamic reference hooked instead of blank function block
        onBuyNow={handleBuyNow}
      />

      <DeliveryChecker delivery={product.delivery} returnPolicy={product.returnPolicy} />
      <OffersSection offers={product.offers} />

      {isWishlisted && (
        <p className="inline-flex items-center gap-2 text-sm font-bold text-rose-600">
          <Heart className="h-4 w-4 fill-rose-600" />
          Added to wishlist
        </p>
      )}
    </aside>
  );
}

export default memo(ProductInfo);