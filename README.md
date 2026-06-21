<<<<<<< HEAD
<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:8a2387,50:e94057,100:f27121&height=220&section=header&text=Grilli&fontSize=80&fontColor=fff&animation=twinkling&fontAlignY=38&desc=Full-Stack%20Fine%20Dining%20Reservation%20and%20Ordering%20Platform&descAlignY=60&descSize=18" width="100%" />

<br/>

<p>
  <img src="https://img.shields.io/badge/FRONTEND-REACT%20+%20VITE-E94057?style=for-the-badge&logo=react&logoColor=white&labelColor=2d2d2d" />
  <img src="https://img.shields.io/badge/BACKEND-EXPRESS.JS-000000?style=for-the-badge&logo=express&logoColor=white&labelColor=555555" />
  <img src="https://img.shields.io/badge/DATABASE-MONGODB%20ATLAS-47A248?style=for-the-badge&logo=mongodb&logoColor=white&labelColor=2d2d2d" />
  <img src="https://img.shields.io/badge/UI-TAILWINDCSS-F27121?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=2d2d2d" />
</p>

<p>
  <img src="https://img.shields.io/badge/STATE-REDUX%20TOOLKIT-764ABC?style=for-the-badge&logo=redux&logoColor=white&labelColor=555555" />
  <img src="https://img.shields.io/badge/DATA-REACT%20QUERY-FF4154?style=for-the-badge&labelColor=555555" />
  <img src="https://img.shields.io/badge/REALTIME-SOCKET.IO-8A2387?style=for-the-badge&logo=socketdotio&logoColor=white&labelColor=555555" />
  <img src="https://img.shields.io/badge/AUTH-JWT-F27121?style=for-the-badge&logo=jsonwebtokens&logoColor=white&labelColor=555555" />
  <img src="https://img.shields.io/badge/STATUS-ACTIVE-4CAF50?style=for-the-badge&labelColor=555555" />
</p>

<br/>

**[🌐 Live Demo](https://grilli-fine-dining-fullstack-app.vercel.app/)** &nbsp;·&nbsp; **[📖 Docs](#-quick-start)** &nbsp;·&nbsp; **[🐛 Report Bug](#)** &nbsp;·&nbsp; **[✨ Request Feature](#)**

</div>

---

## 📖 About the Project

> **Grilli** is a full-stack fine-dining platform built with **React, Redux Toolkit, React Query, Node.js, Express, and MongoDB Atlas** — combining a real-time ordering and reservation system with a complete auth flow, admin panel, and live notification layer via Socket.IO.

Most restaurant demo sites are single-page menus with no real backend behind them. **Grilli** solves this with a genuine full-stack architecture: a JWT-authenticated Express API backed by MongoDB Atlas, real-time order updates over Socket.IO, and a React frontend built on Redux Toolkit + React Query for predictable client and server state.

This project was built as a **portfolio-grade application** to demonstrate production-style full-stack engineering — not just feature-building, but real debugging: a documented set of root-cause bug fixes across routing, caching, auth redirects, database indexing, and WebSocket lifecycle management (see [Bugs Fixed](#-bugs-fixed) below).

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

- 🍽️ **Browse the menu** — categorised dishes with detail pages
- 📅 **Make a reservation** — booking flow with a confirmation reference page
- 🛒 **Cart & checkout** — auth-gated checkout flow with order confirmation
- 📦 **Order history** — view past and in-progress orders, with detail pages
- ❤️ **Wishlist** — save dishes for later
- 🎉 **Events** — browse and view restaurant event listings
- 🖼️ **Gallery** — visual showcase of the restaurant

</details>

<details>
<summary>🔐 &nbsp; Accounts & Realtime</summary>

<br/>

- 🔑 **JWT authentication** — register, login, and protected routes
- 🔔 **Live notifications** — real-time updates over Socket.IO
- 👤 **Profile management** — authenticated user profile page
- 🛠️ **Admin panel** — dedicated admin layout and routes for restaurant management

</details>

<details>
<summary>⚙️ &nbsp; Technical Highlights</summary>

<br/>

- 🧩 **Redux Toolkit + React Query** — clear separation of client state vs. server state
- 💫 **Framer Motion** — animated page transitions throughout
- 🔌 **Socket.IO singleton pattern** — one stable connection per session, not per render
- 🛡️ **JWT auth with refresh tokens** — access + refresh secret pair
- 💾 **MongoDB Atlas** — with startup-time legacy index cleanup
- ✉️ **Graceful email degradation** — app runs fully even without email credentials configured

</details>

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) | UI component library |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | Build tooling & dev server |
| ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white) | Client-side state management |
| ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white) | Server-state fetching & caching |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white) | Utility-first styling |
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white) | Page transitions & animation |

