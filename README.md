# Coding Street Pizza Brand Rebuild

> **Notice**: Independent concept project created for portfolio and educational purposes. Not affiliated with or endorsed by 14th Street Pizza.

---

## 📌 Project Overview

**Coding Street Pizza Brand Rebuild** is a modern full-stack web application delivering an interactive, high-craft pizza ordering experience inspired by New York-style 20-inch monster slices and bold fusion flavors. 

The project features an interactive catalog, a 6-stage customization workstation, an itemized physical-style order stack, multi-city dispatch checkout with server-authoritative pricing validation, and an order status journey.

---

## ✨ Key Features

* **The Flavor Deck (Menu Discovery)**: Categorized catalog with interactive flavor wheels, heat dial filters, and quick customization dialogs.
* **The Pizza Forge (Customizer)**: 6-stage interactive workstation (Size, Crust, Sauce, Cheese, Toppings, Instructions) with live Flavor DNA meters and real-time pricing recalculation.
* **The Order Stack (Cart)**: Physical Kraft pizza box stack representation with itemized modifier breakdown and thermal receipt manifest.
* **Delivery Mission Control (Checkout)**: Dual-fulfillment checkout supporting **Express Delivery** (with Pakistani phone and address validation) and **Direct Pickup** (address bypassed).
* **The Delivery Run (Order Status)**: Milestone-based order journey tracker with readable public order references (`ST-2026-XXXX`), packing slips, and destination coordinates.
* **Server-Authoritative Pricing**: Complete backend recalculation of all sizes, crusts, sauces, and extra toppings. Client-supplied totals are completely ignored and cannot tamper with final pricing.
* **Pakistani Rupee (PKR) Currency**: Flat standard delivery fee (PKR 150 for delivery, PKR 0 for pickup).
* **Cart Persistence**: Defensive client-side `localStorage` caching with automatic schema validation and recovery from corrupted data.
* **Input Validation**: Strict Zod schema validation on all incoming API payloads with field-specific error envelopes.
* **Responsive Experience**: Optimized across Mobile (375px–430px), Tablet (768px–1024px), and Desktop (1280px–1920px).
* **Accessible Interactions**: Semantic HTML structure, high-contrast focus rings, ARIA labels, and keyboard navigation (`Tab`, `Escape`, `Enter`).
* **API Documentation**: Interactive Swagger OpenAPI 3.0 documentation available at `/api/docs`.
* **Automated Backend Tests**: Comprehensive test suite covering health, catalog queries, modifier pricing calculations, and order creation.

---

## 🛠 Tech Stack

### Frontend Client
* **Framework**: React 18 + Vite
* **Language**: TypeScript
* **Styling**: Tailwind CSS (Artisanal Hearth Design System)
* **Icons**: Lucide React
* **Routing**: React Router DOM 6
* **Audio / Effects**: Web Audio API Sound Synthesizer & Canvas Confetti

### Backend API Server
* **Runtime**: Node.js + Express
* **Language**: TypeScript (`tsx` in dev, `tsc` in build)
* **Validation**: Zod Schemas
* **Security & Utility**: Helmet, CORS, Express Rate Limit
* **Documentation**: Swagger UI Express + OpenAPI 3.0
* **Testing**: Vitest + Supertest

---

## 🏗 Architecture

```
Client (React + Vite)
  │
  ▼
REST API Layer (Express Routes & Controllers)
  │
  ├─► Request Validation Middleware (Zod Schemas)
  │
  ▼
Business Service Layer
  ├─► PricingService (Server-authoritative calculation & modifier validation)
  └─► OrderService (Order lifecycle & readable ST-2026-XXXX generation)
  │
  ▼
Data Repository Layer
  ├─► MenuRepository (Catalog, sizes, crusts, sauces, toppings)
  └─► OrderRepository (In-memory transactional order store)
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Uptime check, server timestamp, and environment status |
| `GET` | `/api/menu` | Catalog items and categories (supports `?category=`) |
| `GET` | `/api/menu/featured` | Top-selling featured pizzas |
| `GET` | `/api/pizzas/:id` | Individual product specification and modifier options |
| `POST` | `/api/orders/quote` | Authoritative server price quote for cart items |
| `POST` | `/api/orders` | Place verified order with server-revalidated totals |
| `GET` | `/api/orders/:orderId` | Lookup order by UUID or public order number (`ST-2026-XXXX`) |
| `GET` | `/api/docs` | Interactive Swagger UI API documentation |

---

## 🚀 Local Development Setup

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### 1. Clone Repository
```bash
git clone https://github.com/your-username/14street-pizza-brand-rebuild.git
cd 14street-pizza-brand-rebuild
```

### 2. Backend Server Setup
```bash
cd server
npm install
npm run dev
```
* **API Server**: `http://localhost:5000`
* **Swagger Docs**: `http://localhost:5000/api/docs`
* **Health Check**: `http://localhost:5000/api/health`

### 3. Frontend Client Setup
```bash
# In a separate terminal
cd client
npm install
npm run dev
```
* **Client Application**: `http://localhost:5173`

---

## ⚙️ Environment Variables

### Backend (`server/.env.example`)
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_MAX=500
```

### Frontend (`client/.env.example`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🧪 Automated Testing

Run the automated integration and unit test suite:
```bash
cd server
npm test
```

### Verified Test Results
```
 ✓ tests/health.test.ts (2 tests)
 ✓ tests/menu.test.ts (5 tests)
 ✓ tests/pricing.test.ts (12 tests)
 ✓ tests/orders.test.ts (11 tests)

 Test Files  4 passed (4)
      Tests  30 passed (30)
```
**30 tests passing** with 100% success rate.

---

## ⚠️ Current Limitations

* **In-Memory Storage**: The backend order repository stores orders in memory (`orderRepository.ts`). Restarting the backend server clears created order history.
* **Payment Processing**: Cash on Delivery (COD) is the active payment settlement method; online digital card gateways are conceptual demonstrations.
* **Order Tracking**: The Delivery Run is an order-status milestone visualization reflecting preparation stages, not a live GPS telemetry stream.

---

## 📄 License & Notice

Independent concept project created for portfolio and educational purposes. Not affiliated with or endorsed by 14th Street Pizza.
