import { memo, useState } from "react";
import { useCheckout } from "../../context/CheckoutContext";
import { formatIndianPrice } from "../../utils/priceCalculator";
import { TrendingDown, Gift, ChevronDown, ChevronUp } from "lucide-react";

/**
 * Price Summary Component — expandable fees/discounts breakdown
 */
const PriceSummary = memo(({ compact = false }) => {
  const { priceSummary } = useCheckout();
  const [feesOpen, setFeesOpen] = useState(false);
  const [discountsOpen, setDiscountsOpen] = useState(false);

  if (!priceSummary) return null;

  return (
    <div className={`bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm ${compact ? "" : "sticky top-4"}`}>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg font-bold text-slate-950 mb-4">Price Details</h3>

        <div className="space-y-3 pb-4 border-b border-slate-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">MRP (incl. of all taxes)</span>
            <span className="font-semibold text-slate-950">{formatIndianPrice(priceSummary.mrp)}</span>
          </div>

          {/* Expandable Fees */}
          <div>
            <button
              type="button"
              onClick={() => setFeesOpen((v) => !v)}
              className="flex w-full items-center justify-between text-sm text-slate-600 hover:text-slate-950"
              aria-expanded={feesOpen}
            >
              <span className="flex items-center gap-1">
                Fees
                {feesOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </span>
              <span className="font-semibold text-slate-950">
                {formatIndianPrice(priceSummary.platformFee + priceSummary.shipping + priceSummary.gst)}
              </span>
            </button>
            {feesOpen && (
              <div className="mt-2 ml-2 space-y-1.5 text-xs text-slate-500">
                {priceSummary.platformFee > 0 && (
                  <div className="flex justify-between">
                    <span>Platform Fee</span>
                    <span>{formatIndianPrice(priceSummary.platformFee)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={priceSummary.shipping === 0 ? "text-emerald-600" : ""}>
                    {priceSummary.shipping === 0 ? "FREE" : formatIndianPrice(priceSummary.shipping)}
                  </span>
                </div>
                {priceSummary.gst > 0 && (
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>{formatIndianPrice(priceSummary.gst)}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Expandable Discounts */}
          {(priceSummary.discount > 0 || priceSummary.couponDiscount > 0) && (
            <div>
              <button
                type="button"
                onClick={() => setDiscountsOpen((v) => !v)}
                className="flex w-full items-center justify-between text-sm text-emerald-600 hover:text-emerald-700"
                aria-expanded={discountsOpen}
              >
                <span className="flex items-center gap-1">
                  <TrendingDown className="w-4 h-4" />
                  Discounts
                  {discountsOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </span>
                <span className="font-semibold">
                  -{formatIndianPrice(priceSummary.discount + priceSummary.couponDiscount)}
                </span>
              </button>
              {discountsOpen && (
                <div className="mt-2 ml-2 space-y-1.5 text-xs text-emerald-600">
                  {priceSummary.discount > 0 && (
                    <div className="flex justify-between">
                      <span>MRP Discount</span>
                      <span>-{formatIndianPrice(priceSummary.discount)}</span>
                    </div>
                  )}
                  {priceSummary.couponDiscount > 0 && (
                    <div className="flex justify-between">
                      <span className="flex items-center gap-1">
                        <Gift className="w-3 h-3" /> Coupon
                      </span>
                      <span>-{formatIndianPrice(priceSummary.couponDiscount)}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Grand Total */}
        <div className="py-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-slate-950">Total Amount</span>
            <span className="text-2xl font-bold text-blue-700">
              {formatIndianPrice(priceSummary.grandTotal)}
            </span>
          </div>
        </div>

        {priceSummary.totalSavings > 0 && (
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
            <p className="text-sm text-emerald-800">
              <span className="font-bold">You&apos;ll save {formatIndianPrice(priceSummary.totalSavings)}</span> on this order!
            </p>
          </div>
        )}

        {!compact && priceSummary.estimatedDelivery && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-slate-600 mb-1">Estimated Delivery</p>
            <p className="text-sm font-semibold text-slate-950">
              {priceSummary.estimatedDelivery.min} – {priceSummary.estimatedDelivery.max}
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

PriceSummary.displayName = "PriceSummary";

export default PriceSummary;

