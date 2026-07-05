import { memo } from "react";
import {
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  Banknote,
  Gift,
  CalendarClock,
  ThumbsUp,
} from "lucide-react";
import { useCheckout } from "../../context/CheckoutContext";

const PAYMENT_METHODS = [
  {
    id: "recommended",
    label: "Recommended",
    icon: ThumbsUp,
    description: "Fastest & most secure options",
    group: "recommended",
  },
  {
    id: "upi",
    label: "UPI",
    icon: Smartphone,
    description: "Pay by any UPI app",
    group: "recommended",
  },
  {
    id: "credit",
    label: "Credit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, Amex, RuPay",
    badge: "Offers available",
  },
  {
    id: "debit",
    label: "Debit Card",
    icon: CreditCard,
    description: "All major bank debit cards",
    badge: "Cashback offers",
  },
  {
    id: "netbanking",
    label: "Net Banking",
    icon: Building2,
    description: "All major banks supported",
  },
  {
    id: "wallet",
    label: "Wallet",
    icon: Wallet,
    description: "Paytm, PhonePe, Amazon Pay",
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    icon: Banknote,
    description: "Pay when you receive",
  },
  {
    id: "giftcard",
    label: "Gift Card",
    icon: Gift,
    description: "Redeem SS Collection gift card",
  },
  {
    id: "emi",
    label: "EMI",
    icon: CalendarClock,
    description: "Pay in easy installments",
    disabled: true,
    disabledLabel: "Unavailable",
  },
];

/**
 * Payment Methods — vertical sidebar list with active indicator
 */
const PaymentMethods = memo(({ layout = "list" }) => {
  const { paymentMethod, updatePaymentMethod } = useCheckout();

  const handleSelect = (method) => {
    if (method.disabled) return;
    if (method.id === "recommended") return;
    updatePaymentMethod(method.id);
  };

  const isSelected = (method) => {
    if (method.id === "recommended") return paymentMethod === "upi";
    return paymentMethod === method.id;
  };

  if (layout === "sidebar") {
    return (
      <nav className="divide-y divide-slate-200" aria-label="Payment methods">
        {PAYMENT_METHODS.map((method) => {
          const Icon = method.icon;
          const selected = isSelected(method);
          const active = method.id !== "recommended" && selected;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => handleSelect(method)}
              disabled={method.disabled}
              aria-pressed={active}
              className={`relative w-full text-left px-4 py-4 transition-colors ${
                method.disabled
                  ? "opacity-50 cursor-not-allowed bg-slate-50"
                  : active
                    ? "bg-blue-50/60"
                    : "hover:bg-slate-50"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-slate-950 rounded-r" aria-hidden="true" />
              )}
              <div className="flex items-start gap-3 pl-1">
                <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${active ? "text-slate-950" : "text-slate-500"}`} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`font-semibold text-sm ${active ? "text-slate-950" : "text-slate-700"}`}>
                      {method.label}
                    </span>
                    {method.disabled && (
                      <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded">
                        {method.disabledLabel}
                      </span>
                    )}
                    {method.badge && !method.disabled && (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {method.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{method.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <div className="space-y-2" role="radiogroup" aria-label="Payment methods">
      {PAYMENT_METHODS.filter((m) => m.id !== "recommended").map((method) => {
        const Icon = method.icon;
        const selected = paymentMethod === method.id;

        return (
          <button
            key={method.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => handleSelect(method)}
            disabled={method.disabled}
            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
              method.disabled
                ? "opacity-50 cursor-not-allowed border-slate-200"
                : selected
                  ? "border-slate-950 bg-slate-50"
                  : "border-slate-200 bg-white hover:border-slate-400"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selected ? "border-slate-950 bg-slate-950" : "border-slate-300"
                }`}
              >
                {selected && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Icon className={`w-5 h-5 ${selected ? "text-slate-950" : "text-slate-500"}`} />
                  <h4 className={`font-semibold text-sm ${selected ? "text-slate-950" : "text-slate-700"}`}>
                    {method.label}
                  </h4>
                  {method.disabled && (
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{method.disabledLabel}</span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1">{method.description}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
});

PaymentMethods.displayName = "PaymentMethods";

export default PaymentMethods;
