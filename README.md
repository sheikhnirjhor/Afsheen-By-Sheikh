# Afsheen by Sheikh — Premium Fashion Hub

A full-stack e-commerce platform for premium Bangladeshi fashion and jewelry. Dhaka-based brand with 229K+ Facebook followers, specializing in heritage couture.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 6, Tailwind CSS v4, Lucide React |
| Backend | FastAPI (Python 3.10+), Pydantic v2 |
| Database | Firebase Firestore (with in-memory fallback) |
| State | React Context + localStorage (all frontend-managed) |

## Features

### Storefront
- Daraz-style dense product grid with discount badges
- Hero banner carousel (3 slides) + 2 side banners (2-column layout)
- Flash sale with countdown timer and sold progress bar
- 10 circular category icons
- Trending Now and Just For You sections
- 24 products across 10 categories with BDT pricing
- Category, price, size, and in-stock filtering
- Sorting by popularity, price, rating, newest
- Product detail with size selector, tabs, related products
- 6 customer testimonials, 6 FAQs, 3 store locations

### Shopping
- Daraz-style table cart with quantity controls
- Mini-cart hover dropdown in header
- 4 coupon codes: GOLDEN15 (15%), WELCOME10 (10%), BRIDAL5000 (৳5,000 off), FESTIVE20 (20%)
- 6 payment methods: bKash, Nagad, Visa, Mastercard, Rocket, COD
- Free shipping on orders above ৳2,000
- Wishlist with heart icon toggle
- Order confirmation with action buttons

### Dashboards
- **Admin** — Stats overview, product CRUD, order management with step buttons, user list, coupons
- **Moderator** — Chat stats, split-panel chat interface with user list and message threads
- **Customer** — Order history with visual progress stepper, review submission, live chat

### UX
- 4-tier navigation: TopBar, Header, CategoryNav, MobileNav (bottom sticky bar on mobile)
- Mega menu flyout for 10 categories
- Floating live chat widget with auto-reply
- Toast notification system
- Responsive across mobile, tablet, desktop
- Demo quick login (3 role buttons, no password required)

## Project Structure

```
Afsheen-by-Sheikh/
├── backend/
│   ├── main.py            # FastAPI application (18 endpoints)
│   ├── config.py          # Firebase config with 3-tier fallback
│   ├── requirements.txt   # Python dependencies
│   └── .env               # FIREBASE_CREDENTIALS_PATH
├── frontend/
│   ├── src/
│   │   ├── components/    # 11 components (TopBar, Header, CategoryNav, etc.)
│   │   ├── pages/         # 12 pages (Home, Shop, 3 Dashboards, etc.)
│   │   ├── context/       # AppContext.jsx (localStorage-based state management)
│   │   ├── data/          # products.js (24 products, 10 categories, banners, data)
│   │   ├── config/        # firebase.js (dead code, not imported)
│   │   ├── App.jsx        # View router (11 views via switch/case)
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles + Tailwind v4 (@layer base)
│   ├── package.json
│   ├── vite.config.js     # Proxy /api → localhost:8000
│   └── index.html
├── docs/                  # 21 project documentation files
├── .gitignore
└── README.md
```

## Setup

### Frontend (port 5173)
```bash
cd frontend
npm install
npm run dev
```

### Backend (port 8000)
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

The backend starts **without Firebase**. If no `serviceAccountKey.json` is found, it falls back to an in-memory mock database (data resets on restart).

### Firebase (optional)
1. Create a Firebase project at https://console.firebase.google.com
2. Enable Firestore Database
3. Download the service account key (JSON)
4. Place it at `backend/serviceAccountKey.json`
5. Set `FIREBASE_EMULATED=1` in `backend/.env` to use the Firebase Emulator instead

## Demo Accounts

Quick login via the Login page buttons (no password required):

| Role | Email | Demo Button |
|------|-------|-------------|
| Admin | admin@afsheen.com | "Admin" button |
| Moderator | moderator@afsheen.com | "Moderator" button |
| Customer | ayesha@example.com | "Customer" button |

## Coupon Codes

| Code | Discount | Condition |
|------|----------|-----------|
| GOLDEN15 | 15% off | None |
| WELCOME10 | 10% off | None |
| BRIDAL5000 | ৳5,000 off | Min ৳15,000 |
| FESTIVE20 | 20% off | None |

## Architecture Notes

- **Frontend is self-contained**: All data (products, cart, orders, reviews, users, session, wishlist, chat) is managed via `AppContext.jsx` using localStorage with `as_` prefix keys. The frontend does **not** call the backend API at runtime.
- **Backend is a standalone REST API**: 18 endpoints for products, orders, reviews, auth, users, contacts, and data seeding. Ready for future frontend-backend integration.
- **Vite proxy**: During development, `/api` requests from the frontend are proxied to `http://localhost:8000`.
- **CSS Cascade Layers**: Custom base styles are wrapped in `@layer base` to avoid overriding Tailwind CSS v4 utilities.
- **No React Router**: Views are managed via `currentView` state in AppContext with a switch/case in App.jsx.

## Currency

All prices are in **BDT (Bangladeshi Taka)**. The ৳ symbol is used throughout the UI.

## Documentation

21 documentation files in `docs/` covering project overview, problem statement, stakeholder analysis, requirements, user personas, user journeys, user stories, acceptance criteria, functional/non-functional requirements, use cases, DFD, SRS, ERD, system design, TDD, database design, component hierarchy, and API design.

## Test Frontend Branch