### Backend

| Technology | Purpose |
|------------|---------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) | JavaScript server runtime |
| ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white) | REST API framework |
| ![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white) | Cloud-hosted document database |
| ![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat-square&logo=socketdotio&logoColor=white) | Real-time bi-directional events |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) | Authentication & authorization |

---

## 📂 Project Structure (Key Files)

```bash
grilli/
│
├── 📁 client/                          # React + Vite frontend
│   └── src/
│       ├── layouts/
│       │   └── MainLayout.jsx          # Route-level layout, scroll handling
│       ├── context/
│       │   └── SocketContext.jsx       # Singleton Socket.IO connection
│       ├── hooks/
│       │   └── useApi.js               # React Query hooks
│       ├── components/
│       │   └── cart/
│       │       └── CartDrawer.jsx      # Cart UI + checkout redirect logic
│       └── main.jsx                    # React Query client config
│
└── 📁 server/                          # Express REST API
    └── src/
        ├── models/
        │   └── Order.js                # Order schema, crypto-based orderId
        ├── config/
        │   └── db.js                   # Mongo connection, index cleanup
        ├── services/
        │   └── emailService.js         # Non-fatal email sending
        └── seed/
            └── seeder.js                # Database seed script
=======
# 🍽️ Grilli — Full-Stack Restaurant Ordering Platform

A production-style MERN application for a restaurant: customers browse the menu, order food, book tables, and track orders in real time; admins manage menu items, orders, reservations, and content from a dashboard.

Built as a resume-grade example of a complete MERN workflow — REST API, JWT auth, role-based admin, real-time updates via Socket.IO, automated tests, and CI.

---

## Features

**Customer**
- Browse menu with category, veg/non-veg, price, and search filters
- Cart with persistent state (Redux Toolkit + localStorage)
- Checkout and order placement, with Razorpay payment integration
- Table reservations
- Wishlist, recently viewed, profile management
- Live order/reservation notifications via Socket.IO
- Responsive, animated UI (Framer Motion, Tailwind CSS)

**Admin**
- Dashboard with analytics (Recharts)
- Manage menu items, categories, orders, reservations, testimonials, events, users
- Image uploads via Cloudinary
- Role-based route protection (admin vs. customer)

**Platform**
- JWT access + refresh token authentication
- Centralized error handling and async error wrapping
- Rate limiting, Helmet security headers, Mongo sanitization
- Health-check endpoint for uptime monitoring
- Jest test suites for both frontend and backend
- GitHub Actions CI: tests + build run automatically on every push/PR

---

## Tech Stack

**Frontend** — React 18, Vite, Redux Toolkit, TanStack Query, React Router, Tailwind CSS, Framer Motion, Socket.IO client, Axios, React Hook Form

**Backend** — Node.js, Express, MongoDB + Mongoose, Socket.IO, JWT, bcryptjs, Cloudinary, Razorpay, Nodemailer, Helmet, express-rate-limit, express-mongo-sanitize

**Testing** — Jest, React Testing Library, Supertest, mongodb-memory-server

**CI/CD** — GitHub Actions

---

## Project Structure

```
grilli-fixed/
├── client/             # React frontend (Vite)
│   ├── src/
│   │   ├── components/ # UI components (cart, layout, home sections)
│   │   ├── pages/      # Route-level pages (incl. admin/)
│   │   ├── store/      # Redux Toolkit slices
│   │   ├── services/   # Axios API client
│   │   └── hooks/      # Custom hooks
│   └── tests/          # Jest + React Testing Library
├── server/             # Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── config/
│   │   ├── app.js      # Express app (used directly by tests, no listen())
│   │   └── server.js   # Entry point — connects DB and starts the HTTP server
│   └── tests/          # Jest + Supertest
└── .github/workflows/  # CI pipelines
```

---

## Installation

### Backend
```bash
cd server
npm install
cp .env.example .env   # fill in your own values
npm start               # production
npm run dev             # development (nodemon)
```
Runs on `http://localhost:3001`.

