import { lazy } from "react";

const AdminLayout = lazy(() => import("../components/AdminLayout"));
const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage"));
const ProductsPage = lazy(() => import("../pages/products/ProductsPage"));
const AddProductPage = lazy(() => import("../pages/products/AddProductPage"));
const OrdersPage = lazy(() => import("../pages/orders/OrdersPage"));
const CustomersPage = lazy(() => import("../pages/customers/CustomersPage"));
const CategoriesPage = lazy(() => import("../pages/categories/CategoriesPage"));
const InventoryPage = lazy(() => import("../pages/inventory/InventoryPage"));
const OffersPage = lazy(() => import("../pages/offers/OffersPage"));
const CouponsPage = lazy(() => import("../pages/coupons/CouponsPage"));
const ReportsPage = lazy(() => import("../pages/reports/ReportsPage"));
const SettingsPage = lazy(() => import("../pages/settings/SettingsPage"));
const ProfilePage = lazy(() => import("../pages/profile/ProfilePage"));

export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "add-product", element: <AddProductPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "customers", element: <CustomersPage /> },
      { path: "categories", element: <CategoriesPage /> },
      { path: "inventory", element: <InventoryPage /> },
      { path: "offers", element: <OffersPage /> },
      { path: "coupons", element: <CouponsPage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
];