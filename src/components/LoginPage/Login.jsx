import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user data in localStorage
      localStorage.setItem('ss_collection_user', JSON.stringify({
        email: formData.email,
        loginTime: new Date().toISOString()
      }));

      if (rememberMe) {
        localStorage.setItem('ss_collection_remember_email', formData.email);
      }

      setSuccessMessage('✓ Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-grow w-full flex flex-col items-center justify-center px-4 pt-[160px] md:pt-[140px] pb-12 font-sans bg-gradient-to-b from-neutral-50 to-white min-h-screen">
      
      {/* Main Authentication Container */}
      <div className="w-full max-w-[420px] space-y-6">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">Welcome Back</h1>
          <p className="text-sm text-neutral-600">Sign in to your SS Collection account</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white border border-neutral-200 rounded-xl p-6 md:p-8 shadow-sm">
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-800">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3.5 text-neutral-400 text-sm" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500 bg-red-50'
                      : 'border-neutral-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  ✕ {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-neutral-800">
                  Password
                </label>
                <Link 
                  to="/forgot-password"
                  className="text-xs text-blue-600 hover:text-blue-700 hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <FaLock className="absolute left-3 top-3.5 text-neutral-400 text-sm" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full pl-9 pr-10 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-500 bg-red-50'
                      : 'border-neutral-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  ✕ {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 border-neutral-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-neutral-600 cursor-pointer">
                Keep me signed in on this device
              </label>
            </div>

            {/* Submit Error Message */}
            {errors.submit && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {errors.submit}
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 flex items-center gap-2">
                <FaCheckCircle /> {successMessage}
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-400 text-white text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer shadow-sm"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-neutral-500">New to SS Collection?</span>
            </div>
          </div>

          {/* Create Account Button */}
          <Link 
            to="/create-account"
            className="w-full block py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-sm font-semibold rounded-lg transition-all duration-200 text-center border border-neutral-300"
          >
            Create Your Account
          </Link>
        </div>

        {/* Footer Links */}
        <div className="flex items-center justify-center gap-4 text-xs text-neutral-500 font-medium">
          <a href="#" className="hover:text-neutral-900 hover:underline">Terms of Use</a>
          <span>•</span>
          <a href="#" className="hover:text-neutral-900 hover:underline">Privacy Policy</a>
          <span>•</span>
          <a href="/contact" className="hover:text-neutral-900 hover:underline">Help Center</a>
        </div>
      </div>
    </div>
  );
}
