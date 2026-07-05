import { useState } from "react";
import Modal from "../../components/Modal";

const initialOffers = [
  { id: 1, title: "Summer Sale 2026", type: "Seasonal", discount: "30%", status: "Active", validUntil: "2026-08-31", description: "Flat 30% off on all summer collections" },
  { id: 2, title: "Bank Offer - HDFC", type: "Bank", discount: "10%", status: "Active", validUntil: "2026-12-31", description: "10% instant discount on HDFC Bank cards" },
  { id: 3, title: "Nike Festive Sale", type: "Brand", discount: "20%", status: "Active", validUntil: "2026-07-15", description: "Special discount on Nike products" },
  { id: 4, title: "Clearance Sale", type: "Seasonal", discount: "50%", status: "Scheduled", validUntil: "2026-09-30", description: "End of season clearance on selected items" },
  { id: 5, title: "New User Offer", type: "Coupon", discount: "15%", status: "Active", validUntil: "2026-12-31", description: "15% off for first-time customers" },
];

export default function OffersPage() {
  const [offers, setOffers] = useState(initialOffers);
  const [addModal, setAddModal] = useState(false);
  const [newOffer, setNewOffer] = useState({ title: "", type: "Seasonal", discount: "", description: "", validUntil: "", status: "Active" });

  const handleAdd = () => {
    if (!newOffer.title.trim() || !newOffer.discount.trim()) return;
    setOffers((prev) => [...prev, { ...newOffer, id: Date.now() }]);
    setNewOffer({ title: "", type: "Seasonal", discount: "", description: "", validUntil: "", status: "Active" });
    setAddModal(false);
  };

  const toggleStatus = (id) => {
    setOffers((prev) => prev.map((o) => o.id === id ? { ...o, status: o.status === "Active" ? "Inactive" : "Active" } : o));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Offers</h1>
          <p className="mt-1 text-sm text-slate-500">Create and manage promotional offers</p>
        </div>
        <button onClick={() => setAddModal(true)} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">+ Create Offer</button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer) => (
          <div key={offer.id} className="rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                  offer.type === "Seasonal" ? "bg-green-100 text-green-700" :
                  offer.type === "Bank" ? "bg-blue-100 text-blue-700" :
                  offer.type === "Brand" ? "bg-purple-100 text-purple-700" :
                  "bg-orange-100 text-orange-700"
                }`}>{offer.type}</span>
              </div>
              <button onClick={() => toggleStatus(offer.id)} className={`rounded-full px-3 py-1 text-xs font-medium ${
                offer.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
              }`}>{offer.status}</button>
            </div>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">{offer.title}</h3>
            <p className="mt-1 text-3xl font-bold text-blue-600">{offer.discount}</p>
            <p className="mt-2 text-sm text-slate-500">{offer.description}</p>
            <p className="mt-2 text-xs text-slate-400">Valid until: {offer.validUntil}</p>
          </div>
        ))}
      </div>

      <Modal isOpen={addModal} onClose={() => setAddModal(false)} title="Create New Offer" size="md">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Offer Title *</label>
            <input type="text" value={newOffer.title} onChange={(e) => setNewOffer((p) => ({ ...p, title: e.target.value }))} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Type</label>
              <select value={newOffer.type} onChange={(e) => setNewOffer((p) => ({ ...p, type: e.target.value }))} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                <option>Seasonal</option>
                <option>Bank</option>
                <option>Brand</option>
                <option>Coupon</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Discount *</label>
              <input type="text" value={newOffer.discount} onChange={(e) => setNewOffer((p) => ({ ...p, discount: e.target.value }))} placeholder="e.g. 30%" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
            <textarea value={newOffer.description} onChange={(e) => setNewOffer((p) => ({ ...p, description: e.target.value }))} rows={2} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Valid Until</label>
              <input type="date" value={newOffer.validUntil} onChange={(e) => setNewOffer((p) => ({ ...p, validUntil: e.target.value }))} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
              <select value={newOffer.status} onChange={(e) => setNewOffer((p) => ({ ...p, status: e.target.value }))} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                <option>Active</option>
                <option>Inactive</option>
                <option>Scheduled</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setAddModal(false)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
            <button onClick={handleAdd} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Create Offer</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}