import { ChevronDown, RotateCcw, X } from "lucide-react";
import {
  brandOptions,
  categoryOptions,
  discountOptions,
  genderOptions,
  ratingOptions,
} from "./products";

function FilterSection({ title, children }) {
  return (
    <details className="group border-b border-slate-200 py-4" open>
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold uppercase tracking-wide text-slate-900">
        {title}
        <ChevronDown className="h-4 w-4 transition duration-300 group-open:rotate-180" />
      </summary>
      <div className="mt-3 space-y-2">{children}</div>
    </details>
  );
}

function CheckboxOption({ label, checked, onChange, count }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-sm text-slate-700 transition hover:bg-slate-50">
      <span className="flex min-w-0 items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
        />
        <span className="truncate">{label}</span>
      </span>
      {typeof count === "number" && <span className="text-xs text-slate-400">{count}</span>}
    </label>
  );
}

function FilterSidebar({ filters, onToggleArrayFilter, onSetFilter, onReset, productCounts, isDrawer = false, onClose }) {
  return (
    <aside className={`${isDrawer ? "h-full w-full bg-white" : "sticky top-24 hidden h-fit rounded-xl border border-slate-200 bg-white lg:block"}`}>
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-950">Filters</h2>
          <p className="text-xs font-medium text-slate-500">Refine your style picks</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>

          {isDrawer && (
            <button
              type="button"
              aria-label="Close filters"
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className={`max-h-[calc(100vh-9rem)] overflow-y-auto px-5 ${isDrawer ? "pb-24" : "pb-5"}`}>
        <FilterSection title="Category">
          {categoryOptions.map((category) => (
            <CheckboxOption
              key={category}
              label={category}
              count={productCounts.categories[category] || 0}
              checked={filters.categories.includes(category)}
              onChange={() => onToggleArrayFilter("categories", category)}
            />
          ))}
        </FilterSection>

        <FilterSection title="Gender">
          {genderOptions.map((gender) => (
            <CheckboxOption
              key={gender}
              label={gender}
              count={productCounts.genders[gender] || 0}
              checked={filters.genders.includes(gender)}
              onChange={() => onToggleArrayFilter("genders", gender)}
            />
          ))}
        </FilterSection>

        <FilterSection title="Price Range">
          <div className="space-y-4 px-2">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>₹{filters.priceRange[0]}</span>
              <span>₹{filters.priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="7000"
              step="100"
              value={filters.priceRange[1]}
              onChange={(event) => onSetFilter("priceRange", [0, Number(event.target.value)])}
              className="h-2 w-full cursor-pointer accent-rose-600"
            />
          </div>
        </FilterSection>

        <FilterSection title="Brand">
          {brandOptions.map((brand) => (
            <CheckboxOption
              key={brand}
              label={brand}
              count={productCounts.brands[brand] || 0}
              checked={filters.brands.includes(brand)}
              onChange={() => onToggleArrayFilter("brands", brand)}
            />
          ))}
        </FilterSection>

        <FilterSection title="Rating">
          {ratingOptions.map((rating) => (
            <CheckboxOption
              key={rating}
              label={`${rating}+ Stars`}
              checked={filters.rating === rating}
              onChange={() => onSetFilter("rating", filters.rating === rating ? 0 : rating)}
            />
          ))}
        </FilterSection>

        <FilterSection title="Discount">
          {discountOptions.map((discount) => (
            <CheckboxOption
              key={discount}
              label={`${discount}% or more`}
              checked={filters.discount === discount}
              onChange={() => onSetFilter("discount", filters.discount === discount ? 0 : discount)}
            />
          ))}
        </FilterSection>

        <FilterSection title="Availability">
          <CheckboxOption
            label="In Stock"
            checked={filters.inStockOnly}
            onChange={() => onSetFilter("inStockOnly", !filters.inStockOnly)}
          />
        </FilterSection>

        <FilterSection title="Trending">
          <CheckboxOption
            label="Trending products"
            checked={filters.trendingOnly}
            onChange={() => onSetFilter("trendingOnly", !filters.trendingOnly)}
          />
        </FilterSection>
      </div>
    </aside>
  );
}

export default FilterSidebar;