<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&amp;color=0:8a2387,50:e94057,100:f27121&amp;height=220&amp;section=header&amp;text=Grilli&amp;fontSize=80&amp;fontColor=fff&amp;animation=twinkling&amp;fontAlignY=38&amp;desc=Full-Stack%20Fine%20Dining%20Reservation%20and%20Ordering%20Platform&amp;descAlignY=60&amp;descSize=18" width="100%" />

<br/>

<p>
  <img src="https://img.shields.io/badge/FRONTEND-REACT%20+%20VITE-E94057?style=for-the-badge&amp;logo=react&amp;logoColor=white&amp;labelColor=2d2d2d" />
  <img src="https://img.shields.io/badge/BACKEND-EXPRESS.JS-000000?style=for-the-badge&amp;logo=express&amp;logoColor=white&amp;labelColor=555555" />
  <img src="https://img.shields.io/badge/DATABASE-MONGODB%20ATLAS-47A248?style=for-the-badge&amp;logo=mongodb&amp;logoColor=white&amp;labelColor=2d2d2d" />
  <img src="https://img.shields.io/badge/UI-TAILWINDCSS-F27121?style=for-the-badge&amp;logo=tailwindcss&amp;logoColor=white&amp;labelColor=2d2d2d" />
</p>
<p>
  <img src="https://img.shields.io/badge/STATE-REDUX%20TOOLKIT-764ABC?style=for-the-badge&amp;logo=redux&amp;logoColor=white&amp;labelColor=555555" />
  <img src="https://img.shields.io/badge/DATA-REACT%20QUERY-FF4154?style=for-the-badge&amp;labelColor=555555" />
  <img src="https://img.shields.io/badge/REALTIME-SOCKET.IO-8A2387?style=for-the-badge&amp;logo=socketdotio&amp;logoColor=white&amp;labelColor=555555" />
  <img src="https://img.shields.io/badge/AUTH-JWT-F27121?style=for-the-badge&amp;logo=jsonwebtokens&amp;logoColor=white&amp;labelColor=555555" />
  <img src="https://img.shields.io/badge/CI-GITHUB%20ACTIONS-2088FF?style=for-the-badge&amp;logo=githubactions&amp;logoColor=white&amp;labelColor=555555" />
  <img src="https://img.shields.io/badge/STATUS-ACTIVE-4CAF50?style=for-the-badge&amp;labelColor=555555" />
</p>
<br/>
🌐 Live Demo  ·  📖 Docs  ·  🐛 Report Bug  ·  ✨ Request Feature

</div>

📖 About the Project


Grilli is a full-stack fine-dining platform built with React, Redux Toolkit, React Query, Node.js, Express, and MongoDB Atlas — combining a real-time ordering and reservation system with a complete auth flow, admin panel, and live notification layer via Socket.IO.



Most restaurant demo sites are single-page menus with no real backend behind them. Grilli solves this with a genuine full-stack architecture: a JWT-authenticated Express API backed by MongoDB Atlas, real-time order updates over Socket.IO, and a React frontend built on Redux Toolkit + React Query for predictable client and server state.

This project was built as a portfolio-grade application to demonstrate production-style full-stack engineering — not just feature-building, but real debugging, automated test coverage on both ends, and a CI pipeline that verifies every pull request (see Testing and CI/CD below).

<details>
<summary>📸 Screenshots &nbsp;—&nbsp; click to expand</summary>
<br/>
PagePreview🖥️ HomepageHero, featured dishes, and reservation CTA🍽️ MenuFilterable dish grid with detail view📅 ReservationsBooking flow with confirmation reference🛒 Checkout & OrdersCart → login-gated checkout → order history

</details>

✨ Features

<details open>
<summary>🍽️ &nbsp; Dining & Ordering</summary>
<br/>

🍽️ Browse the menu — category, veg/non-veg, price, and search filters
📅 Make a reservation — booking flow with a confirmation reference page
🛒 Cart & checkout — persistent cart (Redux Toolkit + localStorage), auth-gated checkout, Razorpay payment integration
📦 Order history — view past and in-progress orders, with detail pages
❤️ Wishlist — save dishes for later, plus recently viewed
🎉 Events — browse and view restaurant event listings
🖼️ Gallery — visual showcase of the restaurant


</details>
<details>
<summary>🔐 &nbsp; Accounts & Realtime</summary>
<br/>

🔑 JWT authentication — register, login, and protected routes (access + refresh tokens)
🔔 Live notifications — real-time updates over Socket.IO
👤 Profile management — authenticated user profile page
🛠️ Admin panel — dashboard with analytics (Recharts), and management of menu items, categories, orders, reservations, testimonials, events, and users
🛡️ Role-based route protection — admin vs. customer


</details>
<details>
<summary>⚙️ &nbsp; Technical Highlights</summary>
<br/>

