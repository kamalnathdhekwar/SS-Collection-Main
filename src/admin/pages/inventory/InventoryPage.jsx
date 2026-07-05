import { useMemo, useState } from "react";
import DataTable from "../../components/DataTable";
import { getProducts } from "../../services/productService";

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("All");

  const products = useMemo(() => {
    const all = getProducts();
    let filtered = all;
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter((p) => p.name?.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q));
    }
    if (stockFilter === "Low Stock") {
      filtered = filtered.filter((p) => p.stock?.count <= 5 && p.stock?.count > 0);
    } else if (stockFilter === "Out of Stock") {
      filtered = filtered.filter((p) => p.stock?.count === 0 || p.stock?.count == null);
    } else if (stockFilter === "In Stock") {
      filtered = filtered.filter((p) => p.stock?.count > 5);
    }
    return filtered;
  }, [search, stockFilter]);

  const lowStockCount = useMemo(() => products.filter((p) => p.stock?.count <= 5 && p.stock?.count > 0).length, [products]);
  const outOfStockCount = useMemo(() => products.filter((p) => p.stock?.count === 0 || p.stock?.count == null).length, [products]);

  const columns = useMemo(
    () => [
      { key: "name", label: "Product", render: (row) => <span className="font-medium text-slate-900">{row.name}</span> },
      { key: "brand", label: "Brand" },
      { key: "category", label: "Category" },
      { key: "stock", label: "Stock", render: (row) => row.stock?.count ?? 0 },
      {
        key: "status",
        label: "Status",
        render: (row) => {
          const count = row.stock?.count ?? 0;
          if (count === 0) return <span className="inline-flex rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">Out of Stock</span>;
          if (count <= 5) return <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">Low Stock</span>;
          return <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">In Stock</span>;
        },
      },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inventory</h1>
          <p className="mt-1 text-sm text-slate-500">Track stock levels across all products</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Total Products</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{products.length}</p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-700">Low Stock</p>
          <p className="mt-1 text-2xl font-bold text-amber-900">{lowStockCount}</p>
        </div>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">Out of Stock</p>
          <p className="mt-1 text-2xl font-bold text-red-900">{outOfStockCount}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {["All", "In Stock", "Low Stock", "Out of Stock"].map((s) => (
          <button key={s} onClick={() => setStockFilter(s)} className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${stockFilter === s ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <DataTable columns={columns} data={products} searchQuery={search} onSearch={setSearch} searchPlaceholder="Search products..." pageSize={10} />
      </div>
    </div>
  );
}