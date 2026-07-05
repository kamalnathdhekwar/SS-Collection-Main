export const dashboardStats = {
  todaySales: 28450,
  revenue: 1250000,
  orders: 342,
  customers: 1289,
  products: 456,
  pendingOrders: 23,
  lowStock: 12,
  growth: {
    sales: 12.5,
    revenue: 8.3,
    orders: 15.2,
    customers: 5.7,
  },
};

export const monthlyRevenue = [
  { month: "Jan", revenue: 850000, orders: 210, products: 320 },
  { month: "Feb", revenue: 920000, orders: 235, products: 340 },
  { month: "Mar", revenue: 1080000, orders: 280, products: 365 },
  { month: "Apr", revenue: 1150000, orders: 295, products: 380 },
  { month: "May", revenue: 980000, orders: 260, products: 395 },
  { month: "Jun", revenue: 1250000, orders: 342, products: 420 },
  { month: "Jul", revenue: 1320000, orders: 355, products: 435 },
  { month: "Aug", revenue: 1180000, orders: 310, products: 445 },
  { month: "Sep", revenue: 1420000, orders: 380, products: 450 },
  { month: "Oct", revenue: 1380000, orders: 365, products: 456 },
  { month: "Nov", revenue: 1550000, orders: 410, products: 460 },
  { month: "Dec", revenue: 1680000, orders: 445, products: 470 },
];

export const recentOrders = [
  { id: "#ORD-001", customer: "Rahul Sharma", product: "Air Zoom Pegasus", amount: 7999, status: "Delivered", date: "2026-07-05" },
  { id: "#ORD-002", customer: "Priya Patel", product: "Aviator Sunglasses", amount: 6499, status: "Processing", date: "2026-07-05" },
  { id: "#ORD-003", customer: "Amit Verma", product: "Regallo Jeans", amount: 988, status: "Shipped", date: "2026-07-04" },
  { id: "#ORD-004", customer: "Sneha Gupta", product: "Slim Fit Jeans", amount: 1299, status: "Pending", date: "2026-07-04" },
  { id: "#ORD-005", customer: "Vikram Singh", product: "Running Shoes", amount: 7999, status: "Delivered", date: "2026-07-03" },
  { id: "#ORD-006", customer: "Neha Kapoor", product: "Classic Watch", amount: 3499, status: "Cancelled", date: "2026-07-03" },
  { id: "#ORD-007", customer: "Rohit Nair", product: "Cotton T-Shirt", amount: 599, status: "Delivered", date: "2026-07-02" },
  { id: "#ORD-008", customer: "Ananya Reddy", product: "Leather Wallet", amount: 1299, status: "Processing", date: "2026-07-02" },
];

export const recentActivity = [
  { action: "New order placed", detail: "#ORD-009 by Karan Mehta", time: "2 minutes ago", type: "order" },
  { action: "Product added", detail: "Nike Dri-FIT T-Shirt added to inventory", time: "15 minutes ago", type: "product" },
  { action: "Payment received", detail: "₹7,999 from Rahul Sharma", time: "1 hour ago", type: "payment" },
  { action: "Stock alert", detail: "Ray-Ban Aviator - Only 3 left", time: "2 hours ago", type: "stock" },
  { action: "New customer registered", detail: "Meera Joshi created an account", time: "3 hours ago", type: "customer" },
  { action: "Order status updated", detail: "#ORD-003 marked as Shipped", time: "4 hours ago", type: "order" },
  { action: "Review submitted", detail: "5-star review for Regallo Jeans", time: "5 hours ago", type: "review" },
  { action: "Coupon created", detail: "SUMMER20 - 20% off on all items", time: "6 hours ago", type: "coupon" },
];

export const topSellingProducts = [
  { name: "Air Zoom Pegasus", sales: 234, revenue: 1871766, growth: 12 },
  { name: "Regallo Jeans", sales: 189, revenue: 186732, growth: 8 },
  { name: "Aviator Sunglasses", sales: 156, revenue: 1013844, growth: 15 },
  { name: "Slim Fit Jeans", sales: 142, revenue: 184458, growth: -3 },
  { name: "Classic Watch", sales: 98, revenue: 342902, growth: 5 },
];