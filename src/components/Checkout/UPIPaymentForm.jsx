import { memo } from "react";
import { QrCode } from "lucide-react";
import { useCheckout } from "../../context/CheckoutContext";

/**
 * UPI Payment Form Component
 * Handles UPI ID input and QR code display
 */
const UPIPaymentForm = memo(() => {
  const { upiId, updateUpiId } = useCheckout();

  return (
    <div className="space-y-6">
      {/* UPI ID Input */}
      <div>
        <label htmlFor="upi-id" className="block text-sm font-semibold text-slate-950 mb-2">
          UPI ID
        </label>
        <input
          id="upi-id"
          type="text"
          inputMode="email"
          autoComplete="off"
          placeholder="yourname@upi"
          value={upiId}
          onChange={(e) => updateUpiId(e.target.value)}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950"
        />
        <p className="text-xs text-slate-500 mt-2">
          Enter your UPI ID (e.g., yourname@okhdfcbank, yourname@ybl, etc.)
        </p>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-slate-600">OR</span>
        </div>
      </div>

      {/* QR Code Placeholder */}
      <div className="flex flex-col items-center p-6 border-2 border-dashed border-slate-300 rounded-lg">
        <QrCode className="w-16 h-16 text-slate-400 mb-3" />
        <p className="text-sm font-semibold text-slate-950 text-center mb-1">
          Scan QR Code
        </p>
        <p className="text-xs text-slate-500 text-center">
          Use any UPI app to scan and complete payment
        </p>
      </div>

      {/* Supported UPI Apps */}
      <div>
        <p className="text-xs font-semibold text-slate-600 mb-2">SUPPORTED UPI APPS</p>
        <div className="flex flex-wrap gap-2">
          {["PhonePe", "Google Pay", "BHIM", "Paytm", "WhatsApp Pay"].map((app) => (
            <span
              key={app}
              className="text-xs px-3 py-2 border border-slate-300 rounded-full text-slate-600"
            >
              {app}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

UPIPaymentForm.displayName = "UPIPaymentForm";

export default UPIPaymentForm;
