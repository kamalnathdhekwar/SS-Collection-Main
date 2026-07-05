import { useMemo } from "react";
import StatsCard from "../../components/StatsCard";
import { getDashboardStats, getMonthlyRevenue, getRecentOrders, getRecentActivity, getTopSellingProducts } from "../../services/dashboardService";

const statusColors = {
  Delivered: "bg-emerald-100 text-emerald-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-violet-100 text-violet-700",
  Pending: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function DashboardPage() {
  const stats = useMemo(() => getDashboardStats(), []);
  const revenueData = useMemo(() => getMonthlyRevenue(), []);
  const orders = useMemo(() => getRecentOrders(5), []);
  const activities = useMemo(() => getRecentActivity(6), []);
  const topProducts = useMemo(() => getTopSellingProducts(), []);

  const currentMonthRevenue = revenueData[revenueData.length - 1];
  const prevMonthRevenue = revenueData[revenueData.length - 2];
  const revenueGrowth = prevMonthRevenue
    ? (((currentMonthRevenue.revenue - prevMonthRevenue.revenue) / prevMonthRevenue.revenue) * 100).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Welcome back, Kamal! Here's your store overview.</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Last 30 days
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatsCard title="Today's Sales" value={stats.todaySales} icon="💰" trend={stats.growth.sales} trendLabel="vs yesterday" color="blue" />
        <StatsCard title="Total Revenue" value={stats.revenue} icon="📈" trend={Number(revenueGrowth)} trendLabel="vs last month" color="green" />
        <StatsCard title="Total Orders" value={stats.orders} icon="🛒" trend={stats.growth.orders} trendLabel="vs last month" color="purple" />
        <StatsCard title="Customers" value={stats.customers} icon="👥" trend={stats.growth.customers} trendLabel="vs last month" color="orange" />
        <StatsCard title="Products" value={stats.products} icon="📦" color="cyan" />
        <StatsCard title="Pending Orders" value={stats.pendingOrders} icon="⏳" color="rose" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Revenue Overview</h2>
          <div className="relative h-64">
            <div className="flex h-full items-end gap-2">
              {revenueData.map((item) => {
                const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));
                const height = (item.revenue / maxRevenue) * 100;
                return (
                  <div key={item.month} className="group relative flex flex-1 flex-col items-center">
                    <div className="absolute -top-8 hidden rounded bg-slate-900 px-2 py-1 text-xs text-white group-hover:block whitespace-nowrap">
                      ₹{(item.revenue / 100000).toFixed(1)}L
                    </div>
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400 transition-all hover:opacity-80"
                      style={{ height: `${height}%` }}
                    />
                    <span className="mt-2 text-[10px] text-slate-500">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Recent Activity</h2>
          <div className="space-y-3">
            {activities.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-xs ${
                  activity.type === "order" ? "bg-blue-100 text-blue-600" :
                  activity.type === "product" ? "bg-violet-100 text-violet-600" :
                  activity.type === "payment" ? "bg-emerald-100 text-emerald-600" :
                  activity.type === "stock" ? "bg-amber-100 text-amber-600" :
                  activity.type === "customer" ? "bg-orange-100 text-orange-600" :
                  "bg-slate-100 text-slate-600"
                }`}>
                  {activity.type === "order" ? "🛒" :
                   activity.type === "product" ? "📦" :
                   activity.type === "payment" ? "💰" :
                   activity.type === "stock" ? "📋" :
                   activity.type === "customer" ? "👤" : "🏷️"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                  <p className="truncate text-xs text-slate-500">{activity.detail}</p>
                  <p className="text-xs text-slate-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Recent Orders</h2>
            <a href="/admin/orders" className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-3 text-left font-medium text-slate-500">Order</th>
                  <th className="pb-3 text-left font-medium text-slate-500">Customer</th>
                  <th className="pb-3 text-left font-medium text-slate-500">Amount</th>
                  <th className="pb-3 text-left font-medium text-slate-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-50">
                    <td className="py-3 font-medium text-slate-900">{order.id}</td>
                    <td className="py-3 text-slate-600">{order.customer}</td>
                    <td className="py-3 text-slate-900">₹{order.amount.toLocaleString("en-IN")}</td>
                    <td className="py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[order.status] || "bg-slate-100 text-slate-700"}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Top Selling Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-500">
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">{product.name}</p>
                  <p className="text-xs text-slate-500">{product.sales} units sold</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900">₹{(product.revenue / 100000).toFixed(1)}L</p>
                  <span className={`text-xs font-medium ${product.growth >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                    {product.growth >= 0 ? "+" : ""}{product.growth}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}