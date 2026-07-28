# 17 - Entity Relationship Diagram (ERD)

## 1. Purpose

This document defines the data entities, their attributes, and relationships in the Afsheen by Sheikh database (Firebase Firestore or in-memory mock).

## 2. Firestore Collections Overview

```
firestore/
├── users/           (collection)
│   └── {userId}/    (document)
├── products/        (collection)
│   └── {productId}/ (document)
├── orders/          (collection)
│   └── {orderId}/   (document)
├── reviews/         (collection)
│   └── {reviewId}/  (document)
└── contacts/        (collection)
    └── {contactId}/ (document)
```

## 3. Entity Definitions

### 3.1 User Entity

```
┌─────────────────────────────────────────────┐
│                  users                       │
├─────────────────────────────────────────────┤
│ id            │ string   │ (document ID)    │
│ name          │ string   │ Full name        │
│ email         │ string   │ Unique email     │
│ phone         │ string   │ Phone number     │
│ password      │ string   │ Plain text (demo)│
│ role          │ string   │ customer | admin │
│               │          │ | moderator      │
│ loyaltyPoints │ number   │ Optional         │
└─────────────────────────────────────────────┘
```

### 3.2 Product Entity

```
┌─────────────────────────────────────────────┐
│                products                      │
├─────────────────────────────────────────────┤
│ id            │ string   │ (document ID)    │
│ name          │ string   │ Product name     │
│ description   │ string   │ Full description │
│ price         │ number   │ Current price BDT│
│ originalPrice │ number   │ Original price   │
│ category      │ string   │ One of 10 cats   │
│ image         │ string   │ Single image URL │
│ sizes         │ array    │ Available sizes  │
│ rating        │ number   │ Average rating   │
│ reviewsCount  │ number   │ Number of reviews│
│ inStock       │ boolean  │ Availability     │
│ sold          │ number   │ Units sold       │
│ freeDelivery  │ boolean  │ Free delivery    │
│ trending      │ boolean  │ Trending badge   │
└─────────────────────────────────────────────┘
```

**Categories (10):** Bridal Outfit, Bengali Couple Set, Premium Saree, Wedding Collection, Jewelry Set, Filigree Earrings, Gold Necklace, Bangles Set, Natural Skincare, Hair Care

### 3.3 Order Entity

```
┌─────────────────────────────────────────────┐
│                  orders                       │
├─────────────────────────────────────────────┤
│ id            │ string   │ ORD-XXXXX format │
│ customerName  │ string   │ Buyer's name     │
│ customerEmail │ string   │ Buyer's email    │
│ date          │ string   │ YYYY-MM-DD       │
│ items         │ array    │ [{productId,     │
│               │          │  quantity,       │
│               │          │  selectedSize}]  │
│ total         │ number   │ Final amount BDT │
│ status        │ string   │ Pending |        │
│               │          │ Processing |     │
│               │          │ Shipped |        │
│               │          │ Delivered        │
│ deliveryAddress│ string  │ Full address     │
│ deliveryPhone │ string   │ Contact phone    │
│ paymentMethod │ string   │ bKash|Nagad|Visa │
│               │          │ |MC|Rocket|COD   │
│ couponCode    │ string   │ Applied coupon   │
└─────────────────────────────────────────────┘
```

### 3.4 Review Entity

```
┌─────────────────────────────────────────────┐
│                  reviews                      │
├─────────────────────────────────────────────┤
│ id            │ string   │ (document ID)    │
│ productId     │ string   │ Reference→products│
│ customerName  │ string   │ Reviewer name    │
│ rating        │ number   │ 1-5              │
│ comment       │ string   │ Review text      │
│ date          │ string   │ Review date      │
└─────────────────────────────────────────────┘
```

### 3.5 Contact Entity

```
┌─────────────────────────────────────────────┐
│                  contacts                     │
├─────────────────────────────────────────────┤
│ id            │ string   │ (document ID)    │
│ name          │ string   │ Sender name      │
│ email         │ string   │ Sender email     │
│ phone         │ string   │ Sender phone     │
│ subject       │ string   │ Message subject  │
│ message       │ string   │ Message content  │
└─────────────────────────────────────────────┘
```

## 4. Entity Relationships

```
┌──────────┐         ┌──────────┐         ┌──────────┐
│          │  1:M    │          │  M:M    │          │
│  users   │────────►│  orders  │◄───────►│ products │
│          │         │          │         │          │
│          │         └──────────┘         └──────────┘
│          │                                    │
│          │         ┌──────────┐              │
│          │  1:M    │          │  M:1         │
│          │────────►│ reviews  │◄─────────────┘
│          │         │          │
└──────────┘         └──────────┘
       │
       │  1:M
       ▼
┌──────────┐
│ contacts │
└──────────┘
```

## 5. Relationship Summary

| Relationship | Type | Description |
|-------------|------|-------------|
| User → Orders | 1:M | One user can have many orders |
| Order → Products | M:M | One order contains many products (via items array) |
| Product → Reviews | 1:M | One product can have many reviews |

## 6. LocalStorage Keys (Frontend)

| Key | Contents |
|-----|----------|
| as_products | Array of 24 product objects |
| as_cart | Array of {product, quantity, selectedSize} |
| as_orders | Array of order objects |
| as_reviews | Array of review objects |
| as_users | Array of user objects (3 demo users) |
| as_session | Current user object (no password) or null |
| as_wishlist | Array of product IDs |
| as_chat | {messages: [{userId, text, sender, timestamp}]} |
| as_flashSaleEnd | ISO timestamp for countdown timer |





