# Grilli Restaurant — Full Stack App

## Stack
- **Frontend**: React + Vite + Redux Toolkit + React Query + Tailwind + Framer Motion
- **Backend**: Node.js + Express + MongoDB Atlas + Socket.IO + JWT

## Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

## Quick Start

### 1. Backend
```bash
cd server
npm install
# Edit .env with your MongoDB URI and JWT secrets
npm run dev
```
Runs on http://localhost:3001

### 2. Frontend
```bash
cd client
npm install
npm run dev
```
Runs on http://localhost:5173

### 3. Seed Database (first run)
```bash
cd server
npm run seed
```

## Bugs Fixed

| # | Bug | Root Cause | Fix |
|---|-----|-----------|-----|
| 1 | Routes require browser refresh | `MainLayout` used `window.location` instead of React Router `useLocation`; also had double scroll handler with App.jsx `ScrollToTop` | Restored `useLocation` import; removed duplicate scroll `useEffect` from MainLayout |
| 2 | Page flash on navigation | `AnimatePresence mode="wait"` caused old page to fully exit before new page mounted | Replaced with simple `motion.main` fade-in, no `AnimatePresence` |
| 3 | Menu renders empty | `staleTime: Infinity` on categories meant failed fetches were never retried | `staleTime: 0` globally; categories `staleTime: 5min` |
| 4 | Cart → Checkout login redirect broken | `CartDrawer` navigated `/login?redirect=/checkout` but `LoginPage` reads `state.from` | Fixed to `navigate('/login', { state: { from: '/checkout' } })` |
| 5 | `POST /api/orders` 400 orderNumber already exists | Legacy MongoDB unique index `orderNumber_1` from old schema conflicting with new `orderId` field; also weak random generation | Drop legacy index on startup; use `crypto.randomBytes` + timestamp for collision-proof IDs |
| 6 | Email 535 auth error crashes app | transporter created with placeholder creds and error propagated | Check for configured creds before creating transporter; all email failures are non-fatal warnings |
| 7 | Socket.IO reconnects on every page navigation | `useEffect` deps included entire `user` object (new reference each render) → effect re-ran → disconnect+reconnect | Singleton socket pattern; stable primitive deps (`userId`, `userRole`, `isAuth`) |
| 8 | 4 dishes present in seeder | Palak Paneer Tartlet, Salmon Rice Bowl, Mutton Special, Stir-Fried Noodles in seeder.js | Removed from seeder.js |

## Files Modified
- `server/src/models/Order.js` — crypto-based orderId, legacy index cleanup
- `server/src/config/db.js` — drop `orderNumber_1` index on connect
- `server/src/services/emailService.js` — skip if unconfigured, non-fatal errors
- `server/src/seed/seeder.js` — 4 dishes removed
- `client/src/layouts/MainLayout.jsx` — fixed `useLocation`, removed `AnimatePresence`
- `client/src/main.jsx` — `staleTime: 0`, `retry: 2`
- `client/src/hooks/useApi.js` — categories `staleTime: 5min`
- `client/src/context/SocketContext.jsx` — singleton socket, stable effect deps
- `client/src/components/cart/CartDrawer.jsx` — fixed login redirect

## Route Table
| Route | Component | Auth |
|-------|-----------|------|
| `/` | Home | Public |
| `/about` | AboutPage | Public |
| `/menu` | MenuPage | Public |
| `/menu/:id` | MenuDetail | Public |
| `/events` | EventsPage | Public |
| `/events/:id` | EventDetail | Public |
| `/gallery` | GalleryPage | Public |
| `/contact` | ContactPage | Public |
| `/reservation` | ReservationPage | Public |
| `/reservation/success/:ref` | ReservationSuccess | Public |
| `/wishlist` | WishlistPage | Public |
| `/login` | LoginPage | Public |
| `/register` | RegisterPage | Public |
| `/checkout` | CheckoutPage | Auth required |
| `/orders` | OrderHistoryPage | Auth required |
| `/orders/:id` | OrderDetailPage | Auth required |
| `/order-success/:id` | OrderSuccess | Auth required |
| `/profile` | ProfilePage | Auth required |
| `/notifications` | NotificationsPage | Auth required |
| `/admin/*` | AdminLayout + pages | Admin only |

## Environment Variables (server/.env)
```
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/grilli
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRE=7d
# Optional - app works without these
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLOUDINARY_CLOUD_NAME=...
RAZORPAY_KEY_ID=...
```
