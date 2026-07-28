# 21 - API Design

## 1. Purpose

This document specifies the RESTful API design for the Afsheen by Sheikh backend (FastAPI), including all endpoints, request/response formats, and data models.

**Note:** The frontend currently does NOT call these API endpoints at runtime. All data is managed via localStorage in `AppContext.jsx`. The backend API exists for future frontend-backend integration.

## 2. Base URL

```
Development:  http://localhost:8000
Frontend proxy: http://localhost:5173/api/* → http://localhost:8000/api/*
```

## 3. API Conventions

### 3.1 Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| Content-Type | Yes (POST/PUT) | `application/json` |

**Note:** No authentication headers are required. All endpoints are open (demo application).

### 3.2 Response Format

**Success:**
```json
{
  "products": [...],
  "message": "Success message"
}
```

**Error:**
```json
{
  "detail": "Human-readable error message"
}
```

### 3.3 HTTP Status Codes

| Code | Usage |
|------|-------|
| 200 | Success (GET, PUT, DELETE) |
| 201 | Created (POST) |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (invalid credentials) |
| 404 | Not Found |
| 422 | Unprocessable Entity (Pydantic validation) |

## 4. Product Endpoints

### GET `/api/products`

List all products with optional category filter.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| category | string | Filter by category (10 available) |

**Response (200):**
```json
{
  "products": [
    {
      "id": "p1",
      "name": "Bridal Lehenga Set",
      "category": "Bridal Outfit",
      "description": "Exquisite red bridal lehenga...",
      "price": 29500,
      "originalPrice": 35000,
      "image": "https://images.unsplash.com/...",
      "sizes": ["S", "M", "L", "XL"],
      "rating": 4.8,
      "reviewsCount": 12,
      "inStock": true,
      "sold": 85,
      "freeDelivery": true,
      "trending": true
    }
  ]
}
```

---

### GET `/api/products/{product_id}`

Get a single product's full details.

**Response (200):**
```json
{
  "product": {
    "id": "p1",
    "name": "Bridal Lehenga Set",
    ...
  }
}
```

**Errors:**
| Status | Detail |
|--------|--------|
| 404 | "Product not found" |

---

### POST `/api/products`

Create a new product.

**Request:**
```json
{
  "name": "New Product",
  "category": "Bridal Outfit",
  "description": "Product description...",
  "price": 15000,
  "originalPrice": 18000,
  "image": "https://...",
  "sizes": ["S", "M", "L"],
  "rating": 4.5,
  "reviewsCount": 0,
  "inStock": true,
  "sold": 0,
  "freeDelivery": false,
  "trending": false
}
```

**Response (200):**
```json
{
  "id": "auto-generated-id",
  "message": "Product created"
}
```

---

### PUT `/api/products/{product_id}`

Update an existing product.

**Request:** Same as POST body.

**Response (200):**
```json
{
  "message": "Product updated"
}
```

---

### DELETE `/api/products/{product_id}`

Delete a product.

**Response (200):**
```json
{
  "message": "Product deleted"
}
```

## 5. Order Endpoints

### POST `/api/orders`

Place a new order.

**Request:**
```json
{
  "customerName": "Ayesha Rahman",
  "customerEmail": "ayesha@example.com",
  "items": [
    { "productId": "p1", "quantity": 1, "selectedSize": "M" }
  ],
  "total": 29500,
  "deliveryAddress": "House 5, Road 15, Dhanmondi, Dhaka",
  "deliveryPhone": "+880 1712-345678",
  "paymentMethod": "bKash",
  "couponCode": "GOLDEN15"
}
```

**Response (200):**
```json
{
  "order": {
    "id": "ORD-48271",
    "customerName": "Ayesha Rahman",
    "customerEmail": "ayesha@example.com",
    "date": "2026-07-28",
    "items": [...],
    "total": 29500,
    "status": "Pending",
    "deliveryAddress": "House 5, Road 15, Dhanmondi, Dhaka",
    "deliveryPhone": "+880 1712-345678",
    "paymentMethod": "bKash",
    "couponCode": "GOLDEN15"
  }
}
```

---

### GET `/api/orders`

Get all orders, optionally filtered by email.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| email | string | Filter by customer email |

---

### PUT `/api/orders/{order_id}/status`

Update an order's status.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| status | string | New status (Pending, Processing, Shipped, Delivered) |

## 6. Review Endpoints

### GET `/api/reviews/{product_id}`

Get all reviews for a product.

### POST `/api/reviews`

Create a new review.

**Request:**
```json
{
  "productId": "p1",
  "customerName": "Sabrina R.",
  "rating": 5,
  "comment": "Absolutely stunning!"
}
```

## 7. Auth Endpoints

### POST `/api/auth/register`

Register a new user account.

**Request:**
```json
{
  "name": "New User",
  "email": "new@example.com",
  "phone": "+880 1234-567890",
  "password": "securepass123",
  "role": "customer"
}
```

### POST `/api/auth/login`

Authenticate a user.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| email | string | User's email |
| password | string | User's password |

## 8. User Endpoints

### GET `/api/users/{email}`

Get a user profile by email.

### PUT `/api/users/{email}`

Update a user profile.

## 9. Contact Endpoint

### POST `/api/contact`

Submit a contact form.

## 10. Seed Endpoint

### GET `/api/seed`

Seed the database with demo data (24 products, 3 users).

## 11. Pydantic Models

| Model | Fields |
|-------|--------|
| ProductModel | name, category, description, price, originalPrice, image, sizes, rating, reviewsCount, inStock, sold, freeDelivery, trending |
| CartItem | productId, quantity, selectedSize |
| OrderModel | customerName, customerEmail, items, total, deliveryAddress, deliveryPhone, paymentMethod, couponCode |
| ReviewModel | productId, customerName, rating, comment |
| UserModel | name, email, phone, password, role |
| ContactModel | name, email, phone, subject, message |

## 12. CORS Configuration

```python
allow_origins=["http://localhost:5173", "http://localhost:3000"]
allow_credentials=True
allow_methods=["*"]
allow_headers=["*"]
```



complete