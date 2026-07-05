import { allProducts as catalogProducts } from "../data/allProducts";

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeProductIdValue(product) {
  const candidate = product?.routeId || product?.id;
  if (typeof candidate === "string") {
    const normalized = slugify(candidate);
    if (normalized && !/^\d+$/.test(normalized)) {
      return normalized;
    }
  }

  return "";
}

export function getProductRouteId(product, fallbackIndex = 0, sourceLabel = "products") {
  if (!product) {
    return "";
  }

  const existingId = normalizeProductIdValue(product);
  if (existingId) {
    return existingId;
  }

  const category = product?.category || sourceLabel;
  const categorySlug = slugify(category);
  const rawId = product?.id;
  const rawIdSlug = rawId === undefined || rawId === null ? "" : slugify(String(rawId));

  if (rawIdSlug) {
    return `${categorySlug}-${rawIdSlug}`;
  }

  const brand = product?.brand || "ss-collection";
  const name = product?.name || product?.title || "product";
  const generated = slugify(`${category}-${brand}-${name}`);

  return generated || `product-${fallbackIndex + 1}`;
}

function buildCatalogIndex(products = catalogProducts) {
  const index = new Map();

  products.forEach((product, indexValue) => {
    const routeId = getProductRouteId(product, indexValue, product?.category || "products");
    if (routeId) {
      index.set(routeId, product);
    }

    if (product?.slug) {
      index.set(String(product.slug), product);
    }

    if (product?.id) {
      index.set(String(product.id), product);
    }
  });

  return index;
}

const productIndex = buildCatalogIndex();

export function debugProductLookup(id) {
  const routeId = String(id ?? "");
  const sampleIds = catalogProducts.slice(0, 8).map((product) => product.id);
  console.warn(`[ProductLookup] routeId=${routeId} datasetLength=${catalogProducts.length} sampleIds=${sampleIds.join(", ")}`);
  return { routeId, datasetLength: catalogProducts.length, sampleIds };
}

export function getProductById(id) {
  if (!id) {
    return null;
  }

  const identifier = String(id).trim();
  if (!identifier) {
    return null;
  }

  const directMatch = productIndex.get(identifier) || productIndex.get(slugify(identifier));
  if (directMatch) {
    return directMatch;
  }

  const fallbackMatch = catalogProducts.find((product) => {
    return (
      String(product.id) === identifier ||
      String(product.slug) === identifier ||
      getProductRouteId(product) === slugify(identifier)
    );
  });

  if (fallbackMatch) {
    return fallbackMatch;
  }

  debugProductLookup(identifier);
  return null;
}

export function getSimilarProducts(product) {
  if (!product) {
    return [];
  }

  const currentProduct = getProductById(product?.id || product?.slug || product?.routeId) || product;
  const products = catalogProducts.filter((item) => String(item.id) !== String(currentProduct.id));
  const byCategory = products.filter((item) => item.category === currentProduct.category);
  const byBrand = products.filter((item) => item.brand === currentProduct.brand);
  const pool = byCategory.length > 0 ? byCategory : byBrand.length > 0 ? byBrand : products;

  return pool.slice(0, 4);
}

export function buildBreadcrumbs(product) {
  const currentProduct = getProductById(product?.id || product?.slug || product?.routeId) || product;
  const categoryPath = (() => {
    switch (currentProduct?.category) {
      case "Clothing":
        return "/clothings";
      case "Footwear":
        return "/footwear";
      case "Accessories":
        return "/accessories";
      case "Sports Equipment":
        return "/sports-equipment";
      default:
        return "/products";
    }
  })();

  return [
    { label: "Home", href: "/" },
    ...(currentProduct?.category ? [{ label: currentProduct.category, href: categoryPath }] : []),
    { label: currentProduct?.name || "Product" },
  ];
}

export function formatPrice(value) {
  const parsedValue = Number(value || 0);
  return `₹${Number.isFinite(parsedValue) ? parsedValue.toLocaleString("en-IN") : 0}`;
}

export function getAllProducts() {
  return catalogProducts;
}
