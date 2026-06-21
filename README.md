<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&amp;color=0:8a2387,50:e94057,100:f27121&amp;height=220&amp;section=header&amp;text=Grilli&amp;fontSize=80&amp;fontColor=fff&amp;animation=twinkling&amp;fontAlignY=38&amp;desc=Enterprise-Grade%20Full-Stack%20Fine%20Dining%20Ordering%20%26%20Reservation%20Platform&amp;descAlignY=60&amp;descSize=16" width="100%" />

<br/>

<p>
  <img src="https://img.shields.io/badge/FRONTEND-REACT%20+%20VITE-E94057?style=for-the-badge&logo=react&logoColor=white&labelColor=2d2d2d" />
  <img src="https://img.shields.io/badge/BACKEND-EXPRESS.JS-000000?style=for-the-badge&logo=express&logoColor=white&labelColor=555555" />
  <img src="https://img.shields.io/badge/DATABASE-MONGODB%20ATLAS-47A248?style=for-the-badge&logo=mongodb&logoColor=white&labelColor=2d2d2d" />
  <img src="https://img.shields.io/badge/REALTIME-SOCKET.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white&labelColor=2d2d2d" />
</p>

<p>
  <img src="https://img.shields.io/badge/STATE-REDUX%20TOOLKIT-764ABC?style=for-the-badge&logo=redux&logoColor=white&labelColor=2d2d2d" />
  <img src="https://img.shields.io/badge/DATA-REACT%20QUERY-FF4154?style=for-the-badge&logo=reactquery&logoColor=white&labelColor=2d2d2d" />
  <img src="https://img.shields.io/badge/AUTH-JWT-F27121?style=for-the-badge&logo=jsonwebtokens&logoColor=white&labelColor=555555" />
  <img src="https://img.shields.io/badge/CI%2FCD-GITHUB%20ACTIONS-2088FF?style=for-the-badge&logo=githubactions&logoColor=white&labelColor=2d2d2d" />
</p>

<p>
  <img src="https://img.shields.io/badge/TESTING-JEST-C21325?style=for-the-badge&logo=jest&logoColor=white&labelColor=2d2d2d" />
  <img src="https://img.shields.io/badge/DEPLOYMENT-VERCEL-000000?style=for-the-badge&logo=vercel&logoColor=white&labelColor=2d2d2d" />
  <img src="https://img.shields.io/badge/STATUS-LIVE-4CAF50?style=for-the-badge&labelColor=555555" />
  <img src="https://img.shields.io/badge/License-MIT-F27121?style=for-the-badge&labelColor=555555" />
</p>

<p>
  <img src="https://img.shields.io/github/stars/vinushinde2525-sys/Grilli-fine-dining-fullstack-app?style=social" />
  <img src="https://img.shields.io/github/forks/vinushinde2525-sys/Grilli-fine-dining-fullstack-app?style=social" />
  <img src="https://img.shields.io/github/last-commit/vinushinde2525-sys/Grilli-fine-dining-fullstack-app?color=F27121&style=flat-square" />
  <img src="https://img.shields.io/github/repo-size/vinushinde2525-sys/Grilli-fine-dining-fullstack-app?color=blue&style=flat-square" />
</p>

<br/>

