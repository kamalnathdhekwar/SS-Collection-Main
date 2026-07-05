import { memo } from "react";
import { ChevronRight } from "lucide-react";

function SizeSelector({ sizes, selectedSize, onSelectSize }) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-8">
        <h3 className="text-sm font-extrabold uppercase text-slate-950">Select Size</h3>
        <button type="button" className="inline-flex items-center text-sm font-extrabold uppercase text-rose-500">
          Size Chart
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <button
            key={size.label}
            type="button"
            disabled={!size.available}
            onClick={() => onSelectSize(size.label)}
            className={`relative grid h-14 w-14 place-items-center rounded-full border text-sm font-extrabold transition ${
              selectedSize === size.label
                ? "border-rose-500 bg-rose-50 text-rose-600"
                : "border-slate-300 bg-white text-slate-950 hover:border-slate-950"
            } ${!size.available ? "cursor-not-allowed text-slate-300 hover:border-slate-300" : ""}`}
          >
            {size.label}
            {!size.available && <span className="absolute h-px w-16 rotate-[-45deg] bg-slate-300" />}
          </button>
        ))}
      </div>
    </section>
  );
}

export default memo(SizeSelector);