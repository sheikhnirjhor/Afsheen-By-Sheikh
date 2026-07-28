# 09 - User Journey

## 1. Guest User Journey (Browse & Cart)

```
Landing Page (Home)
  ↓
TopBar → Sell on Afsheen / Customer Care / Order Tracking / Login
  ↓
Header → Search Products / Heart Icon / Cart Icon / Account Dropdown
  ↓
CategoryNav → ☰ All Categories (mega menu) / Category Links
  ↓
Hero Banner → Auto-sliding carousel (3 slides) + 2 side banners
  ↓
Flash Sale → Countdown timer + discounted products scroll
  ↓
Category Icons → 10 category thumbnails → Shop Page
  ↓
Trending Now → Product cards → "VIEW ALL" → Shop Page
  ↓
Shop Page
  ├── Sidebar Filters: Category, Price Range, Size, Availability
  ├── Search bar
  ├── Sort: Popularity / Price (Low-High, High-Low) / Newest / Top Rated
  └── Product Grid (Daraz-style dense cards)
  ↓
Click Product Card → Product Detail Page
  ├── Breadcrumb: Home / Shop / Product Name
  ├── Image + Discount Badge
  ├── Size Selector + Quantity + Add to Cart + Buy Now + Wishlist
  ├── Tabs: Description / Specifications / Reviews
  └── Related Products ("You May Also Like")
  ↓
Add to Cart → Cart badge updates → Notification shown
  ↓
Cart Icon → Cart Page
  ├── Table-style layout (Product, Price, Quantity, Total, Remove)
  ├── Voucher code input (GOLDEN15, WELCOME10, BRIDAL5000, FESTIVE20)
  └── Order Summary sidebar (Subtotal, Discount, Shipping, Total)
  ↓
"PROCEED TO CHECKOUT" → Checkout
  ├── Shipping Information (Name, Phone, Address, City, Note)
  ├── Payment Method tiles (bKash, Nagad, Visa, MC, Rocket, COD)
  └── "PLACE ORDER" → Order Confirmation
```

## 2. Registered Customer Journey

```
Login Page → Quick Demo Access (3 role buttons)
  ↓
Customer Dashboard
  ├── My Orders → Expandable order cards with progress stepper
  │   └── Steps: Pending → Processing → Shipped → Delivered
  ├── Reviews → Review submission form + history
  └── Live Chat → Chat interface with support team
  ↓
Continue Shopping → Shop Page
  ↓
... (same as Guest from Cart onwards)
```

## 3. Admin User Journey

```
Login Page → Quick Demo Access → Admin button
  ↓
Admin Dashboard
  ├── Overview Tab → Stats cards (Revenue, Orders, Products, Users) + Recent Orders
  ├── Products Tab → Product list + Add/Edit/Delete + Inline add form
  ├── Orders Tab → Order cards with status step buttons
  ├── Users Tab → User list with role badges
  └── Coupons Tab → Active coupon codes
  ↓
Logout → Home
```

## 4. Moderator User Journey

```
Login Page → Quick Demo Access → Moderator button
  ↓
Moderator Dashboard
  ├── Stats: Active Chats, Messages, Response Time
  └── Chat Interface
      ├── Left Panel: User list with search + last message preview
      └── Right Panel: Message thread + Reply input
  ↓
Reply to customer → Message sent with timestamp
```

## 5. Navigation Structure

```
TopBar (orange utility bar)
├── Sell on Afsheen → Shop
├── Customer Care → Contact
├── Order Tracking → Customer Dashboard / Login
├── Login / Sign Up (or Hi, {name} if logged in)

Header (sticky, white)
├── Logo (A + "Afsheen" + "PREMIUM FASHION")
├── Search Bar ("Search in Afsheen")
├── Heart Icon → Wishlist / Login
├── Cart Icon → Cart (with hover mini-cart dropdown)
└── Account Icon → Dropdown (My Account, Sign Out)

CategoryNav (white, below header)
├── ☰ All Categories (mega menu flyout with 10 categories)
└── Category Links (horizontal scroll)

MobileNav (bottom sticky bar, mobile only)
├── Home / Categories / Cart (with badge) / Wishlist / Account
```
