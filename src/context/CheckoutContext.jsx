import { createContext, useContext, useState, useCallback, useMemo, useEffect, useRef } from "react";
import { calculatePriceSummary, validateCoupon } from "../utils/priceCalculator";
import { getProductById } from "../utils/getProductById";

const CheckoutContext = createContext(null);
const CHECKOUT_SESSION_KEY = "ss-checkout-session";

function readCheckoutSession() {
  try {
    const raw = sessionStorage.getItem(CHECKOUT_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCheckoutSession(payload) {
  try {
    sessionStorage.setItem(CHECKOUT_SESSION_KEY, JSON.stringify(payload));
  } catch {
    // ignore storage quota errors
  }
}

function clearCheckoutSession() {
  try {
    sessionStorage.removeItem(CHECKOUT_SESSION_KEY);
  } catch {
    // ignore
  }
}

const DEFAULT_ADDRESS = {
  name: "Kamlath Dhekvar",
  phone: "8010193203",
  address: "Nimba bus stop, Bus stop Nimba., Salekasa 441916",
  city: "Salekasa",
  state: "Chhattisgarh",
  zipCode: "441916",
  type: "HOME",
};

function getInitialCheckoutState() {
  const session = readCheckoutSession();
  const restoredProduct = session?.productId ? getProductById(session.productId) : null;

  return {
    selectedProduct: restoredProduct,
    quantity: session?.quantity ?? 1,
    selectedSize: session?.selectedSize ?? null,
    selectedColor: session?.selectedColor ?? null,
    deliveryAddress: session?.deliveryAddress ?? DEFAULT_ADDRESS,
    appliedCoupon: session?.appliedCoupon ?? null,
    couponCode: session?.appliedCoupon?.code ?? "",
    paymentMethod: session?.paymentMethod ?? "upi",
    orderId: session?.orderId ?? null,
  };
}

/**
 * Checkout Provider Component
 * Manages all checkout state and operations
 */
export const CheckoutProvider = ({ children }) => {
  const initialState = useMemo(() => getInitialCheckoutState(), []);

  // Product and order state
  const [selectedProduct, setSelectedProduct] = useState(initialState.selectedProduct);
  const [quantity, setQuantity] = useState(initialState.quantity);
  const [selectedSize, setSelectedSize] = useState(initialState.selectedSize);
  const [selectedColor, setSelectedColor] = useState(initialState.selectedColor);

  // Address state
  const [deliveryAddress, setDeliveryAddress] = useState(initialState.deliveryAddress);

  // Coupon state
  const [couponCode, setCouponCode] = useState(initialState.couponCode);
  const [appliedCoupon, setAppliedCoupon] = useState(initialState.appliedCoupon);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState(initialState.paymentMethod);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [upiId, setUpiId] = useState("");
  const [giftCardCode, setGiftCardCode] = useState("");

  // Order state
  const [orderId, setOrderId] = useState(initialState.orderId);
  const [orderLoading, setOrderLoading] = useState(false);
  const skipInitialPersist = useRef(true);

  useEffect(() => {
    if (skipInitialPersist.current) {
      skipInitialPersist.current = false;
      return;
    }

    if (!selectedProduct) {
      return;
    }

    writeCheckoutSession({
      productId: selectedProduct.id,
      quantity,
      selectedSize,
      selectedColor,
      deliveryAddress,
      appliedCoupon,
      paymentMethod,
      orderId,
    });
  }, [
    selectedProduct,
    quantity,
    selectedSize,
    selectedColor,
    deliveryAddress,
    appliedCoupon,
    paymentMethod,
    orderId,
  ]);

  /**
   * Initialize checkout with a product and optional selections from product page
   */
  const initializeCheckout = useCallback((product, options = {}) => {
    setSelectedProduct(product);
    setQuantity(options.quantity ?? 1);
    setSelectedSize(
      options.selectedSize ?? product.sizes?.find((s) => s.available)?.label ?? product.sizes?.[0]?.label ?? null,
    );
    setSelectedColor(options.selectedColor ?? product.colors?.[0]?.name ?? null);
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  }, []);

  /**
   * Update quantity with validation
   */
  const updateQuantity = useCallback((newQuantity) => {
    const stockMax = selectedProduct?.stock?.count ?? 10;
    const maxQuantity = Math.min(10, Math.max(1, stockMax));
    const qty = Math.max(1, Math.min(newQuantity, maxQuantity));
    setQuantity(qty);
  }, [selectedProduct]);

  /**
   * Apply coupon code
   */
  const applyCoupon = useCallback(async (code) => {
    if (!code.trim()) {
      setCouponError("Please enter a coupon code");
      return false;
    }

    setCouponLoading(true);
    setCouponError("");

    try {
      const result = await validateCoupon(code);

      if (result.valid) {
        setAppliedCoupon(result);
        setCouponCode(result.code);
        setCouponError("");
        return true;
      } else {
        setCouponError(result.message || "Invalid coupon code");
        setAppliedCoupon(null);
        return false;
      }
    } catch {
      setCouponError("Failed to validate coupon. Please try again.");
      return false;
    } finally {
      setCouponLoading(false);
    }
  }, []);

  /**
   * Remove applied coupon
   */
  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  }, []);

  /**
   * Update delivery address
   */
  const updateAddress = useCallback((newAddress) => {
    setDeliveryAddress((prev) => ({ ...prev, ...newAddress }));
  }, []);

  /**
   * Update payment method
   */
  const updatePaymentMethod = useCallback((method) => {
    setPaymentMethod(method);
  }, []);

  /**
   * Update card details
   */
  const updateCardDetails = useCallback((details) => {
    setCardDetails((prev) => ({ ...prev, ...details }));
  }, []);

  /**
   * Update UPI ID
   */
  const updateUpiId = useCallback((id) => {
    setUpiId(id);
  }, []);

  /**
   * Update gift card code
   */
  const updateGiftCardCode = useCallback((code) => {
    setGiftCardCode(code);
  }, []);

  /**
   * Calculate price summary based on current state
   */
  const priceSummary = useMemo(() => {
    if (!selectedProduct) return null;

    const baseSummary = calculatePriceSummary(selectedProduct, quantity, 0);

    let couponDiscount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.type === "percentage") {
        couponDiscount = Math.round((baseSummary.subtotal * appliedCoupon.discount) / 100);
      } else {
        couponDiscount = appliedCoupon.discount;
      }
    }

    return calculatePriceSummary(selectedProduct, quantity, couponDiscount);
  }, [selectedProduct, quantity, appliedCoupon]);

  /**
   * Process payment and create order
   */
  const processPayment = useCallback(async () => {
    if (!selectedProduct) {
      throw new Error("No product selected");
    }

    if (!priceSummary) {
      throw new Error("Unable to calculate order total");
    }

    setOrderLoading(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate order ID
      const newOrderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setOrderId(newOrderId);

      return {
        success: true,
        orderId: newOrderId,
        product: selectedProduct,
        quantity,
        price: priceSummary.grandTotal,
      };
    } catch (cause) {
      throw new Error("Payment failed. Please try again.", { cause });
    } finally {
      setOrderLoading(false);
    }
  }, [selectedProduct, quantity, priceSummary]);

  /**
   * Get order summary
   */
  const getOrderSummary = useCallback(() => {
    return {
      product: selectedProduct,
      quantity,
      selectedSize,
      selectedColor,
      address: deliveryAddress,
      paymentMethod,
      price: priceSummary,
    };
  }, [selectedProduct, quantity, selectedSize, selectedColor, deliveryAddress, paymentMethod, priceSummary]);

  /**
   * Reset checkout state
   */
  const resetCheckout = useCallback(() => {
    setSelectedProduct(null);
    setQuantity(1);
    setSelectedSize(null);
    setSelectedColor(null);
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
    setPaymentMethod("upi");
    setDeliveryAddress(DEFAULT_ADDRESS);
    setCardDetails({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
    });
    setUpiId("");
    setGiftCardCode("");
    setOrderId(null);
    clearCheckoutSession();
  }, []);

  const value = {
    // Product state
    selectedProduct,
    quantity,
    selectedSize,
    selectedColor,
    setSelectedSize,
    setSelectedColor,
    updateQuantity,
    initializeCheckout,

    // Address state
    deliveryAddress,
    updateAddress,

    // Coupon state
    couponCode,
    appliedCoupon,
    couponLoading,
    couponError,
    applyCoupon,
    removeCoupon,

    // Payment state
    paymentMethod,
    cardDetails,
    upiId,
    giftCardCode,
    updatePaymentMethod,
    updateCardDetails,
    updateUpiId,
    updateGiftCardCode,

    // Order state
    orderId,
    orderLoading,
    processPayment,

    // Utilities
    priceSummary,
    getOrderSummary,
    resetCheckout,
  };

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
};

/**
 * Hook to use checkout context
 */
export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }
  return context;
};
