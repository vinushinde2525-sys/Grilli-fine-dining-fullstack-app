<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&amp;color=0:8a2387,50:e94057,100:f27121&amp;height=220&amp;section=header&amp;text=Grilli&amp;fontSize=80&amp;fontColor=fff&amp;animation=twinkling&amp;fontAlignY=38&amp;desc=Full-Stack%20Fine%20Dining%20Reservation%20and%20Ordering%20Platform&amp;descAlignY=60&amp;descSize=18" width="100%" />

<br/>


<p>
  <img src="https://img.shields.io/badge/FRONTEND-REACT%20+%20VITE-E94057?style=for-the-badge&amp;logo=react&amp;logoColor=white&amp;labelColor=2d2d2d" />
  <img src="https://img.shields.io/badge/BACKEND-EXPRESS.JS-000000?style=for-the-badge&amp;logo=express&amp;logoColor=white&amp;labelColor=555555" />
  <img src="https://img.shields.io/badge/DATABASE-MONGODB%20ATLAS-47A248?style=for-the-badge&amp;logo=mongodb&amp;logoColor=white&amp;labelColor=2d2d2d" />
  <img src="https://img.shields.io/badge/REALTIME-SOCKET.IO-010101?style=for-the-badge&amp;logo=socketdotio&amp;logoColor=white&amp;labelColor=2d2d2d" />
</p>
<p>
  <img src="https://img.shields.io/badge/STATE-REDUX%20TOOLKIT-764ABC?style=for-the-badge&amp;logo=redux&amp;logoColor=white&amp;labelColor=2d2d2d" />
  <img src="https://img.shields.io/badge/DATA-REACT%20QUERY-FF4154?style=for-the-badge&amp;logo=reactquery&amp;logoColor=white&amp;labelColor=2d2d2d" />
  <img src="https://img.shields.io/badge/AUTH-JWT-F27121?style=for-the-badge&amp;logo=jsonwebtokens&amp;logoColor=white&amp;labelColor=555555" />
  <img src="https://img.shields.io/badge/CI%2FCD-GITHUB%20ACTIONS-2088FF?style=for-the-badge&amp;logo=githubactions&amp;logoColor=white&amp;labelColor=2d2d2d" />
</p>
<p>
  <img src="https://img.shields.io/badge/TESTING-JEST-C21325?style=for-the-badge&amp;logo=jest&amp;logoColor=white&amp;labelColor=2d2d2d" />
  <img src="https://img.shields.io/badge/DEPLOYMENT-VERCEL-000000?style=for-the-badge&amp;logo=vercel&amp;logoColor=white&amp;labelColor=2d2d2d" />
  <img src="https://img.shields.io/badge/STATUS-LIVE-4CAF50?style=for-the-badge&amp;labelColor=555555" />
  <img src="https://img.shields.io/badge/License-MIT-F27121?style=for-the-badge&amp;labelColor=555555" />
</p>
<p>
  <img src="https://img.shields.io/github/stars/vinushinde2525-sys/Grilli-fine-dining-fullstack-app?style=social" />
  <img src="https://img.shields.io/github/forks/vinushinde2525-sys/Grilli-fine-dining-fullstack-app?style=social" />
  <img src="https://img.shields.io/github/last-commit/vinushinde2525-sys/Grilli-fine-dining-fullstack-app?color=F27121&amp;style=flat-square" />
  <img src="https://img.shields.io/github/repo-size/vinushinde2525-sys/Grilli-fine-dining-fullstack-app?color=blue&amp;style=flat-square" />
</p>
<br/>
🌐 Live Demo  ·  📖 Docs  ·  🐛 Report Bug  ·  ✨ Request Feature

</div>

📖 About the Project


Grilli is a production-style full-stack fine-dining platform built with React, Redux Toolkit, React Query, Node.js, Express, and MongoDB Atlas — combining a real-time ordering and reservation system with a complete JWT auth flow, admin panel, and live notification layer over Socket.IO.



Most restaurant demo sites are single-page menus with no real backend behind them. Grilli goes further — a genuine full-stack ecosystem with a customer-facing storefront, auth-gated checkout, table reservations, an admin dashboard, role-based access control, and a CI pipeline that verifies every pull request.

