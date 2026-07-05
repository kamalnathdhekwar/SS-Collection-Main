import { memo, useState, useEffect } from "react";
import { useCheckout } from "../../context/CheckoutContext";
import { MapPin, Edit2, Check } from "lucide-react";

/**
 * Address Card Component
 * Displays and allows editing of delivery address
 */
const AddressCard = memo(() => {
  const { deliveryAddress, updateAddress } = useCheckout();
  const [isEditing, setIsEditing] = useState(false);
  const [editedAddress, setEditedAddress] = useState(deliveryAddress);

  useEffect(() => {
    if (!isEditing) {
      setEditedAddress(deliveryAddress);
    }
  }, [deliveryAddress, isEditing]);

  const handleSave = () => {
    updateAddress(editedAddress);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditedAddress((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-slate-950" />
            <h3 className="text-lg font-bold text-slate-950">Delivery Address</h3>
          </div>
          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-950 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Change
            </button>
          )}
        </div>

        {!isEditing ? (
          <div className="space-y-2 text-sm">
            <p className="font-semibold text-slate-950">{deliveryAddress.name}</p>
            <p className="text-slate-600">{deliveryAddress.phone}</p>
            <p className="text-slate-600">{deliveryAddress.address}</p>
            <p className="text-slate-600">
              {deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.zipCode}
            </p>
            <span className="inline-block mt-2 px-2 py-1 bg-slate-100 text-xs font-semibold text-slate-700 rounded">
              {deliveryAddress.type}
            </span>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              value={editedAddress.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={editedAddress.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950"
            />
            <textarea
              placeholder="Address"
              value={editedAddress.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950 resize-none"
              rows={2}
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="City"
                value={editedAddress.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950"
              />
              <input
                type="text"
                placeholder="State"
                value={editedAddress.state}
                onChange={(e) => handleChange("state", e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950"
              />
            </div>
            <input
              type="text"
              placeholder="ZIP Code"
              value={editedAddress.zipCode}
              onChange={(e) => handleChange("zipCode", e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-950"
            />

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-950 text-white font-semibold py-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <Check className="w-4 h-4" />
                Save Address
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditedAddress(deliveryAddress);
                  setIsEditing(false);
                }}
                className="flex-1 border border-slate-300 text-slate-950 font-semibold py-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
});

AddressCard.displayName = "AddressCard";

export default AddressCard;
