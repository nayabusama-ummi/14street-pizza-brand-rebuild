# 🚀 Deployment Guide — 14th Street Pizza Brand Rebuild

This guide provides step-by-step instructions for deploying the full-stack **14th Street Pizza Brand Rebuild** application to **Vercel** with zero hassle.

---

## 🏗️ Architecture Overview

The repository is structured as a full-stack monorepo:
* **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons, Web Audio API (`client/`).
* **Backend API**: Node.js, Express, TypeScript, Zod, OpenAPI / Swagger (`server/`).
* **Serverless Entrypoint**: `api/index.ts` automatically runs the Express app as a Vercel Serverless Function under `/api/*`.

```
├── api/
│   └── index.ts          # Vercel Serverless entrypoint (routes /api to Express)
├── client/               # Vite + React Frontend SPA
│   ├── dist/             # Production build output
│   └── vercel.json       # Client SPA fallback rewrites
├── server/               # Express Backend API
├── vercel.json           # Root Vercel orchestration config
└── package.json          # Root build scripts
```

---

## ⚡ Method 1: Deploy to Vercel via Web Dashboard (Recommended)

### Step 1: Push Your Code to GitHub
Ensure your repository is up to date on GitHub:
```bash
git push origin main
```

### Step 2: Import Project on Vercel
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **"Add New..."** > **"Project"**.
3. Locate and click **"Import"** next to `14street-pizza-brand-rebuild`.

### Step 3: Configure Project Settings
Vercel will automatically read `vercel.json`, but verify the following settings:
* **Project Name**: `14street-pizza-brand-rebuild` (or your preferred name)
* **Framework Preset**: `Vite` or `Other`
* **Root Directory**: `./` *(Leave as root)*
* **Build Command**: `npm run build` *(Auto-configured)*
* **Output Directory**: `client/dist` *(Auto-configured)*
* **Install Command**: `npm install`

### Step 4: Configure Environment Variables (Optional)
Under the **Environment Variables** section, you can optionally configure:

| Variable | Recommended Value | Description |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Production mode execution |
| `CORS_ORIGIN` | `*` | Allowed CORS origins |
| `VITE_API_URL` | *(leave empty to use relative `/api`)* | API Base URL |

### Step 5: Deploy
Click **"Deploy"**. Vercel will build the frontend into `client/dist` and deploy the backend functions in `api/index.ts`.

---

## 💻 Method 2: Deploy via Vercel CLI

You can also deploy directly from your local terminal using the Vercel CLI:

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy Preview**:
   ```bash
   vercel
   ```

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

---

## 🌐 Method 3: Separate Frontend & Backend Deployments (Optional)

If you prefer hosting the backend on **Render / Railway** and frontend on **Vercel**:

### Backend (Render / Railway)
1. Set Root Directory to `server/`.
2. Build Command: `npm install && npm run build`
3. Start Command: `npm start`
4. Set Environment Variables:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `CORS_ORIGIN`: `https://your-frontend-domain.vercel.app`

### Frontend (Vercel)
1. Set Root Directory to `client/`.
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Add Environment Variable:
   - `VITE_API_URL`: `https://your-backend-domain.onrender.com/api`

---

## ✅ Post-Deployment Verification Checklist

Once deployed, verify the live production URL:

- [ ] **Home Page**: Verify hero section, 4K pizza imagery, and deal banners.
- [ ] **3D Story Rail**: Navigate to `/odyssey` to test the 6-act diorama scroll experience, audio toggle, and chapter rail navigation.
- [ ] **Flavor Deck (`/menu`)**: Test category filter tabs, mechanical heat dial (`Mild`, `Warm`, `Kick`, `Fiery`), and category-specific profile meters.
- [ ] **Pizza Forge (`/pizza/ny-tikka-blaster`)**: Test live interactive size/crust/sauce/topping customizer and price calculation.
- [ ] **Order Stack & Checkout**: Add items to cart, test delivery/pickup quotes, and submit an order.
- [ ] **Live Tracker (`/order/ORD-...`)**: Verify live status progression from *Received* to *Delivered*.
- [ ] **Swagger API Docs**: Visit `/api/docs` to inspect live interactive OpenAPI documentation.

---

## 🔧 Local Development Commands

To run both frontend and backend locally simultaneously:

```bash
# Terminal 1 — Backend API (Port 5000)
cd server
npm run dev

# Terminal 2 — Frontend Client (Port 5173)
cd client
npm run dev
```

Run test suite:
```bash
cd server
npm test
```