### Frontend
```bash
cd client
npm install
npm run dev
```
Runs on `http://localhost:5173`.

### Seed the database (optional, first run)
```bash
cd server
npm run seed
>>>>>>> 5d2a1c3 (test: add Jest testing (backend+frontend) and GitHub Actions CI workflows)
```

---

<<<<<<< HEAD
## 🗺️ Route Table

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
| `/checkout` | CheckoutPage | 🔒 Auth required |
| `/orders` | OrderHistoryPage | 🔒 Auth required |
| `/orders/:id` | OrderDetailPage | 🔒 Auth required |
| `/order-success/:id` | OrderSuccess | 🔒 Auth required |
| `/profile` | ProfilePage | 🔒 Auth required |
| `/notifications` | NotificationsPage | 🔒 Auth required |
| `/admin/*` | AdminLayout + pages | 🛠️ Admin only |

---

## 🚀 Quick Start

### Prerequisites

| Tool | Version | Required |
|------|---------|----------|
| Node.js | ≥ 18.x | ✅ Always |
| MongoDB | local or Atlas | ✅ Always |

---

## ⚙️ Installation

**Step 1 — Backend**

```bash
cd server
npm install
# Edit .env with your MongoDB URI and JWT secrets
npm run dev
```

Runs on `http://localhost:3001`

**Step 2 — Frontend**

```bash
cd client
npm install
npm run dev
```

Runs on `http://localhost:5173`

**Step 3 — Seed the database (first run only)**

```bash
cd server
npm run seed
```

---

## 🌐 Live Deployment

