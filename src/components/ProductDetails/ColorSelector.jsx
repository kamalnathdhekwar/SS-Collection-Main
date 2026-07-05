import { memo } from "react";

function ColorSelector({ colors, selectedColor, onSelectColor }) {
  if (!colors?.length) return null;

  return (
    <section>
      <h3 className="mb-3 text-sm font-extrabold uppercase text-slate-950">Select Color</h3>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color.name}
            type="button"
            onClick={() => onSelectColor(color.name)}
            className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-bold transition ${
              selectedColor === color.name ? "border-rose-500 bg-rose-50 text-rose-600" : "border-slate-200 hover:border-slate-950"
            }`}
          >
            <span className={`h-5 w-5 rounded-full border border-slate-200 ${color.swatchClass}`} />
            {color.name}
          </button>
        ))}
      </div>
    </section>
  );
}

export default memo(ColorSelector);