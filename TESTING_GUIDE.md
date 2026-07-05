# 🧪 LOGIN & CREATE ACCOUNT PAGES - TESTING GUIDE

## Quick Start Testing

### 1. Navigate to Pages

**Login Page:**
- URL: `http://localhost:5173/login` (or your dev server)
- Button: Click "Sign In" in header

**Create Account Page:**
- URL: `http://localhost:5173/create-account`
- Button: Click "Sign Up" in header

---

## 🧬 Login Page Test Cases

### ✅ Valid Login
1. Email: `user@example.com`
2. Password: `password123`
3. Check "Keep me signed in"
4. Click "Sign In"
5. ✓ Should show success message
6. ✓ Should redirect to homepage

### ❌ Invalid Email

**Test Case 1: Empty Email**
1. Leave email empty
2. Click "Sign In"
3. ✓ Should show error: "Email is required"

**Test Case 2: Invalid Format**
1. Email: `invalidemail`
2. Click "Sign In"
3. ✓ Should show error: "Please enter a valid email address"

**Test Case 3: Missing Domain**
1. Email: `user@example`
2. Click "Sign In"
3. ✓ Should show error

### ❌ Invalid Password

**Test Case 1: Empty Password**
1. Enter valid email
2. Leave password empty
3. Click "Sign In"
4. ✓ Should show error: "Password is required"

**Test Case 2: Too Short**
1. Password: `12345`
2. Click "Sign In"
3. ✓ Should show error: "Password must be at least 6 characters"

### 🔐 Password Visibility

**Test Case 1: Show Password**
1. Click eye icon in password field
2. ✓ Password should be visible as text

**Test Case 2: Hide Password**
1. Click eye icon again
2. ✓ Password should be hidden with dots

### 💾 Remember Me

**Test Case 1: With Remember Me**
1. Check "Keep me signed in"
2. Enter email and password
3. ✓ Reload page → email should still be there

**Test Case 2: Without Remember Me**
1. Uncheck "Keep me signed in"
2. Enter email and password
3. ✓ Page reload → email field should be empty

### 📱 Responsive Design

**Mobile View (< 768px):**
- Resize browser to mobile width
- ✓ Sign In button visible
- ✓ Form is full width
- ✓ Buttons are touch-friendly

**Desktop View (≥ 768px):**
- Resize browser to desktop width
- ✓ "Sign Up" button visible in header
- ✓ Form is centered
- ✓ All elements properly spaced

---

## 📝 Create Account Page Test Cases

### ✅ Valid Registration

1. **Full Name**: `John Doe`
2. **Email**: `john.doe@example.com`
3. **Phone**: `9876543210`
4. **Password**: `SecurePass123!`
5. **Confirm**: `SecurePass123!`
6. **Terms**: ✓ Checked
7. **Newsletter**: ✓ (Optional)
8. Click "Create Account"
9. ✓ Should show success message
10. ✓ Should redirect to homepage

### ❌ Invalid Full Name

**Test Case 1: Empty Name**
1. Leave name empty
2. Click "Create Account"
3. ✓ Should show error: "Full name is required"

**Test Case 2: Too Short**
1. Name: `AB`
2. Click "Create Account"
3. ✓ Should show error: "Full name must be at least 3 characters"

**Test Case 3: Invalid Characters**
1. Name: `John123`
2. Click "Create Account"
3. ✓ Should show error: "Name can only contain letters and spaces"

### ❌ Invalid Email

**Test Case 1: Empty Email**
1. Leave email empty
2. Click "Create Account"
3. ✓ Should show error: "Email is required"

**Test Case 2: Invalid Format**
1. Email: `invalidemail`
2. Click "Create Account"
3. ✓ Should show error: "Please enter a valid email address"

### ❌ Invalid Phone Number

**Test Case 1: Empty Phone**
1. Leave phone empty
2. Click "Create Account"
3. ✓ Should show error: "Phone number is required"

