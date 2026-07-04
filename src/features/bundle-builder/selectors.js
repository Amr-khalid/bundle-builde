import bundleData from '../../data/bundleData.json';

/**
 * Build a flat lookup: variantId → { variant, product, step }
 * Used by selectors for O(1) lookups instead of nested loops.
 */
function buildVariantMap() {
  const map = {};
  for (const step of bundleData.steps) {
    for (const product of step.products) {
      for (const variant of product.variants) {
        map[variant.id] = { variant, product, step };
      }
    }
  }
  return map;
}

const variantMap = buildVariantMap();

/**
 * Get the count of distinct products with qty > 0 in a given step.
 */
export function getSelectedCount(cart, stepId) {
  const step = bundleData.steps.find((s) => s.id === stepId);
  if (!step) return 0;

  const productIds = new Set();
  for (const product of step.products) {
    for (const variant of product.variants) {
      if (cart[variant.id] > 0) {
        productIds.add(product.id);
      }
    }
  }
  return productIds.size;
}

/**
 * Get review items grouped by category.
 * Returns { Cameras: [...], Sensors: [...], Accessories: [...], Plan: [...] }
 * Each item: { variantId, variant, product, quantity }
 */
export function getGroupedItems(cart) {
  const groups = {};
  const categoryOrder = ['Cameras', 'Sensors', 'Accessories', 'Plan'];

  // Initialize all categories
  for (const cat of categoryOrder) {
    groups[cat] = [];
  }

  for (const [variantId, quantity] of Object.entries(cart)) {
    if (quantity <= 0) continue;
    const entry = variantMap[variantId];
    if (!entry) continue;

    const { variant, product } = entry;
    const category = product.category;

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push({
      variantId,
      variant,
      product,
      quantity,
    });
  }

  return groups;
}

/**
 * Get flat list of all review items with qty > 0.
 */
export function getReviewItems(cart) {
  const items = [];
  for (const [variantId, quantity] of Object.entries(cart)) {
    if (quantity <= 0) continue;
    const entry = variantMap[variantId];
    if (!entry) continue;

    items.push({
      variantId,
      variant: entry.variant,
      product: entry.product,
      quantity,
    });
  }
  return items;
}

/**
 * Calculate subtotal (sum of price × quantity for all cart items).
 */
export function getSubtotal(cart) {
  let total = 0;
  for (const [variantId, quantity] of Object.entries(cart)) {
    if (quantity <= 0) continue;
    const entry = variantMap[variantId];
    if (!entry) continue;
    total += entry.variant.price * quantity;
  }
  return total;
}

/**
 * Calculate compare-at total (sum of compareAtPrice × quantity).
 * Falls back to price if no compareAtPrice.
 */
export function getCompareTotal(cart) {
  let total = 0;
  for (const [variantId, quantity] of Object.entries(cart)) {
    if (quantity <= 0) continue;
    const entry = variantMap[variantId];
    if (!entry) continue;
    const comparePrice = entry.variant.compareAtPrice || entry.variant.price;
    total += comparePrice * quantity;
  }
  return total;
}

/**
 * Calculate savings (compare total - subtotal).
 */
export function getSavings(cart) {
  return getCompareTotal(cart) - getSubtotal(cart);
}

/**
 * Get shipping cost. Always free.
 */
export function getShipping() {
  return 0;
}

/**
 * Get checkout total (subtotal + shipping).
 */
export function getCheckoutTotal(cart) {
  return getSubtotal(cart) + getShipping();
}
