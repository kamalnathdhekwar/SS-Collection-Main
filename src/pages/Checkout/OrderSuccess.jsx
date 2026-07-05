import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Package, Download, Truck, Home, MapPin } from "lucide-react";
import { useCheckout } from "../../context/CheckoutContext";
import CheckoutStepper from "../../components/Checkout/CheckoutStepper";
import { formatIndianPrice } from "../../utils/priceCalculator";

/**
 * Order Success Page — Step 3 of checkout
 */
function OrderSuccess() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { getOrderSummary, resetCheckout, orderId: contextOrderId } = useCheckout();
  const orderSummary = getOrderSummary();
  const displayOrderId = orderId || contextOrderId;

  useEffect(() => {
    if (!orderSummary?.product) {
      const timer = setTimeout(() => navigate("/"), 3000);
      return () => clearTimeout(timer);
    }
  }, [orderSummary, navigate]);

  if (!orderSummary?.product) {
    return (
      <div className="grid min-h-[60vh] place-items-center bg-slate-50">
        <p className="text-slate-600" role="status">Redirecting...</p>
      </div>
    );
  }

  const handleContinueShopping = () => {
    resetCheckout();
    navigate("/");
  };

  const grandTotal = orderSummary.price?.grandTotal ?? 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <CheckoutStepper currentStep={3} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* Success Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            className="inline-block mb-5"
          >
            <div className="relative w-24 h-24 mx-auto">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-emerald-100 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle2 className="w-16 h-16 text-emerald-600" aria-hidden="true" />
              </div>
            </div>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-950 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-slate-600">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Order Info */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-950 mb-4">Order Details</h2>
            <dl className="space-y-3">
              <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                <dt className="text-slate-600">Order ID</dt>
                <dd className="font-mono font-bold text-slate-950 text-sm text-right break-all">{displayOrderId}</dd>
              </div>
              <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                <dt className="text-slate-600">Order Date</dt>
                <dd className="font-semibold text-slate-950">
                  {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                </dd>
              </div>
              <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                <dt className="text-slate-600">Order Total</dt>
                <dd className="text-xl font-bold text-slate-950">{formatIndianPrice(grandTotal)}</dd>
              </div>
              <div className="flex items-start justify-between">
                <dt className="text-slate-600">Payment Status</dt>
                <dd>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 font-semibold rounded-full text-sm">
                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                    Paid
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          {/* Delivery Info */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-950 mb-4">Delivery Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-4 border-b border-slate-200">
                <Package className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-slate-950">Order Processing</p>
                  <p className="text-xs text-slate-600">We&apos;re preparing your order for shipment</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-4 border-b border-slate-200">
                <Truck className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-slate-950">Estimated Delivery</p>
                  <p className="text-xs text-slate-600">
                    {orderSummary.price?.estimatedDelivery?.min} – {orderSummary.price?.estimatedDelivery?.max}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-slate-950">Delivery Address</p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {orderSummary.address?.name}, {orderSummary.address?.address},{" "}
                    {orderSummary.address?.city}, {orderSummary.address?.state} {orderSummary.address?.zipCode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Summary */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950 mb-4">Order Summary</h2>
          <div className="flex gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
              <img
                src={orderSummary.product?.images?.[0]?.src || orderSummary.product?.image}
                alt={orderSummary.product?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-wide text-slate-500 font-bold">{orderSummary.product?.brand}</p>
              <h3 className="text-base sm:text-lg font-bold text-slate-950 mt-1 line-clamp-2">{orderSummary.product?.name}</h3>
              <div className="mt-2 space-y-0.5 text-sm text-slate-600">
                {orderSummary.selectedSize && <p>Size: <span className="font-semibold">{orderSummary.selectedSize}</span></p>}
                {orderSummary.selectedColor && <p>Color: <span className="font-semibold">{orderSummary.selectedColor}</span></p>}
                <p>Qty: <span className="font-semibold">{orderSummary.quantity}</span></p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xl font-bold text-slate-950">{formatIndianPrice(grandTotal)}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={handleContinueShopping}
            className="sm:col-span-1 px-6 py-3 bg-slate-950 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" aria-hidden="true" />
            Continue Shopping
          </button>
          <button
            type="button"
            className="px-6 py-3 border border-slate-300 text-slate-950 rounded-lg font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            aria-label="Download invoice (coming soon)"
          >
            <Download className="w-5 h-5" aria-hidden="true" />
            Download Invoice
          </button>
          <button
            type="button"
            className="px-6 py-3 border border-slate-300 text-slate-950 rounded-lg font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            aria-label="Track order (coming soon)"
          >
            <Truck className="w-5 h-5" aria-hidden="true" />
            Track Order
          </button>
        </div>

        {/* Track Order Info */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Track your order:</span> You&apos;ll receive SMS and email updates with tracking information.
          </p>
        </div>
      </main>
    </div>
  );
}

export default OrderSuccess;
