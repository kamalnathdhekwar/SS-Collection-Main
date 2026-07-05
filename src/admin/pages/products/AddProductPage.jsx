import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../../components/ImageUploader";
import { createProduct } from "../../services/productService";

const categories = ["Clothing", "Footwear", "Accessories", "Sports Equipment"];
const subCategories = {
  Clothing: ["T-Shirts", "Shirts", "Jeans", "Shorts", "Track Pants", "Jackets", "Sportswear"],
  Footwear: ["Running Shoes", "Casual Shoes", "Sneakers", "Sports Shoes", "Sandals & Slippers"],
  Accessories: ["Sunglasses", "Caps", "Socks", "Wallets", "Belts", "Bags", "Watches"],
  "Sports Equipment": ["Cricket Bats", "Cricket Balls", "Batting Pads", "Gloves", "Badminton Rackets", "Shuttlecocks", "Footballs", "Volleyballs"],
};

const initialFormState = {
  name: "",
  brand: "",
  category: "",
  subCategory: "",
  price: "",
  mrp: "",
  discount: "",
  stock: "",
  description: "",
  sizes: "",
  colors: "",
  material: "",
  weight: "",
  tags: "",
  sku: "",
  barcode: "",
  returnPolicy: "",
  warranty: "",
  highlights: "",
  specifications: "",
  offers: "",
  gender: "Unisex",
  season: "",
  countryOfOrigin: "",
  careInstructions: "",
  trending: false,
  bestSeller: false,
  featuredProduct: false,
  status: "Active",
};

const defaultImage = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80";

