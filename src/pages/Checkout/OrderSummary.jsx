import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useCheckout } from "../../context/CheckoutContext";
import { getProductById } from "../../utils/getProductById";
import { formatIndianPrice } from "../../utils/priceCalculator";
import CheckoutStepper from "../../components/Checkout/CheckoutStepper";
import OrderItem from "../../components/Checkout/OrderItem";
import AddressCard from "../../components/Checkout/AddressCard";
import CouponCard from "../../components/Checkout/CouponCard";

function OrderSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();
  const { initializeCheckout, selectedProduct } = useCheckout();
  const [displayItems, setDisplayItems] = useState([]);

  useEffect(() => {
    if (location.state?.fromCartDemoBypass && location.state?.checkoutItemsList?.length > 0) {
      setDisplayItems(location.state.checkoutItemsList);
      const demoItem = location.state.checkoutItemsList[0];
      
      if (!selectedProduct || selectedProduct.id !== demoItem.id) {
        initializeCheckout(demoItem, location.state);
      }
      return;
    }

    const product = getProductById(productId);
    if (!product) {
      try {
        const savedCart = localStorage.getItem('ss_collection_persistent_cart');
        if (savedCart) {
          const items = JSON.parse(savedCart);
          if (items.length > 0) {
            setDisplayItems(items);
            initializeCheckout(items[0], location.state ?? {});
            return;
          }
        }
      } catch (e) {}
      navigate("/");
      return;
    }
    
    setDisplayItems([product]);
    if (!selectedProduct || selectedProduct.id !== product.id) {
      initializeCheckout(product, location.state ?? {});
    }
  }, [productId, selectedProduct, initializeCheckout, navigate, location.state]);

  // DYNAMIC FINANCIAL CALCULATION TO FIX PRICE MISMATCH
  const aggregateSubtotal = displayItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const aggregateMrpPrice = displayItems.reduce((acc, item) => {
    const baseMrp = item.mrp || item.originalPrice || item.price * 1.25;
    return acc + (baseMrp * (item.quantity || 1));
  }, 0);
  const finalDiscount = Math.max(0, aggregateMrpPrice - aggregateSubtotal);

  const handleContinue = () => {
    navigate(`/payment/${productId}`);
  };

  if (!selectedProduct) {
    return (
      <div className="grid min-h-[60vh] place-items-center bg-slate-50">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-slate-400" />
          <p className="mt-4 text-slate-600">Loading order summary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-28 md:pb-8">
      <CheckoutStepper currentStep={1} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <button
          type="button"
          onClick={() => navigate('/cart')}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-950 mb-4 md:mb-6 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </button>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          <div className="md:col-span-2 space-y-4 md:space-y-6">
            <AddressCard />
            
            <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400">Review Items</h3>
              {displayItems.map((item, index) => (
                <div key={item.id || index} className="flex gap-4 pb-4 border-b border-slate-100 last:border-b-0 last:pb-0 items-center">
                  <img src={item.image || item.images?.[0]} alt={item.name} className="w-16 h-16 object-cover rounded border border-slate-100 bg-slate-50" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Brand: {item.brand || 'SS Collection'}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-slate-600 font-semibold">
                      <span>Qty: {item.quantity || 1}</span>
                      <span>Price: ₹{item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <CouponCard />
          </div>

          {/* Right Column — FIXED Dynamic Price Details */}
          <div className="md:col-span-1">
            <div className="md:sticky md:top-36 space-y-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">Price Details</h3>
                <div className="space-y-2.5 text-xs font-medium text-slate-600">
                  <div className="flex justify-between">
                    <span>MRP (incl. of all taxes)</span>
                    <span className="text-slate-900">₹{Math.round(aggregateMrpPrice)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600">
                    <span>Discounts</span>
                    <span>- ₹{Math.round(finalDiscount)}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-3 text-sm font-black text-slate-900">
                    <span>Total Amount</span>
                    <span className="text-base text-blue-600">₹{Math.round(aggregateSubtotal)}</span>
                  </div>
                </div>
                <div className="bg-emerald-50 text-emerald-700 text-xs font-bold p-2 rounded text-center">
                  You'll save ₹{Math.round(finalDiscount)} on this order!
                </div>
              </div>

              <button
                type="button"
                onClick={handleContinue}
                className="w-full px-6 py-3.5 bg-slate-950 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors flex items-center justify-center cursor-pointer"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OrderSummary;