**[🌐 Live Demo](https://grilli-fine-dining-fullstack-ic67m47po.vercel.app/)** &nbsp;·&nbsp; **[📖 Docs](#-getting-started)** &nbsp;·&nbsp; **[🐛 Report Bug](https://github.com/vinushinde2525-sys/Grilli-fine-dining-fullstack-app/issues)** &nbsp;·&nbsp; **[✨ Request Feature](https://github.com/vinushinde2525-sys/Grilli-fine-dining-fullstack-app/issues)**

</div>

---

## 📖 About the Project

> **Grilli** is a production-style full-stack fine-dining platform built with **React, Redux Toolkit, React Query, Node.js, Express, and MongoDB Atlas** — combining a real-time ordering and reservation system with a complete JWT auth flow, admin panel, and live notification layer over Socket.IO.

Most restaurant demo sites are single-page menus with no real backend behind them. **Grilli** goes further — a genuine full-stack ecosystem with a customer-facing storefront, auth-gated checkout, table reservations, an admin dashboard, role-based access control, and a CI pipeline that verifies every pull request.

This project was built as a **portfolio-grade application** to demonstrate production-style engineering — not just feature-building, but real debugging, automated test coverage on both ends (Jest, Supertest, mongodb-memory-server, React Testing Library), and a CI/CD pipeline running on GitHub Actions.

<details>
<summary>📸 Screenshots &nbsp;—&nbsp; click to expand</summary>

<br/>

| Page | Preview |
|------|---------|
| 🖥️ Homepage | Hero, featured dishes, and reservation CTA |
| 🍽️ Menu | Filterable dish grid with detail view |
| 📅 Reservations | Booking flow with confirmation reference |
| 🛒 Checkout & Orders | Cart → login-gated checkout → order history |

</details>

---

## ✨ Features

<details open>
<summary>🍽️ &nbsp; Dining & Ordering</summary>

<br/>

- 🍽️ **Browse the menu** — category, veg/non-veg, price, and search filters, plus featured / special / popular / recommended / trending views
- 📅 **Make a reservation** — booking flow with a confirmation reference page
- 🛒 **Cart & checkout** — persistent cart (Redux Toolkit + localStorage), auth-gated checkout, Razorpay payment integration
- 📦 **Order history** — view past and in-progress orders, with detail pages
- ❤️ **Wishlist** — save dishes for later, plus recently viewed
- 🎉 **Events** — browse and view restaurant event listings
- 🖼️ **Gallery** — visual showcase of the restaurant
- 💬 **Testimonials** — customer feedback shown on the storefront

</details>

<details>
<summary>🖥️ &nbsp; Admin Panel</summary>

<br/>

- 📊 **Analytics dashboard** — revenue and content stats at a glance (Recharts)
- 🍽️ **Menu management** — create, update, delete menu items
- 📦 **Order management** — view all orders, update order status
- 📅 **Reservation management** — view all reservations, update status
- 🎉 **Events & testimonials CMS** — full CRUD on events and testimonials
- 👥 **User management** — list, update role, and delete users
- 🛡️ **Role-based route protection** — admin vs. customer guards on every admin route

</details>

<details>
<summary>🔐 &nbsp; Authentication & Realtime</summary>

<br/>

- 🔑 **JWT dual-token auth** — register, login, access + refresh token pair
- 🔄 **Token refresh** — dedicated `/refresh` endpoint for silent re-auth
- 🔐 **Password management** — change password, forgot/reset password via emailed token
- 👤 **Profile management** — authenticated user profile page
- 🔔 **Live notifications** — real-time updates over Socket.IO, with mark-all-read
- 🔌 **Socket.IO singleton pattern** — one stable connection per session, not per render

</details>

<details>
<summary>⚙️ &nbsp; DevOps & Testing</summary>

<br/>

- ✅ **38 automated tests** — Jest + Supertest (backend) and Jest + React Testing Library (frontend)
- 🔄 **GitHub Actions CI/CD** — test + build on every push touching `client/` or `server/`
- 🐳 **Docker support** — Dockerfile per app + root `docker-compose.yml` for local dev
- 🚀 **Deployed on Vercel** — frontend live, backend deployable as a standalone web service
- ✉️ **Graceful service degradation** — email, Cloudinary, and Razorpay integrations fail gracefully when not configured
- 🩺 **Health-check endpoint** — `/api/health` for uptime monitoring
- 🔒 **Hardened API** — Helmet, rate limiting, Mongo sanitization

</details>

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) | 18.x | UI component library |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | 5.x | Build tooling & dev server |
| ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white) | 2.x | Client-side state management |
| ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white) | 5.x | Server-state fetching & caching |
| ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white) | v6 | Client-side routing |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) | 3.x | Utility-first styling |
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white) | 11.x | Page transitions & animation |
| ![Socket.io Client](https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=socketdotio&logoColor=white) | 4.x | Real-time updates |
| Axios, React Hook Form, Recharts, Swiper, lucide-react, react-hot-toast | — | HTTP client, forms, charts, carousels, icons, toasts |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) | ≥18.x | JavaScript server runtime |
| ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white) | 4.x | REST API framework |
| ![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white) | — | Cloud-hosted document database |
| ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logoColor=white) | 8.x | ODM + schema validation, startup-time index cleanup |
| ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=socketdotio&logoColor=white) | 4.x | Real-time event system |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) | 9.x | Access + refresh token authentication |
| bcryptjs, Helmet, express-rate-limit, express-mongo-sanitize, express-validator | — | Hashing & API hardening |
| Cloudinary, Razorpay, Nodemailer, Winston | — | Image uploads, payments, transactional email, logging |

