# 14 - Use Cases

## 1. Use Case Diagram Overview

```
                     ┌──────────────────────────────────────────┐
                     │        Afsheen by Sheikh                  │
                     │         E-Commerce System                 │
                     │                                          │
  Guest ────────────│── Browse Products (10 categories) ───────│
                     │── View Product Details ─────────────────│
                     │── Search Products ──────────────────────│
                     │── View Hero Banners (3 + 2 side) ──────│
                     │── Browse Flash Sale ────────────────────│
                     │── Add to Cart ─────────────────────────│
                     │                                          │
  Customer ─────────│── Register Account ─────────────────────│
                     │── Login / Logout ──────────────────────│
                     │── Manage Cart ─────────────────────────│
                     │── Apply Coupon (4 codes) ──────────────│
                     │── Place Order (6 payment methods) ─────│
                     │── View Order History (progress stepper) │
                     │── Manage Wishlist ─────────────────────│
                     │── Submit Review ───────────────────────│
                     │── Use Live Chat ───────────────────────│
                     │── Contact Form ────────────────────────│
                     │                                          │
  Moderator ────────│── Login (Moderator) ────────────────────│
                     │── View Chat Stats ─────────────────────│
                     │── View Chat List ──────────────────────│
                     │── Reply to Customer ───────────────────│
                     │                                          │
  Admin ────────────│── Login (Admin) ────────────────────────│
                     │── View Dashboard Stats ─────────────────│
                     │── Add/Edit/Delete Products ────────────│
                     │── Manage Orders ───────────────────────│
                     │── View Users ──────────────────────────│
                     │── View Coupons ────────────────────────│
                     └──────────────────────────────────────────┘
```

## 2. Detailed Use Cases

### UC-01: Browse Products

| Field | Value |
|-------|-------|
| Actor | Guest, Customer |
| Preconditions | None |
| Flow | 1. User navigates to Shop page via Header or CategoryNav |
| | 2. System displays all 24 products in Daraz-style dense grid |
| | 3. User selects a category filter from sidebar |
| | 4. System filters products by selected category |
| | 5. User can also sort by Popularity, Price, Rating, or Newest |
| Postconditions | Products displayed matching filter criteria |

### UC-02: Add to Cart

| Field | Value |
|-------|-------|
| Actor | Guest, Customer |
| Preconditions | Viewing a product detail page |
| Flow | 1. User selects a size (if applicable) |
| | 2. User clicks "Add to Cart" |
| | 3. System adds product to cart (merges if same product+size exists) |
| | 4. System shows success notification |
| | 5. Header cart badge updates |
| Postconditions | Product is in the cart with selected size |

### UC-03: Place Order

| Field | Value |
|-------|-------|
| Actor | Customer |
| Preconditions | Cart is not empty |
| Flow | 1. User clicks "PROCEED TO CHECKOUT" |
| | 2. User fills in shipping details (name, phone, address) |
| | 3. User selects payment method from 6 options |
| | 4. User optionally applies coupon code |
| | 5. User reviews Order Summary sidebar |
| | 6. User clicks "PLACE ORDER" |
| | 7. System creates order with auto-generated ID |
| | 8. System clears cart |
| | 9. System shows order confirmation with action buttons |
| Postconditions | Order created with status "Pending" |

### UC-04: Admin Manage Products

| Field | Value |
|-------|-------|
| Actor | Admin |
| Preconditions | Logged in as admin |
| Flow | 1. Admin navigates to Admin Dashboard → Products tab |
| | 2. Admin sees product list with image, name, category, price |
| | 3. Admin can: Add new product (inline form) / Edit / Delete |
| | 4. System updates product catalog |
| Postconditions | Product catalog reflects changes |

### UC-05: Live Chat (Customer → Moderator)

| Field | Value |
|-------|-------|
| Actor | Customer, Moderator |
| Preconditions | Customer is logged in; Moderator is logged in |
| Flow | 1. Customer clicks floating chat bubble |
| | 2. Customer types and sends a message |
| | 3. Message appears in Moderator's chat interface |
| | 4. Moderator selects the user from the list |
| | 5. Moderator types and sends a reply |
| | 6. Reply appears in Customer's chat widget |
| Postconditions | Chat conversation recorded in localStorage |

### UC-06: Demo Quick Login

| Field | Value |
|-------|-------|
| Actor | Guest |
| Preconditions | On Login page |
| Flow | 1. User sees 3 demo access buttons (Admin, Moderator, Customer) |
| | 2. User clicks one of the buttons |
| | 3. System logs in as that role without password |
| | 4. System redirects to the appropriate dashboard |
| Postconditions | User logged in with selected role |
