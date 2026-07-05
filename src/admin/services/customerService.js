import { customersData } from "../data/customersData";

let customers = [...customersData];

export const getCustomers = () => [...customers];

export const getCustomerById = (id) => customers.find((c) => c.id === id) || null;

export const deleteCustomer = (id) => {
  const index = customers.findIndex((c) => c.id === id);
  if (index === -1) return false;
  customers = customers.filter((c) => c.id !== id);
  return true;
};