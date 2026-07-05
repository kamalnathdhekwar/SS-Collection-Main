import { memo } from "react";

function QuantitySelector({ quantity, onChange, maxQuantity }) {
  return (
    <section>
      <h3 className="mb-3 text-sm font-extrabold uppercase text-slate-950">Quantity</h3>
      <div className="inline-flex items-center rounded-md border border-slate-300 bg-white">
        <button
          type="button"
          disabled={quantity <= 1}
          onClick={() => onChange(quantity - 1)}
          className="h-11 w-11 text-lg font-extrabold text-slate-900 disabled:text-slate-300"
        >
          -
        </button>
        <span className="grid h-11 w-12 place-items-center border-x border-slate-300 text-sm font-extrabold">
          {quantity}
        </span>
        <button
          type="button"
          disabled={quantity >= maxQuantity}
          onClick={() => onChange(quantity + 1)}
          className="h-11 w-11 text-lg font-extrabold text-slate-900 disabled:text-slate-300"
        >
          +
        </button>
      </div>
    </section>
  );
}

export default memo(QuantitySelector);