### Testing & DevOps

| Tool | Purpose |
|------|---------|
| ![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white) | Test runner, frontend & backend |
| ![Testing Library](https://img.shields.io/badge/Testing_Library-E33332?style=flat-square&logo=testinglibrary&logoColor=white) | React component & interaction testing |
| Supertest, mongodb-memory-server | Real Express app + in-memory MongoDB for API tests |
| ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white) | CI/CD pipeline |
| ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) | Containerised local dev |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) | Frontend deployment |

---

## 🏗️ Architecture

```
Browser / Client
       │
       ▼
React SPA (Vite)
  ├── Redux Toolkit  →  Auth state, persisted cart
  ├── React Query    →  Server cache (menu, orders, content)
  ├── Socket.io      →  Singleton connection — live notifications
  └── React Router   →  Public, auth-gated, and admin route guards
       │
       ▼  REST API + WebSocket
Express.js Server (app.js / server.js split — app testable without listen())
  ├── JWT Middleware  →  protect / optionalAuth / authorize('admin')
  ├── Security        →  Helmet, CORS, rate limiting, mongo-sanitize
  ├── Routes          →  auth, menu, order, reservation, content, admin
  └── Socket.io       →  socketHandler — notification broadcasting
       │
       ▼
MongoDB Atlas (Mongoose)
  ├── User         (auth, role, profile)
  ├── MenuItem     (categories, pricing, flags)
  ├── Order        (items, status history, crypto-based orderId)
  ├── Reservation  (reference code, status)
  └── misc         (Event, Testimonial, Notification)
       │
       ▼
Optional Integrations (fail gracefully if unset)
  ├── Cloudinary  →  Image upload
  ├── Razorpay    →  Payment processing
  └── Nodemailer  →  Email verification + password reset
```

---

## 📂 Project Structure

```bash
grilli/
│
├── 📁 .github/
│   └── workflows/
│       ├── frontend.yml          # CI: install → Jest → Vite build
│       └── backend.yml           # CI: install → Jest (Supertest + in-memory Mongo) → startup check
│
├── 📁 client/                    # React + Vite frontend
│   └── src/
│       ├── 📁 components/
│       │   ├── cart/             # CartDrawer, checkout redirect logic
│       │   ├── home/             # Hero, featured sections
│       │   ├── layout/           # Navbar, Footer, MainLayout
│       │   └── ui/                # Shared UI primitives
│       ├── 📁 context/
│       │   └── SocketContext.jsx # Singleton Socket.IO connection
│       ├── 📁 hooks/
│       │   └── useApi.js         # React Query hooks
│       ├── 📁 layouts/           # MainLayout — route-level layout, scroll handling
│       ├── 📁 pages/             # Home, Menu, Reservation, Checkout, Orders, admin/*
│       ├── 📁 routes/            # Protected/admin route config
│       ├── 📁 services/          # Axios API client
│       ├── 📁 store/             # Redux Toolkit — authSlice, store index
│       └── main.jsx              # React Query client config
│   └── tests/
│       ├── unit/                 # cart, helpers, authSlice
│       └── component/            # CartDrawer
│
├── 📁 server/                    # Express REST API
│   └── src/
│       ├── 📁 config/            # db.js — Mongo connection, legacy index cleanup
│       ├── 📁 controllers/       # auth, menu, order, reservation, content, admin
│       ├── 📁 middleware/        # auth (protect/authorize/optionalAuth), error
│       ├── 📁 models/            # User, MenuItem, Order, Reservation, misc
│       ├── 📁 routes/            # authRoutes, menuRoutes, orderRoutes, reservationRoutes, contentRoutes, adminRoutes
│       ├── 📁 services/          # emailService — non-fatal email sending
│       ├── 📁 seed/              # seeder.js — database seed script
│       ├── 📁 sockets/           # socketHandler — Socket.IO event wiring
│       ├── app.js                # Express app (used directly by tests, no listen())
│       └── server.js             # Entry point — connects DB and starts the HTTP server
│   └── tests/                    # auth, menu, error — Jest + Supertest
│
├── docker-compose.yml
└── README.md
```

