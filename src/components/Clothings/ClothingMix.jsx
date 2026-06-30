import { SlidersHorizontal, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./ProductCard";
import SortBar from "./SortBar";
import { clothingProducts } from "./products";

const initialFilters = {
  categories: [],
  genders: [],
  brands: [],
  priceRange: [0, 7000],
  rating: 0,
  discount: 0,
  inStockOnly: false,
  trendingOnly: false,
};

function getCounts(products, key) {
  return products.reduce((counts, product) => {
    counts[product[key]] = (counts[product[key]] || 0) + 1;
    return counts;
  }, {});
}

function ClothingMix() {
  const [filters, setFilters] = useState(initialFilters);
  const [sortBy, setSortBy] = useState("popularity");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const productCounts = useMemo(
    () => ({
      categories: getCounts(clothingProducts, "category"),
      genders: getCounts(clothingProducts, "gender"),
      brands: getCounts(clothingProducts, "brand"),
    }),
    []
  );

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const visibleProducts = clothingProducts.filter((product) => {
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category);
      const matchesGender = filters.genders.length === 0 || filters.genders.includes(product.gender);
      const matchesBrand = filters.brands.length === 0 || filters.brands.includes(product.brand);
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const matchesRating = filters.rating === 0 || product.rating >= filters.rating;
      const matchesDiscount = filters.discount === 0 || product.discount >= filters.discount;
      const matchesAvailability = !filters.inStockOnly || product.availability === "In Stock";
      const matchesTrending = !filters.trendingOnly || product.isTrending;
      const matchesSearch =
        query.length === 0 ||
        [product.name, product.brand, product.category, product.gender, product.description, product.colors.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return (
        matchesCategory &&
        matchesGender &&
        matchesBrand &&
        matchesPrice &&
        matchesRating &&
        matchesDiscount &&
        matchesAvailability &&
        matchesTrending &&
        matchesSearch
      );
    });

    return [...visibleProducts].sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "price-low-high") return a.price - b.price;
      if (sortBy === "price-high-low") return b.price - a.price;
      if (sortBy === "highest-rated") return b.rating - a.rating;
      if (sortBy === "biggest-discount") return b.discount - a.discount;
      return Number(b.isTrending) - Number(a.isTrending) || b.rating - a.rating || b.discount - a.discount;
    });
  }, [filters, searchQuery, sortBy]);

  const activeFilterCount =
    filters.categories.length +
    filters.genders.length +
    filters.brands.length +
    Number(filters.priceRange[1] < initialFilters.priceRange[1]) +
    Number(filters.rating > 0) +
    Number(filters.discount > 0) +
    Number(filters.inStockOnly) +
    Number(filters.trendingOnly);

  const toggleArrayFilter = (filterKey, value) => {
    setFilters((currentFilters) => {
      const currentValues = currentFilters[filterKey];

      return {
        ...currentFilters,
        [filterKey]: currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value],
      };
    });
  };

  const setFilter = (filterKey, value) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [filterKey]: value,
    }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setSearchQuery("");
    setSortBy("popularity");
  };

  return (
    <main className="w-full min-w-0 bg-slate-50 text-slate-950 mt-36">
      <section className="w-full border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-7 sm:px-6 lg:px-8">
          <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
            <span>Home</span>
            <span>/</span>
            <span className="text-slate-950">Clothing</span>
          </nav>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-rose-700">
                <Sparkles className="h-3.5 w-3.5" />
                Premium multi-brand collection
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                Clothing for Men and Women
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Explore curated T-shirts, shirts, jeans, shorts, track pants, jackets, and sportswear from top fashion
                labels with smart filters, fast sorting, and fresh seasonal picks.
              </p>
            </div>

            <div className="grid w-full max-w-sm grid-cols-3 gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-center lg:w-auto">
              <div className="px-3">
                <p className="text-xl font-extrabold text-slate-950">{clothingProducts.length}</p>
                <p className="text-xs font-semibold text-slate-500">Styles</p>
              </div>
              <div className="border-x border-slate-200 px-3">
                <p className="text-xl font-extrabold text-slate-950">14</p>
                <p className="text-xs font-semibold text-slate-500">Brands</p>
              </div>
              <div className="px-3">
                <p className="text-xl font-extrabold text-slate-950">7</p>
                <p className="text-xs font-semibold text-slate-500">Categories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-3 py-5 sm:px-6 lg:px-8">
        <div className="flex w-full min-w-0 items-start gap-6">
          <FilterSidebar
            filters={filters}
            onToggleArrayFilter={toggleArrayFilter}
            onSetFilter={setFilter}
            onReset={resetFilters}
            productCounts={productCounts}
          />

          <div className="min-w-0 flex-1 space-y-5">
            <SortBar
              sortBy={sortBy}
              onSortChange={setSortBy}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              totalProducts={filteredProducts.length}
              onOpenFilters={() => setIsFilterDrawerOpen(true)}
            />

            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-900">
                <SlidersHorizontal className="h-4 w-4" />
                <span>{activeFilterCount} active filter{activeFilterCount > 1 ? "s" : ""}</span>
                <button type="button" onClick={resetFilters} className="ml-auto text-rose-700 underline-offset-4 hover:underline">
                  Clear all
                </button>
              </div>
            )}

            {filteredProducts.length > 0 ? (
              <div className="grid w-full min-w-0 grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                <h2 className="text-xl font-extrabold text-slate-950">No matching products</h2>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Try changing the category, brand, price, rating, or search term to see more clothing options.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-rose-600"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <button
            type="button"
            aria-label="Close filter drawer"
            onClick={() => setIsFilterDrawerOpen(false)}
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
          />

          <div className="absolute inset-y-0 left-0 w-full max-w-sm overflow-hidden bg-white shadow-2xl">
            <FilterSidebar
              isDrawer
              filters={filters}
              onToggleArrayFilter={toggleArrayFilter}
              onSetFilter={setFilter}
              onReset={resetFilters}
              productCounts={productCounts}
              onClose={() => setIsFilterDrawerOpen(false)}
            />

            <button
              type="button"
              onClick={() => setIsFilterDrawerOpen(false)}
              className="absolute bottom-4 left-4 right-4 inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-rose-600"
            >
              <X className="h-4 w-4" />
              Show {filteredProducts.length} Products
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default ClothingMix;