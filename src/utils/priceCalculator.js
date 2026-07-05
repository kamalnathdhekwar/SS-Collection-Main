/**
 * Price calculation utilities for checkout flow
 * Handles all pricing logic: discounts, taxes, fees, and totals
 */

// GST rate (Goods and Services Tax in India)
const GST_RATE = 0.18;
const PLATFORM_FEE_RATE = 0.02; // 2% platform fee
const FREE_SHIPPING_THRESHOLD = 500; // Free shipping above ₹500
const SHIPPING_COST = 40;

export const calculateDiscount = (mrp, discountPercent) => {
  if (!mrp || !discountPercent) return 0;
  return Math.round((mrp * discountPercent) / 100);
};

export const calculatePlatformFee = (subtotal) => {
  if (!subtotal) return 0;
  return Math.round(subtotal * PLATFORM_FEE_RATE);
};

export const calculateGST = (subtotal) => {
  if (!subtotal) return 0;
  return Math.round(subtotal * GST_RATE);
};

export const calculateShipping = (subtotal) => {
  if (!subtotal) return SHIPPING_COST;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
};

export const calculateCouponDiscount = (subtotal, couponValue, isFlatDiscount = true) => {
  if (!couponValue) return 0;
  if (isFlatDiscount) {
    return Math.min(couponValue, subtotal);
  }
  return Math.round((subtotal * couponValue) / 100);
};

export const calculateTotalSavings = (mrpTotal, discountAmount, couponDiscount) => {
  return (discountAmount || 0) + (couponDiscount || 0);
};

export const calculatePriceSummary = (product, quantity, couponDiscount = 0) => {
  if (!product || !quantity) {
    return {
      mrp: 0,
      discount: 0,
      subtotal: 0,
      platformFee: 0,
      shipping: 0,
      gst: 0,
      couponDiscount: 0,
      grandTotal: 0,
      totalSavings: 0,
      estimatedDelivery: null,
    };
  }

  // FIXED: Standardizes mapping using safe fallback parameters to prevent structural key crash
  const actualMrp = product.mrp || product.originalPrice || product.price;
  const mrpTotal = actualMrp * quantity;
  const discountAmount = calculateDiscount(actualMrp, product.discount) * quantity;
  const subtotal = mrpTotal - discountAmount;

  const platformFee = calculatePlatformFee(subtotal);
  const shipping = calculateShipping(subtotal);
  const gst = calculateGST(subtotal);

  const validatedCouponDiscount = Math.min(couponDiscount, subtotal);
  const grandTotal = subtotal + platformFee + shipping + gst - validatedCouponDiscount;
  const totalSavings = discountAmount + validatedCouponDiscount;
  const estimatedDelivery = getEstimatedDeliveryDate();

  return {
    mrp: mrpTotal,
    discount: discountAmount,
    subtotal,
    platformFee,
    shipping,
    gst,
    couponDiscount: validatedCouponDiscount,
    grandTotal: Math.max(0, grandTotal),
    totalSavings,
    estimatedDelivery,
  };
};

export const getEstimatedDeliveryDate = () => {
  const today = new Date();
  const minDays = 5;
  const maxDays = 7;

  const minDelivery = new Date(today);
  minDelivery.setDate(minDelivery.getDate() + minDays);

  const maxDelivery = new Date(today);
  maxDelivery.setDate(maxDelivery.getDate() + maxDays);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return {
    min: formatDate(minDelivery),
    max: formatDate(maxDelivery),
    minDate: minDelivery,
    maxDate: maxDelivery,
  };
};

export const formatIndianPrice = (price) => {
  if (!price && price !== 0) return "₹0";
  return `₹${Math.round(price).toLocaleString("en-IN")}`;
};

export const validateCoupon = async (couponCode) => {
  const validCoupons = {
    SAVE10: { discount: 10, type: "percentage", maxUses: 100 },
    SAVE50: { discount: 50, type: "flat", maxUses: 50 },
    FIRST100: { discount: 100, type: "flat", maxUses: 1000 },
    NEW15: { discount: 15, type: "percentage", maxUses: 500 },
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      const coupon = validCoupons[couponCode?.toUpperCase()];
      if (coupon) {
        resolve({
          valid: true,
          code: couponCode.toUpperCase(),
          ...coupon,
        });
      } else {
        resolve({
          valid: false,
          message: "Invalid coupon code",
        });
      }
    }, 500);
  });
};