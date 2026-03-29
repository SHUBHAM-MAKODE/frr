# Food Service App

Food delivery frontend built with React and Vite, backed by a local json-server API.

## Current Runtime Setup

- API base URL: http://localhost:3000/api
- Backend command: npm run serve-json
- Frontend command: npm run dev
- Frontend URL: http://localhost:5173

This project is configured to use port 3000 only for API calls.

## Prerequisites

- Node.js 18+
- npm

## Install

```bash
npm install
```

## Run

Open two terminals in the project folder.

Terminal 1:

```bash
npm run serve-json
```

Terminal 2:

```bash
npm run dev
```

## Build and Lint

```bash
npm run lint
npm run build
```

## Test Accounts (db.json)

- Admin
  - Email: admin@foodapp.com
  - Password: admin123
- Customer
  - Email: john@example.com
  - Password: password
- Restaurant
  - Email: rest1@gmail.com
  - Password: user123

## Main Routes

Public:
- /
- /login
- /register
- /restaurants
- /restaurant/:id

Protected:
- /dashboard
- /cart
- /checkout
- /order-tracking/:orderId
- /feedback

Other:
- /logout
- /deals
- /about
- /contact
- /help
- /privacy
- /terms

## API Endpoints Used by Frontend

Auth:
- POST /api/users/login
- POST /api/users/register
- POST /api/users/logout
- GET /api/auth/verify-token

Data:
- GET /api/restaurants
- GET /api/restaurants/:id
- GET /api/restaurants/:id/menu
- GET /api/orders
- POST /api/orders
- PATCH /api/orders/:id
- GET /api/coupons

## Troubleshooting

If backend fails to start, port 3000 is already occupied. Free port 3000, then run npm run serve-json again.

On Windows, you can inspect port 3000:

```powershell
netstat -ano | findstr :3000
```
