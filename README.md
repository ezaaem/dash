# Admin Dashboard (Next.js + Redux Toolkit + Tailwind)

## Overview

Responsive admin dashboard built with Next.js App Router, React, Tailwind CSS, and Redux Toolkit. Includes mocked authentication, a persistent layout with a responsive sidebar/topbar, dynamic tables with add/delete, charts (Recharts), and export to PDF/Excel. Docker is configured for both production images and local development with hot reload.

## Key Features

- Auth
  - Mocked login with email/password and cookie-based guard
  - Middleware protects /login and /dashboard routes
- Layout
  - Global shell with sidebar + topbar on all authenticated pages
  - Sidebar collapses to icons on medium screens; full on large
  - Mobile sidebar with overlay; toggle button in topbar
- Dashboard
  - Users table with search, sort, pagination
  - Add/delete rows inline
  - Export to PDF and Excel (xlsx)
  - Area chart and category pie chart
- Sections
  - Products: bar chart by category + add/delete + exports
  - Clients: pie chart by country + add/delete + exports
  - Sales: revenue line + orders bar charts
  - Orders: status filter + add/delete + exports

## Tech Stack

- Next.js 16 App Router
- React 19
- Redux Toolkit + React-Redux
- Tailwind CSS v4
- Recharts
- jsPDF + jspdf-autotable, SheetJS (xlsx)

## Project Structure (high level)

- app/
  - layout.tsx – global providers and authenticated shell
  - login/page.tsx – sign-in page
  - dashboard/page.tsx + dashboard/ui.tsx – dashboard UI
  - products/page.tsx, clients/page.tsx, sales/page.tsx, orders/page.tsx
- components/
  - Shell, Sidebar, Topbar, DataTable, Chart panels, Export buttons
- lib/
  - store.ts, hooks.ts
  - slices/… – Redux slices (auth, data, products, clients, sales, orders)
  - mock.ts – mocked data and login
  - export.ts – reusable PDF/XLSX helpers
- middleware.ts – cookie-based route protection

## Auth Flow

- Credentials: admin@example.com / password
- On success: sets cookie authToken and Redux auth state
- Middleware:
  - Redirects unauthenticated /dashboard requests to /login
  - Redirects authenticated /login to /dashboard
- Shell visibility:
  - Hidden on /login and when authToken is absent
  - Visible for authenticated routes

## Local Development (Node)

1. Install dependencies

```bash
npm install
```

2. Start dev server

```bash
npm run dev
```

3. Open http://localhost:3000

## Run Scripts

- Dev: `npm run dev`
- Build: `npm run build`
- Start (prod): `npm run start`
- Lint: `npm run lint`

## Docker (Production Image)

Build and run a production image that serves the built Next.js app via `next start`:

```bash
docker build -t dash:prod .
docker run -p 3000:3000 --name dash dash:prod
```

Open http://localhost:3000

## Docker Compose (Development, Hot Reload)

Use Compose to develop with hot reload inside a container:

```bash
docker compose up
```

Open http://localhost:3000. Stop with:

```bash
docker compose down
```

## Data Tables

- Users (Dashboard)
  - Search across name, email, role, status
  - Sort by clicking column headers
  - Pagination with adjustable page size
  - Add row (inline form), delete row buttons
  - Exports: PDF and Excel (XLSX)
- Products / Clients / Orders
  - Add/delete rows with minimal forms
  - Exports with consistent columns per page
  - Charts on Products/Clients/Sales for quick insights

## Charts

- Area chart: users by month status
- Pie charts: category distribution and clients by country
- Line/Bar charts: revenue and orders by month

## Sidebar & Topbar

- Sidebar items: Dashboard, Products, Clients, Sales, Orders, and placeholders
- Behavior:
  - Mobile: overlay drawer with toggle in topbar
  - Medium: icons-only
  - Large: icons + labels
- Topbar includes language badge, notification icon, user, and logout

## Notes

- Environment variables are not required for the mocked demo.
- If you introduce APIs later, add a `.env` and update Docker as needed.
- The project uses Tailwind v4 utilities for dark theme styling and responsiveness.