**Test Case 2: Too Short**
1. Phone: `987654321` (9 digits)
2. Click "Create Account"
3. ✓ Should show error: "Please enter a valid 10-digit phone number"

**Test Case 3: Too Long**
1. Phone: `98765432100` (11 digits)
2. ✓ Should automatically trim to 10 digits

**Test Case 4: Non-Numeric**
1. Phone: `(987) 654-3210`
2. ✓ Should auto-format or strip non-numeric characters

### 🔐 Password Validation

**Test Case 1: Empty Password**
1. Leave password empty
2. Click "Create Account"
3. ✓ Should show error: "Password is required"

**Test Case 2: Too Short**
1. Password: `Pass12`
2. Click "Create Account"
3. ✓ Should show error: "Password must be at least 8 characters"

**Test Case 3: No Uppercase**
1. Password: `password123`
2. Click "Create Account"
3. ✓ Should show error: "Password must contain at least one uppercase letter"

**Test Case 4: No Number**
1. Password: `PassWord!`
2. Click "Create Account"
3. ✓ Should show error

### 🔄 Password Strength Indicator

Watch the strength meter as you type:

**Weak (Red):**
- Type: `pass`
- ✓ Shows "Weak" in red

**Fair (Yellow):**
- Type: `Password1`
- ✓ Shows "Fair" in yellow

**Good (Blue):**
- Type: `Password12`
- ✓ Shows "Good" in blue

**Strong (Green):**
- Type: `SecurePass123!`
- ✓ Shows "Strong" in green

### 🔐 Confirm Password

**Test Case 1: Match**
1. Password: `SecurePass123!`
2. Confirm: `SecurePass123!`
3. ✓ Shows green checkmark: "Passwords match"

**Test Case 2: Mismatch**
1. Password: `SecurePass123!`
2. Confirm: `DifferentPass!`
3. Click "Create Account"
4. ✓ Should show error: "Passwords do not match"

**Test Case 3: Empty Confirm**
1. Password: `SecurePass123!`
2. Leave confirm empty
3. Click "Create Account"
4. ✓ Should show error: "Please confirm your password"

### 📋 Terms & Conditions

**Test Case 1: Terms Unchecked**
1. Fill all fields correctly
2. Leave "I agree to..." unchecked
3. Click "Create Account"
4. ✓ Should show error: "You must agree to the Terms & Conditions"

**Test Case 2: Terms Checked**
1. Fill all fields correctly
2. Check "I agree to..."
3. Click "Create Account"
4. ✓ Form should be submittable

### 📰 Newsletter Option

**Test Case 1: With Newsletter**
1. Check "Send me exclusive offers..."
2. Complete registration
3. ✓ Should store preference in localStorage

**Test Case 2: Without Newsletter**
1. Leave unchecked
2. Complete registration
3. ✓ Should work fine

### 👁️ Password Visibility

**Test Case 1: Show Password**
1. Click eye icon in password field
2. ✓ Password should be visible

**Test Case 2: Show Confirm Password**
1. Click eye icon in confirm field
2. ✓ Confirm password should be visible

**Test Case 3: Hide Both**
1. Click both eye icons
2. ✓ Both passwords should be hidden

### 📱 Responsive Design

**Mobile View:**
- Resize to mobile width
- ✓ Form is full width
- ✓ All inputs are clearly visible
- ✓ Buttons are touch-friendly
- ✓ Text is readable

**Tablet View:**
- Resize to tablet width (768px - 1024px)
- ✓ Form displays well
- ✓ Proper spacing
- ✓ All elements accessible

**Desktop View:**
- Full width display
- ✓ Form is centered
- ✓ Maximum width constraint
- ✓ Optimal spacing

### ⌨️ Keyboard Navigation

**Test Case 1: Tab Navigation**
1. Press Tab repeatedly
2. ✓ Should cycle through all form fields
3. ✓ Should highlight active field
4. ✓ Should reach buttons

**Test Case 2: Enter to Submit**
1. Fill form completely
2. Press Enter on any field
3. ✓ Form should submit