This project was built as a portfolio-grade application to demonstrate production-style engineering — not just feature-building, but real debugging, automated test coverage on both ends (Jest, Supertest, mongodb-memory-server, React Testing Library), and a CI/CD pipeline running on GitHub Actions.

<details>
<summary>📸 Screenshots &nbsp;—&nbsp; click to expand</summary>
<br/>
PagePreview🖥️ HomepageHero, featured dishes, and reservation CTA🍽️ MenuFilterable dish grid with detail view📅 ReservationsBooking flow with confirmation reference🛒 Checkout & OrdersCart → login-gated checkout → order history

</details>

✨ Features

<details open>
<summary>🍽️ &nbsp; Dining & Ordering</summary>
<br/>

🍽️ Browse the menu — category, veg/non-veg, price, and search filters, plus featured / special / popular / recommended / trending views
📅 Make a reservation — booking flow with a confirmation reference page
🛒 Cart & checkout — persistent cart (Redux Toolkit + localStorage), auth-gated checkout, Razorpay payment integration
📦 Order history — view past and in-progress orders, with detail pages
❤️ Wishlist — save dishes for later, plus recently viewed
🎉 Events — browse and view restaurant event listings
🖼️ Gallery — visual showcase of the restaurant
💬 Testimonials — customer feedback shown on the storefront


</details>
<details>
<summary>🖥️ &nbsp; Admin Panel</summary>
<br/>

📊 Analytics dashboard — revenue and content stats at a glance (Recharts)
🍽️ Menu management — create, update, delete menu items
📦 Order management — view all orders, update order status
📅 Reservation management — view all reservations, update status
🎉 Events & testimonials CMS — full CRUD on events and testimonials
👥 User management — list, update role, and delete users
🛡️ Role-based route protection — admin vs. customer guards on every admin route


</details>
<details>
<summary>🔐 &nbsp; Authentication & Realtime</summary>
<br/>

🔑 JWT dual-token auth — register, login, access + refresh token pair
🔄 Token refresh — dedicated /refresh endpoint for silent re-auth
🔐 Password management — change password, forgot/reset password via emailed token
👤 Profile management — authenticated user profile page
🔔 Live notifications — real-time updates over Socket.IO, with mark-all-read
🔌 Socket.IO singleton pattern — one stable connection per session, not per render


</details>
<details>
<summary>⚙️ &nbsp; DevOps & Testing</summary>
<br/>

✅ 38 automated tests — Jest + Supertest (backend) and Jest + React Testing Library (frontend)
🔄 GitHub Actions CI/CD — test + build on every push touching client/ or server/
🐳 Docker support — Dockerfile per app + root docker-compose.yml for local dev
🚀 Deployed on Vercel — frontend live, backend deployable as a standalone web service
✉️ Graceful service degradation — email, Cloudinary, and Razorpay integrations fail gracefully when not configured
🩺 Health-check endpoint — /api/health for uptime monitoring
🔒 Hardened API — Helmet, rate limiting, Mongo sanitization


</details>

🛠️ Tech Stack

Frontend

TechnologyVersionPurposeShow Image18.xUI component libraryShow Image5.xBuild tooling & dev serverShow Image2.xClient-side state managementShow Image5.xServer-state fetching & cachingShow Imagev6Client-side routingShow Image3.xUtility-first stylingShow Image11.xPage transitions & animationShow Image4.xReal-time updatesAxios, React Hook Form, Recharts, Swiper, lucide-react, react-hot-toast—HTTP client, forms, charts, carousels, icons, toasts

Backend

TechnologyVersionPurposeShow Image≥18.xJavaScript server runtimeShow Image4.xREST API frameworkShow Image—Cloud-hosted document databaseShow Image8.xODM + schema validation, startup-time index cleanupShow Image4.xReal-time event systemShow Image9.xAccess + refresh token authenticationbcryptjs, Helmet, express-rate-limit, express-mongo-sanitize, express-validator—Hashing & API hardeningCloudinary, Razorpay, Nodemailer, Winston—Image uploads, payments, transactional email, logging

Testing & DevOps

ToolPurposeShow ImageTest runner, frontend & backendShow ImageReact component & interaction testingSupertest, mongodb-memory-serverReal Express app + in-memory MongoDB for API testsShow ImageCI/CD pipelineShow ImageContainerised local devShow ImageFrontend deployment


