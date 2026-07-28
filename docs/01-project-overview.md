# 01 - Project Overview

## Project Name
**Afsheen by Sheikh**

## Version
1.0.0

## Date
July 2026

---

## 1. Introduction

Afsheen by Sheikh is a full-stack e-commerce web application for a Bangladeshi luxury brand offering heritage Bengali couture, fine jewelry, and botanical skincare. The platform provides a Daraz-inspired online shopping experience with a React frontend and FastAPI backend, backed by Firebase Firestore.

## 2. Project Purpose

- Establish an online presence for the Afsheen by Sheikh brand (Dhaka, Bangladesh)
- Provide customers with a luxurious browsing and shopping experience
- Enable admin product and order management
- Showcase heritage Bengali craftsmanship (Jamdani, Banarasi, filigree jewelry)

## 3. Project Scope

### In Scope
- Customer-facing e-commerce storefront (React 19 + Tailwind CSS v4)
- RESTful API backend (FastAPI + Python)
- Firebase Firestore database with in-memory fallback for local development
- Admin dashboard (product CRUD, order management, user overview, coupon management)
- Moderator dashboard (live chat support interface)
- Customer dashboard (order tracking, reviews, live chat)
- Shopping cart with table-style layout and checkout (Cash on Delivery / bKash / Nagad / Card)
- Coupon system (4 codes: GOLDEN15, WELCOME10, BRIDAL5000, FESTIVE20)
- Flash Sale section with countdown timer
- Wishlist functionality
- Live chat widget for customer support
- Responsive design for mobile and desktop with bottom navigation bar

### Out of Scope
- Native mobile applications (iOS/Android)
- Payment gateway integration (Stripe/PayPal) — placeholder only
- Multi-language support
- Google OAuth / social login

## 4. Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 6, Tailwind CSS v4, Lucide React icons |
| Backend | FastAPI 0.115, Pydantic v2, Uvicorn |
| Database | Firebase Firestore (with in-memory mock fallback) |
| Version Control | Git, GitHub |

## 5. Target Users

- **Primary:** Customers in Bangladesh seeking premium fashion, jewelry, and skincare
- **Secondary:** Admin managers overseeing product catalog and orders
- **Tertiary:** Moderators providing live chat customer support

## 6. Key Features

1. **Product Catalog** — 24 products across 10 categories (Bridal Outfit, Bengali Couple Set, Bengali Family Combo, Gown, Saree, Lehenga, Indian Party Dress, Pakistani Luxury, Skincare, Jewellery & Accessories)
2. **Daraz-Style UI** — TopBar utility bar, sticky Header with search, CategoryNav with mega menu, MobileNav bottom bar
3. **Hero Banner** — 2-column layout: main auto-sliding carousel (3 slides) + 2 side banners
4. **Flash Sale** — Countdown timer with horizontally scrollable discounted products and sold progress bars
5. **Category Icons** — Circular category thumbnails in responsive grid
6. **Shopping Cart** — Table-style layout with quantity controls, size selection, and voucher codes
7. **Checkout** — Cash on Delivery / bKash / Nagad / Card / Nagad / Rocket payment methods, order summary sidebar
8. **Coupon Codes** — GOLDEN15 (15%), WELCOME10 (10%), BRIDAL5000 (৳5,000 off), FESTIVE20 (20%)
9. **User Authentication** — Register, login with demo access buttons (auto-redirect by role)
10. **3 User Roles** — Customer, Moderator, Admin — each with dedicated dashboards
11. **Admin Dashboard** — Stats overview, product CRUD, order management, user overview, coupon management
12. **Moderator Dashboard** — Live chat interface with user list and message thread
13. **Customer Dashboard** — Order tracking with progress stepper, reviews, live chat
14. **Wishlist** — Save products for later with heart icon toggle
15. **Live Chat Widget** — Floating chat bubble for real-time customer support
16. **Responsive Design** — Mobile bottom navigation bar, tablet and desktop layouts
17. **Product Reviews** — 6 pre-seeded customer reviews with rating stars
18. **Store Locations** — 3 physical stores in Dhaka with details

## 7. Repository Structure

```
Afsheen-by-Sheikh/
├── backend/
│   ├── main.py            # FastAPI app (18 API endpoints)
│   ├── config.py          # Firebase config with in-memory fallback
│   ├── requirements.txt   # fastapi, uvicorn, firebase-admin, python-dotenv, pydantic
│   └── .env               # FIREBASE_CREDENTIALS_PATH
├── frontend/
│   ├── src/
│   │   ├── components/    # TopBar, Header, CategoryNav, MobileNav, Footer,
│   │   │                  # ProductCard, HeroBanner, FlashSale, CategoryIcons,
│   │   │                  # ReviewCard, LiveChatWidget, Notification
│   │   ├── pages/         # HomePage, ShopPage, ProductDetailPage, CartPage,
│   │   │                  # AboutPage, ContactPage, LoginPage, RegisterPage,
│   │   │                  # AdminDashboard, ModeratorDashboard, CustomerDashboard,
│   │   │                  # NotFoundPage
│   │   ├── context/       # AppContext.jsx (localStorage-based state management)
│   │   ├── data/          # products.js (24 products, banners, testimonials, etc.)
│   │   ├── config/        # firebase.js (dead code, not imported)
│   │   ├── App.jsx        # View router via switch/case on currentView
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles + Tailwind CSS v4
│   ├── package.json
│   ├── vite.config.js     # Dev proxy: /api → localhost:8000
│   └── index.html
├── docs/                  # 21 documentation files
├── .gitignore
└── README.md
```

## 8. Team

| Role | Responsibility |
|------|---------------|
| Full-Stack Developer | React UI, FastAPI backend, Firebase integration |
