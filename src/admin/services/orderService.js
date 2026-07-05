import { ordersData, orderStatuses } from "../data/ordersData";

let orders = [...ordersData];

export const getOrders = () => [...orders];

export const getOrderById = (id) => orders.find((o) => o.id === id) || null;

export const updateOrderStatus = (id, newStatus) => {
  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) return null;
  orders[index] = { ...orders[index], status: newStatus };
  return orders[index];
};

export const cancelOrder = (id) => {
  return updateOrderStatus(id, "Cancelled");
};

export const getOrderStatuses = () => [...orderStatuses];