import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function CreateAccount() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeNews, setAgreeNews] = useState(false);

  // Password strength validation
  const getPasswordStrength = (password) => {
    if (!password) return { level: 0, text: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
      { level: 1, text: 'Weak', color: 'text-red-600' },
      { level: 2, text: 'Fair', color: 'text-yellow-600' },
      { level: 3, text: 'Good', color: 'text-blue-600' },
      { level: 4, text: 'Strong', color: 'text-green-600' }
    ];
    
    return levels[Math.min(strength, 3)];
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreeTerms) {
      newErrors.terms = 'You must agree to the Terms & Conditions';
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

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({
      ...prev,
      phone: value
    }));
    if (errors.phone) {
      setErrors(prev => ({
        ...prev,
        phone: ''
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
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        registrationTime: new Date().toISOString()
      }));

      if (agreeNews) {
        localStorage.setItem('ss_collection_newsletter', 'true');
      }

      setSuccessMessage('✓ Account created successfully! Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="flex-grow w-full flex flex-col items-center justify-center px-4 pt-[160px] md:pt-[140px] pb-12 font-sans bg-gradient-to-b from-neutral-50 to-white min-h-screen">
      
      {/* Main Registration Container */}
      <div className="w-full max-w-[520px] space-y-6">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">Create Account</h1>
          <p className="text-sm text-neutral-600">Join SS Collection and start shopping today</p>
        </div>

        {/* Registration Form Card */}
        <div className="bg-white border border-neutral-200 rounded-xl p-6 md:p-8 shadow-sm">
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Full Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-800">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3.5 text-neutral-400 text-sm" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.fullName
                      ? 'border-red-500 focus:ring-red-500 bg-red-50'
                      : 'border-neutral-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <FaExclamationCircle size={12} /> {errors.fullName}
                </p>
              )}
            </div>

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
                  <FaExclamationCircle size={12} /> {errors.email}
                </p>
              )}
            </div>

            {/* Phone Number Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-800">
                Phone Number
              </label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-3.5 text-neutral-400 text-sm" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="9876543210"
                  maxLength="10"
                  className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.phone
                      ? 'border-red-500 focus:ring-red-500 bg-red-50'
                      : 'border-neutral-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <FaExclamationCircle size={12} /> {errors.phone}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-800">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3.5 text-neutral-400 text-sm" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className={`w-full pl-9 pr-10 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-500 bg-red-50'
                      : 'border-neutral-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-neutral-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all ${
                          passwordStrength.level === 1 ? 'w-1/4 bg-red-500' :
                          passwordStrength.level === 2 ? 'w-2/4 bg-yellow-500' :
                          passwordStrength.level === 3 ? 'w-3/4 bg-blue-500' :
                          'w-full bg-green-500'
                        }`}
                      />
                    </div>
                    <span className={`text-xs font-semibold ${passwordStrength.color}`}>
                      {passwordStrength.text}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500">
                    Password requirements: At least 8 characters, 1 uppercase letter, 1 number
                  </p>
                </div>
              )}

              {errors.password && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <FaExclamationCircle size={12} /> {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-800">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3.5 text-neutral-400 text-sm" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={`w-full pl-9 pr-10 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.confirmPassword
                      ? 'border-red-500 focus:ring-red-500 bg-red-50'
                      : 'border-neutral-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3.5 text-neutral-400 hover:text-neutral-600"
                >
                  {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <FaCheckCircle size={12} /> Passwords match
                </p>
              )}
              {errors.confirmPassword && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <FaExclamationCircle size={12} /> {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    if (e.target.checked && errors.terms) {
                      setErrors(prev => ({
                        ...prev,
                        terms: ''
                      }));
                    }
                  }}
                  className="w-4 h-4 border-neutral-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer mt-0.5"
                />
                <label htmlFor="agreeTerms" className="ml-2 text-sm text-neutral-600 cursor-pointer">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:underline font-medium">
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:underline font-medium">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.terms && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <FaExclamationCircle size={12} /> {errors.terms}
                </p>
              )}
            </div>

            {/* Newsletter Checkbox */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreeNews"
                checked={agreeNews}
                onChange={(e) => setAgreeNews(e.target.checked)}
                className="w-4 h-4 border-neutral-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer mt-0.5"
              />
              <label htmlFor="agreeNews" className="ml-2 text-sm text-neutral-600 cursor-pointer">
                Send me exclusive offers and updates via email
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

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-400 text-white text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer shadow-sm"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-neutral-500">Already have an account?</span>
            </div>
          </div>

          {/* Sign In Link */}
          <Link 
            to="/login"
            className="w-full block py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-sm font-semibold rounded-lg transition-all duration-200 text-center border border-neutral-300"
          >
            Sign In to Your Account
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
