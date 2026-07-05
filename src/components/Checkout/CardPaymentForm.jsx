import { memo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useCheckout } from "../../context/CheckoutContext";
import { getCardType } from "../../utils/paymentValidation";

/**
 * Card Payment Form Component
 * Handles credit/debit card information input
 */
const CardPaymentForm = memo(() => {
  const { cardDetails, updateCardDetails } = useCheckout();
  const [showCVV, setShowCVV] = useState(false);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.slice(0, 2) + "/" + v.slice(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e) => {
    const value = formatCardNumber(e.target.value);
    updateCardDetails({ cardNumber: value });
  };

  const handleExpiryChange = (e) => {
    const value = formatExpiryDate(e.target.value);
    updateCardDetails({ expiryDate: value });
  };

  const handleCVVChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/gi, "").slice(0, 4);
    updateCardDetails({ cvv: value });
  };

  const cardType = getCardType(cardDetails.cardNumber);

  return (
    <div className="space-y-4">
      {/* Card Preview */}
      <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl text-white overflow-hidden relative min-h-[200px]">
        {/* Card Background Pattern */}
        <div className="absolute top-0 right-0 opacity-10">
          <div className="w-32 h-32 bg-slate-400 rounded-full" />
        </div>

        <div className="relative z-10 flex flex-col justify-between h-full min-h-[180px]">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest opacity-75">{cardType}</p>
            <div className="w-10 h-7 bg-amber-400/80 rounded" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest opacity-75">Card Number</p>
            <p className="text-xl font-mono tracking-widest mt-2 font-bold">
              {cardDetails.cardNumber || "•••• •••• •••• ••••"}
            </p>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest opacity-75">Card Holder</p>
              <p className="text-sm font-semibold mt-1 uppercase">
                {cardDetails.cardholderName || "Your Name"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest opacity-75">Expires</p>
              <p className="text-sm font-semibold mt-1 font-mono">
                {cardDetails.expiryDate || "MM/YY"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Number */}
      <div>
        <label htmlFor="card-number" className="block text-sm font-semibold text-slate-950 mb-2">
          Card Number
        </label>
        <input
          id="card-number"
          type="text"
          inputMode="numeric"
          autoComplete="cc-number"
          maxLength="19"
          placeholder="1234 5678 9012 3456"
          value={cardDetails.cardNumber}
          onChange={handleCardNumberChange}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950"
        />
      </div>

      {/* Cardholder Name */}
      <div>
        <label htmlFor="cardholder-name" className="block text-sm font-semibold text-slate-950 mb-2">
          Cardholder Name
        </label>
        <input
          id="cardholder-name"
          type="text"
          autoComplete="cc-name"
          placeholder="John Doe"
          value={cardDetails.cardholderName}
          onChange={(e) => updateCardDetails({ cardholderName: e.target.value })}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950"
        />
      </div>

      {/* Expiry and CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="card-expiry" className="block text-sm font-semibold text-slate-950 mb-2">
            Expiry Date
          </label>
          <input
            id="card-expiry"
            type="text"
            inputMode="numeric"
            autoComplete="cc-exp"
            maxLength="5"
            placeholder="MM/YY"
            value={cardDetails.expiryDate}
            onChange={handleExpiryChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950"
          />
        </div>

        <div>
          <label htmlFor="card-cvv" className="block text-sm font-semibold text-slate-950 mb-2">
            CVV
          </label>
          <div className="relative">
            <input
              id="card-cvv"
              type={showCVV ? "text" : "password"}
              inputMode="numeric"
              autoComplete="cc-csc"
              maxLength="4"
              placeholder="123"
              value={cardDetails.cvv}
              onChange={handleCVVChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950"
            />
            <button
              type="button"
              onClick={() => setShowCVV(!showCVV)}
              className="absolute right-3 top-3 text-slate-600 hover:text-slate-950"
              aria-label={showCVV ? "Hide CVV" : "Show CVV"}
            >
              {showCVV ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <p className="text-xs text-slate-500">
        Your payment information is secure and encrypted. We don't store full card details on our servers.
      </p>
    </div>
  );
});

CardPaymentForm.displayName = "CardPaymentForm";

export default CardPaymentForm;