🏗️ Architecture

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


📂 Project Structure

bashgrilli/
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


🔌 API Endpoints

<details open>
<summary>🔐 Authentication</summary>
httpPOST   /api/auth/register              # Register new account
POST   /api/auth/login                 # Login with email + password
POST   /api/auth/logout                # Logout (protected)
GET    /api/auth/me                    # Get current user profile (protected)
PUT    /api/auth/profile               # Update profile (protected)
PUT    /api/auth/change-password       # Change password (protected)
POST   /api/auth/forgot-password       # Send password reset email
PUT    /api/auth/reset-password/:token # Reset password with token
POST   /api/auth/refresh               # Rotate access + refresh tokens

</details>
<details>
<summary>🍽️ Menu</summary>
httpGET    /api/menu                       # Get all items (filter, search)
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

</details>
<details>
<summary>📦 Orders & 📅 Reservations</summary>
httpPOST   /api/orders/create-payment      # Create Razorpay payment order
POST   /api/orders/verify-payment      # Verify Razorpay payment signature
POST   /api/orders                     # Place new order
GET    /api/orders                     # Get all orders (protected)
GET    /api/orders/:orderId            # Get order details (protected)
PUT    /api/orders/:orderId/status     # Update order status (admin)

POST   /api/reservations               # Create a reservation
GET    /api/reservations               # Get all reservations (admin)
GET    /api/reservations/:refId        # Get reservation by reference
PUT    /api/reservations/:refId/status # Update reservation status (admin)

</details>
<details>
<summary>🎉 Content & 🛠️ Admin</summary>
httpGET    /api/content/events             # List events
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

</details>

🧪 Testing

38 automated tests across frontend and backend.

Backend — Jest + Supertest

bashcd server
npm test

Test SuiteTestsCoverageauth8Register, login, password hashing, protected routes, refresh flowmenu5Listing, filtering, 404 handlingerror6Global error-handling middlewareTotal19✅

Spins up an in-memory MongoDB (mongodb-memory-server) and exercises the real Express app via supertest — no mocking of the database layer.

Frontend — Jest + React Testing Library

bashcd client
npm test

Test SuiteTestsCoveragecart7Add/remove/quantity reducer logichelpers7Currency/date utility functionsauthSlice5Auth reducer behaviorCartDrawer4Empty state, item rendering, removing an item, checkout buttonTotal19✅

Uses React Testing Library + user-event against the real Redux store logic.


🚀 Getting Started

Prerequisites

ToolVersionRequiredNode.js≥ 18.x✅ AlwaysMongoDBlocal or Atlas✅ Alwaysnpm≥ 9.x✅ Always


⚙️ Installation

Step 1 — Clone the repository

bashgit clone https://github.com/vinushinde2525-sys/Grilli-fine-dining-fullstack-app.git
cd Grilli-fine-dining-fullstack-app

Step 2 — Backend

bashcd server
npm install
cp .env.example .env   # fill in your own values
npm start               # production
npm run dev              # development (nodemon)

Runs on http://localhost:3001

Step 3 — Frontend

bashcd client
npm install
npm run dev

Runs on http://localhost:5173

Step 4 — Seed the database (first run only)

bashcd server
npm run seed


🌐 Live Deployment

EnvironmentURL🚀 Production (Live)grilli-fine-dining-fullstack-ic67m47po.vercel.app💻 Local Frontendhttp://localhost:5173🔌 Local Backend APIhttp://localhost:3001❤️ Health Checkhttp://localhost:3001/api/health


🔐 Environment Variables

server/.env

VariableDescriptionNODE_ENVdevelopment / production / testPORTAPI port (default 3001)MONGODB_URIMongoDB connection stringJWT_SECRETSecret for signing access tokensJWT_REFRESH_SECRETSecret for signing refresh tokensJWT_EXPIRE / JWT_REFRESH_EXPIREToken lifetimesEMAIL_HOST / EMAIL_PORT / EMAIL_USER / EMAIL_PASS / EMAIL_FROMSMTP credentials — optional, app runs fully without theseCLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRETImage upload credentials — optionalRAZORPAY_KEY_ID / RAZORPAY_KEY_SECRETPayment gateway credentials — optionalCLIENT_URLFrontend origin, used for CORS and email links

