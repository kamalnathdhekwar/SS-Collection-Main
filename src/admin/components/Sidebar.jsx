import { memo, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: "📊" },
  { label: "Products", path: "/admin/products", icon: "📦" },
  { label: "Orders", path: "/admin/orders", icon: "🛒" },
  { label: "Customers", path: "/admin/customers", icon: "👥" },
  { label: "Categories", path: "/admin/categories", icon: "📂" },
  { label: "Inventory", path: "/admin/inventory", icon: "📋" },
  { label: "Offers", path: "/admin/offers", icon: "🏷️" },
  { label: "Coupons", path: "/admin/coupons", icon: "🎫" },
  { label: "Reports", path: "/admin/reports", icon: "📈" },
  { label: "Settings", path: "/admin/settings", icon: "⚙️" },
  { label: "Profile", path: "/admin/profile", icon: "👤" },
];

function Sidebar() {
  const { sidebarCollapsed, mobileSidebarOpen, closeMobileSidebar, toggleSidebar } = useAdmin();
  const { pathname } = useLocation();

  const activeItem = useMemo(() => {
    const match = navItems.find((item) =>
      item.path === "/admin" ? pathname === "/admin" : pathname.startsWith(item.path),
    );
    return match?.label || "";
  }, [pathname]);

  return (
    <>
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full flex-col bg-slate-900 text-white transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "w-16" : "w-64"
        } ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-700/50 px-4">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight">
                SS <span className="font-light text-slate-400">Admin</span>
              </span>
            </div>
          )}
          {sidebarCollapsed && (
            <span className="mx-auto text-lg font-bold">SS</span>
          )}
          <button
            onClick={toggleSidebar}
            className="hidden rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white lg:block"
            aria-label="Toggle sidebar"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={closeMobileSidebar}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4 scrollbar-thin">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeMobileSidebar}
              className={`group mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                activeItem === item.label
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
              title={sidebarCollapsed ? item.label : ""}
            >
              <span className="flex-shrink-0 text-lg">{item.icon}</span>
              {!sidebarCollapsed && <span>{item.label}</span>}
              {sidebarCollapsed && (
                <div className="absolute left-16 z-50 hidden rounded-md bg-slate-800 px-2 py-1 text-sm text-white shadow-lg group-hover:block whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-700/50 p-4">
          <NavLink
            to="/"
            onClick={closeMobileSidebar}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-all hover:bg-red-600/10 hover:text-red-400"
            title={sidebarCollapsed ? "Exit Admin" : ""}
          >
            <span className="text-lg">🚪</span>
            {!sidebarCollapsed && <span>Exit Admin</span>}
          </NavLink>
        </div>

        {!sidebarCollapsed && (
          <div className="border-t border-slate-700/50 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                KN
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-white">Kamal Nath</p>
                <p className="truncate text-xs text-slate-400">Super Admin</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

export default memo(Sidebar);