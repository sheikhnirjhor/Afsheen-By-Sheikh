# 19 - Test Driven Development (TDD)

## 1. Purpose

This document outlines the testing strategy and test cases for the Afsheen by Sheikh e-commerce platform.

## 2. TDD Overview

```
┌──────────┐    ┌──────────┐    ┌──────────┐
│   RED    │───>│  GREEN   │───>│ REFACTOR │
│ Write a  │    │ Write    │    │ Clean up │
│ failing  │    │ minimal  │    │ the code │
│ test     │    │ code to  │    │          │
│          │    │ pass     │    │          │
└──────────┘    └──────────┘    └──────────┘
```

## 3. Test Strategy

### 3.1 Testing Pyramid

```
        ╱╲
       ╱  ╲        E2E Tests (few)
      ╱    ╲       - Full user flows
     ╱──────╲
    ╱        ╲     Integration Tests (some)
   ╱          ╲    - API + Database
  ╱────────────╲
 ╱              ╲   Unit Tests (many)
╱                ╲  - Functions, components, models
╱──────────────────╲
```

### 3.2 Test Types & Tools

| Test Type | Scope | Tool | Priority |
|-----------|-------|------|----------|
| Unit Tests | Functions/components | Jest + React Testing Library | High |
| Integration Tests | API endpoints | pytest + httpx | High |
| E2E Tests | Full user flows | Cypress / Playwright | Medium |
| Linting | Code quality | ESLint (JS), Ruff (Python) | High |
| Build Check | Bundle integrity | `npm run build` | High |

## 4. Backend Test Cases

### 4.1 Product Endpoints

| Test ID | Test Case | Input | Expected Result |
|---------|-----------|-------|-----------------|
| BT-PROD-01 | Get all products | GET /api/products | 200, 24 products |
| BT-PROD-02 | Get products by category | ?category=Bridal Outfit | 200, filtered products |
| BT-PROD-03 | Get single product | GET /api/products/p1 | 200, product object |
| BT-PROD-04 | Get non-existent product | GET /api/products/p999 | 404 "Product not found" |
| BT-PROD-05 | Create product | POST /api/products | 201, product created |
| BT-PROD-06 | Update product | PUT /api/products/p1 | 200, product updated |
| BT-PROD-07 | Delete product | DELETE /api/products/p1 | 200, product deleted |

### 4.2 Order Endpoints

| Test ID | Test Case | Input | Expected Result |
|---------|-----------|-------|-----------------|
| BT-ORD-01 | Create order | POST /api/orders | 201, order created |
| BT-ORD-02 | Get all orders | GET /api/orders | 200, orders array |
| BT-ORD-03 | Get orders by email | ?email=ayesha@example.com | 200, filtered orders |
| BT-ORD-04 | Update order status | PUT /api/orders/ORD-12345/status | 200, status updated |

### 4.3 Auth Endpoints

| Test ID | Test Case | Input | Expected Result |
|---------|-----------|-------|-----------------|
| BT-AUTH-01 | Register new user | POST /api/auth/register | 201, user created |
| BT-AUTH-02 | Register duplicate email | Same email | 400 "Email already registered" |
| BT-AUTH-03 | Login valid credentials | POST /api/auth/login | 200, user object |
| BT-AUTH-04 | Login invalid credentials | Wrong password | 401 "Invalid credentials" |

### 4.4 Other Endpoints

| Test ID | Test Case | Input | Expected Result |
|---------|-----------|-------|-----------------|
| BT-REV-01 | Get reviews for product | GET /api/reviews/p1 | 200, reviews array |
| BT-REV-02 | Create review | POST /api/reviews | 201, review created |
| BT-CON-01 | Submit contact form | POST /api/contact | 200 "Message received" |
| BT-SEED-01 | Seed data | GET /api/seed | 200 "Data seeded" |

## 5. Frontend Test Cases

### 5.1 Component Tests

| Test ID | Test Case | Expected Result |
|---------|-----------|-----------------|
| FT-HEADER-01 | Header renders logo and icons | Logo + Search + Heart + Cart + Account visible |
| FT-HEADER-02 | Cart badge shows correct count | Badge matches cart items total |
| FT-HEADER-03 | Mini-cart hover dropdown shows items | Shows last 4 items + subtotal |
| FT-PROD-01 | Product card shows name, price, image, discount | All fields rendered with correct discount % |
| FT-PROD-02 | Category filter works | Only matching products shown |
| FT-PROD-03 | Sold count and progress bar display | Progress bar width = (sold/stock)*100 |
| FT-FLASH-01 | Flash sale countdown timer displays | Hours:Minutes:Seconds counting down |
| FT-CHAT-01 | Chat widget bubble visible | Floating bubble appears for customers |
| FT-CHAT-02 | Chat window opens on bubble click | Message history and input visible |

### 5.2 Context Tests

| Test ID | Test Case | Expected Result |
|---------|-----------|-----------------|
| FT-CTX-01 | Login sets session | Session object populated |
| FT-CTX-02 | Logout clears session | Session = null |
| FT-CTX-03 | Cart persists in localStorage | Items survive page refresh (as_cart) |
| FT-CTX-04 | Place order clears cart | Cart empty after order |
| FT-CTX-05 | GOLDEN15 coupon validation | Returns true, 15% discount applied |
| FT-CTX-06 | WELCOME10 coupon validation | Returns true, 10% discount applied |
| FT-CTX-07 | BRIDAL5000 coupon validation | Returns true if total >= ৳15,000, ৳5,000 off |
| FT-CTX-08 | FESTIVE20 coupon validation | Returns true, 20% discount applied |
| FT-CTX-09 | Invalid coupon validation | Returns false, error notification |
| FT-CTX-10 | Wishlist toggle | Product ID added/removed from as_wishlist |
| FT-CTX-11 | Chat message send | Message appended to as_chat with timestamp |

### 5.3 CSS Cascade Layers Tests

| Test ID | Test Case | Expected Result |
|---------|-----------|-----------------|
| FT-CSS-01 | Build succeeds without CSS errors | `npm run build` exits with 0 errors |
| FT-CSS-02 | Tailwind utilities not overridden | mx-auto, max-w-*, px-* all take effect |
| FT-CSS-03 | Custom base styles don't break layout | * reset wrapped in @layer base |

## 6. Test Execution

```bash
# Frontend build check (primary quality gate)
cd frontend && npm run build

# Frontend lint
cd frontend && npm run lint

# Backend
cd backend && pytest
cd backend && python -m py_compile main.py
cd backend && python -m py_compile config.py
```

## 7. Quality Gates

| Gate | Criteria | Blocking |
|------|----------|----------|
| Backend starts | No import/syntax errors | Yes |
| All API endpoints respond | 200/201/400/401/404 | Yes |
| Frontend builds | `npm run build` succeeds (0 errors) | Yes |
| Lint check | 0 errors | Yes |
| CSS Cascade Layers | Custom styles in @layer base | Yes |