🧩 Redux Toolkit + React Query — clear separation of client state vs. server state
💫 Framer Motion — animated page transitions throughout
🔌 Socket.IO singleton pattern — one stable connection per session, not per render
🛡️ JWT auth with refresh tokens — access + refresh secret pair
💾 MongoDB Atlas — with startup-time legacy index cleanup
✉️ Graceful email degradation — app runs fully even without email credentials configured
🔒 Hardened API — rate limiting, Helmet security headers, Mongo sanitization
🩺 Health-check endpoint — for uptime monitoring
✅ Automated tests — Jest on both frontend and backend
🔁 CI on every push/PR — GitHub Actions runs tests + build automatically


</details>

🛠️ Tech Stack

Frontend

TechnologyPurposeShow ImageUI component libraryShow ImageBuild tooling & dev serverShow ImageClient-side state managementShow ImageServer-state fetching & cachingShow ImageUtility-first stylingShow ImagePage transitions & animationReact Router, Axios, React Hook FormRouting, HTTP client, form handling

Backend

TechnologyPurposeShow ImageJavaScript server runtimeShow ImageREST API frameworkShow ImageCloud-hosted document database (Mongoose)Show ImageReal-time bi-directional eventsShow ImageAuthentication & authorizationbcryptjs, Helmet, express-rate-limit, express-mongo-sanitizeSecurity & hardeningCloudinary, Razorpay, NodemailerImage uploads, payments, transactional email

Testing & CI/CD

TechnologyPurposeShow ImageTest runner, frontend & backendReact Testing Library, user-eventComponent & interaction testingSupertest, mongodb-memory-serverReal Express app + in-memory MongoDB for API testsShow ImageCI pipelines for both apps


