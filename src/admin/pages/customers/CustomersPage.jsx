import { useCallback, useMemo, useState } from "react";
import DataTable from "../../components/DataTable";
import Modal from "../../components/Modal";
import { getCustomers, deleteCustomer } from "../../services/customerService";

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [viewModal, setViewModal] = useState({ open: false, customer: null });
  const [refreshKey, setRefreshKey] = useState(0);

  const customers = useMemo(() => {
    const all = getCustomers();
    if (!search.trim()) return all;
    const q = search.toLowerCase();
    return all.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q),
    );
  }, [search, refreshKey]);

  const handleView = useCallback((row) => setViewModal({ open: true, customer: row }), []);

  const handleDelete = useCallback((row) => {
    if (window.confirm(`Delete customer ${row.name}?`)) {
      deleteCustomer(row.id);
      setRefreshKey((k) => k + 1);
    }
  }, []);

  const columns = useMemo(
    () => [
      { key: "name", label: "Name", render: (row) => <span className="font-medium text-slate-900">{row.name}</span> },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "city", label: "City" },
      { key: "totalOrders", label: "Orders" },
      { key: "totalSpent", label: "Total Spent", render: (row) => `₹${row.totalSpent?.toLocaleString("en-IN")}` },
      { key: "status", label: "Status", render: (row) => (
        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
          row.status === "Active" ? "bg-emerald-100 text-emerald-700" :
          row.status === "New" ? "bg-blue-100 text-blue-700" :
          "bg-slate-100 text-slate-700"
        }`}>{row.status}</span>
      )},
      { key: "joined", label: "Joined" },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
        <p className="mt-1 text-sm text-slate-500">View and manage your customer base ({customers.length} customers)</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <DataTable
          columns={columns}
          data={customers}
          searchQuery={search}
          onSearch={setSearch}
          searchPlaceholder="Search by name, email, city..."
          onView={handleView}
          onDelete={handleDelete}
          pageSize={10}
        />
      </div>

      <Modal isOpen={viewModal.open} onClose={() => setViewModal({ open: false, customer: null })} title="Customer Details" size="lg">
        {viewModal.customer && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                {viewModal.customer.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{viewModal.customer.name}</h3>
                <p className="text-sm text-slate-500">{viewModal.customer.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium text-slate-500">Phone:</span> <span className="text-slate-900">{viewModal.customer.phone}</span></div>
              <div><span className="font-medium text-slate-500">City:</span> <span className="text-slate-900">{viewModal.customer.city}</span></div>
              <div><span className="font-medium text-slate-500">Total Orders:</span> <span className="text-slate-900">{viewModal.customer.totalOrders}</span></div>
              <div><span className="font-medium text-slate-500">Total Spent:</span> <span className="text-slate-900">₹{viewModal.customer.totalSpent?.toLocaleString("en-IN")}</span></div>
              <div><span className="font-medium text-slate-500">Status:</span> <span className="text-slate-900">{viewModal.customer.status}</span></div>
              <div><span className="font-medium text-slate-500">Joined:</span> <span className="text-slate-900">{viewModal.customer.joined}</span></div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}