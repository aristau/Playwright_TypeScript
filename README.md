# Playwright_TypeScript
> Professional Playwright automation framework demonstrating the Page Object Model (POM) and maintainable automation practices.

---

## ⭐ Project Overview

This project automates the **SauceDemo e-commerce site** ([https://www.saucedemo.com](https://www.saucedemo.com)):

- Login workflows  
- Product browsing and sorting  
- Cart functionality  
- Checkout process  

---

## 🏗 Architecture & Design

**Framework Highlights:**

- Playwright
- Page Object Model (POM)  
- TypeScript
- Reusable helper functions  
- Fixture files
- test.step 

---

## 🚀 Running Tests Locally
**Setup:**
```
npm install
```
**Run All Tests (Chromium, Firefox, Webkit):**
```
npx playwright test
```
**Run A Specific Test File (Chromium, Firefox, Webkit):**
```
npx playwright test tests/checkout.spec.ts
```
**Run Tests in Headed (GUI) mode (Chromium):**
```
npx playwright test --ui
```
**View HTML Report:**
```
npx playwright show-report reports/playwright-report
```

---

## ✅ Test Coverage

**Authentication:** Valid/invalid login, locked out user, required field validation

**Inventory:** Products visibility, add/remove single & multiple products, sorting, cart persistence  

**Cart:** Cart content, remove items, continue shopping, checkout navigation

**Checkout:** Required fields, overview validation, totals, taxes, checkout confirmation  

---

## 📈 Continuous Integration


---







