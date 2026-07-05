import { Package, ShoppingCart, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutContext";
import Breadcrumb from "./Breadcrumb";
import ImageGallery from "./ImageGallery";
import ProductInfo from "./ProductInfo";
import ReviewSection from "./ReviewSection";
import SimilarProducts from "./SimilarProducts";
import Specifications from "./Specifications";
import { buildBreadcrumbs, formatPrice, getProductById } from "../../utils/getProductById";

function ProductDetailsContent({ product }) {
  const navigate = useNavigate();
  const { initializeCheckout } = useCheckout();

  const firstAvailableSize = product.sizes?.find((size) => size.available)?.label || product.sizes?.[0]?.label;
  const [selectedSize, setSelectedSize] = useState(firstAvailableSize);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name);
  const [quantity, setQuantity] = useState(1);

  const breadcrumbs = useMemo(() => buildBreadcrumbs(product), [product]);

  const handleBuyNow = () => {
    initializeCheckout(product, { selectedSize, selectedColor, quantity });
    navigate(`/checkout/${product.id}`, { state: { selectedSize, selectedColor, quantity } });
  };

  return (
    <main className="min-h-screen bg-white pb-24 text-slate-950 lg:pb-0">
      <div className="mx-auto max-w-[1480px] px-3 py-5 sm:px-5 lg:px-6">
        <Breadcrumb items={breadcrumbs} />

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(430px,0.8fr)]">
          <ImageGallery images={product.images} productName={product.name} />
          <ProductInfo
            product={product}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            quantity={quantity}
            onSizeChange={setSelectedSize}
            onColorChange={setSelectedColor}
            onQuantityChange={setQuantity}
            onBuyNow={handleBuyNow}
          />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(430px,0.8fr)]">
          <div className="space-y-8">
            <Specifications product={product} />
            <ReviewSection product={product} />
          </div>
          <SimilarProducts product={product} />
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white p-3 shadow-2xl lg:hidden">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-extrabold">{formatPrice(product.price)}</p>
            <p className="text-xs text-slate-500">{product.discount}% OFF</p>
          </div>
          <p className="text-xs font-bold text-amber-600">{product.stock.label}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-rose-500 text-sm font-extrabold uppercase text-white"
          >
            <ShoppingCart className="h-4 w-4" />
            Add To Bag
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-slate-950 text-sm font-extrabold uppercase text-white"
          >
            <Zap className="h-4 w-4" />
            Buy Now
          </button>
        </div>
      </div>
    </main>
  );
}

function ProductDetails() {
  const { id } = useParams();
  const product = useMemo(() => getProductById(id), [id]);

  if (!product) {
    return (
      <main className="grid min-h-screen place-items-center bg-white px-4 text-center">
        <div>
          <Package className="mx-auto h-12 w-12 text-slate-400" />
          <h1 className="mt-4 text-2xl font-extrabold text-slate-950">Product not found</h1>
          <Link to="/" className="mt-5 inline-flex rounded-md bg-slate-950 px-5 py-3 text-sm font-bold text-white">
            Go Home
          </Link>
        </div>
      </main>
    );
  }

  return <ProductDetailsContent key={product.id} product={product} />;
}

export default ProductDetails;
