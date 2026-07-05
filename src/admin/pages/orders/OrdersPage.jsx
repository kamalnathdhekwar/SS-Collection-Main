import { useCallback, useMemo, useState } from "react";
import DataTable from "../../components/DataTable";
import Modal from "../../components/Modal";
import { getOrders, updateOrderStatus, cancelOrder } from "../../services/orderService";

const statusColors = {
  Delivered: "bg-emerald-100 text-emerald-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-violet-100 text-violet-700",
  Pending: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
};

const statusOptions = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewModal, setViewModal] = useState({ open: false, order: null });
  const [statusModal, setStatusModal] = useState({ open: false, order: null, newStatus: "" });
  const [refreshKey, setRefreshKey] = useState(0);

  const orders = useMemo(() => {
    let all = getOrders();
    if (search.trim()) {
      const q = search.toLowerCase();
      all = all.filter((o) => o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.product.toLowerCase().includes(q));
    }
    if (statusFilter !== "All") {
      all = all.filter((o) => o.status === statusFilter);
    }
    return all;
  }, [search, statusFilter, refreshKey]);

  const handleView = useCallback((row) => setViewModal({ open: true, order: row }), []);

  const handleUpdateStatus = useCallback((row) => {
    setStatusModal({ open: true, order: row, newStatus: row.status });
  }, []);

  const confirmStatusUpdate = useCallback(() => {
    if (statusModal.order && statusModal.newStatus) {
      if (statusModal.newStatus === "Cancelled") {
        cancelOrder(statusModal.order.id);
      } else {
        updateOrderStatus(statusModal.order.id, statusModal.newStatus);
      }
      setStatusModal({ open: false, order: null, newStatus: "" });
      setRefreshKey((k) => k + 1);
    }
  }, [statusModal]);

  const columns = useMemo(
    () => [
      { key: "id", label: "Order ID", render: (row) => <span className="font-medium text-slate-900">{row.id}</span> },
      { key: "customer", label: "Customer" },
      { key: "product", label: "Product" },
      { key: "quantity", label: "Qty" },
      { key: "amount", label: "Amount", render: (row) => `₹${row.amount?.toLocaleString("en-IN")}` },
      { key: "status", label: "Status", render: (row) => <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[row.status] || "bg-slate-100 text-slate-700"}`}>{row.status}</span> },
      { key: "payment", label: "Payment" },
      { key: "date", label: "Date" },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
          <p className="mt-1 text-sm text-slate-500">Track and manage customer orders</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)} className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${statusFilter === s ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <DataTable
          columns={columns}
          data={orders}
          searchQuery={search}
          onSearch={setSearch}
          searchPlaceholder="Search by order ID, customer, product..."
          onView={handleView}
          onEdit={handleUpdateStatus}
          pageSize={10}
        />
      </div>

      <Modal isOpen={viewModal.open} onClose={() => setViewModal({ open: false, order: null })} title="Order Details" size="lg">
        {viewModal.order && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium text-slate-500">Order ID:</span> <span className="text-slate-900">{viewModal.order.id}</span></div>
              <div><span className="font-medium text-slate-500">Date:</span> <span className="text-slate-900">{viewModal.order.date}</span></div>
              <div><span className="font-medium text-slate-500">Customer:</span> <span className="text-slate-900">{viewModal.order.customer}</span></div>
              <div><span className="font-medium text-slate-500">Email:</span> <span className="text-slate-900">{viewModal.order.email}</span></div>
              <div><span className="font-medium text-slate-500">Phone:</span> <span className="text-slate-900">{viewModal.order.phone}</span></div>
              <div><span className="font-medium text-slate-500">Payment:</span> <span className="text-slate-900">{viewModal.order.payment}</span></div>
              <div><span className="font-medium text-slate-500">Product:</span> <span className="text-slate-900">{viewModal.order.product}</span></div>
              <div><span className="font-medium text-slate-500">Quantity:</span> <span className="text-slate-900">{viewModal.order.quantity}</span></div>
              <div><span className="font-medium text-slate-500">Amount:</span> <span className="text-slate-900">₹{viewModal.order.amount?.toLocaleString("en-IN")}</span></div>
              <div>
                <span className="font-medium text-slate-500">Status:</span>{" "}
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[viewModal.order.status] || "bg-slate-100 text-slate-700"}`}>{viewModal.order.status}</span>
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-slate-500">Delivery Address:</span>
              <p className="mt-1 text-sm text-slate-900">{viewModal.order.address}</p>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={statusModal.open} onClose={() => setStatusModal({ open: false, order: null, newStatus: "" })} title="Update Order Status" size="sm">
        <div className="space-y-4">
          <p className="text-sm text-slate-600">Update status for <strong>{statusModal.order?.id}</strong></p>
          <select
            value={statusModal.newStatus}
            onChange={(e) => setStatusModal((prev) => ({ ...prev, newStatus: e.target.value }))}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <div className="flex justify-end gap-3">
            <button onClick={() => setStatusModal({ open: false, order: null, newStatus: "" })} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
            <button onClick={confirmStatusUpdate} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Update</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}