---

## 🔌 API Endpoints

<details open>
<summary>🔐 Authentication</summary>

```http
POST   /api/auth/register              # Register new account
POST   /api/auth/login                 # Login with email + password
POST   /api/auth/logout                # Logout (protected)
GET    /api/auth/me                    # Get current user profile (protected)
PUT    /api/auth/profile               # Update profile (protected)
PUT    /api/auth/change-password       # Change password (protected)
POST   /api/auth/forgot-password       # Send password reset email
PUT    /api/auth/reset-password/:token # Reset password with token
POST   /api/auth/refresh               # Rotate access + refresh tokens
```

</details>

<details>
<summary>🍽️ Menu</summary>

```http
GET    /api/menu                       # Get all items (filter, search)
GET    /api/menu/categories            # Get all categories
GET    /api/menu/featured              # Get featured items
GET    /api/menu/special               # Get daily specials
GET    /api/menu/popular               # Get popular items
GET    /api/menu/recommended           # Get recommended items
GET    /api/menu/trending              # Get trending items
GET    /api/menu/:id                   # Get single item
POST   /api/menu                       # Create item (admin)
PUT    /api/menu/:id                   # Update item (admin)
DELETE /api/menu/:id                   # Delete item (admin)
```

</details>

<details>
<summary>📦 Orders & 📅 Reservations</summary>

```http
POST   /api/orders/create-payment      # Create Razorpay payment order
POST   /api/orders/verify-payment      # Verify Razorpay payment signature
POST   /api/orders                     # Place new order
GET    /api/orders                     # Get all orders (protected)
GET    /api/orders/:orderId            # Get order details (protected)
PUT    /api/orders/:orderId/status     # Update order status (admin)

POST   /api/reservations               # Create a reservation
GET    /api/reservations               # Get all reservations (admin)
GET    /api/reservations/:refId        # Get reservation by reference
PUT    /api/reservations/:refId/status # Update reservation status (admin)
```

</details>

<details>
<summary>🎉 Content & 🛠️ Admin</summary>

```http
GET    /api/content/events             # List events
GET    /api/content/events/:id         # Get single event
GET    /api/content/testimonials       # List testimonials
GET    /api/content/stats              # Public site stats
POST   /api/content/events             # Create event (admin)
PUT    /api/content/events/:id         # Update event (admin)
DELETE /api/content/events/:id         # Delete event (admin)
POST   /api/content/testimonials       # Create testimonial (admin)
PUT    /api/content/testimonials/:id   # Update testimonial (admin)
DELETE /api/content/testimonials/:id   # Delete testimonial (admin)
GET    /api/content/analytics          # Dashboard analytics (admin)
GET    /api/content/notifications      # Get current user's notifications (protected)
PUT    /api/content/notifications/read-all # Mark all notifications read (protected)

GET    /api/admin/users                # List users (admin)
PUT    /api/admin/users/:id            # Update user (admin)
DELETE /api/admin/users/:id            # Delete user (admin)

GET    /api/health                     # Health check
```

</details>

---

## 🧪 Testing

**38 automated tests** across frontend and backend.

### Backend — Jest + Supertest

```bash
cd server
npm test
```

| Test Suite | Tests | Coverage |
|---|---|---|
| `auth` | 8 | Register, login, password hashing, protected routes, refresh flow |
| `menu` | 5 | Listing, filtering, 404 handling |
| `error` | 6 | Global error-handling middleware |
| **Total** | **19** | ✅ |

Spins up an in-memory MongoDB (`mongodb-memory-server`) and exercises the real Express app via `supertest` — no mocking of the database layer.