| Environment | URL |
|-------------|-----|
| 🚀 **Production (Live)** | **[grilli-fine-dining-fullstack-app.vercel.app](https://grilli-fine-dining-fullstack-app.vercel.app/)** |
| 💻 Local Frontend | http://localhost:5173 |
| 🔌 Local Backend API | http://localhost:3001 |

---

## 🔐 Environment Variables (`server/.env`)

```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/grilli
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRE=7d

# Optional — app runs fully without these
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLOUDINARY_CLOUD_NAME=...
RAZORPAY_KEY_ID=...
```

---


```

---

## 🧩 Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| Keeping a single Socket.IO connection stable across route changes | Moved to a singleton socket pattern keyed on stable primitive values instead of object references |
| Avoiding stale/empty data after failed fetches | Tuned React Query `staleTime` per query type instead of using a single global value |
| Making auth-gated checkout resilient to direct navigation | Standardised redirect state (`state.from`) instead of query-string redirects |
| Keeping the app usable without third-party services configured | Made email and payment integrations fail gracefully rather than crash the server |

---

## 🎯 Skills Demonstrated

`Full-Stack Development` &nbsp;·&nbsp; `React Architecture` &nbsp;·&nbsp; `REST API Design` &nbsp;·&nbsp; `Real-Time Systems (Socket.IO)` &nbsp;·&nbsp; `JWT Authentication` &nbsp;·&nbsp; `MongoDB & Indexing` &nbsp;·&nbsp; `Client/Server State Separation (Redux + React Query)` &nbsp;·&nbsp; `Production Debugging`

---

## 🗺️ Roadmap

- [ ] 💳 Live payment gateway integration (Razorpay keys are present but optional)
- [ ] 📊 Admin analytics dashboard
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

No license file is currently included in this repository — add a `LICENSE` file (MIT is a common choice for portfolio projects) before treating this as open source.

---

## 👨‍💻 Author

<div align="center">

**Built with ❤️ as a portfolio project**

*Demonstrating expertise in:*

`Full-Stack Development` &nbsp;·&nbsp; `Real-Time Systems` &nbsp;·&nbsp; `REST APIs` &nbsp;·&nbsp; `Authentication` &nbsp;·&nbsp; `Production Debugging`

<br/>

[![Live Demo](https://img.shields.io/badge/Live_Demo-F27121?style=for-the-badge&logo=vercel&logoColor=white)](https://grilli-fine-dining-fullstack-app.vercel.app/)

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:8a2387,50:e94057,100:f27121&height=120&section=footer" width="100%"/>

**⭐ Star this repo if you found it useful — it helps more than you think! ⭐**

</div>
=======
## Environment Variables

### `server/.env`
| Variable | Description |
|---|---|
| `NODE_ENV` | `development` / `production` / `test` |
| `PORT` | API port (default `3001`) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing access tokens |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens |
| `JWT_EXPIRE` / `JWT_REFRESH_EXPIRE` | Token lifetimes |
| `EMAIL_HOST` / `EMAIL_PORT` / `EMAIL_USER` / `EMAIL_PASS` / `EMAIL_FROM` | SMTP credentials for transactional email |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Image upload credentials |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Payment gateway credentials |
| `CLIENT_URL` | Frontend origin, used for CORS and email links |

See `server/.env.example` for the full template — no real secrets are committed.

### `client/.env`
| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the backend API |
| `VITE_RAZORPAY_KEY_ID` | Public Razorpay key for client-side checkout |

---

## Testing

Both apps use **Jest**.

```bash
# Backend — API routes, controllers, auth, error handling
cd server
npm test

# Frontend — components, Redux slices, cart logic, user interactions
cd client
npm test
```

**Backend** tests spin up an in-memory MongoDB (`mongodb-memory-server`) and exercise the real Express app via `supertest` — no mocking of the database layer. Coverage includes registration/login, password hashing, protected routes, menu filtering, 404 handling, and the global error-handling middleware.

**Frontend** tests use **React Testing Library** + **user-event** against the real Redux store logic: cart add/remove/quantity behavior, auth slice reducers, currency/date helpers, and `CartDrawer` interactions (empty state, item rendering, removing an item, checkout button).

---

## Deployment

- **Frontend** — deploy `client/` as a static site (Render Static Site, Vercel, or Netlify). Build command: `npm run build`, publish directory: `dist`.
- **Backend** — deploy `server/` as a web service (Render). Start command: `npm start`. Set all variables from the table above in the host's environment settings.
- **Database** — MongoDB Atlas (or any managed MongoDB) — set the connection string as `MONGODB_URI`.

Docker is also supported: each app has its own `Dockerfile`, and `docker-compose.yml` at the repo root runs both together for local container testing.

---

## CI/CD

Two GitHub Actions workflows live in `.github/workflows/`:

- **`frontend.yml`** — on push/PR touching `client/`: install deps → run Jest → build the Vite app. Fails the check if tests or the build fail.
- **`backend.yml`** — on push/PR touching `server/`: install deps → run Jest (Supertest + in-memory Mongo) → start the server and curl `/api/health` to confirm it boots cleanly.

This means every pull request gets automatic test and build verification before merging.

---

## License

MIT — built for portfolio/demo purposes.
>>>>>>> 5d2a1c3 (test: add Jest testing (backend+frontend) and GitHub Actions CI workflows)
