import { clothingProducts } from "../components/Clothings/products";
import { footwearProducts } from "../components/footwear/products";
import { accessoriesProducts } from "../components/accessories/products";
import { sportsProducts } from "../components/sportsEquipment/products";
import productsData from "../components/Products/productsData";
import { allProducts as detailProducts } from "../data/products";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80";

function toNumber(value, fallback = 0) {
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : fallback;
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeImageEntry(image, fallbackAlt) {
  if (typeof image === "string") {
    return { src: image || FALLBACK_IMAGE, alt: fallbackAlt || "Product image" };
  }

  if (image && typeof image === "object") {
    return {
      src: image.src || image.url || image.image || FALLBACK_IMAGE,
      alt: image.alt || fallbackAlt || "Product image",
    };
  }

  return { src: FALLBACK_IMAGE, alt: fallbackAlt || "Product image" };
}

function normalizeImages(images, fallbackImage, fallbackAlt) {
  const sourceImages = Array.isArray(images) ? images : [];
  const resolvedImages = sourceImages.length > 0 ? sourceImages : [fallbackImage].filter(Boolean);

  return resolvedImages.map((image) => normalizeImageEntry(image, fallbackAlt)).filter((image) => image.src);
}

function normalizeSize(size) {
  if (typeof size === "string") {
    return { label: size, available: true };
  }

  if (size && typeof size === "object") {
    return {
      label: size.label || size.name || size.value || "One Size",
      available: size.available ?? size.inStock ?? true,
    };
  }

  return { label: "One Size", available: true };
}

function normalizeSizes(sizes) {
  const sourceSizes = Array.isArray(sizes) ? sizes : [];
  return sourceSizes.length > 0 ? sourceSizes.map(normalizeSize) : [{ label: "One Size", available: true }];
}

function normalizeColor(color) {
  if (typeof color === "string") {
    return { name: color, swatchClass: "bg-slate-400" };
  }

  if (color && typeof color === "object") {
    return {
      name: color.name || color.label || "Default",
      swatchClass: color.swatchClass || color.className || "bg-slate-400",
    };
  }

  return { name: "Default", swatchClass: "bg-slate-400" };
}

function normalizeColors(colors) {
  const sourceColors = Array.isArray(colors) ? colors : [];
  return sourceColors.length > 0 ? sourceColors.map(normalizeColor) : [{ name: "Default", swatchClass: "bg-slate-400" }];
}

function normalizeStock(stock, fallbackLabel) {
  if (typeof stock === "string") {
    const isLimited = stock.toLowerCase().includes("limited");
    return {
      status: stock,
      count: isLimited ? 3 : 5,
      label: stock,
    };
  }

  if (stock && typeof stock === "object") {
    return {
      status: stock.status || stock.label || fallbackLabel || "In Stock",
      count: toNumber(stock.count || stock.availableCount || 1, 1),
      label: stock.label || stock.status || fallbackLabel || "In Stock",
    };
  }

  return {
    status: "In Stock",
    count: 5,
    label: fallbackLabel || "In Stock",
  };
}

function normalizeDelivery(delivery) {
  if (typeof delivery === "string") {
    return {
      estimated: delivery,
      cod: true,
      freeShipping: true,
    };
  }

  if (delivery && typeof delivery === "object") {
    return {
      estimated: delivery.estimated || delivery.label || "Estimated delivery in 3-5 days",
      cod: delivery.cod ?? true,
      freeShipping: delivery.freeShipping ?? true,
    };
  }

  return {
    estimated: "Estimated delivery in 3-5 days",
    cod: true,
    freeShipping: true,
  };
}

function normalizeArray(values) {
  return Array.isArray(values) ? values.filter(Boolean) : [];
}

function normalizeSpecifications(specifications) {
  const sourceSpecifications = normalizeArray(specifications);

  if (sourceSpecifications.length === 0) {
    return [{ label: "Category", value: "Premium Product" }];
  }

  return sourceSpecifications.map((specification) => {
    if (typeof specification === "string") {
      return { label: "Detail", value: specification };
    }

    return {
      label: specification.label || specification.name || "Detail",
      value: specification.value || specification.detail || "Available",
    };
  });
}

function normalizeOffers(offers) {
  const sourceOffers = normalizeArray(offers);

  if (sourceOffers.length === 0) {
    return [{ title: "Free delivery", description: "Enjoy easy delivery and returns for this product." }];
  }

  return sourceOffers.map((offer) => {
    if (typeof offer === "string") {
      return { title: offer, description: "Limited time offer" };
    }

    return {
      title: offer.title || offer.label || "Offer",
      description: offer.description || offer.details || "Limited time offer",
    };
  });
}

function normalizeTags(tags, category, gender) {
  const sourceTags = normalizeArray(tags);
  const baseTags = [category, gender].filter(Boolean);

  return sourceTags.length > 0 ? sourceTags : baseTags.length > 0 ? baseTags : ["Popular"];
}

function normalizeHighlights(highlights, description, brand) {
  const sourceHighlights = normalizeArray(highlights);

  if (sourceHighlights.length > 0) {
    return sourceHighlights;
  }

  return [brand || "SS Collection", description || "Premium quality product"].filter(Boolean).slice(0, 3);
}

function normalizeRatingBreakdown(ratingBreakdown, rating, reviewCount) {
  const sourceBreakdown = normalizeArray(ratingBreakdown);

  if (sourceBreakdown.length > 0) {
    return sourceBreakdown.map((item) => ({
      stars: toNumber(item.stars || item.value || 0, 0),
      count: toNumber(item.count || 0, 0),
      barClass: item.barClass || "w-0",
    }));
  }

  const safeRating = toNumber(rating, 4.5);
  const safeCount = Math.max(toNumber(reviewCount, 1), 1);

  return [
    { stars: 5, count: Math.round(safeCount * 0.65), barClass: "w-[70%]" },
    { stars: 4, count: Math.round(safeCount * 0.22), barClass: "w-[24%]" },
    { stars: 3, count: Math.max(1, Math.round(safeCount * 0.08)), barClass: "w-[6%]" },
    { stars: 2, count: 0, barClass: "w-[0%]" },
    { stars: 1, count: 0, barClass: "w-[0%]" },
  ].map((item) => ({ ...item, barClass: safeRating >= 4.5 ? item.barClass : item.barClass }));
}

function normalizeReviews(reviews, rating) {
  const sourceReviews = normalizeArray(reviews);

  if (sourceReviews.length > 0) {
    return sourceReviews.map((review) => ({
      id: review.id || `${review.name || "review"}-${Math.random().toString(16).slice(2, 8)}`,
      name: review.name || "Verified Buyer",
      rating: toNumber(review.rating || rating || 5, 5),
      date: review.date || "Recently reviewed",
      text: review.text || review.comment || "Great quality and easy experience.",
      verified: review.verified ?? true,
    }));
  }

  return [
    {
      id: "default-review",
      name: "Verified Buyer",
      rating: toNumber(rating, 5),
      date: "Recently reviewed",
      text: "Great quality and smooth shopping experience.",
      verified: true,
    },
  ];
}

function normalizeProduct(product) {
  const rawName = product?.name || "Premium Product";
  const rawId = product?.id ?? product?.slug ?? slugify(rawName);
  const price = toNumber(product?.price ?? product?.mrp ?? product?.originalPrice ?? 0, 0);
  const mrp = toNumber(product?.mrp ?? product?.originalPrice ?? product?.price ?? price, price || 0);
  const discount = toNumber(
    product?.discount ?? (mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0),
    0,
  );

  return {
    ...product,
    id: String(rawId),
    slug: product?.slug || slugify(rawName),
    name: rawName,
    brand: product?.brand || FALLBACK_IMAGE,
    category: product?.category || "Products",
    subCategory: product?.subCategory || product?.category || "Products",
    gender: product?.gender || "Unisex",
    description: product?.description || "Premium quality product from SS Collection.",
    price,
    mrp,
    originalPrice: toNumber(product?.originalPrice ?? mrp, mrp),
    discount,
    rating: toNumber(product?.rating, 4.5),
    reviewCount: toNumber(product?.reviewCount ?? product?.reviews?.length ?? 0, 1),
    stock: normalizeStock(product?.stock, product?.availability || "In Stock"),
    images: normalizeImages(product?.images, product?.image, rawName),
    sizes: normalizeSizes(product?.sizes),
    colors: normalizeColors(product?.colors),
    material: product?.material || "Premium fabric and finish.",
    specifications: normalizeSpecifications(product?.specifications),
    offers: normalizeOffers(product?.offers),
    delivery: normalizeDelivery(product?.delivery),
    seller: product?.seller || product?.brand || "SS Collection",
    returnPolicy: product?.returnPolicy || "Easy 7 days return policy.",
    warranty: product?.warranty || "Brand warranty.",
    tags: normalizeTags(product?.tags, product?.category, product?.gender),
    highlights: normalizeHighlights(product?.highlights, product?.description, product?.brand),
    similarProducts: normalizeArray(product?.similarProducts),
    ratingBreakdown: normalizeRatingBreakdown(product?.ratingBreakdown, product?.rating, product?.reviewCount),
    reviews: normalizeReviews(product?.reviews, product?.rating),
  };
}

function getAllProducts() {
  const collections = [clothingProducts, footwearProducts, accessoriesProducts, sportsProducts, detailProducts, productsData];
  const productMap = new Map();

  collections.forEach((collection) => {
    normalizeArray(collection).forEach((product) => {
      const normalizedProduct = normalizeProduct(product);
      const key = String(normalizedProduct.id);
      if (!productMap.has(key)) {
        productMap.set(key, normalizedProduct);
      }
      if (normalizedProduct.slug) {
        productMap.set(normalizedProduct.slug, normalizedProduct);
      }
    });
  });

  return Array.from(productMap.values());
}

export function getProductById(id) {
  if (!id) {
    return null;
  }

  const identifier = String(id);
  return getAllProducts().find((product) => String(product.id) === identifier || product.slug === identifier) || null;
}

export function getSimilarProducts(product) {
  const currentProduct = normalizeProduct(product);
  const products = getAllProducts().filter((item) => String(item.id) !== String(currentProduct.id));

  const byCategory = products.filter((item) => item.category === currentProduct.category);
  const byBrand = products.filter((item) => item.brand === currentProduct.brand);
  const pool = byCategory.length > 0 ? byCategory : byBrand.length > 0 ? byBrand : products;

  return pool.slice(0, 4);
}

export function buildBreadcrumbs(product) {
  const currentProduct = normalizeProduct(product);
  const categoryPath = (() => {
    switch (currentProduct.category) {
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
    ...(currentProduct.category ? [{ label: currentProduct.category, href: categoryPath }] : []),
    { label: currentProduct.name },
  ];
}

export function formatPrice(value) {
  return `₹${toNumber(value, 0).toLocaleString("en-IN")}`;
}

export { getAllProducts };