### Frontend — Jest + React Testing Library

```bash
cd client
npm test
```

| Test Suite | Tests | Coverage |
|---|---|---|
| `cart` | 7 | Add/remove/quantity reducer logic |
| `helpers` | 7 | Currency/date utility functions |
| `authSlice` | 5 | Auth reducer behavior |
| `CartDrawer` | 4 | Empty state, item rendering, removing an item, checkout button |
| **Total** | **19** | ✅ |

Uses **React Testing Library** + **user-event** against the real Redux store logic.

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Required |
|------|---------|----------|
| Node.js | ≥ 18.x | ✅ Always |
| MongoDB | local or Atlas | ✅ Always |
| npm | ≥ 9.x | ✅ Always |

---

## ⚙️ Installation

**Step 1 — Clone the repository**

```bash
git clone https://github.com/vinushinde2525-sys/Grilli-fine-dining-fullstack-app.git
cd Grilli-fine-dining-fullstack-app
```

**Step 2 — Backend**

```bash
cd server
npm install
cp .env.example .env   # fill in your own values
npm start               # production
npm run dev              # development (nodemon)
```

Runs on `http://localhost:3001`

**Step 3 — Frontend**

```bash
cd client
npm install
npm run dev
```

Runs on `http://localhost:5173`

**Step 4 — Seed the database (first run only)**

```bash
cd server
npm run seed
```

---

## 🌐 Live Deployment

