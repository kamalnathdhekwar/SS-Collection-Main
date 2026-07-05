export function getProductRoute(product) {
  if (!product) {
    return "/products";
  }

  const routeId = product.routeId || product.id || product.slug;
  if (!routeId) {
    return "/products";
  }

  return `/product/${encodeURIComponent(String(routeId))}`;
}

export function handleProductNavigation(navigate, product, event) {
  if (!navigate || !product) {
    return;
  }

  if (event?.defaultPrevented) {
    return;
  }

  navigate(getProductRoute(product));
}
