# 11 - Acceptance Criteria

## 1. Product Browsing (US-01, US-02, US-03)

### AC-01: Category Filtering
- **Given** I am on the Shop page
- **When** I select a category from the sidebar (Bridal Outfit, Bengali Couple Set, etc.)
- **Then** only products in that category are displayed
- **And** the category filter is visually highlighted

### AC-02: Product Detail View
- **Given** I click on a product card
- **When** the Product Detail page loads
- **Then** I see the product image, name, description, price (BDT), original price, discount %, category, sold count, sizes, rating, and reviews
- **And** I can select a size from available options
- **And** I can click "Add to Cart" or "Buy Now"
- **And** I can toggle the wishlist heart icon

### AC-03: Search
- **Given** I am on the Shop page or Header
- **When** I type in the search bar
- **Then** products are filtered by name or category matching the search term

## 2. Shopping Cart (US-04, US-14)

### AC-04: Add to Cart
- **Given** I am on a Product Detail page
- **When** I click "Add to Cart"
- **Then** the product is added to my cart with the selected size and quantity 1
- **And** a success notification is shown
- **And** the cart badge count updates in the Header

### AC-05: Cart Management
- **Given** I am on the Cart page
- **When** I adjust quantity (+/-)
- **Then** the item quantity updates and the total recalculates
- **When** I click "Remove" (trash icon)
- **Then** the item is removed from the cart

## 3. Checkout (US-15, US-16)

### AC-06: Checkout Flow
- **Given** I have items in my cart
- **When** I click "PROCEED TO CHECKOUT"
- **Then** I must provide: name, phone, address
- **And** I can select payment method (bKash, Nagad, Visa, MC, Rocket, COD)
- **And** I can apply voucher codes (GOLDEN15, WELCOME10, BRIDAL5000, FESTIVE20)
- **And** I see the Order Summary sidebar with subtotal, discount, shipping, total
- **When** I click "PLACE ORDER"
- **Then** an order is created with status "Pending"
- **And** the cart is cleared
- **And** I see an order confirmation

## 4. Authentication (US-12, US-13, US-24)

### AC-07: Registration
- **Given** I am on the Register page
- **When** I provide name, email, phone, password, confirm password
- **Then** a new user account is created with role "customer"
- **And** I am automatically logged in and redirected to customer dashboard

### AC-08: Demo Login
- **Given** I am on the Login page
- **When** I click a demo access button (Admin, Moderator, Customer)
- **Then** I am logged in as that role and redirected to the appropriate dashboard

### AC-09: Logout
- **Given** I am logged in
- **When** I click "Sign Out" from the account dropdown
- **Then** my session is cleared and I am redirected to the Home page

## 5. Admin Dashboard (US-25 to US-31)

### AC-10: Product Management
- **Given** I am logged in as admin
- **When** I navigate to the Admin Dashboard → Products tab
- **Then** I can view all products with image, name, category, price
- **And** I can add a new product via inline form
- **And** I can edit/delete existing products

### AC-11: Order Management
- **Given** I am logged in as admin
- **When** I view orders in the Admin Dashboard → Orders tab
- **Then** I can see all orders with their current status
- **And** I can update an order's status via step buttons (Pending, Processing, Shipped, Delivered)

## 6. Moderator Dashboard (US-32 to US-35)

### AC-12: Live Chat
- **Given** I am logged in as moderator
- **When** I navigate to the Moderator Dashboard
- **Then** I see chat stats and a split-panel chat interface
- **And** I can select a user from the list to view their messages
- **And** I can type and send a reply that appears in the message thread

## 7. Customer Dashboard (US-17, US-18, US-20)

### AC-13: Order Tracking
- **Given** I am logged in as customer
- **When** I view My Orders
- **Then** I see expandable order cards with a visual progress stepper (Pending → Processing → Shipped → Delivered)

### AC-14: Live Chat
- **Given** I am logged in as customer
- **When** I open the Live Chat widget (floating bubble)
- **Then** I can type and send messages
- **And** I see the support team's replies in real-time
