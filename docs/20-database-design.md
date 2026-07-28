# 20 - Database Design

## 1. Purpose

This document provides the detailed database design for the Afsheen by Sheikh platform, including collection structure, field specifications, and the 3-tier fallback strategy.

## 2. Database Technology

| Property | Value |
|----------|-------|
| Primary Database | Firebase Firestore (NoSQL Document Database) |
| Fallback | In-memory mock database (config.py) |
| Frontend Storage | localStorage (browser) with "as_" prefix |
| Structure | Collections → Documents → Fields |

## 3. Collection Schemas

### 3.1 `products` Collection

```
Document ID: {auto-generated or predefined (p1, p2, ...p24)}

{
  "id":            "string"   // Document ID (p1-p24)
  "name":          "string"   // e.g., "Bridal Lehenga Set"
  "description":   "string"   // Full product description
  "price":         "number"   // Current price in BDT
  "originalPrice": "number"   // Original price for discount display
  "category":      "string"   // One of 10 categories
  "image":         "string"   // Single Unsplash image URL
  "sizes":         ["string"] // ["XS","S","M","L","XL","XXL"] or ["Free Size"]
  "rating":        "number"   // Average rating (1.0 - 5.0)
  "reviewsCount":  "number"   // Total number of reviews
  "inStock":       "boolean"  // Availability flag
  "sold":          "number"   // Units sold (for popularity sorting)
  "freeDelivery":  "boolean"  // Free delivery badge
  "trending":      "boolean"  // Trending badge (shown in "Trending Now")
}
```

**Seed Data:** 24 products across 10 categories

**Categories (10):**
1. Bridal Outfit
2. Bengali Couple Set
3. Premium Saree
4. Wedding Collection
5. Jewelry Set
6. Filigree Earrings
7. Gold Necklace
8. Bangles Set
9. Natural Skincare
10. Hair Care

---

### 3.2 `users` Collection

```
Document ID: {auto-generated}

{
  "name":          "string"   // Full name
  "email":         "string"   // Email address (unique)
  "phone":         "string"   // Phone number
  "password":      "string"   // Plain text (demo app limitation)
  "role":          "string"   // "customer" | "admin" | "moderator"
  "loyaltyPoints": "number"   // Optional loyalty points
}
```

**Seed Data:** 3 demo users
- admin@afsheen.com (admin)
- moderator@afsheen.com (moderator)
- ayesha@example.com (customer)

---

### 3.3 `orders` Collection

```
Document ID: {ORD-XXXXX format, e.g., "ORD-48271"}

{
  "id":              "string"   // Order ID
  "customerName":    "string"   // Buyer's name
  "customerEmail":   "string"   // Buyer's email
  "date":            "string"   // "YYYY-MM-DD" format
  "items": [
    {
      "productId":   "string"   // Reference to product
      "quantity":    "number"   // Quantity ordered
      "selectedSize": "string"  // Selected size
    }
  ]
  "total":           "number"   // Total amount in BDT
  "status":          "string"   // "Pending" | "Processing" | "Shipped" | "Delivered"
  "deliveryAddress": "string"   // Full delivery address
  "deliveryPhone":   "string"   // Contact phone number
  "paymentMethod":   "string"   // "bKash" | "Nagad" | "Visa" | "Mastercard" | "Rocket" | "COD"
  "couponCode":      "string"   // Applied coupon code (optional)
}
```

---

### 3.4 `reviews` Collection

```
Document ID: {auto-generated}

{
  "productId":      "string"   // Reference to product
  "customerName":   "string"   // Reviewer's name
  "rating":         "number"   // 1-5 rating
  "comment":        "string"   // Review text
  "date":           "string"   // Review date
}
```

---

### 3.5 `contacts` Collection

```
Document ID: {auto-generated}

{
  "name":           "string"   // Sender name
  "email":          "string"   // Sender email
  "phone":          "string"   // Sender phone
  "subject":        "string"   // Message subject
  "message":        "string"   // Message content
}
```

## 4. In-Memory Mock Implementation

When Firebase is not configured, `config.py` provides `_FirestoreMock`:

| Class | Methods | Purpose |
|-------|---------|---------|
| `_FirestoreMock` | `collection(name)` | Returns a `_CollectionRef` |
| `_CollectionRef` | `document(id)`, `add(data)`, `where()`, `stream()` | Collection operations |
| `_DocRef` | `get()`, `set(data)`, `update(data)`, `delete()` | Document CRUD |
| `_Query` | `where(field, op, value)`, `stream()` | Filtered queries |
| `_DocSnapshot` | `id`, `exists`, `to_dict()` | Read results |

**Supported operators:** `==`, `!=`, `>`, `>=`, `<`, `<=`

**Limitation:** Data resets when the server restarts.

## 5. LocalStorage Schema (Frontend)

| Key | Type | Description |
|-----|------|-------------|
| as_products | Array | All 24 product objects |
| as_cart | Array | [{product, quantity, selectedSize}] |
| as_orders | Array | Order objects |
| as_reviews | Array | Review objects |
| as_users | Array | User objects (includes password) |
| as_session | Object/null | Current user (password removed) |
| as_wishlist | Array | Product IDs |
| as_chat | Object | {messages: [{userId, text, sender, timestamp}]} |
| as_flashSaleEnd | String | ISO timestamp for countdown timer |

## 6. Data Seeding

The frontend seeds initial data from `src/data/products.js` into localStorage on first load:
- 24 products (PRODUCTS array)
- 3 demo users (DEMO_USERS)
- 4 coupon codes (COUPONS)
- 6 testimonials (TESTIMONIALS)
- 6 FAQs (FAQS)
- 3 store locations (STORE_LOCATIONS)
- 6 payment methods (PAYMENT_METHODS)






all done