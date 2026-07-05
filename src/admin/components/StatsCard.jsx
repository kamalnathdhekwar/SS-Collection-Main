import { memo } from "react";

function StatsCard({ title, value, icon, trend, trendLabel, color = "blue" }) {
  const colorMap = {
    blue: "from-blue-500 to-blue-600 shadow-blue-500/25",
    green: "from-emerald-500 to-emerald-600 shadow-emerald-500/25",
    purple: "from-violet-500 to-violet-600 shadow-violet-500/25",
    orange: "from-orange-500 to-orange-600 shadow-orange-500/25",
    rose: "from-rose-500 to-rose-600 shadow-rose-500/25",
    cyan: "from-cyan-500 to-cyan-600 shadow-cyan-500/25",
  };

  const bgMap = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    purple: "bg-violet-50 text-violet-600",
    orange: "bg-orange-50 text-orange-600",
    rose: "bg-rose-50 text-rose-600",
    cyan: "bg-cyan-50 text-cyan-600",
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:shadow-lg hover:shadow-slate-200/50">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900">
            {typeof value === "number" && value > 999 ? `₹${value.toLocaleString("en-IN")}` : value}
          </h3>
          {trend !== undefined && (
            <div className="mt-2 flex items-center gap-1.5">
              <span className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                trend >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
              }`}>
                <svg className={`h-3 w-3 ${trend >= 0 ? "" : "rotate-180"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                {Math.abs(trend)}%
              </span>
              {trendLabel && <span className="text-xs text-slate-400">{trendLabel}</span>}
            </div>
          )}
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${bgMap[color]} text-lg`}>
          {icon}
        </div>
      </div>
      <div className={`absolute -bottom-2 -right-2 h-16 w-16 rounded-full bg-gradient-to-br ${colorMap[color]} opacity-10 blur-xl transition-all group-hover:opacity-20`} />
    </div>
  );
}

export default memo(StatsCard);