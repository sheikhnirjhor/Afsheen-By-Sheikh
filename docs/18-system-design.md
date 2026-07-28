# 18 - System Design

## 1. Purpose

This document describes the high-level architecture and technical decisions for the Afsheen by Sheikh e-commerce platform.

## 2. Architecture Overview

The system is a **two-tier architecture** with a decoupled frontend and backend:

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION TIER                      │
│  ┌───────────────────────────────────────────────────┐  │
│  │  React 19 SPA + Tailwind CSS v4                   │  │
│  │  ├── View routing (currentView state + switch/case)│  │
│  │  ├── State Management (AppContext + localStorage)  │  │
│  │  ├── 11 Components (Header, Footer, etc.)          │  │
│  │  └── 12 Pages (Home, Shop, 3 Dashboards, etc.)    │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  NOTE: Frontend manages ALL data in localStorage.       │
│  It does NOT call the backend API at runtime.           │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    APPLICATION TIER                       │
│  ┌───────────────────────────────────────────────────┐  │
│  │  FastAPI (Python 3.10+)                           │  │
│  │  ├── 18 REST API endpoints                        │  │
│  │  ├── Pydantic v2 request/response validation      │  │
│  │  ├── CORS middleware (localhost:5173, :3000)       │  │
│  │  └── Firebase Admin SDK (or in-memory mock)       │  │
│  └───────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────┐
│                      DATA TIER                           │
│  ┌────────────────────────────────────────────────┐     │
│  │  Firebase Firestore (or _FirestoreMock)         │     │
│  │  ├── products (24 documents)                    │     │
│  │  ├── users (3 demo accounts)                    │     │
│  │  ├── orders (user-created)                      │     │
│  │  ├── reviews (pre-seeded)                       │     │
│  │  └── contacts (form submissions)                │     │
│  └────────────────────────────────────────────────┘     │
│                                                         │
│  Frontend localStorage (as_* prefix):                   │
│  ├── as_products, as_cart, as_orders                    │
│  ├── as_reviews, as_users, as_session                   │
│  ├── as_wishlist, as_chat, as_flashSaleEnd              │
│  └── (all synced via AppContext.jsx)                    │
└─────────────────────────────────────────────────────────┘
```

## 3. Frontend Architecture

### 3.1 Component Hierarchy

```
App (min-h-screen flex flex-col)
├── TopBar (orange utility bar: Sell on Afsheen, Customer Care, Order Tracking, Login)
├── Header (sticky: Logo + Search + Heart + Cart hover mini-cart + Account dropdown)
├── CategoryNav (☰ All Categories mega menu + category links)
├── [View Component] (switch/case on currentView)
│   ├── HomePage
│   │   ├── HeroBanner (2-column: main carousel 3 slides + 2 side banners)
│   │   ├── FlashSale (countdown timer + sold progress bar)
│   │   ├── CategoryIcons (10 circular thumbnails)
│   │   ├── Trending Now ("VIEW ALL" → Shop)
│   │   ├── Just For You (all 24 products)
│   │   ├── Heritage section
│   │   ├── Reviews (6 testimonials)
│   │   ├── FAQ (6 questions)
│   │   └── Store Locations (3 Dhaka stores)
│   ├── ShopPage (sidebar filters + sorting + Daraz-style product grid)
│   ├── ProductDetailPage (breadcrumb, image, size/qty, Add to Cart, Buy Now, Wishlist, tabs, related)
│   ├── CartPage (table-style, voucher input, Order Summary sidebar)
│   ├── AboutPage
│   ├── ContactPage
│   ├── LoginPage (demo access buttons + form)
│   ├── RegisterPage
│   ├── AdminDashboard (Stats, Products CRUD, Orders, Users, Coupons tabs)
│   ├── ModeratorDashboard (Chat stats, split-panel chat interface)
│   └── CustomerDashboard (Orders with progress stepper, Reviews, Live Chat tabs)
├── Footer (5-column: About, Categories, Customer Service, Contact, Social)
├── MobileNav (bottom sticky bar: Home, Categories, Cart badge, Wishlist, Account)
├── LiveChatWidget (floating bubble → chat window)
├── Notification (toast with auto-dismiss)
```

### 3.2 State Management

| State Key | Type | Persistence | Description |
|-----------|------|-------------|-------------|
| products | Array | localStorage (as_products) | 24 products |
| cart | Array | localStorage (as_cart) | Cart items |
| orders | Array | localStorage (as_orders) | Order history |
| reviews | Array | localStorage (as_reviews) | Product reviews |
| wishlist | Array | localStorage (as_wishlist) | Wishlist product IDs |
| users | Array | localStorage (as_users) | Registered users (3 demo) |
| session | Object/null | localStorage (as_session) | Current logged-in user |
| currentView | String | State only | Current page view |
| selectedProduct | Object/null | State only | Product detail view |
| notification | Object/null | State only | Toast notification |
| megaMenuOpen | Boolean | State only | Category mega menu flyout |
| flashSaleEnd | Date | localStorage (as_flashSaleEnd) | Countdown timer end |

### 3.3 View Routing

No React Router. Views are managed via `currentView` state:

| View ID | Component | Access |
|---------|-----------|--------|
| home | HomePage | Public |
| shop | ShopPage | Public |
| product-details | ProductDetailPage | Public |
| cart | CartPage | Public |
| about | AboutPage | Public |
| contact | ContactPage | Public |
| login | LoginPage | Guest only |
| register | RegisterPage | Guest only |
| admin-dashboard | AdminDashboard | Admin only |
| moderator-dashboard | ModeratorDashboard | Moderator only |
| customer-dashboard | CustomerDashboard | Customer only |

## 4. Backend Architecture

### 4.1 Application Structure

```
backend/
├── main.py            # FastAPI app, all 18 endpoints, Pydantic models, seed data
├── config.py          # Firebase config with 3-tier fallback
├── requirements.txt   # Python dependencies
├── .env               # FIREBASE_CREDENTIALS_PATH
└── serviceAccountKey.json  # (gitignored, optional)
```

### 4.2 Firebase 3-Tier Fallback (config.py)

```
1. Real Firebase — serviceAccountKey.json exists → firebase_admin.initialize_app(cred)
2. Firebase Emulator — FIREBASE_EMULATED=1 → connects to localhost:8080
3. In-Memory Mock — _FirestoreMock class mirrors Firestore API surface
```

## 5. Design System (Daraz-inspired)

| Element | Value |
|---------|-------|
| Primary | #F85606 (orange) |
| Discount Badge | #E64545 (red) |
| Success | #00B14F (green) |
| Background | #F5F5F5 (light gray) |
| Card Background | #FFFFFF |
| Text Primary | #222222 |
| Text Secondary | #666666 |
| Text Muted | #999999 |
| Border | #E0E0E0 |
| Border Light | #EEEEEE |
| Font | Inter (sans-serif) |
| Icons | Lucide React |
| Product Cards | Daraz-style dense grid with discount badges |
| Flash Sale | Countdown timer + sold progress bar |

## 6. CSS Cascade Layers

**Important:** Tailwind CSS v4 uses `@layer` (Cascade Layers). Custom base styles like `* { margin: 0; }` MUST be wrapped in `@layer base` to avoid overriding Tailwind utilities (`mx-auto`, `max-w-*`, `px-*`, etc.). Unlayered CSS has higher priority than `@layer` CSS in the cascade.
