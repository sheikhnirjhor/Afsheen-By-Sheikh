# 12 - Functional Requirements

## 1. Product Catalog

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01 | Display 24 products across 10 categories | P0 |
| FR-02 | Support filtering by category via sidebar | P0 |
| FR-03 | Support search by product name or category | P0 |
| FR-04 | Support sorting by popularity, price (low-high, high-low), rating, newest | P0 |
| FR-05 | Product card: image, name, category, price, original price, discount %, rating, sold count, free delivery badge | P0 |
| FR-06 | Product detail: full description, size selector, quantity, Add to Cart, Buy Now, Wishlist, tabs (Description/Specs/Reviews), related products | P0 |
| FR-07 | Price range filter (min/max inputs) | P1 |
| FR-08 | Size filter (XS, S, M, L, XL, XXL, Free Size) | P1 |
| FR-09 | In-stock only toggle filter | P1 |

## 2. Shopping Cart

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-10 | Add product to cart with selected size and quantity | P0 |
| FR-11 | Persist cart in localStorage (key: as_cart) across sessions | P0 |
| FR-12 | Update item quantity in cart (+/-) | P0 |
| FR-13 | Remove individual items from cart | P0 |
| FR-14 | Table-style cart layout (Product, Price, Quantity, Total, Remove) | P0 |
| FR-15 | Cart item count badge in Header | P0 |
| FR-16 | Mini-cart hover dropdown in Header showing last 4 items + subtotal | P1 |

## 3. Checkout & Orders

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-17 | Checkout form: name, phone, address, city, delivery note | P0 |
| FR-18 | Payment method selection: bKash, Nagad, Visa, Mastercard, Rocket, COD | P0 |
| FR-19 | Voucher/coupon code application with discount calculation | P1 |
| FR-20 | Order summary sidebar (subtotal, discount, shipping, total) | P0 |
| FR-21 | Free shipping on orders above ৳2,000; ৳120 otherwise | P1 |
| FR-22 | Order generation with unique auto-generated ID | P0 |
| FR-23 | Order stored with status "Pending" | P0 |
| FR-24 | Cart cleared after successful order | P0 |
| FR-25 | Order confirmation page with action buttons | P0 |

## 4. User Authentication

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-26 | User registration with name, email, phone, password, confirm password | P0 |
| FR-27 | User login with demo access buttons (auto-redirect by role) | P0 |
| FR-28 | Session management via localStorage (key: as_session) | P0 |
| FR-29 | Role-based access: customer, moderator, admin | P0 |
| FR-30 | Auto-login after registration as customer | P0 |
| FR-31 | Logout clears session, redirects to home | P0 |

## 5. Admin Dashboard

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-32 | Tabbed interface: Overview, Products, Orders, Users, Coupons | P0 |
| FR-33 | Overview: stat cards (Revenue, Orders, Products, Users) + Recent Orders | P0 |
| FR-34 | Product CRUD: add inline form, edit modal, delete with confirmation | P0 |
| FR-35 | Order management: status step buttons (Pending, Processing, Shipped, Delivered) | P0 |
| FR-36 | User list with role badges (color-coded) | P1 |
| FR-37 | Coupon list view | P1 |

## 6. Moderator Dashboard

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-38 | Stats: active chats count, total messages, response time | P0 |
| FR-39 | Chat interface: split panel (user list + message thread) | P0 |
| FR-40 | User list with last message preview and timestamp | P0 |
| FR-41 | Chat user search and filtering | P1 |
| FR-42 | Send reply messages with timestamp | P0 |

## 7. Customer Dashboard

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-43 | Profile display (name, email, order count, review count) | P0 |
| FR-44 | Order history with expandable detail cards | P0 |
| FR-45 | Visual progress stepper for order status | P0 |
| FR-46 | Review submission (rating 1-5, comment) | P1 |
| FR-47 | Review history display | P1 |
| FR-48 | Live chat access | P1 |

## 8. Live Chat

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-49 | Floating chat bubble widget (visible for customers) | P1 |
| FR-50 | Chat window with message history and input | P1 |
| FR-51 | Auto-reply from support after 1.5s delay | P2 |
| FR-52 | Chat messages persisted in localStorage (key: as_chat) | P1 |

## 9. Wishlist

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-53 | Toggle wishlist via heart icon on product cards and detail page | P1 |
| FR-54 | Wishlist persisted in localStorage (key: as_wishlist) | P1 |

## 10. UI Components

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-55 | TopBar: utility links (Sell on Afsheen, Customer Care, Order Tracking, Login/Sign Up) | P1 |
| FR-56 | Header: sticky with logo, search bar, heart/cart/account icons | P0 |
| FR-57 | CategoryNav: horizontal category links + mega menu flyout | P1 |
| FR-58 | MobileNav: bottom sticky bar (Home, Categories, Cart, Wishlist, Account) | P0 |
| FR-59 | HeroBanner: 2-column layout (main carousel + 2 side banners) | P1 |
| FR-60 | FlashSale: countdown timer + horizontal scrollable discounted products | P1 |
| FR-61 | CategoryIcons: circular category thumbnails in responsive grid | P1 |
| FR-62 | Toast notification system with auto-dismiss | P0 |

## 11. Frontend State Management

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-63 | All state managed via React Context (AppContext.jsx) | P0 |
| FR-64 | All data persisted to localStorage with "as_" prefix keys | P0 |
| FR-65 | View routing via currentView state and switch/case (no React Router) | P0 |
| FR-66 | 11 views: home, shop, product-details, cart, about, contact, login, register, admin-dashboard, moderator-dashboard, customer-dashboard | P0 |
