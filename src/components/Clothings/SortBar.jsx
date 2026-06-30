import { ArrowUpDown, Filter, Search } from "lucide-react";

export const sortOptions = [
  { value: "popularity", label: "Popularity" },
  { value: "newest", label: "Newest" },
  { value: "price-low-high", label: "Price Low to High" },
  { value: "price-high-low", label: "Price High to Low" },
  { value: "highest-rated", label: "Highest Rated" },
  { value: "biggest-discount", label: "Biggest Discount" },
];

function SortBar({ sortBy, onSortChange, searchQuery, onSearchChange, totalProducts, onOpenFilters }) {
  return (
    <div className="sticky top-0 z-30 w-full rounded-none border-b border-slate-200 bg-white/95 px-3 py-3 shadow-sm backdrop-blur sm:px-4 md:top-3 md:rounded-xl md:border lg:px-5">
      <div className="flex w-full flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-extrabold text-slate-950">{totalProducts} styles found</p>
          <p className="text-xs font-medium text-slate-500">Fresh fashion across top clothing brands</p>
        </div>

        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-[1fr_auto] xl:w-auto xl:grid-cols-[280px_auto_auto] xl:items-center">
          <div className="relative min-w-0">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search brand, product, color"
              className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-rose-400 focus:ring-4 focus:ring-rose-100"
            />
          </div>

          <button
            type="button"
            onClick={onOpenFilters}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-extrabold text-slate-800 transition hover:bg-slate-100 xl:hidden"
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>

          <label className="flex h-11 min-w-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 sm:col-span-2 xl:col-span-1 xl:w-56">
            <ArrowUpDown className="h-4 w-4 shrink-0 text-slate-500" />
            <select
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value)}
              className="h-full min-w-0 flex-1 bg-transparent text-sm font-extrabold text-slate-800 outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}

export default SortBar;