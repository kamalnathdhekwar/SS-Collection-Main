import { clothingProducts } from "../components/Clothings/products";
import { footwearProducts } from "../components/footwear/products";
import { accessoriesProducts } from "../components/accessories/products";
import { sportsProducts } from "../components/sportsEquipment/products";
import productsData from "../components/Products/productsData";
import { allProducts as detailSeedProducts } from "./products";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80";

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toNumber(value, fallback = 0) {
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : fallback;
}

function normalizeImage(image, fallbackAlt) {
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

function normalizeImages(product, fallbackAlt) {
  if (Array.isArray(product?.images) && product.images.length > 0) {
    return product.images.map((image) => normalizeImage(image, fallbackAlt));
  }

  if (product?.image) {
    return [normalizeImage(product.image, fallbackAlt)];
  }

  return [normalizeImage(FALLBACK_IMAGE, fallbackAlt)];
}

function normalizeSizes(sizes) {
  if (Array.isArray(sizes) && sizes.length > 0) {
    return sizes.map((size) => {
      if (typeof size === "string") {
        return { label: size, available: true };
      }

      return {
        label: size?.label || size?.name || size?.value || "One Size",
        available: size?.available ?? size?.inStock ?? true,
      };
    });
  }

  return [{ label: "One Size", available: true }];
}

function normalizeColors(colors) {
  if (Array.isArray(colors) && colors.length > 0) {
    return colors.map((color) => {
      if (typeof color === "string") {
        return { name: color, swatchClass: "bg-slate-400" };
      }

      return {
        name: color?.name || color?.label || "Default",
        swatchClass: color?.swatchClass || color?.className || "bg-slate-400",
      };
    });
  }

  return [{ name: "Default", swatchClass: "bg-slate-400" }];
}

function normalizeStock(stock, fallback) {
  if (typeof stock === "string") {
    return {
      status: stock,
      count: stock.toLowerCase().includes("limited") ? 3 : 5,
      label: stock,
    };
  }

  if (stock && typeof stock === "object") {
    return {
      status: stock.status || stock.label || fallback || "In Stock",
      count: toNumber(stock.count || stock.availableCount || 1, 1),
      label: stock.label || stock.status || fallback || "In Stock",
    };
  }

  return {
    status: "In Stock",
    count: 5,
    label: fallback || "In Stock",
  };
}

function normalizeDelivery(delivery) {
  if (typeof delivery === "string") {
    return { estimated: delivery, cod: true, freeShipping: true };
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
  const source = normalizeArray(specifications);

  if (source.length === 0) {
    return [{ label: "Category", value: "Premium Product" }];
  }

  return source.map((specification) => {
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
  const source = normalizeArray(offers);

  if (source.length === 0) {
    return [{ title: "Free delivery", description: "Enjoy easy delivery and returns for this product." }];
  }

  return source.map((offer) => {
    if (typeof offer === "string") {
      return { title: offer, description: "Limited time offer" };
    }

    return {
      title: offer.title || offer.label || "Offer",
      description: offer.description || offer.details || "Limited time offer",
    };
  });
}

function normalizeReviews(reviews, rating) {
  const source = normalizeArray(reviews);

  if (source.length > 0) {
    return source.map((review) => ({
      id: review.id || `${review.name || "review"}-${Math.random().toString(16).slice(2, 8)}`,
      name: review.name || "Verified Buyer",
      rating: toNumber(review.rating || rating || 5, 5),
      date: review.date || "Recently reviewed",
      text: review.text || review.comment || "Great quality and smooth shopping experience.",
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

function normalizeProduct(product, sourceLabel, index, usedIds, usedSlugs) {
  const category = product?.category || sourceLabel || "Products";
  const name = product?.name || product?.title || "Premium Product";
  const brand = product?.brand || "SS Collection";
  const categorySegment = slugify(category);
  const nameSegment = slugify(name);
  const brandSegment = slugify(brand);
  const baseId = String(product?.id ?? "")
    .trim();
  const generatedId = baseId
    ? `${categorySegment}-${baseId}`
    : `${categorySegment}-${brandSegment}-${nameSegment}`;

  let id = generatedId || `${categorySegment}-${index + 1}`;
  if (usedIds.has(id)) {
    id = `${id}-${index + 1}`;
  }
  usedIds.add(id);

  let slug = slugify(product?.slug || `${categorySegment}-${brandSegment}-${nameSegment}`);
  if (!slug) {
    slug = `${categorySegment}-${index + 1}`;
  }
  if (usedSlugs.has(slug)) {
    slug = `${slug}-${index + 1}`;
  }
  usedSlugs.add(slug);

  const price = toNumber(product?.price ?? product?.mrp ?? product?.originalPrice ?? 0, 0);
  const mrp = toNumber(product?.mrp ?? product?.originalPrice ?? product?.price ?? price, price || 0);
  const discount = toNumber(
    product?.discount ?? (mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0),
    0,
  );

  return {
    ...product,
    id,
    routeId: id,
    slug,
    category,
    subCategory: product?.subCategory || category,
    gender: product?.gender || "Unisex",
    name,
    brand,
    description: product?.description || "Premium quality product from SS Collection.",
    price,
    mrp,
    originalPrice: toNumber(product?.originalPrice ?? mrp, mrp),
    discount,
    rating: toNumber(product?.rating, 4.5),
    reviewCount: toNumber(product?.reviewCount ?? product?.reviews?.length ?? 0, 1),
    stock: normalizeStock(product?.stock, product?.availability || "In Stock"),
    images: normalizeImages(product, name),
    sizes: normalizeSizes(product?.sizes),
    colors: normalizeColors(product?.colors),
    material: product?.material || "Premium fabric and finish.",
    specifications: normalizeSpecifications(product?.specifications),
    offers: normalizeOffers(product?.offers),
    delivery: normalizeDelivery(product?.delivery),
    seller: product?.seller || brand,
    returnPolicy: product?.returnPolicy || "Easy 7 days return policy.",
    warranty: product?.warranty || "Brand warranty.",
    tags: normalizeArray(product?.tags).length > 0 ? normalizeArray(product?.tags) : [category, product?.gender].filter(Boolean),
    highlights: normalizeArray(product?.highlights).length > 0 ? normalizeArray(product?.highlights) : [brand, product?.description || "Premium quality product"].filter(Boolean),
    similarProducts: normalizeArray(product?.similarProducts),
    ratingBreakdown: normalizeArray(product?.ratingBreakdown).length > 0
      ? product.ratingBreakdown.map((item) => ({
          stars: toNumber(item.stars || item.value || 0, 0),
          count: toNumber(item.count || 0, 0),
          barClass: item.barClass || "w-0",
        }))
      : [
          { stars: 5, count: 1, barClass: "w-[70%]" },
          { stars: 4, count: 1, barClass: "w-[24%]" },
          { stars: 3, count: 0, barClass: "w-[6%]" },
          { stars: 2, count: 0, barClass: "w-[0%]" },
          { stars: 1, count: 0, barClass: "w-[0%]" },
        ],
    reviews: normalizeReviews(product?.reviews, product?.rating),
  };
}

const catalogCollections = [
  { label: "Clothing", products: clothingProducts },
  { label: "Footwear", products: footwearProducts },
  { label: "Accessories", products: accessoriesProducts },
  { label: "Sports Equipment", products: sportsProducts },
  { label: "Featured", products: productsData },
  { label: "Details", products: detailSeedProducts },
];

const usedIds = new Set();
const usedSlugs = new Set();

export const allProducts = catalogCollections.flatMap(({ label, products }) =>
  normalizeArray(products).map((product, index) => normalizeProduct(product, label, index, usedIds, usedSlugs)),
);

export function getProductCatalogId(product) {
  if (!product) {
    return "";
  }

  const category = product.category || product.subCategory || "Products";
  const baseName = product.name || product.title || "product";
  const brand = product.brand || "ss-collection";
  return slugify(`${category}-${brand}-${baseName}`) || slugify(`${category}-${product.id || "product"}`);
}
