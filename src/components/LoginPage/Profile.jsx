import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaArrowLeft, FaSignOutAlt, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { getAuthData, clearAuthData } from "../../utils/authValidation";

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const data = getAuthData();
    if (!data) {
      navigate("/login");
      return;
    }
    setUserData(data);
    setEditData(data);
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      clearAuthData();
      navigate("/");
    }
  };

  const handleSaveProfile = () => {
    if (editData.fullName && editData.email && editData.phone) {
      localStorage.setItem("ss_collection_user", JSON.stringify(editData));
      setUserData(editData);
      setIsEditing(false);
      setSuccessMessage("✓ Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 pt-[160px] md:pt-[140px]">
      {/* Back Button */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6 transition"
        >
          <FaArrowLeft /> Back to Home
        </button>
      </div>

      {/* Profile Container */}
      <div className="max-w-2xl mx-auto px-4 pb-16">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">My Profile</h1>
              <p className="text-neutral-600">Manage your account information</p>
            </div>
            <div className="bg-blue-100 rounded-full p-4">
              <FaUser className="text-3xl text-blue-600" />
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <FaCheck className="text-green-600" />
              <span className="text-green-700 font-medium">{successMessage}</span>
            </div>
          )}

          {/* Profile Information */}
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                <FaUser className="inline mr-2 text-blue-600" />
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={editData?.fullName || ""}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-neutral-900 font-medium text-lg">{userData.fullName || "N/A"}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                <FaEnvelope className="inline mr-2 text-blue-600" />
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editData?.email || ""}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-neutral-900 font-medium text-lg">{userData.email || "N/A"}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                <FaPhone className="inline mr-2 text-blue-600" />
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={editData?.phone || ""}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-neutral-900 font-medium text-lg">{userData.phone || "N/A"}</p>
              )}
            </div>

            {/* Account Created Date */}
            {userData.registrationTime && (
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Account Created
                </label>
                <p className="text-neutral-600">
                  {new Date(userData.registrationTime).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-neutral-200">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition flex-1"
              >
                <FaEdit /> Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition flex-1"
                >
                  <FaCheck /> Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center justify-center gap-2 bg-neutral-300 hover:bg-neutral-400 text-neutral-900 font-semibold py-3 px-6 rounded-lg transition flex-1"
                >
                  <FaTimes /> Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* Logout Card */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-neutral-900 mb-1">Logout</h2>
              <p className="text-neutral-600 text-sm">Sign out from your account</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3">📋 Account Information</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>✓ Your profile information is stored securely</li>
            <li>✓ You can edit your details anytime</li>
            <li>✓ Your data is only used for order processing</li>
            <li>✓ Privacy policy applies to all data</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
