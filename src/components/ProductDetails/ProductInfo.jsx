import { Heart, Star } from "lucide-react";
import { memo, useState } from "react";
import ActionButtons from "./ActionButtons";
import ColorSelector from "./ColorSelector";
import DeliveryChecker from "./DeliveryChecker";
import OffersSection from "./OffersSection";
import PriceSection from "./PriceSection";
import QuantitySelector from "./QuantitySelector";
import SizeSelector from "./SizeSelector";

function ProductInfo({ product }) {
  const firstAvailableSize = product.sizes.find((size) => size.available)?.label || product.sizes[0]?.label;
  const [selectedSize, setSelectedSize] = useState(firstAvailableSize);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isCompared, setIsCompared] = useState(false);

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
        {product.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-rose-50 px-3 py-1 text-xs font-extrabold uppercase text-rose-600">
            {tag}
          </span>
        ))}
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-extrabold uppercase text-amber-700">
          {product.stock.label}
        </span>
      </div>

      <SizeSelector sizes={product.sizes} selectedSize={selectedSize} onSelectSize={setSelectedSize} />
      <ColorSelector colors={product.colors} selectedColor={selectedColor} onSelectColor={setSelectedColor} />
      <QuantitySelector quantity={quantity} onChange={setQuantity} maxQuantity={product.stock.count} />

      <ActionButtons
        isWishlisted={isWishlisted}
        onWishlist={() => setIsWishlisted((value) => !value)}
        isCompared={isCompared}
        onCompare={() => setIsCompared((value) => !value)}
        onAddToCart={() => {}}
        onBuyNow={() => {}}
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