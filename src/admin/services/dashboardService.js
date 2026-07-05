import { dashboardStats, monthlyRevenue, recentOrders, recentActivity, topSellingProducts } from "../data/dashboardData";

export const getDashboardStats = () => {
  return { ...dashboardStats };
};

export const getMonthlyRevenue = () => {
  return [...monthlyRevenue];
};

export const getRecentOrders = (limit = 8) => {
  return recentOrders.slice(0, limit);
};

export const getRecentActivity = (limit = 8) => {
  return recentActivity.slice(0, limit);
};

export const getTopSellingProducts = (limit = 5) => {
  return topSellingProducts.slice(0, limit);
};