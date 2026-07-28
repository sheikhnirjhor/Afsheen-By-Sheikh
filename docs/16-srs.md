# 16 - Software Requirements Specification (SRS)

## 1. Introduction

### 1.1 Purpose
This SRS describes the software requirements for the Afsheen by Sheikh e-commerce platform, a full-stack web application for selling premium Bangladeshi fashion and jewelry.

### 1.2 Scope
The system provides a customer-facing storefront, admin management dashboard, moderator dashboard, and REST API backend. It is designed for the Bangladeshi market with BDT pricing and multiple payment methods including Cash on Delivery.

### 1.3 Definitions
- **BDT:** Bangladeshi Taka (currency)
- **COD:** Cash on Delivery
- **GOLDEN15:** Coupon code for 15% discount
- **WELCOME10:** Coupon code for 10% discount
- **BRIDAL5000:** Coupon code for ৳5,000 off (min ৳15,000)
- **FESTIVE20:** Coupon code for 20% discount

## 2. Overall Description

### 2.1 Product Perspective
- Frontend: React 19 SPA with localStorage-based state management
- Backend: FastAPI REST API with Firebase Firestore (or in-memory mock)
- No React Router — views are managed via `currentView` state

### 2.2 User Classes
| Class | Description |
|-------|-------------|
| Guest | Can browse products, view details, search |
| Customer | Can purchase, manage cart, checkout, review, track orders, use live chat |
| Moderator | Can respond to customer live chat inquiries |
| Admin | Can manage products, orders, users, coupons, view dashboard stats |

### 2.3 Operating Environment
- Browser: Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile: Responsive design for all screen sizes (with bottom navigation bar)
- Backend: Python 3.10+, Uvicorn server

## 3. Functional Requirements

### 3.1 Product Management
- 24 products across 10 categories (Bridal Outfit, Bengali Couple Set, Premium Saree, Wedding Collection, Jewelry Set, Filigree Earrings, Gold Necklace, Bangles Set, Natural Skincare, Hair Care)
- Product attributes: id, name, category, description, price (BDT), originalPrice, sold, freeDelivery, image, sizes, rating, reviewsCount, trending, inStock
- Filtering by category, price range, size, in-stock
- Search by product name or category
- Sorting by popularity (sold), price (low/high), rating, newest

### 3.2 Shopping Cart
- Add product with selected size and quantity
- Persist in localStorage (key: as_cart)
- Update quantity, remove items
- Table-style cart layout (Product, Price, Quantity, Total, Remove)
- Cart badge count in Header
- Mini-cart hover dropdown in Header

### 3.3 Checkout
- Required fields: name, phone, address
- Optional: city, delivery note
- Payment: bKash, Nagad, Visa, Mastercard, Rocket, COD
- Coupon codes: GOLDEN15 (15%), WELCOME10 (10%), BRIDAL5000 (৳5,000 off, min ৳15,000), FESTIVE20 (20%)
- Order ID format: ORD-XXXXX (random 5-digit)
- Initial status: "Pending"
- Free shipping on orders above ৳2,000; ৳120 otherwise

### 3.4 Authentication
- Registration: name, email, phone, password, confirm password → role: "customer"
- Login: email + password → session stored in localStorage
- Demo login: 3 quick access buttons (Admin, Moderator, Customer) — no password required
- Session persists across browser refresh
- Logout clears session, redirects to home

### 3.5 Admin Dashboard
- Tabbed interface: Overview, Products, Orders, Users, Coupons
- Overview: stat cards (Revenue, Orders, Products, Users) + Recent Orders
- Product CRUD operations (inline add form, edit modal, delete with confirmation)
- Order status management (step buttons: Pending, Processing, Shipped, Delivered)
- User list with role badges
- Coupon list view

### 3.6 Moderator Dashboard
- Stats: active chats, total messages, response time
- Chat interface: split panel (user list + message thread)
- User list with last message preview and timestamp
- Chat user search and filtering
- Send reply messages with timestamp

### 3.7 Customer Dashboard
- Profile display (name, email, order count, review count)
- Order history with expandable detail cards
- Visual progress stepper for order status (Pending → Processing → Shipped → Delivered)
- Review submission (rating 1-5, comment)
- Review history
- Live chat access

### 3.8 Live Chat
- Floating chat bubble widget (customer-facing)
- Chat window with message history and input
- Auto-reply from support after 1.5s delay
- Chat messages persisted in localStorage (key: as_chat)

### 3.9 Wishlist
- Toggle wishlist via heart icon on product cards and detail page
- Wishlist persisted in localStorage (key: as_wishlist)

## 4. Non-Functional Requirements

### 4.1 Performance
- Page load: < 3 seconds
- Mobile-first responsive design
- Custom CSS in `@layer base` to avoid overriding Tailwind utilities

### 4.2 Security
- CORS restricted to localhost:5173 and localhost:3000
- Firebase credentials in .gitignore
- Passwords stored in plaintext (known limitation — demo app)

### 4.3 Data Persistence
- Frontend: localStorage with "as_" prefix keys
- Backend: Firebase Firestore or in-memory mock database
- Data resets on backend restart when using in-memory fallback

## 5. External Interface Requirements

### 5.1 API Endpoints (18 total)
See `21-api-design.md` for complete specification.

### 5.2 Frontend Views (11 total)
home, shop, product-details, cart, about, contact, login, register, admin-dashboard, moderator-dashboard, customer-dashboard

## 6. Constraints
- No payment gateway integration (placeholder only)
- Frontend manages ALL data in localStorage — does not call the backend API at runtime
- Backend API is standalone for future frontend-backend integration
- Single-currency: BDT only