📂 Project Structure (Key Files)

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
│       ├── store/                      # Redux Toolkit slices
│       ├── components/
│       │   └── cart/
│       │       └── CartDrawer.jsx      # Cart UI + checkout redirect logic
│       └── main.jsx                    # React Query client config
│   └── tests/                          # Jest + React Testing Library
│
├── 📁 server/                          # Express REST API
│   └── src/
│       ├── models/
│       │   └── Order.js                # Order schema, crypto-based orderId
│       ├── config/
│       │   └── db.js                   # Mongo connection, index cleanup
│       ├── services/
│       │   └── emailService.js         # Non-fatal email sending
│       ├── app.js                      # Express app (used directly by tests, no listen())
│       ├── server.js                   # Entry point — connects DB and starts the HTTP server
│       └── seed/
│           └── seeder.js               # Database seed script
│   └── tests/                          # Jest + Supertest
│
└── 📁 .github/workflows/               # CI pipelines
├── frontend.yml
└── backend.yml
```


🗺️ Route Table

RouteComponentAuth`/`HomePublic`/about`AboutPagePublic`/menu`MenuPagePublic`/menu/:id`MenuDetailPublic`/events`EventsPagePublic`/events/:id`EventDetailPublic`/gallery`GalleryPagePublic`/contact`ContactPagePublic`/reservation`ReservationPagePublic`/reservation/success/:ref`ReservationSuccessPublic`/wishlist`WishlistPagePublic`/login`LoginPagePublic`/register`RegisterPagePublic`/checkout`CheckoutPage🔒 Auth required`/orders`OrderHistoryPage🔒 Auth required`/orders/:id`OrderDetailPage🔒 Auth required`/order-success/:id`OrderSuccess🔒 Auth required`/profile`ProfilePage🔒 Auth required`/notifications`NotificationsPage🔒 Auth required`/admin/*`AdminLayout + pages🛠️ Admin only


🚀 Quick Start

Prerequisites

ToolVersionRequiredNode.js≥ 18.x✅ AlwaysMongoDBlocal or Atlas✅ Always


⚙️ Installation

Step 1 — Backend

```bash
cd server
npm install
cp .env.example .env   # fill in your own values
npm start               # production
npm run dev              # development (nodemon)
```

Runs on `http://localhost:3001\`

Step 2 — Frontend

```bash
cd client
npm install
npm run dev
```

Runs on `http://localhost:5173\`

Step 3 — Seed the database (first run only)

```bash
cd server
npm run seed
```


🌐 Live Deployment

EnvironmentURL🚀 Production (Live)grilli-fine-dining-fullstack-ic67m47po.vercel.app💻 Local Frontendhttp://localhost:5173🔌 Local Backend APIhttp://localhost:3001


🔐 Environment Variables

`server/.env`

VariableDescription`NODE_ENV``development` / `production` / `test``PORT`API port (default `3001`)`MONGODB_URI`MongoDB connection string`JWT_SECRET`Secret for signing access tokens`JWT_REFRESH_SECRET`Secret for signing refresh tokens`JWT_EXPIRE` / `JWT_REFRESH_EXPIRE`Token lifetimes`EMAIL_HOST` / `EMAIL_PORT` / `EMAIL_USER` / `EMAIL_PASS` / `EMAIL_FROM`SMTP credentials for transactional email — optional, app runs fully without these`CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET`Image upload credentials`RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET`Payment gateway credentials — optional`CLIENT_URL`Frontend origin, used for CORS and email links

See `server/.env.example` for the full template — no real secrets are committed.

`client/.env`

VariableDescription`VITE_API_URL`Base URL of the backend API`VITE_RAZORPAY_KEY_ID`Public Razorpay key for client-side checkout


✅ Testing

Both apps use Jest.

```bash

Backend — API routes, controllers, auth, error handling

cd server
npm test

Frontend — components, Redux slices, cart logic, user interactions

cd client
npm test
```

Backend tests spin up an in-memory MongoDB (`mongodb-memory-server`) and exercise the real Express app via `supertest` — no mocking of the database layer. Coverage includes registration/login, password hashing, protected routes, menu filtering, 404 handling, and the global error-handling middleware.

Frontend tests use React Testing Library + user-event against the real Redux store logic: cart add/remove/quantity behavior, auth slice reducers, currency/date helpers, and `CartDrawer` interactions (empty state, item rendering, removing an item, checkout button).


🔁 CI/CD

Two GitHub Actions workflows live in `.github/workflows/`:


`frontend.yml` — on push/PR touching `client/`: install deps → run Jest → build the Vite app. Fails the check if tests or the build fail.
`backend.yml` — on push/PR touching `server/`: install deps → run Jest (Supertest + in-memory Mongo) → start the server and curl `/api/health` to confirm it boots cleanly.


This means every pull request gets automatic test and build verification before merging.

Deployment


Frontend — deploy `client/` as a static site (Vercel, Render Static Site, or Netlify). Build command: `npm run build`, publish directory: `dist`.
Backend — deploy `server/` as a web service (Render). Start command: `npm start`. Set all variables from the table above in the host's environment settings.
Database — MongoDB Atlas (or any managed MongoDB) — set the connection string as `MONGODB_URI`.


Docker is also supported: each app has its own `Dockerfile`, and `docker-compose.yml` at the repo root runs both together for local container testing.


🧩 Challenges & Solutions

ChallengeSolutionKeeping a single Socket.IO connection stable across route changesMoved to a singleton socket pattern keyed on stable primitive values instead of object referencesAvoiding stale/empty data after failed fetchesTuned React Query `staleTime` per query type instead of using a single global valueMaking auth-gated checkout resilient to direct navigationStandardised redirect state (`state.from`) instead of query-string redirectsKeeping the app usable without third-party services configuredMade email and payment integrations fail gracefully rather than crash the serverVerifying every change before mergeAdded GitHub Actions CI to run tests + build on both apps for every push/PR


🎯 Skills Demonstrated

`Full-Stack Development`  ·  `React Architecture`  ·  `REST API Design`  ·  `Real-Time Systems (Socket.IO)`  ·  `JWT Authentication`  ·  `MongoDB & Indexing`  ·  `Client/Server State Separation (Redux + React Query)`  ·  `Automated Testing (Jest, RTL, Supertest)`  ·  `CI/CD (GitHub Actions)`  ·  `Production Debugging`


🗺️ Roadmap


 💳 Live payment gateway integration (Razorpay keys are present but optional)
 📊 Admin analytics dashboard enhancements
 🗺️ Table/seating map for reservations
 ⭐ Customer reviews on dishes
 📱 PWA support for mobile ordering



🤝 Contributing

Contributions, feature suggestions, and pull requests are always welcome!

```bash

1. Fork the repository

2. Create your feature branch

git checkout -b feature/AmazingFeature

3. Commit your changes

git commit -m 'feat: add AmazingFeature'

4. Push to the branch

git push origin feature/AmazingFeature

5. Open a Pull Request

```


📄 License

MIT — built for portfolio/demo purposes.


👨‍💻 Author

<div align="center">
Built with ❤️ as a portfolio project

Demonstrating expertise in:

`Full-Stack Development`  ·  `Real-Time Systems`  ·  `REST APIs`  ·  `Authentication`  ·  `Automated Testing & CI/CD`  ·  `Production Debugging`

<br/>
<p align="center">

<a href="https://grilli-fine-dining-fullstack-ic67m47po.vercel.app/" target="_blank">
<img src="https://img.shields.io/badge/🚀%20Live%20Demo-Grilli%20Restaurant-f97316?style=for-the-badge&logo=vercel&logoColor=white"/>
</a>

<a href="https://github.com/vinushinde2525-sys/Grilli-fine-dining-fullstack-app" target="_blank">
<img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github"/>
</a>

</p>

</div>

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&amp;color=0:8a2387,50:e94057,100:f27121&amp;height=120&amp;section=footer" width="100%"/>
⭐ Star this repo if you found it useful — it helps more than you think! ⭐

</div>
