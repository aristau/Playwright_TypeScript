[![Playwright Tests](https://github.com/aristau/Playwright_TypeScript/actions/workflows/playwright.yml/badge.svg)](https://github.com/aristau/Playwright_TypeScript/actions)
[![Live Reports](https://img.shields.io/badge/Live%20Reports-View%20Reports-blue)](https://aristau.github.io/Playwright_TypeScript/)

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
- CI/CD integration with Docker Image & GitHub Actions/Pages
- Detailed test reporting with test.step 

---

## 🚀 Running Tests Locally
**Setup:**
```
npm install
```
**Run All Tests (Chromium, Firefox, Webkit):**
```
npm run test
```
**Run A Specific Test File (Chromium, Firefox, Webkit):**
```
npm run test tests/checkout.spec.ts
```
**Run Tests in a Specific Browser:**
```
npm run test:chromium
```
```
npm run test:firefox
```
```
npm run test:webkit
```
**Run Tests in UI mode (Chromium):**
```
npm run test:ui
```
**View HTML Test Report:**
```
npm run report
```

---

## ✅ Test Coverage

**Authentication:** Valid/invalid login, locked out user, required field validation

**Inventory:** Products visibility, add/remove single & multiple products, sorting, cart persistence  

**Cart:** Cart content, remove items, continue shopping, checkout navigation

**Checkout:** Required fields, overview validation, totals, taxes, checkout confirmation  

---

## 📈 Continuous Integration

**Automated Test Runs:** The pipeline executes all tests on every main branch push in 3 browsers (Chromium, Firefox, and Webkit).
Then, the pipeline generates reports of the test results (1 report per browser), and publishes the reports to GitHub Pages.

**Success Artifacts:** Test result report artifacts uploaded **on every run.**

**CI Badge (At top of Readme):** Provides clear visibility into test results.

**Report Badge (At top of Readme):** Shows live reports of test results on GitHub Pages.

---








