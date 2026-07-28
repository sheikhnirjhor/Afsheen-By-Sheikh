# 13 - Non-Functional Requirements

## 1. Performance

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-01 | Initial page load time | < 3 seconds on 3G |
| NFR-02 | API response time (backend) | < 500ms |
| NFR-03 | Frontend bundle size | < 500KB gzipped |
| NFR-04 | CSS Cascade Layers | Custom base styles in `@layer base` to avoid overriding Tailwind utilities |

## 2. Responsiveness

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-05 | Mobile layout | 320px – 767px (with bottom navigation bar) |
| NFR-06 | Tablet layout | 768px – 1023px |
| NFR-07 | Desktop layout | 1024px+ (max-width: 1200px content) |
| NFR-08 | Touch targets | Minimum 44x44px for interactive elements |
| NFR-09 | Hero banner height | Responsive: 200px (mobile) / 280px (tablet) / 340px (desktop) |

## 3. Browser Compatibility

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-10 | Chrome | Latest 2 versions |
| NFR-11 | Firefox | Latest 2 versions |
| NFR-12 | Safari | Latest 2 versions |
| NFR-13 | Edge | Latest 2 versions |

## 4. Data Persistence

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-14 | Frontend data storage | localStorage with "as_" prefix keys |
| NFR-15 | Backend data storage | Firebase Firestore or in-memory mock |
| NFR-16 | Session persistence | Survives browser refresh (as_session) |
| NFR-17 | Cart persistence | Survives browser refresh (as_cart) |
| NFR-18 | Wishlist persistence | Survives browser refresh (as_wishlist) |
| NFR-19 | Chat history persistence | Survives browser refresh (as_chat) |

## 5. Security

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-20 | Passwords stored in plaintext in localStorage | Known limitation (demo app) |
| NFR-21 | CORS configured for localhost:5173 and localhost:3000 | Development only |
| NFR-22 | Firebase credentials excluded from version control | .gitignore |

## 6. Usability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-23 | Navigation | TopBar + Header + CategoryNav + MobileNav (4-tier navigation) |
| NFR-24 | Feedback | Toast notifications for all user actions |
| NFR-25 | Error handling | Graceful fallbacks for missing data |
| NFR-26 | Accessibility | Semantic HTML, proper heading hierarchy |
| NFR-27 | Visual hierarchy | Daraz-style dense product cards with clear pricing |

## 7. Maintainability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-28 | Code organization | Components, pages, context, data, config separated |
| NFR-29 | State management | Centralized in AppContext.jsx with useApp() hook |
| NFR-30 | Styling | Tailwind CSS v4 utility classes with `@layer base` for custom styles |
| NFR-31 | Icons | Lucide React icon library |
| NFR-32 | No prop drilling | Every component calls useApp() directly |
