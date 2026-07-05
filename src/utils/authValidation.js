/**
 * Authentication Validation Utilities
 * Centralized validation functions for login and registration forms
 */

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    return { valid: false, error: 'Email is required' };
  }
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }
  return { valid: true, error: '' };
};

export const validatePassword = (password, minLength = 6) => {
  if (!password) {
    return { valid: false, error: 'Password is required' };
  }
  if (password.length < minLength) {
    return { valid: false, error: `Password must be at least ${minLength} characters` };
  }
  return { valid: true, error: '' };
};

export const validateStrongPassword = (password) => {
  if (!password) {
    return { valid: false, error: 'Password is required' };
  }
  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one uppercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one number' };
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one special character' };
  }
  return { valid: true, error: '' };
};

export const validatePhoneNumber = (phone) => {
  const digitsOnly = phone.replace(/\D/g, '');
  if (!digitsOnly) {
    return { valid: false, error: 'Phone number is required' };
  }
  if (digitsOnly.length !== 10) {
    return { valid: false, error: 'Please enter a valid 10-digit phone number' };
  }
  return { valid: true, error: '' };
};

export const validateName = (name, minLength = 3) => {
  if (!name.trim()) {
    return { valid: false, error: 'Name is required' };
  }
  if (name.trim().length < minLength) {
    return { valid: false, error: `Name must be at least ${minLength} characters` };
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return { valid: false, error: 'Name can only contain letters and spaces' };
  }
  return { valid: true, error: '' };
};

export const validatePasswordMatch = (password, confirmPassword) => {
  if (!confirmPassword) {
    return { valid: false, error: 'Please confirm your password' };
  }
  if (password !== confirmPassword) {
    return { valid: false, error: 'Passwords do not match' };
  }
  return { valid: true, error: '' };
};

// Password strength indicator
export const getPasswordStrength = (password) => {
  if (!password) return { level: 0, text: '', color: '' };
  
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const levels = [
    { level: 0, text: '', color: '' },
    { level: 1, text: 'Weak', color: 'text-red-600' },
    { level: 2, text: 'Fair', color: 'text-yellow-600' },
    { level: 3, text: 'Good', color: 'text-blue-600' },
    { level: 4, text: 'Strong', color: 'text-green-600' }
  ];
  
  return levels[Math.min(strength, 4)];
};

// Store auth data
export const storeAuthData = (userData) => {
  try {
    localStorage.setItem('ss_collection_user', JSON.stringify(userData));
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to store user data' };
  }
};

// Get auth data
export const getAuthData = () => {
  try {
    const data = localStorage.getItem('ss_collection_user');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    return null;
  }
};

// Clear auth data
export const clearAuthData = () => {
  try {
    localStorage.removeItem('ss_collection_user');
    localStorage.removeItem('ss_collection_remember_email');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to clear user data' };
  }
};

// Check if user is logged in
export const isUserLoggedIn = () => {
  return getAuthData() !== null;
};

// Get remembered email
export const getRememberedEmail = () => {
  try {
    return localStorage.getItem('ss_collection_remember_email') || '';
  } catch (error) {
    return '';
  }
};

// Format phone number for display
export const formatPhoneNumber = (phone) => {
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length === 10) {
    return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
  }
  return phone;
};
