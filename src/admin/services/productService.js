import { allProducts } from "../../data/products";

const generateId = () => `prod-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

let adminProducts = [
  ...allProducts.map((p) => ({
    ...p,
    adminId: p.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })),
  {
    id: "admin-watch-classic",
    name: "Classic Leather Watch",
    brand: "Titan",
    category: "Accessories",
    subCategory: "Watches",
    gender: "Men",
    description: "Premium leather strap watch with analog display.",
    price: 3499,
    mrp: 4999,
    discount: 30,
    rating: 4.5,
    reviewCount: 42,
    stock: { status: "In Stock", count: 15, label: "Available" },
    images: [{ src: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1000&q=90", alt: "Classic Watch" }],
    sizes: [{ label: "Free Size", available: true }],
    colors: [{ name: "Brown", swatchClass: "bg-amber-800" }, { name: "Black", swatchClass: "bg-slate-950" }],
    material: "Leather strap, stainless steel case.",
    specifications: [{ label: "Movement", value: "Quartz" }, { label: "Water Resistant", value: "30m" }],
    offers: [{ title: "Festival Discount", description: "Extra 10% off" }],
    delivery: { estimated: "Estimated delivery in 3-5 days", cod: true, freeShipping: true },
    seller: "Titan Official",
    returnPolicy: "Easy 7 days returns",
    warranty: "2 years brand warranty",
    tags: ["Trending", "Best Seller"],
    highlights: ["Premium leather", "Quartz movement", "Water resistant"],
    similarProducts: [],
    adminId: "admin-watch-classic",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const getProducts = () => {
  return [...adminProducts];
};

export const getProductById = (id) => {
  return adminProducts.find((p) => p.adminId === id || p.id === id) || null;
};

export const createProduct = (productData) => {
  const newProduct = {
    ...productData,
    id: generateId(),
    adminId: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rating: 0,
    reviewCount: 0,
  };
  adminProducts = [newProduct, ...adminProducts];
  return newProduct;
};

export const updateProduct = (id, productData) => {
  const index = adminProducts.findIndex((p) => p.adminId === id || p.id === id);
  if (index === -1) return null;
  adminProducts[index] = { ...adminProducts[index], ...productData, updatedAt: new Date().toISOString() };
  return adminProducts[index];
};

export const deleteProduct = (id) => {
  const index = adminProducts.findIndex((p) => p.adminId === id || p.id === id);
  if (index === -1) return false;
  adminProducts = adminProducts.filter((p) => p.adminId !== id && p.id !== id);
  return true;
};

export const deleteMultipleProducts = (ids) => {
  adminProducts = adminProducts.filter((p) => !ids.includes(p.adminId) && !ids.includes(p.id));
  return true;
};