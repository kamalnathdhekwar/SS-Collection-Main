import { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useCheckout } from "../../context/CheckoutContext";
import { getProductById } from "../../utils/getProductById";
import { formatIndianPrice } from "../../utils/priceCalculator";
import CheckoutStepper from "../../components/Checkout/CheckoutStepper";
import OrderItem from "../../components/Checkout/OrderItem";
import PriceSummary from "../../components/Checkout/PriceSummary";
import AddressCard from "../../components/Checkout/AddressCard";
import CouponCard from "../../components/Checkout/CouponCard";

/**
 * Order Summary Page — Step 1 of checkout
 */
function OrderSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();
  const { initializeCheckout, selectedProduct, priceSummary } = useCheckout();

  useEffect(() => {
    const product = getProductById(productId);
    if (!product) {
      navigate("/");
      return;
    }
    if (!selectedProduct || selectedProduct.id !== product.id) {
      initializeCheckout(product, location.state ?? {});
    }
  }, [productId, selectedProduct, initializeCheckout, navigate, location.state]);

  const handleContinue = () => {
    navigate(`/payment/${productId}`);
  };

  if (!selectedProduct) {
    return (
      <div className="grid min-h-[60vh] place-items-center bg-slate-50">
        <div className="text-center" role="status" aria-live="polite">
          <ShoppingBag className="mx-auto h-12 w-12 text-slate-400" />
          <p className="mt-4 text-slate-600">Loading order summary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-28 lg:pb-8">
      <CheckoutStepper currentStep={1} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <button
          type="button"
          onClick={() => navigate(`/product/${productId}`)}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-950 mb-4 lg:mb-6 transition-colors"
          aria-label="Go back to product"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back
        </button>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            <AddressCard />
            <OrderItem />
            <CouponCard />

            <p className="text-xs text-slate-500 leading-relaxed px-1">
              By placing your order, you agree to SS Collection&apos;s terms of use and privacy policy.
              Please check the product and address details before continuing to payment.
            </p>
          </div>

          {/* Right Column — Sticky Price Summary */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-4 space-y-4">
              <PriceSummary />
              <button
                type="button"
                onClick={handleContinue}
                className="hidden lg:flex w-full px-6 py-3.5 bg-slate-950 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors items-center justify-center"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Mobile Continue Bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] lg:hidden">
        <div className="flex items-center justify-between gap-3 max-w-7xl mx-auto">
          <div>
            <p className="text-xs text-slate-500">Total Amount</p>
            <p className="text-lg font-bold text-slate-950">
              {formatIndianPrice(priceSummary?.grandTotal ?? 0)}
            </p>
          </div>
          <button
            type="button"
            onClick={handleContinue}
            className="flex-1 max-w-[200px] px-4 py-3 bg-slate-950 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
