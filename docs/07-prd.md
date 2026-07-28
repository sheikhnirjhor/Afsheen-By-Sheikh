# 07 - Product Requirements Document (PRD)

## 1. Document Info

| Field | Value |
|-------|-------|
| Product Name | Afsheen by Sheikh |
| Version | 1.0 |
| Last Updated | July 2026 |
| Status | Approved |

## 2. Product Vision

A Daraz-inspired luxury e-commerce platform for heritage Bengali couture, fine jewelry, and botanical skincare, providing a seamless online shopping experience for customers across Bangladesh.

## 3. Goals & Objectives

| Goal | Metric | Target |
|------|--------|--------|
| Launch MVP | Deployment date | July 2026 |
| Product catalog | Products listed | 24 across 10 categories |
| Performance | Page load time | < 3 seconds |
| Mobile experience | Responsive design | All screen sizes with bottom nav |

## 4. User Roles

| Role | Description |
|------|-------------|
| Guest | Unregistered visitor; can browse products, view details, add to cart |
| Customer | Registered user; can purchase, track orders, write reviews, use live chat, manage wishlist |
| Moderator | Support staff; can respond to live chat messages from customers |
| Admin | Full access; manages products, orders, users, coupons, dashboard stats |

## 5. Feature Requirements

### 5.1 Customer-Facing Features

| ID | Feature | Priority | Status |
|----|---------|----------|--------|
| F-01 | Product catalog with 10 categories | P0 | Done |
| F-02 | Product detail page with image, description, sizes, reviews, Buy Now | P0 | Done |
| F-03 | Category filtering, search, and sorting (sidebar filters on desktop) | P0 | Done |
| F-04 | Shopping cart (table-style layout, quantity controls, size selection) | P0 | Done |
| F-05 | Checkout (COD / bKash / Nagad / Card / Rocket, order summary sidebar) | P0 | Done |
| F-06 | User registration and login with demo access buttons | P0 | Done |
| F-07 | Coupon codes (GOLDEN15, WELCOME10, BRIDAL5000, FESTIVE20) | P1 | Done |
| F-08 | Order history with visual progress stepper (customer dashboard) | P0 | Done |
| F-09 | Product reviews and ratings | P1 | Done |
| F-10 | Hero banner (2-column: main carousel + side banners) | P1 | Done |
| F-11 | Flash Sale section with countdown timer and sold progress bars | P1 | Done |
| F-12 | Category icons navigation grid | P1 | Done |
| F-13 | Wishlist (heart icon toggle on product cards and detail page) | P1 | Done |
| F-14 | Live chat widget (floating bubble, real-time messaging) | P1 | Done |
| F-15 | TopBar utility bar (Sell on Afsheen, Customer Care, Order Tracking, Login/Sign Up) | P1 | Done |
| F-16 | Sticky Header with search bar, heart/cart/account icons, mini-cart hover dropdown | P0 | Done |
| F-17 | CategoryNav with mega menu flyout | P1 | Done |
| F-18 | Mobile bottom navigation bar (Home, Categories, Cart, Wishlist, Account) | P0 | Done |
| F-19 | Responsive mobile design | P0 | Done |
| F-20 | About page with brand story, stats, store locations, reviews, FAQ | P2 | Done |
| F-21 | Contact page with form and contact info sidebar | P2 | Done |
| F-22 | Testimonials section (6 reviews on homepage) | P2 | Done |
| F-23 | FAQ section (6 questions) | P2 | Done |
| F-24 | Store locations (3 stores in Dhaka) | P2 | Done |
| F-25 | Heritage banner on homepage | P2 | Done |

### 5.2 Admin Features

| ID | Feature | Priority | Status |
|----|---------|----------|--------|
| A-01 | Admin dashboard with stats overview (revenue, orders, products, users) | P0 | Done |
| A-02 | Product CRUD (Create, Read, Update, Delete) | P0 | Done |
| A-03 | Order management (view, update status with step buttons) | P0 | Done |
| A-04 | User overview (view registered users with role badges) | P1 | Done |
| A-05 | Coupon management view | P1 | Done |

### 5.3 Moderator Features

| ID | Feature | Priority | Status |
|----|---------|----------|--------|
| M-01 | Moderator dashboard with chat stats | P0 | Done |
| M-02 | Live chat interface (user list, message thread, reply) | P0 | Done |
| M-03 | Chat user search and filtering | P1 | Done |

### 5.4 Customer Dashboard Features

| ID | Feature | Priority | Status |
|----|---------|----------|--------|
| C-01 | Order history with expandable detail and progress stepper | P0 | Done |
| C-02 | Review submission and history | P1 | Done |
| C-03 | Live chat access | P1 | Done |

## 6. Non-Functional Requirements

| ID | Requirement | Target |
|----|------------|--------|
| NF-01 | Page load time | < 3 seconds |
| NF-02 | API response time | < 500ms |
| NF-03 | Mobile responsiveness | All screen sizes (320px+) |
| NF-04 | Browser support | Chrome, Firefox, Safari, Edge |
| NF-05 | Data persistence | localStorage (frontend), Firestore (backend) |

## 7. Data Requirements

- **Products:** id, name, description, price (BDT), originalPrice, category, image, sizes, rating, reviewCount, inStock, trending, sold, freeDelivery
- **Users:** id, name, email, phone, password, role (customer|admin|moderator), loyaltyPoints
- **Orders:** id, userId, customerName, items [{name, price, image, quantity, size}], total, status, address, paymentMethod, date
- **Reviews:** id, productId, userId, rating (1-5), comment, name, date
- **Chat Messages:** id, userId, text, sender (user|moderator|support), timestamp, time
- **Wishlist:** Array of product IDs

## 8. Success Metrics

| Metric | Target |
|--------|--------|
| Product catalog completeness | 24 products across 10 categories |
| Demo data seeding | 6 reviews, 3 demo users, 4 coupons |
| Checkout completion | Cart → Order successful |
| Admin operations | Full CRUD on products |
| Live chat | Customer sends message → Moderator replies |