See server/.env.example for the full template — no real secrets are committed.

client/.env

VariableDescriptionVITE_API_URLBase URL of the backend APIVITE_RAZORPAY_KEY_IDPublic Razorpay key for client-side checkout


🔄 CI/CD Pipeline

Two GitHub Actions workflows run automatically, scoped by path:

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

This means every pull request gets automatic test and build verification before merging.

Deployment


Frontend — deployed on Vercel. Build command: npm run build, publish directory: dist.
Backend — deploy server/ as a web service (Render or similar). Start command: npm start. Set all variables from the table above in the host's environment settings.
Database — MongoDB Atlas (or any managed MongoDB) — set the connection string as MONGODB_URI.



🐳 Docker

bashdocker-compose up --build
# Services: client (Nginx), server (Node.js)

Each app has its own Dockerfile; docker-compose.yml at the repo root runs both together for local container testing.


⚡ Performance & Architecture Decisions

DecisionReasonRedux for auth, React Query for everything elseClear separation of client state vs. server-state caching — no overlap, no duplicated source of truthSocket.IO singleton keyed on primitivesStable connection across route changes instead of re-creating a socket per renderapp.js / server.js splitExpress app importable directly by supertest with no real DB connection or open portStandardised redirect state (state.from)Auth-gated checkout survives direct navigation without brittle query-string redirectsOptional integrations fail gracefullyEmail, Cloudinary, and Razorpay are non-fatal if unconfigured — app stays fully usableStartup-time legacy index cleanupAvoids stale Mongo index conflicts across schema iterations without manual intervention


🧩 Challenges & Solutions

ChallengeSolutionKeeping a single Socket.IO connection stable across route changesMoved to a singleton socket pattern keyed on stable primitive values instead of object referencesAvoiding stale/empty data after failed fetchesTuned React Query staleTime per query type instead of using a single global valueMaking auth-gated checkout resilient to direct navigationStandardised redirect state (state.from) instead of query-string redirectsKeeping the app usable without third-party services configuredMade email and payment integrations fail gracefully rather than crash the serverVerifying every change before mergeAdded path-scoped GitHub Actions CI to run tests + build on each app independently


🌟 Key Highlights for Recruiters

WhatDetail🏗️ Genuine full-stack architectureJWT-authenticated Express API backed by MongoDB Atlas, not a static demo🔐 Production-grade authDual JWT + refresh rotation, change/forgot/reset password flows📡 Real-time layerSocket.IO singleton pattern, live notifications, mark-all-read🛠️ Admin scopeMenu, orders, reservations, events, testimonials, analytics, user role management🧪 38 automated testsRealistic coverage across auth, menu, error handling, Redux slices, and UI components🔄 Path-scoped CI/CDGitHub Actions runs only the relevant pipeline per change — fast, focused checks🐳 Docker-readyPer-app Dockerfiles + root docker-compose.yml — zero-friction local onboarding


🗺️ Roadmap


 💳 Live payment gateway integration (Razorpay keys are present but optional)
 📊 Admin analytics dashboard enhancements
 🗺️ Table/seating map for reservations
 ⭐ Customer reviews on dishes
 📱 PWA support for mobile ordering



🤝 Contributing

Contributions, feature suggestions, and pull requests are always welcome!

bash# 1. Fork the repository

# 2. Create your feature branch
git checkout -b feature/AmazingFeature

# 3. Commit your changes
git commit -m 'feat: add AmazingFeature'

# 4. Push to the branch
git push origin feature/AmazingFeature

# 5. Open a Pull Request


📄 License

MIT — built for portfolio/demo purposes.


👨‍💻 Author

<div align="center">
Built with ❤️ as a portfolio project

Demonstrating expertise in:

Full-Stack Development  ·  React Architecture  ·  REST API Design  ·  Real-Time Systems (Socket.IO)  ·  JWT Authentication  ·  MongoDB & Indexing  ·  Client/Server State Separation (Redux + React Query)  ·  Automated Testing (Jest, RTL, Supertest)  ·  CI/CD (GitHub Actions)

<br/>
Show Image
Show Image

</div>

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&amp;color=0:8a2387,50:e94057,100:f27121&amp;height=120&amp;section=footer" width="100%"/>
⭐ Star this repo if you found it useful — it helps more than you think! ⭐
