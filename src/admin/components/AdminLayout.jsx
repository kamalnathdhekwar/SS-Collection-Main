import { Outlet } from "react-router-dom";
import { AdminProvider, useAdmin } from "../context/AdminContext";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AdminLayoutContent() {
  const { sidebarCollapsed } = useAdmin();

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />
      <div className={`flex flex-1 flex-col transition-all duration-300 ${sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"}`}>
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  return (
    <AdminProvider>
      <AdminLayoutContent />
    </AdminProvider>
  );
}