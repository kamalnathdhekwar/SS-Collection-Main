import { createContext, useCallback, useContext, useMemo, useState } from "react";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [adminUser] = useState({
    name: "Kamal Nath",
    email: "admin@sscollection.com",
    role: "Super Admin",
    avatar: null,
  });

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  const toggleMobileSidebar = useCallback(() => {
    setMobileSidebarOpen((prev) => !prev);
  }, []);

  const closeMobileSidebar = useCallback(() => {
    setMobileSidebarOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      sidebarCollapsed,
      mobileSidebarOpen,
      adminUser,
      toggleSidebar,
      toggleMobileSidebar,
      closeMobileSidebar,
    }),
    [sidebarCollapsed, mobileSidebarOpen, adminUser, toggleSidebar, toggleMobileSidebar, closeMobileSidebar],
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}