import { memo } from "react";
import { formatPrice } from "../../utils/productHelpers";

function PriceSection({ price, mrp, discount }) {
  return (
    <section className="border-t border-slate-200 pt-5">
      <div className="flex flex-wrap items-end gap-3">
        <span className="text-3xl font-extrabold text-slate-950">{formatPrice(price)}</span>
        <span className="text-xl font-medium text-slate-500">
          MRP <span className="line-through">{formatPrice(mrp)}</span>
        </span>
        <span className="text-xl font-extrabold text-orange-500">({discount}% OFF)</span>
      </div>
      <p className="mt-2 text-sm font-extrabold text-emerald-600">inclusive of all taxes</p>
    </section>
  );
}

export default memo(PriceSection);