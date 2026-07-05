import { useState } from "react";
import Modal from "../../components/Modal";

const initialCoupons = [
  { id: 1, code: "SUMMER20", discount: "20%", minOrder: 999, usageLimit: 100, used: 45, status: "Active", validUntil: "2026-08-31" },
  { id: 2, code: "NEWUSER15", discount: "15%", minOrder: 0, usageLimit: 500, used: 128, status: "Active", validUntil: "2026-12-31" },
  { id: 3, code: "FREESHIP", discount: "Free Shipping", minOrder: 499, usageLimit: 200, used: 67, status: "Active", validUntil: "2026-09-30" },
  { id: 4, code: "FESTIVE50", discount: "₹500 Off", minOrder: 2499, usageLimit: 50, used: 12, status: "Active", validUntil: "2026-07-15" },
  { id: 5, code: "WELCOME10", discount: "10%", minOrder: 0, usageLimit: 1000, used: 345, status: "Expired", validUntil: "2026-06-30" },
];

export default function CouponsPage() {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [addModal, setAddModal] = useState(false);
  const [newCoupon, setNewCoupon] = useState({ code: "", discount: "", minOrder: "", usageLimit: "", validUntil: "", status: "Active" });

  const handleAdd = () => {
    if (!newCoupon.code.trim() || !newCoupon.discount.trim()) return;
    setCoupons((prev) => [...prev, { ...newCoupon, id: Date.now(), used: 0, minOrder: Number(newCoupon.minOrder) || 0, usageLimit: Number(newCoupon.usageLimit) || 100 }]);
    setNewCoupon({ code: "", discount: "", minOrder: "", usageLimit: "", validUntil: "", status: "Active" });
    setAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Coupons</h1>
          <p className="mt-1 text-sm text-slate-500">Create and manage discount coupons</p>
        </div>
        <button onClick={() => setAddModal(true)} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">+ Create Coupon</button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-4 py-3 text-left font-semibold text-slate-500">Code</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-500">Discount</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-500">Min Order</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-500">Usage</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-500">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-500">Valid Until</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="border-b border-slate-50 transition-colors hover:bg-slate-50">
                  <td className="px-4 py-3"><span className="font-mono font-bold text-blue-600">{coupon.code}</span></td>
                  <td className="px-4 py-3 font-medium text-slate-900">{coupon.discount}</td>
                  <td className="px-4 py-3 text-slate-600">{coupon.minOrder ? `₹${coupon.minOrder}` : "No min"}</td>
                  <td className="px-4 py-3 text-slate-600">{coupon.used}/{coupon.usageLimit}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      coupon.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                    }`}>{coupon.status}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{coupon.validUntil}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={addModal} onClose={() => setAddModal(false)} title="Create New Coupon" size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Coupon Code *</label>
              <input type="text" value={newCoupon.code} onChange={(e) => setNewCoupon((p) => ({ ...p, code: e.target.value.toUpperCase() }))} placeholder="e.g. SAVE20" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Discount *</label>
              <input type="text" value={newCoupon.discount} onChange={(e) => setNewCoupon((p) => ({ ...p, discount: e.target.value }))} placeholder="e.g. 20% or ₹500" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Min Order Value</label>
              <input type="number" value={newCoupon.minOrder} onChange={(e) => setNewCoupon((p) => ({ ...p, minOrder: e.target.value }))} placeholder="0 for no minimum" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Usage Limit</label>
              <input type="number" value={newCoupon.usageLimit} onChange={(e) => setNewCoupon((p) => ({ ...p, usageLimit: e.target.value }))} placeholder="e.g. 100" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Valid Until</label>
              <input type="date" value={newCoupon.validUntil} onChange={(e) => setNewCoupon((p) => ({ ...p, validUntil: e.target.value }))} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
              <select value={newCoupon.status} onChange={(e) => setNewCoupon((p) => ({ ...p, status: e.target.value }))} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setAddModal(false)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
            <button onClick={handleAdd} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Create Coupon</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}