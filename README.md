# Feminista

A premium, storytelling-led D2C e-commerce site for **Feminista**, a house of fragrance with three signature perfumes — Locken (The Magnetic), Vers (The Intimate) and Fresca (The Luminous) — plus a Discovery Set.

Built with Next.js (App Router, JavaScript, `src/` directory), no Tailwind — hand-written CSS with CSS Modules and a shared design-token system in `globals.css`. Animations via Framer Motion.

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # optional: set your own admin password
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the storefront, and [http://localhost:3000/admin](http://localhost:3000/admin) for the admin dashboard (default password: `feminista180`, override via `ADMIN_PASSWORD` in `.env.local`).

## Features

- **Storefront** — home, fragrance collection with filter/sort, individual product pages, The Art of 180 (craftsmanship story), Our Story (Maison/about)
- **Commerce** — add to cart, cart drawer, wishlist, quick checkout, full cart page — all persisted to `localStorage`
- **Admin dashboard** (`/admin`) — password-gated, with revenue/order insights, product CRUD, and customer management
- **SEO** — per-page and per-product metadata, Open Graph tags, `sitemap.xml`, `robots.txt`

## Data

Products, users and orders are stored as JSON files in `src/data/` and read/written through API routes (`src/app/api/**`) backed by `src/lib/dataStore.js`. This is intentionally simple for a 3–4 SKU catalogue and can be swapped for a real database later without changing the API contract.

## Payments

Razorpay integration is planned but not yet wired in — checkout currently records the order and confirms manually. See `src/app/(site)/checkout/CheckoutClient.js` and `src/app/api/orders/route.js` as the integration points.

## Project Structure

```
src/
  app/
    (site)/        storefront pages (share the Header/Footer layout)
    admin/          admin login + password-gated dashboard
    api/            REST-ish API routes for products, users, orders, admin auth
    sitemap.js, robots.js
  components/       layout, home, ui and admin components
  context/          Cart, Wishlist and Toast providers (client-side state)
  data/             products.json, users.json, orders.json
  lib/              dataStore (fs-backed JSON persistence), auth, formatting
```
