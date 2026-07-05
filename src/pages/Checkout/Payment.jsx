import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, AlertCircle, Lock, ShieldCheck } from "lucide-react";
import { useCheckout } from "../../context/CheckoutContext";
import { getProductById } from "../../utils/getProductById";
import { formatIndianPrice } from "../../utils/priceCalculator";
import {
  validateUpiId,
  validateCardDetails,
  validateGiftCardCode,
} from "../../utils/paymentValidation";
import CheckoutStepper from "../../components/Checkout/CheckoutStepper";
import PaymentMethods from "../../components/Checkout/PaymentMethods";
import CardPaymentForm from "../../components/Checkout/CardPaymentForm";
import UPIPaymentForm from "../../components/Checkout/UPIPaymentForm";
import GiftCardForm from "../../components/Checkout/GiftCardForm";
import PriceSummary from "../../components/Checkout/PriceSummary";

const CARD_METHODS = ["credit", "debit", "card"];

function PaymentFormPanel({ paymentMethod, priceSummary }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={paymentMethod}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
      >
        {CARD_METHODS.includes(paymentMethod) && (
          <>
            <h2 className="text-lg font-bold text-slate-950 mb-4">
              {paymentMethod === "credit" ? "Credit Card Details" : paymentMethod === "debit" ? "Debit Card Details" : "Card Details"}
            </h2>
            <CardPaymentForm />
          </>
        )}

        {paymentMethod === "upi" && (
          <>
            <h2 className="text-lg font-bold text-slate-950 mb-4">UPI Payment</h2>
            <UPIPaymentForm />
          </>
        )}

        {paymentMethod === "netbanking" && (
          <>
            <h2 className="text-lg font-bold text-slate-950 mb-4">Net Banking</h2>
            <div className="p-6 bg-slate-50 rounded-lg text-center">
              <p className="text-slate-600">You will be redirected to your bank&apos;s secure portal</p>
              <select
                className="mt-4 w-full max-w-xs mx-auto px-4 py-3 border border-slate-300 rounded-lg bg-white text-sm"
                aria-label="Select your bank"
                defaultValue=""
              >
                <option value="" disabled>Select your bank</option>
                {["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak Mahindra", "Punjab National Bank"].map(
                  (bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ),
                )}
              </select>
            </div>
          </>
        )}

        {paymentMethod === "wallet" && (
          <>
            <h2 className="text-lg font-bold text-slate-950 mb-4">Digital Wallet</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {["Paytm", "PhonePe", "Amazon Pay", "Mobikwik", "Freecharge"].map((wallet) => (
                <button
                  key={wallet}
                  type="button"
                  className="p-4 border border-slate-200 rounded-lg hover:border-slate-950 hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-700"
                >
                  {wallet}
                </button>
              ))}
            </div>
          </>
        )}

        {paymentMethod === "cod" && (
          <>
            <h2 className="text-lg font-bold text-slate-950 mb-4">Cash on Delivery</h2>
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                Pay {formatIndianPrice(priceSummary.grandTotal)} at the time of delivery. A convenience fee of ₹9 may apply for COD orders.
              </p>
            </div>
          </>
        )}

        {paymentMethod === "giftcard" && (
          <>
            <h2 className="text-lg font-bold text-slate-950 mb-4">Gift Card</h2>
            <GiftCardForm />
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Payment Page — Step 2 of checkout
 */
function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();
  const {
    paymentMethod,
    processPayment,
    orderLoading,
    cardDetails,
    upiId,
    giftCardCode,
    priceSummary,
    selectedProduct,
    initializeCheckout,
  } = useCheckout();
  const [paymentError, setPaymentError] = useState("");

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

  const validatePayment = () => {
    if (CARD_METHODS.includes(paymentMethod)) {
      return validateCardDetails(cardDetails);
    }
    if (paymentMethod === "upi") {
      return validateUpiId(upiId);
    }
    if (paymentMethod === "giftcard") {
      return validateGiftCardCode(giftCardCode);
    }
    return null;
  };

  const handlePayment = async () => {
    const validationError = validatePayment();
    if (validationError) {
      setPaymentError(validationError);
      return;
    }

    try {
      setPaymentError("");
      const result = await processPayment();
      if (result.success) {
        navigate(`/order-success/${result.orderId}`);
      }
    } catch (error) {
      setPaymentError(error.message || "Payment failed. Please try again.");
    }
  };

  if (!priceSummary || !selectedProduct) {
    return (
      <div className="grid min-h-[60vh] place-items-center bg-slate-50">
        <p className="text-slate-600" role="status">Loading payment...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-28 md:pb-8">
      <CheckoutStepper currentStep={2} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <button
            type="button"
            onClick={() => navigate(`/checkout/${productId}`)}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-950 transition-colors"
            aria-label="Back to order summary"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back
          </button>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            100% Secure
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-slate-950 mb-6">Complete Payment</h1>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {/* Left — Payment Methods + Form */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="hidden md:grid md:grid-cols-[240px_1fr]">
                <div className="border-r border-slate-200 bg-white">
                  <PaymentMethods layout="sidebar" />
                </div>
                <div className="p-6">
                  <PaymentFormPanel paymentMethod={paymentMethod} priceSummary={priceSummary} />
                </div>
              </div>

              {/* Mobile layout */}
              <div className="md:hidden p-4 space-y-4">
                <PaymentMethods layout="list" />
                <div className="pt-4 border-t border-slate-200">
                  <PaymentFormPanel paymentMethod={paymentMethod} priceSummary={priceSummary} />
                </div>
              </div>
            </div>

            {paymentError && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
                role="alert"
              >
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{paymentError}</p>
              </motion.div>
            )}

            {/* Processing overlay animation */}
            <AnimatePresence>
              {orderLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                  role="dialog"
                  aria-label="Processing payment"
                >
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="bg-white rounded-2xl p-8 text-center shadow-2xl max-w-sm mx-4"
                  >
                    <div className="w-12 h-12 mx-auto border-4 border-slate-950 border-r-transparent rounded-full animate-spin" />
                    <p className="mt-4 font-bold text-slate-950">Processing Payment</p>
                    <p className="mt-1 text-sm text-slate-500">Please wait, do not close this page</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right — Sticky Summary */}
          <div className="md:col-span-1">
            <div className="md:sticky md:top-36 space-y-4">
              <PriceSummary compact />

              <button
                type="button"
                onClick={handlePayment}
                disabled={orderLoading}
                className="hidden md:flex w-full px-6 py-4 bg-emerald-600 text-white rounded-lg font-bold text-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center gap-2"
              >
                <Lock className="w-5 h-5" aria-hidden="true" />
                Pay {formatIndianPrice(priceSummary.grandTotal)}
              </button>

              <div className="hidden md:block p-4 bg-white rounded-lg border border-slate-200">
                <p className="text-xs text-slate-500 font-semibold mb-2">TRUSTED & SECURE</p>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li>✓ 256-bit SSL Encryption</li>
                  <li>✓ PCI DSS Compliant</li>
                  <li>✓ 100% Buyer Protection</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Mobile Pay Bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden">
        <div className="flex items-center gap-3 max-w-7xl mx-auto">
          <div className="min-w-0">
            <p className="text-xs text-slate-500">Pay Amount</p>
            <p className="text-lg font-bold text-slate-950 truncate">
              {formatIndianPrice(priceSummary.grandTotal)}
            </p>
          </div>
          <button
            type="button"
            onClick={handlePayment}
            disabled={orderLoading}
            className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50"
          >
            {orderLoading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
