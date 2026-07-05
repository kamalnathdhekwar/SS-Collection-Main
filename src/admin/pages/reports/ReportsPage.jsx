import { useMemo } from "react";
import { getMonthlyRevenue } from "../../services/dashboardService";

export default function ReportsPage() {
  const revenueData = useMemo(() => getMonthlyRevenue(), []);

  const totalRevenue = useMemo(() => revenueData.reduce((sum, r) => sum + r.revenue, 0), [revenueData]);
  const totalOrders = useMemo(() => revenueData.reduce((sum, r) => sum + r.orders, 0), [revenueData]);
  const avgMonthlyRevenue = Math.round(totalRevenue / revenueData.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
        <p className="mt-1 text-sm text-slate-500">Analytics and performance reports</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Total Revenue (YTD)</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">₹{(totalRevenue / 100000).toFixed(1)}L</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Total Orders (YTD)</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{totalOrders.toLocaleString("en-IN")}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Avg Monthly Revenue</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">₹{(avgMonthlyRevenue / 100000).toFixed(1)}L</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Monthly Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-4 py-3 text-left font-semibold text-slate-500">Month</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-500">Revenue</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-500">Orders</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-500">Products</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-500">Avg Order Value</th>
              </tr>
            </thead>
            <tbody>
              {revenueData.map((item) => (
                <tr key={item.month} className="border-b border-slate-50 transition-colors hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{item.month}</td>
                  <td className="px-4 py-3 text-right text-slate-900">₹{(item.revenue / 100000).toFixed(1)}L</td>
                  <td className="px-4 py-3 text-right text-slate-600">{item.orders}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{item.products}</td>
                  <td className="px-4 py-3 text-right text-slate-600">₹{Math.round(item.revenue / item.orders).toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}