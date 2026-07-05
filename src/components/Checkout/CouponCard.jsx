import { memo, useState } from "react";
import { useCheckout } from "../../context/CheckoutContext";
import { Gift, X, Check, AlertCircle } from "lucide-react";

/**
 * Coupon Card Component
 * Allows users to apply and manage coupon codes
 */
const CouponCard = memo(() => {
  const { appliedCoupon, couponLoading, couponError, applyCoupon, removeCoupon } = useCheckout();
  const [inputCode, setInputCode] = useState("");
  const [showForm, setShowForm] = useState(!appliedCoupon);

  const handleApply = async () => {
    const success = await applyCoupon(inputCode);
    if (success) {
      setInputCode("");
      setShowForm(false);
    }
  };

  const handleRemove = () => {
    removeCoupon();
    setInputCode("");
    setShowForm(true);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Gift className="w-5 h-5 text-rose-600" />
          <h3 className="text-lg font-bold text-slate-950">Apply Coupon</h3>
        </div>

        {appliedCoupon ? (
          <div className="space-y-3">
            {/* Applied Coupon Badge */}
            <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-bold text-emerald-900">{appliedCoupon.code}</p>
                  <p className="text-xs text-emerald-700">
                    {appliedCoupon.type === "percentage"
                      ? `${appliedCoupon.discount}% discount`
                      : `₹${appliedCoupon.discount} off`}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemove}
                className="p-1 hover:bg-emerald-200 rounded transition-colors"
                aria-label="Remove coupon"
              >
                <X className="w-4 h-4 text-emerald-600" />
              </button>
            </div>

            {/* Available Coupons */}
            <button
              type="button"
              onClick={() => {
                handleRemove();
                setShowForm(true);
              }}
              className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded transition-colors"
            >
              Try another coupon →
            </button>
          </div>
        ) : showForm ? (
          <div className="space-y-3">
            {/* Coupon Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                disabled={couponLoading}
              />
              <button
                type="button"
                onClick={handleApply}
                disabled={!inputCode.trim() || couponLoading}
                className="px-4 py-2 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {couponLoading ? "..." : "Apply"}
              </button>
            </div>

            {/* Error Message */}
            {couponError && (
              <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-700">{couponError}</p>
              </div>
            )}

            {/* Available Coupons List */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <p className="text-xs font-bold text-slate-600">AVAILABLE COUPONS</p>
              <div className="space-y-2">
                {["SAVE10", "SAVE50", "FIRST100", "NEW15"].map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => {
                      setInputCode(code);
                    }}
                    className="w-full text-left px-3 py-2 border border-slate-300 rounded-lg hover:border-slate-950 hover:bg-slate-50 transition-colors text-xs"
                  >
                    <span className="font-bold text-slate-950">{code}</span>
                    {code === "SAVE10" && <span className="ml-2 text-slate-600">10% off</span>}
                    {code === "SAVE50" && <span className="ml-2 text-slate-600">₹50 off</span>}
                    {code === "FIRST100" && <span className="ml-2 text-slate-600">₹100 off</span>}
                    {code === "NEW15" && <span className="ml-2 text-slate-600">15% off</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="w-full text-center px-4 py-2 border border-slate-300 text-slate-950 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
          >
            Have a coupon code?
          </button>
        )}
      </div>
    </div>
  );
});

CouponCard.displayName = "CouponCard";

export default CouponCard;
