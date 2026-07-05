/**
 * Payment validation utilities
 */

export function validateUpiId(upiId) {
  if (!upiId?.trim()) return "Please enter a valid UPI ID";
  const upiRegex = /^[\w.-]+@[\w.-]+$/;
  if (!upiRegex.test(upiId.trim())) return "Invalid UPI ID format (e.g., name@upi)";
  return null;
}

export function luhnCheck(cardNumber) {
  const digits = cardNumber.replace(/\s/g, "");
  if (!/^\d{13,19}$/.test(digits)) return false;

  let sum = 0;
  let isEven = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let digit = parseInt(digits[i], 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
}

export function validateCardNumber(cardNumber) {
  const cleaned = cardNumber?.replace(/\s/g, "") ?? "";
  if (cleaned.length < 13) return "Please enter a valid card number";
  if (!luhnCheck(cleaned)) return "Invalid card number";
  return null;
}

export function validateExpiryDate(expiryDate) {
  if (!expiryDate || expiryDate.length < 5) return "Please enter expiry date (MM/YY)";

  const [monthStr, yearStr] = expiryDate.split("/");
  const month = parseInt(monthStr, 10);
  const year = parseInt(`20${yearStr}`, 10);

  if (month < 1 || month > 12) return "Invalid expiry month";

  const now = new Date();
  const expiry = new Date(year, month, 0);
  if (expiry < now) return "Card has expired";

  return null;
}

export function validateCvv(cvv) {
  if (!cvv || cvv.length < 3) return "Please enter a valid CVV";
  return null;
}

export function validateCardholderName(name) {
  if (!name?.trim() || name.trim().length < 2) return "Please enter cardholder name";
  return null;
}

export function validateCardDetails(cardDetails) {
  const errors = [
    validateCardNumber(cardDetails.cardNumber),
    validateCardholderName(cardDetails.cardholderName),
    validateExpiryDate(cardDetails.expiryDate),
    validateCvv(cardDetails.cvv),
  ].filter(Boolean);

  return errors[0] || null;
}

export function validateGiftCardCode(code) {
  if (!code?.trim() || code.trim().length < 8) {
    return "Please enter a valid gift card code";
  }
  return null;
}

export function getCardType(cardNumber) {
  const cleaned = cardNumber?.replace(/\s/g, "") ?? "";
  if (/^4/.test(cleaned)) return "Visa";
  if (/^5[1-5]/.test(cleaned)) return "Mastercard";
  if (/^3[47]/.test(cleaned)) return "Amex";
  if (/^6(?:011|5)/.test(cleaned)) return "Discover";
  return "Card";
}
