import { Heart, Share2, ShoppingCart, GitCompareArrows, Zap } from "lucide-react";
import { memo } from "react";

function ActionButtons({ isWishlisted, onWishlist, isCompared, onCompare, onAddToCart, onBuyNow }) {
  return (
    <section className="grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
      <button
        type="button"
        onClick={onAddToCart}
        className="inline-flex h-16 items-center justify-center gap-3 rounded-md bg-rose-500 px-6 text-base font-extrabold uppercase text-white transition hover:bg-rose-600"
      >
        <ShoppingCart className="h-5 w-5" />
        Add To Bag
      </button>

      <button
        type="button"
        onClick={onWishlist}
        className={`inline-flex h-16 items-center justify-center gap-3 rounded-md border px-6 text-base font-extrabold uppercase transition ${
          isWishlisted ? "border-rose-500 bg-rose-50 text-rose-600" : "border-slate-300 bg-white text-slate-950 hover:border-slate-950"
        }`}
      >
        <Heart className={`h-5 w-5 ${isWishlisted ? "fill-rose-500" : ""}`} />
        Wishlist
      </button>

      <button
        type="button"
        onClick={onBuyNow}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-slate-950 px-5 text-sm font-extrabold uppercase text-white transition hover:bg-slate-800"
      >
        <Zap className="h-4 w-4" />
        Buy Now
      </button>

      <div className="grid grid-cols-2 gap-3">
        <button type="button" className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-slate-300 text-sm font-extrabold uppercase">
          <Share2 className="h-4 w-4" />
          Share
        </button>
        <button
          type="button"
          onClick={onCompare}
          className={`inline-flex h-12 items-center justify-center gap-2 rounded-md border text-sm font-extrabold uppercase ${
            isCompared ? "border-rose-500 text-rose-600" : "border-slate-300"
          }`}
        >
          <GitCompareArrows className="h-4 w-4" />
          Compare
        </button>
      </div>
    </section>
  );
}

export default memo(ActionButtons);