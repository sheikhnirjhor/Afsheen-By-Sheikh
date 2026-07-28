# 04 - Information Gathering

## 1. Data Sources

### Brand Data
- Product catalog: 24 products with names, descriptions, prices (BDT), images, ratings, sold counts
- Store locations: 3 physical stores in Dhaka
  - Gulshan Flagship Lounge (House 12, Road 79, Gulshan 2)
  - Dhanmondi Design Atelier (House 42, Road 11A, Dhanmondi R/A)
  - Tatibazar Heritage Jewellery Studio (by appointment)
- Contact: +880 1712-345678, info@afsheenbysheikh.com
- Facebook: 229K+ followers

### Customer Data
- 3 demo users pre-seeded in the application (admin, moderator, customer)
- Customer reviews (6 pre-seeded)
- Testimonials (6 featured on homepage)

### Product Categories (10 Total)
| Category | Icon |
|----------|------|
| Bridal Outfit | 👗 |
| Bengali Couple Set | 👫 |
| Bengali Family Combo | 👨‍👩‍👧‍👦 |
| Gown | 👗 |
| Saree | 🧣 |
| Lehenga | ✨ |
| Indian Party Dress | 🥻 |
| Pakistani Luxury | 🎁 |
| Skincare Products | 🌿 |
| Jewellery & Accessories | 💍 |

### Payment Methods (6)
bKash, Nagad, Visa, Mastercard, Rocket, Cash on Delivery

### Coupon Codes (4)
| Code | Discount | Condition |
|------|----------|-----------|
| GOLDEN15 | 15% off | None |
| WELCOME10 | 10% off | None |
| BRIDAL5000 | ৳5,000 off | Min. ৳15,000 order |
| FESTIVE20 | 20% off | None |

### Technical Data
- Frontend runs on Vite dev server (port 5173)
- Backend runs on Uvicorn (port 8000)
- Vite proxies `/api` requests to the backend
- Frontend state managed via React Context + localStorage (no Firebase Auth)
- Backend uses Firebase Firestore (with in-memory fallback)
- Tailwind CSS v4 with CSS Cascade Layers (`@layer base` for custom styles)

## 2. Research Methods

- Brand website analysis for product data and content
- Competitive analysis of Bangladeshi e-commerce platforms (Daraz.com.bd)
- Technical architecture review of similar e-commerce stacks

## 3. Key Findings

1. The brand targets a premium segment with BDT 2,200 – 52,000 price range
2. Mobile-first design is critical (Bangladesh has high mobile internet penetration)
3. Cash on Delivery is the primary payment method in Bangladesh
4. Delivery within Dhaka (24-48 hours) is expected; nationwide courier takes 2-3 days
5. Heritage and craftsmanship storytelling differentiates the brand
6. Flash sales and countdown timers drive urgency and conversions (Daraz pattern)
7. Live chat support improves customer satisfaction and reduces support tickets
