# 15 - Data Flow Diagrams (DFD)

## 1. Context Diagram (Level 0)

```
                     ┌──────────────────┐
                     │                  │
  Guest ────────────│                  │────── Products (24)
                     │                  │────── Cart Data
  Customer ─────────│   Afsheen by     │────── Orders
                     │   Sheikh         │────── Reviews
  Moderator ────────│   System         │────── Live Chat
                     │                  │────── Wishlist
  Admin ────────────│                  │────── User Data
                     │                  │
                     └──────────────────┘
```

No backend API is called by the frontend at runtime. All data is stored in localStorage with `as_` prefix keys.

## 2. Level 1 DFD

```
┌──────────┐     ┌────────────────┐     ┌──────────────────┐
│          │────>│ 1.0 Product    │────>│  Product Catalog  │
│  Guest   │     │  Browsing      │     │  (24 products)   │
│          │<────│  (Filter/Sort) │<────│                  │
└──────────┘     └────────────────┘     └──────────────────┘

┌──────────┐     ┌────────────────┐     ┌──────────────────┐
│          │────>│ 2.0 Cart       │────>│  Cart State       │
│ Customer │     │  Management    │     │  (as_cart)       │
│          │<────│  (Add/Remove)  │<────│                  │
└──────────┘     └────────────────┘     └──────────────────┘

┌──────────┐     ┌────────────────┐     ┌──────────────────┐
│          │────>│ 3.0 Checkout   │────>│  Orders           │
│ Customer │     │  & Payment     │     │  (as_orders)     │
│          │<────│  (6 methods)   │<────│                  │
└──────────┘     └────────────────┘     └──────────────────┘

┌──────────┐     ┌────────────────┐     ┌──────────────────┐
│          │────>│ 4.0 Auth       │────>│  Users            │
│  User    │     │  (Register/    │     │  (as_users)      │
│          │<────│   Login)       │<────│                  │
└──────────┘     └────────────────┘     └──────────────────┘

┌──────────┐     ┌────────────────┐     ┌──────────────────┐
│          │────>│ 5.0 Admin      │────>│  Products/Orders  │
│  Admin   │     │  Operations    │     │  Users/Coupons    │
│          │<────│  (CRUD)        │<────│                  │
└──────────┘     └────────────────┘     └──────────────────┘

┌──────────┐     ┌────────────────┐     ┌──────────────────┐
│          │────>│ 6.0 Live Chat  │────>│  Chat Messages    │
│Moderator │     │  (Reply)       │     │  (as_chat)       │
│          │<────│                │<────│                  │
└──────────┘     └────────────────┘     └──────────────────┘

┌──────────┐     ┌────────────────┐     ┌──────────────────┐
│          │────>│ 7.0 Wishlist   │────>│  Wishlist         │
│ Customer │     │  (Toggle)      │     │  (as_wishlist)   │
│          │<────│                │<────│                  │
└──────────┘     └────────────────┘     └──────────────────┘
```

## 3. Data Stores

| Store | localStorage Key | Contents |
|-------|-----------------|----------|
| Products | as_products | 24 product objects |
| Cart | as_cart | Array of {product, quantity, selectedSize} |
| Orders | as_orders | Array of order objects |
| Reviews | as_reviews | Array of review objects |
| Users | as_users | 3+ user objects |
| Session | as_session | Current user (no password) or null |
| Wishlist | as_wishlist | Array of product IDs |
| Chat | as_chat | {messages: [{userId, text, sender, timestamp}]} |
| Flash Sale End | as_flashSaleEnd | ISO timestamp for countdown timer |

## 4. Data Flow: Checkout

```
Customer ──> Cart Page ──> Checkout Form ──> Place Order ──> Order Created
                                     │                        │
                                     ├── Apply Coupon ────> Discount Applied (4 codes)
                                     ├── Shipping Info ────> Name, Phone, Address
                                     └── Payment Method ───> bKash/Nagad/Visa/MC/Rocket/COD
                                                                     │
                                                                     ▼
                                                              Cart Cleared (as_cart = [])
                                                              Order in as_orders
                                                              Order ID: ORD-XXXXX
```