| Environment | URL |
|-------------|-----|
| 🚀 **Production (Live)** | **[grilli-fine-dining-fullstack-ic67m47po.vercel.app](https://grilli-fine-dining-fullstack-ic67m47po.vercel.app/)** |
| 💻 Local Frontend | http://localhost:5173 |
| 🔌 Local Backend API | http://localhost:3001 |
| ❤️ Health Check | http://localhost:3001/api/health |

---

## 🔐 Environment Variables

### `server/.env`

| Variable | Description |
|---|---|
| `NODE_ENV` | `development` / `production` / `test` |
| `PORT` | API port (default `3001`) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing access tokens |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens |
| `JWT_EXPIRE` / `JWT_REFRESH_EXPIRE` | Token lifetimes |
| `EMAIL_HOST` / `EMAIL_PORT` / `EMAIL_USER` / `EMAIL_PASS` / `EMAIL_FROM` | SMTP credentials — optional, app runs fully without these |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Image upload credentials — optional |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Payment gateway credentials — optional |
| `CLIENT_URL` | Frontend origin, used for CORS and email links |

See `server/.env.example` for the full template — no real secrets are committed.

### `client/.env`

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the backend API |
| `VITE_RAZORPAY_KEY_ID` | Public Razorpay key for client-side checkout |

---

## 🔄 CI/CD Pipeline

Two GitHub Actions workflows run automatically, scoped by path:

```
Push to main
    │
    ├── Frontend CI (frontend.yml) — triggers on client/** changes
    │     ├── Checkout + Node 20 setup
    │     ├── npm ci (cached)
    │     ├── npm test  →  19 tests ✅
    │     └── npm run build  →  dist/ ✅
    │
    └── Backend CI (backend.yml) — triggers on server/** changes
          ├── Checkout + Node 20 setup
          ├── npm ci (cached)
          ├── npm test  →  19 tests ✅ (Supertest + in-memory Mongo)
          └── npm start + curl /api/health  →  startup verified ✅
```

This means every pull request gets automatic test and build verification before merging.

**Deployment**
- **Frontend** — deployed on **Vercel**. Build command: `npm run build`, publish directory: `dist`.
- **Backend** — deploy `server/` as a web service (Render or similar). Start command: `npm start`. Set all variables from the table above in the host's environment settings.
- **Database** — MongoDB Atlas (or any managed MongoDB) — set the connection string as `MONGODB_URI`.

---

## 🐳 Docker

```bash
docker-compose up --build
# Services: client (Nginx), server (Node.js)
```

Each app has its own `Dockerfile`; `docker-compose.yml` at the repo root runs both together for local container testing.

---

## ⚡ Performance & Architecture Decisions

| Decision | Reason |
|---|---|
| Redux for auth, React Query for everything else | Clear separation of client state vs. server-state caching — no overlap, no duplicated source of truth |
| Socket.IO singleton keyed on primitives | Stable connection across route changes instead of re-creating a socket per render |
| `app.js` / `server.js` split | Express app importable directly by `supertest` with no real DB connection or open port |
| Standardised redirect state (`state.from`) | Auth-gated checkout survives direct navigation without brittle query-string redirects |
| Optional integrations fail gracefully | Email, Cloudinary, and Razorpay are non-fatal if unconfigured — app stays fully usable |
| Startup-time legacy index cleanup | Avoids stale Mongo index conflicts across schema iterations without manual intervention |

---

## 🧩 Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| Keeping a single Socket.IO connection stable across route changes | Moved to a singleton socket pattern keyed on stable primitive values instead of object references |
| Avoiding stale/empty data after failed fetches | Tuned React Query `staleTime` per query type instead of using a single global value |
| Making auth-gated checkout resilient to direct navigation | Standardised redirect state (`state.from`) instead of query-string redirects |
| Keeping the app usable without third-party services configured | Made email and payment integrations fail gracefully rather than crash the server |
| Verifying every change before merge | Added path-scoped GitHub Actions CI to run tests + build on each app independently |

---

## 🌟 Key Highlights for Recruiters

| What | Detail |
|------|--------|
| 🏗️ **Genuine full-stack architecture** | JWT-authenticated Express API backed by MongoDB Atlas, not a static demo |
| 🔐 **Production-grade auth** | Dual JWT + refresh rotation, change/forgot/reset password flows |
| 📡 **Real-time layer** | Socket.IO singleton pattern, live notifications, mark-all-read |
| 🛠️ **Admin scope** | Menu, orders, reservations, events, testimonials, analytics, user role management |
| 🧪 **38 automated tests** | Realistic coverage across auth, menu, error handling, Redux slices, and UI components |
| 🔄 **Path-scoped CI/CD** | GitHub Actions runs only the relevant pipeline per change — fast, focused checks |
| 🐳 **Docker-ready** | Per-app Dockerfiles + root `docker-compose.yml` — zero-friction local onboarding |

---

## 🗺️ Roadmap

- [ ] 💳 Live payment gateway integration (Razorpay keys are present but optional)
- [ ] 📊 Admin analytics dashboard enhancements
- [ ] 🗺️ Table/seating map for reservations
- [ ] ⭐ Customer reviews on dishes
- [ ] 📱 PWA support for mobile ordering

---

## 🤝 Contributing

Contributions, feature suggestions, and pull requests are always welcome!

```bash
# 1. Fork the repository

# 2. Create your feature branch
git checkout -b feature/AmazingFeature

# 3. Commit your changes
git commit -m 'feat: add AmazingFeature'

# 4. Push to the branch
git push origin feature/AmazingFeature

# 5. Open a Pull Request
```

---

## 📄 License

MIT — built for portfolio/demo purposes.

---

## 👨‍💻 Author

<div align="center">

**Built with ❤️ as a portfolio project**

*Demonstrating expertise in:*

`Full-Stack Development` &nbsp;·&nbsp; `React Architecture` &nbsp;·&nbsp; `REST API Design` &nbsp;·&nbsp; `Real-Time Systems (Socket.IO)` &nbsp;·&nbsp; `JWT Authentication` &nbsp;·&nbsp; `MongoDB & Indexing` &nbsp;·&nbsp; `Client/Server State Separation (Redux + React Query)` &nbsp;·&nbsp; `Automated Testing (Jest, RTL, Supertest)` &nbsp;·&nbsp; `CI/CD (GitHub Actions)`

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/vinushinde2525-sys)
[![Live Demo](https://img.shields.io/badge/Live_Demo-F27121?style=for-the-badge&logo=vercel&logoColor=white)](https://grilli-fine-dining-fullstack-ic67m47po.vercel.app/)

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&amp;color=0:8a2387,50:e94057,100:f27121&amp;height=120&amp;section=footer" width="100%"/>

**⭐ Star this repo if you found it useful — it helps more than you think! ⭐**

</div>
