import { Truck } from "lucide-react";
import { memo, useState } from "react";

function DeliveryChecker({ delivery, returnPolicy }) {
  const [pincode, setPincode] = useState("");
  const [checked, setChecked] = useState(false);

  const isValid = pincode.trim().length === 6;

  return (
    <section className="border-t border-slate-200 pt-6">
      <h3 className="mb-4 inline-flex items-center gap-2 text-base font-extrabold uppercase text-slate-950">
        Delivery Options
        <Truck className="h-5 w-5" />
      </h3>

      <div className="flex max-w-sm overflow-hidden rounded-md border border-slate-300 bg-white">
        <input
          value={pincode}
          onChange={(event) => {
            setPincode(event.target.value.replace(/\D/g, "").slice(0, 6));
            setChecked(false);
          }}
          placeholder="Enter pincode"
          className="h-12 min-w-0 flex-1 px-4 text-sm font-medium outline-none"
        />
        <button
          type="button"
          onClick={() => setChecked(true)}
          className="px-5 text-sm font-extrabold uppercase text-rose-500"
        >
          Check
        </button>
      </div>

      <p className="mt-3 text-sm text-slate-700">
        Please enter PIN code to check delivery time and Pay on Delivery Availability
      </p>

      <div className="mt-5 space-y-2 text-sm text-slate-800">
        <p>100% Original Products</p>
        <p>{delivery.cod ? "Pay on delivery might be available" : "Pay on delivery unavailable"}</p>
        <p>{returnPolicy}</p>
        {checked && (
          <p className={isValid ? "font-bold text-emerald-600" : "font-bold text-rose-500"}>
            {isValid ? delivery.estimated : "Enter a valid 6 digit pincode"}
          </p>
        )}
      </div>
    </section>
  );
}

export default memo(DeliveryChecker);