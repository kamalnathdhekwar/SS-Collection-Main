import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/DataTable";
import Modal from "../../components/Modal";
import { getProducts, deleteProduct, deleteMultipleProducts, getProductById } from "../../services/productService";

const statusColors = {
  Active: "bg-emerald-100 text-emerald-700",
  Draft: "bg-slate-100 text-slate-700",
  Archived: "bg-amber-100 text-amber-700",
};

export default function ProductsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ open: false, product: null });
  const [viewModal, setViewModal] = useState({ open: false, product: null });
  const [refreshKey, setRefreshKey] = useState(0);

  const products = useMemo(() => {
    const all = getProducts();
    if (!search.trim()) return all;
    const q = search.toLowerCase();
    return all.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.id?.toLowerCase().includes(q),
    );
  }, [search, refreshKey]);

  const handleDelete = useCallback((row) => {
    setDeleteModal({ open: true, product: row });
  }, []);

  const confirmDelete = useCallback(() => {
    if (deleteModal.product) {
      deleteProduct(deleteModal.product.adminId || deleteModal.product.id);
      setDeleteModal({ open: false, product: null });
      setRefreshKey((k) => k + 1);
    }
  }, [deleteModal]);

  const handleBulkDelete = useCallback(() => {
    if (selectedIds.length > 0) {
      deleteMultipleProducts(selectedIds);
      setSelectedIds([]);
      setRefreshKey((k) => k + 1);
    }
  }, [selectedIds]);

  const handleView = useCallback((row) => {
    const fullProduct = getProductById(row.adminId || row.id);
    setViewModal({ open: true, product: fullProduct });
  }, []);

  const columns = useMemo(
    () => [
      {
        key: "image",
        label: "Image",
        sortable: false,
        render: (row) => (
          <div className="flex items-center gap-3">
            <img
              src={row.images?.[0]?.src || "https://via.placeholder.com/40"}
              alt={row.name}
              className="h-10 w-10 rounded-lg object-cover"
            />
          </div>
        ),
      },
      { key: "name", label: "Product Name", render: (row) => <span className="font-medium text-slate-900">{row.name}</span> },
      { key: "brand", label: "Brand" },
      { key: "category", label: "Category" },
      {
        key: "price",
        label: "Price",
        render: (row) => `₹${row.price?.toLocaleString("en-IN")}`,
      },
      {
        key: "stock",
        label: "Stock",
        render: (row) => row.stock?.count ?? "-",
      },
      {
        key: "rating",
        label: "Rating",
        render: (row) => (row.rating ? `${row.rating} ★` : "-"),
      },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="mt-1 text-sm text-slate-500">Manage your product catalog ({products.length} products)</p>
        </div>
        <div className="flex items-center gap-3">
          {selectedIds.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              Delete Selected ({selectedIds.length})
            </button>
          )}
          <button
            onClick={() => navigate("/admin/add-product")}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            + Add Product
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <DataTable
          columns={columns}
          data={products}
          searchQuery={search}
          onSearch={setSearch}
          searchPlaceholder="Search by name, brand, category..."
          selectable
          selectedIds={selectedIds}
          onBulkSelect={setSelectedIds}
          onView={handleView}
          onEdit={(row) => navigate(`/admin/products/edit/${row.adminId || row.id}`)}
          onDelete={handleDelete}
          statusColors={statusColors}
          pageSize={10}
        />
      </div>

      <Modal isOpen={deleteModal.open} onClose={() => setDeleteModal({ open: false, product: null })} title="Delete Product" size="sm">
        <p className="text-sm text-slate-600">Are you sure you want to delete <strong>{deleteModal.product?.name}</strong>? This action cannot be undone.</p>
        <div className="mt-4 flex justify-end gap-3">
          <button onClick={() => setDeleteModal({ open: false, product: null })} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
          <button onClick={confirmDelete} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">Delete</button>
        </div>
      </Modal>

      <Modal isOpen={viewModal.open} onClose={() => setViewModal({ open: false, product: null })} title="Product Details" size="lg">
        {viewModal.product && (
          <div className="space-y-4">
            <div className="flex gap-4">
              <img src={viewModal.product.images?.[0]?.src || "https://via.placeholder.com/120"} alt={viewModal.product.name} className="h-28 w-28 rounded-xl object-cover" />
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{viewModal.product.name}</h3>
                <p className="text-sm text-slate-500">{viewModal.product.brand}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">{viewModal.product.category}</span>
                  {viewModal.product.subCategory && (
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">{viewModal.product.subCategory}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium text-slate-500">Price:</span> <span className="text-slate-900">₹{viewModal.product.price?.toLocaleString("en-IN")}</span></div>
              <div><span className="font-medium text-slate-500">MRP:</span> <span className="text-slate-900">₹{viewModal.product.mrp?.toLocaleString("en-IN")}</span></div>
              <div><span className="font-medium text-slate-500">Discount:</span> <span className="text-emerald-600">{viewModal.product.discount}%</span></div>
              <div><span className="font-medium text-slate-500">Stock:</span> <span className="text-slate-900">{viewModal.product.stock?.count} units</span></div>
              <div><span className="font-medium text-slate-500">Rating:</span> <span className="text-amber-500">{viewModal.product.rating} ★</span></div>
              <div><span className="font-medium text-slate-500">Gender:</span> <span className="text-slate-900">{viewModal.product.gender || "Unisex"}</span></div>
            </div>
            <p className="text-sm text-slate-600">{viewModal.product.description}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}