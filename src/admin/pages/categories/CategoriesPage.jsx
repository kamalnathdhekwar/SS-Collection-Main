import { useMemo, useState } from "react";

const initialCategories = [
  { name: "Clothing", count: 120, subcategories: ["T-Shirts", "Shirts", "Jeans", "Shorts", "Track Pants", "Jackets", "Sportswear"], icon: "👕" },
  { name: "Footwear", count: 85, subcategories: ["Running Shoes", "Casual Shoes", "Sneakers", "Sports Shoes", "Sandals & Slippers"], icon: "👟" },
  { name: "Accessories", count: 64, subcategories: ["Sunglasses", "Caps", "Socks", "Wallets", "Belts", "Bags", "Watches"], icon: "🕶️" },
  { name: "Sports Equipment", count: 42, subcategories: ["Cricket Bats", "Cricket Balls", "Batting Pads", "Gloves", "Badminton Rackets", "Shuttlecocks", "Footballs", "Volleyballs"], icon: "⚽" },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState({ name: "", icon: "📁" });

  const totalProducts = useMemo(() => categories.reduce((sum, c) => sum + c.count, 0), [categories]);

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) return;
    setCategories((prev) => [
      ...prev,
      { name: newCategory.name.trim(), count: 0, subcategories: [], icon: newCategory.icon || "📁" },
    ]);
    setNewCategory({ name: "", icon: "📁" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Categories</h1>
          <p className="mt-1 text-sm text-slate-500">Manage product categories ({categories.length} categories, {totalProducts} products)</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={newCategory.name}
            onChange={(e) => setNewCategory((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="New category name"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
          <button onClick={handleAddCategory} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">+ Add</button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <div key={cat.name} className="rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:shadow-lg">
            <div className="mb-3 text-3xl">{cat.icon}</div>
            <h3 className="text-lg font-semibold text-slate-900">{cat.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{cat.count} products</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {cat.subcategories.slice(0, 4).map((sub) => (
                <span key={sub} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{sub}</span>
              ))}
              {cat.subcategories.length > 4 && (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-400">+{cat.subcategories.length - 4}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}