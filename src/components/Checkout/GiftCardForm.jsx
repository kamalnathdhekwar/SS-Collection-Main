import { memo, useState } from "react";
import { Gift } from "lucide-react";
import { useCheckout } from "../../context/CheckoutContext";

/**
 * Gift Card Payment Form
 */
const GiftCardForm = memo(() => {
  const { giftCardCode, updateGiftCardCode } = useCheckout();
  const [localCode, setLocalCode] = useState(giftCardCode || "");

  const handleChange = (e) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, "");
    setLocalCode(value);
    updateGiftCardCode(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-200 rounded-lg">
        <Gift className="w-5 h-5 text-rose-600 flex-shrink-0" />
        <p className="text-sm text-rose-900">
          Enter your SS Collection gift card number and PIN to redeem balance.
        </p>
      </div>

      <div>
        <label htmlFor="gift-card-number" className="block text-sm font-semibold text-slate-950 mb-2">
          Gift Card Number
        </label>
        <input
          id="gift-card-number"
          type="text"
          placeholder="XXXX-XXXX-XXXX-XXXX"
          value={localCode}
          onChange={handleChange}
          maxLength={19}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950 font-mono tracking-wider"
        />
      </div>

      <div>
        <label htmlFor="gift-card-pin" className="block text-sm font-semibold text-slate-950 mb-2">
          PIN
        </label>
        <input
          id="gift-card-pin"
          type="password"
          placeholder="6-digit PIN"
          maxLength={6}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950"
        />
      </div>
    </div>
  );
});

GiftCardForm.displayName = "GiftCardForm";

export default GiftCardForm;