export default function AddProductPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialFormState);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const updateField = useCallback((field, value) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "category") updated.subCategory = "";
      if (field === "price" || field === "mrp") {
        const price = Number(updated.price) || 0;
        const mrp = Number(updated.mrp) || 0;
        if (price > 0 && mrp > price) {
          updated.discount = Math.round(((mrp - price) / mrp) * 100);
        } else if (price > 0 && mrp > 0 && mrp <= price) {
          updated.discount = 0;
        }
      }
      return updated;
    });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  }, [errors]);

  const validate = useCallback(() => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Product name is required";
    if (!form.brand.trim()) errs.brand = "Brand is required";
    if (!form.category) errs.category = "Category is required";
    if (!form.price || Number(form.price) <= 0) errs.price = "Valid price is required";
    if (!form.mrp || Number(form.mrp) <= 0) errs.mrp = "Valid MRP is required";
    if (Number(form.price) > Number(form.mrp)) errs.mrp = "MRP must be greater than price";
    if (!form.stock || Number(form.stock) < 0) errs.stock = "Valid stock quantity is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (images.length === 0) errs.images = "At least one main image is required";
    if (form.name.length > 200) errs.name = "Name must be under 200 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [form, images]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!validate()) return;
      setSubmitting(true);

      const productData = {
        name: form.name.trim(),
        brand: form.brand.trim(),
        category: form.category,
        subCategory: form.subCategory || form.category,
        gender: form.gender,
        price: Number(form.price),
        mrp: Number(form.mrp),
        discount: Number(form.discount) || 0,
        stock: { status: Number(form.stock) > 0 ? "In Stock" : "Out of Stock", count: Number(form.stock), label: Number(form.stock) > 5 ? "Available" : `Only ${form.stock} Left` },
        description: form.description.trim(),
        images: images.length > 0 ? images.map((img) => ({ src: img.src, alt: form.name })) : [{ src: defaultImage, alt: form.name }],
        sizes: form.sizes ? form.sizes.split(",").map((s) => ({ label: s.trim(), available: true })) : [{ label: "Free Size", available: true }],
        colors: form.colors ? form.colors.split(",").map((c) => ({ name: c.trim(), swatchClass: "bg-slate-400" })) : [{ name: "Default", swatchClass: "bg-slate-400" }],
        material: form.material || "Premium quality materials.",
        specifications: form.specifications ? form.specifications.split("|").map((s) => {
          const [label, value] = s.split(":").map((p) => p.trim());
          return { label: label || "Detail", value: value || "Available" };
        }) : [{ label: "Category", value: form.category }],
        offers: form.offers ? form.offers.split("|").map((o) => {
          const [title, description] = o.split(":").map((p) => p.trim());
          return { title: title || "Offer", description: description || "Limited time offer" };
        }) : [{ title: "Free delivery", description: "Enjoy easy delivery and returns." }],
        delivery: { estimated: "Estimated delivery in 3-5 days", cod: true, freeShipping: true },
        seller: form.brand.trim(),
        returnPolicy: form.returnPolicy || "Easy 7 days return policy.",
        warranty: form.warranty || "Brand warranty.",
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [form.category],
        highlights: form.highlights ? form.highlights.split(",").map((h) => h.trim()).filter(Boolean) : ["Premium quality"],
        similarProducts: [],
        weight: form.weight,
        sku: form.sku,
        barcode: form.barcode,
        season: form.season,
        countryOfOrigin: form.countryOfOrigin || "India",
        careInstructions: form.careInstructions,
        trending: form.trending,
        bestSeller: form.bestSeller,
        featuredProduct: form.featuredProduct,
        status: form.status,
      };

      const newProduct = createProduct(productData);
      setSubmitting(false);
      if (newProduct) navigate("/admin/products");
    },
    [form, images, validate, navigate],
  );

  const renderField = (label, field, type = "text", placeholder = "", options = null) => {
    const hasError = errors[field];
    return (
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          {label} {options?.required && <span className="text-red-500">*</span>}
        </label>
        {type === "textarea" ? (
          <textarea
            value={form[field]}
            onChange={(e) => updateField(field, e.target.value)}
            placeholder={placeholder}
            rows={3}
            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-all focus:ring-2 ${hasError ? "border-red-300 focus:ring-red-500/20" : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"}`}
          />
        ) : type === "select" ? (
          <select
            value={form[field]}
            onChange={(e) => updateField(field, e.target.value)}
            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-all focus:ring-2 ${hasError ? "border-red-300 focus:ring-red-500/20" : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"}`}
          >
            <option value="">Select {label}</option>
            {options?.items?.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        ) : type === "checkbox" ? (
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form[field]} onChange={(e) => updateField(field, e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm text-slate-700">{placeholder}</span>
          </label>
        ) : (
          <input
            type={type}
            value={form[field]}
            onChange={(e) => updateField(field, e.target.value)}
            placeholder={placeholder}
            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-all focus:ring-2 ${hasError ? "border-red-300 focus:ring-red-500/20" : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"}`}
          />
        )}
        {hasError && <p className="mt-1 text-xs text-red-500">{hasError}</p>}
        {options?.hint && <p className="mt-1 text-xs text-slate-400">{options.hint}</p>}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add New Product</h1>
          <p className="mt-1 text-sm text-slate-500">Fill in the details below to add a new product to your catalog.</p>
        </div>
        <button onClick={() => navigate("/admin/products")} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
          Cancel
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
            <h2 className="text-lg font-semibold text-slate-900">Basic Information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {renderField("Product Name", "name", "text", "Enter product name", { required: true })}
              {renderField("Brand", "brand", "text", "Enter brand name", { required: true })}
              {renderField("Category", "category", "select", "", { required: true, items: categories })}
              {form.category && renderField("Sub Category", "subCategory", "select", "", { items: subCategories[form.category] || [] })}
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {renderField("Price (₹)", "price", "number", "0", { required: true })}
              {renderField("MRP (₹)", "mrp", "number", "0", { required: true })}
              {renderField("Discount (%)", "discount", "number", "Auto-calculated")}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {renderField("Stock Quantity", "stock", "number", "0", { required: true })}
              {renderField("Gender", "gender", "select", "", { items: ["Unisex", "Men", "Women", "Boys", "Girls"] })}
            </div>
            {renderField("Description", "description", "textarea", "Enter product description", { required: true })}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
            <h2 className="text-lg font-semibold text-slate-900">Media</h2>
            <ImageUploader images={images} onImagesChange={setImages} maxImages={5} label="Product Images (Main + Gallery)" />
            {errors.images && <p className="text-xs text-red-500">{errors.images}</p>}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
            <h2 className="text-lg font-semibold text-slate-900">Variants & Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {renderField("Sizes (comma-separated)", "sizes", "text", "e.g. S, M, L, XL or 30, 32, 34")}
              {renderField("Colors (comma-separated)", "colors", "text", "e.g. Red, Blue, Black")}
              {renderField("Material", "material", "text", "e.g. Cotton, Leather, Metal")}
              {renderField("Weight", "weight", "text", "e.g. 0.5 kg")}
            </div>
            {renderField("Specifications (Label:Value | separated)", "specifications", "textarea", "e.g. Fit:Slim Fit | Length:Regular | Closure:Lace-Up")}
            {renderField("Highlights (comma-separated)", "highlights", "text", "e.g. Premium quality, Lightweight, Durable")}
            {renderField("Tags (comma-separated)", "tags", "text", "e.g. Trending, Best Seller, New Arrival")}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
            <h2 className="text-lg font-semibold text-slate-900">Pricing & Offers</h2>
            {renderField("Offers (Title:Description | separated)", "offers", "textarea", "e.g. Bank Offer:10% off on HDFC | Festival Sale:Extra 20% off")}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
            <h2 className="text-lg font-semibold text-slate-900">Additional Information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {renderField("SKU", "sku", "text", "Stock Keeping Unit")}
              {renderField("Barcode", "barcode", "text", "Product barcode")}
              {renderField("Return Policy", "returnPolicy", "text", "e.g. Easy 14 days returns")}
              {renderField("Warranty", "warranty", "text", "e.g. 1 year brand warranty")}
              {renderField("Season", "season", "text", "e.g. Summer, Winter, All Season")}
              {renderField("Country of Origin", "countryOfOrigin", "text", "e.g. India")}
              {renderField("Care Instructions", "careInstructions", "textarea", "e.g. Machine wash, Do not bleach")}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
            <h2 className="text-lg font-semibold text-slate-900">Product Status</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {renderField("Status", "status", "select", "", { items: ["Active", "Draft", "Archived"] })}
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {renderField("Trending", "trending", "checkbox", "Mark as Trending")}
              {renderField("Best Seller", "bestSeller", "checkbox", "Mark as Best Seller")}
              {renderField("Featured Product", "featuredProduct", "checkbox", "Mark as Featured")}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button onClick={() => navigate("/admin/products")} className="rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Save Product"}
            </button>
          </div>
        </div>

        <div className="xl:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Product Preview</h2>
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-xl bg-slate-100">
                <img
                  src={images[0]?.src || "https://via.placeholder.com/400?text=No+Image"}
                  alt={form.name || "Preview"}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{form.name || "Product Name"}</h3>
                <p className="text-sm text-slate-500">{form.brand || "Brand"}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-lg font-bold text-slate-900">₹{Number(form.price).toLocaleString("en-IN") || "0"}</span>
                  {form.mrp && (
                    <span className="text-sm text-slate-400 line-through">₹{Number(form.mrp).toLocaleString("en-IN")}</span>
                  )}
                  {form.discount > 0 && <span className="text-sm font-medium text-emerald-600">{form.discount}% off</span>}
                </div>
                {form.stock && (
                  <p className={`mt-1 text-sm ${Number(form.stock) > 0 ? "text-emerald-600" : "text-red-600"}`}>
                    {Number(form.stock) > 0 ? "In Stock" : "Out of Stock"}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {form.category && (
                    <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">{form.category}</span>
                  )}
                  {form.trending && <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">Trending</span>}
                  {form.bestSeller && <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">Best Seller</span>}
                </div>
                <p className="mt-3 text-xs text-slate-500 line-clamp-3">{form.description || "Description will appear here..."}</p>
                {form.sizes && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-slate-500">Sizes:</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {form.sizes.split(",").map((s, i) => (
                        <span key={i} className="rounded border border-slate-200 px-2 py-0.5 text-xs text-slate-600">{s.trim()}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}