import { useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    storeName: "SS Collection",
    email: "admin@sscollection.com",
    phone: "+91 98765 43210",
    gst: "27ABCDE1234F1Z5",
    address: "123, MG Road, Bangalore - 560001",
    currency: "INR",
    timezone: "Asia/Kolkata",
    lowStockThreshold: 5,
    enableNotifications: true,
    enableAutoConfirm: false,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateField = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="mt-1 text-sm text-slate-500">Manage your store settings and preferences</p>
        </div>
        <button
          onClick={handleSave}
          className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
          <h2 className="text-lg font-semibold text-slate-900">Store Information</h2>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Store Name</label>
            <input type="text" value={settings.storeName} onChange={(e) => updateField("storeName", e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
              <input type="email" value={settings.email} onChange={(e) => updateField("email", e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Phone</label>
              <input type="text" value={settings.phone} onChange={(e) => updateField("phone", e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">GST Number</label>
              <input type="text" value={settings.gst} onChange={(e) => updateField("gst", e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Currency</label>
              <select value={settings.currency} onChange={(e) => updateField("currency", e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                <option>INR</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Address</label>
            <textarea value={settings.address} onChange={(e) => updateField("address", e.target.value)} rows={2} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
            <h2 className="text-lg font-semibold text-slate-900">Preferences</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Timezone</label>
                <select value={settings.timezone} onChange={(e) => updateField("timezone", e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                  <option>Asia/Kolkata</option>
                  <option>Asia/Dubai</option>
                  <option>America/New_York</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Low Stock Threshold</label>
                <input type="number" value={settings.lowStockThreshold} onChange={(e) => updateField("lowStockThreshold", Number(e.target.value))} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={settings.enableNotifications} onChange={(e) => updateField("enableNotifications", e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Enable Notifications</p>
                  <p className="text-xs text-slate-500">Receive email notifications for orders and updates</p>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={settings.enableAutoConfirm} onChange={(e) => updateField("enableAutoConfirm", e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Auto-confirm Orders</p>
                  <p className="text-xs text-slate-500">Automatically confirm prepaid orders</p>
                </div>
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Danger Zone</h2>
            <p className="mt-1 text-sm text-slate-500">Irreversible actions</p>
            <div className="mt-4 space-y-3">
              <button className="w-full rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50">Reset Store Data</button>
              <button className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700">Delete Store</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}