**Test Case 3: Checkbox Tab**
1. Tab to "I agree to..."
2. ✓ Should be focusable
3. Press Space
4. ✓ Should toggle checkbox

---

## 🔗 Navigation Testing

### Header Links

**Sign In Button:**
1. Click "Sign In" in header
2. ✓ Should navigate to `/login`

**Sign Up Button:**
1. Click "Sign Up" in header
2. ✓ Should navigate to `/create-account`

**Create Account Link:**
1. On login page, click "Create Your Account"
2. ✓ Should navigate to `/create-account`

**Sign In Link:**
1. On create account page, click "Sign In to Your Account"
2. ✓ Should navigate to `/login`

---

## 💾 LocalStorage Testing

### Login Page
1. Enter email and check "Remember me"
2. Open DevTools → Application → LocalStorage
3. ✓ Should see `ss_collection_remember_email`
4. ✓ Should see `ss_collection_user`

### Create Account Page
1. Complete registration
2. Open DevTools → Application → LocalStorage
3. ✓ Should see `ss_collection_user` with full name, email, phone
4. ✓ If opted in, should see `ss_collection_newsletter: true`

---

## 🎨 Visual Testing

### Colors & Styling

**Normal State:**
- ✓ Inputs have neutral borders
- ✓ Labels are clear and bold
- ✓ Placeholder text is visible

**Focus State:**
- ✓ Inputs have blue ring (focus:ring-blue-500)
- ✓ Clear visual indication

**Error State:**
- ✓ Inputs have red border
- ✓ Background is light red (bg-red-50)
- ✓ Error message is red
- ✓ Has error icon

**Success State:**
- ✓ Green success message
- ✓ Has success icon
- ✓ Disappears after redirect

### Loading State
- ✓ Button shows spinner
- ✓ Button is disabled
- ✓ Button text changes to "Signing in..." or "Creating Account..."

---

## 🧠 Edge Cases

### Special Characters

**Email:**
1. Email: `user+test@example.com`
2. ✓ Should be valid

**Name:**
1. Name: `Mary Jane Smith`
2. ✓ Should accept multiple spaces

**Password:**
1. Password: `P@ssw0rd!#$%`
2. ✓ Should accept special characters

### Browser Compatibility

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Chrome
- [ ] Mobile Safari

### Internet Connection

**Test Case 1: Slow Network**
1. Open DevTools → Network → Slow 3G
2. Submit form
3. ✓ Loading state should show
4. ✓ Should eventually complete

**Test Case 2: Offline**
1. Go offline
2. Submit form
3. ✓ Should eventually show error
4. ✓ Should not crash

---

## 📊 Performance Testing

### Load Time
- ✓ Pages should load in < 1s
- ✓ No console errors
- ✓ No warnings

### Form Submission
- ✓ Validation is instant
- ✓ Loading state is smooth
- ✓ Redirect is smooth

---

## ✔️ Final Checklist

- [ ] All form validations working
- [ ] Error messages displaying correctly
- [ ] Success messages appearing
- [ ] Redirect working properly
- [ ] Mobile responsive
- [ ] Desktop optimized
- [ ] Keyboard navigation working
- [ ] LocalStorage integration working
- [ ] Eye toggle for passwords working
- [ ] Password strength indicator working
- [ ] All buttons clickable
- [ ] No console errors
- [ ] Links navigating correctly
- [ ] Loading states smooth
- [ ] No broken styling

---

## 🐛 Bug Report Template

If you find an issue:

```
**Title:** Brief description

**Steps to Reproduce:**
1. Go to [page]
2. Enter [data]
3. Click [button]

**Expected Result:**
[What should happen]

**Actual Result:**
[What actually happened]

**Browser:** [Chrome/Firefox/etc] Version [X]
**OS:** [Windows/Mac/Linux]
**Device:** [Desktop/Mobile/Tablet]

**Screenshots:** [If applicable]
```

---

## 🎉 Testing Complete!

If all test cases pass, your login and create account pages are production-ready!

**Enjoy! 🚀**
