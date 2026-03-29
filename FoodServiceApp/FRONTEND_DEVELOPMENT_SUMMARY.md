# Frontend Development Summary

## Status

Frontend is functional with local json-server backend and fixed API port 3000.

## Current Stack

- React + Vite
- React Router
- Axios
- Context API for auth and cart
- json-server + tinyhttp custom routes

## Port and API Policy

- Backend runs on: http://localhost:3000/api
- Frontend consumes only: http://localhost:3000/api
- No automatic port fallback in docs or expected setup

## Completed Areas

- Authentication flow (login, register, logout)
- Role-based dashboard routing
- Restaurant listing and menu browsing
- Cart and checkout flow
- Order tracking page
- Admin, customer, restaurant, delivery panels
- Feedback page and informational routes

## Routes Implemented

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

## Auth and Seed Users

From db.json:
- admin@foodapp.com / admin123 (ADMIN)
- john@example.com / password (CUSTOMER)
- rest1@gmail.com / user123 (RESTAURANT)

## Key API Endpoints in Active Use

- POST /api/users/login
- POST /api/users/register
- POST /api/users/logout
- GET /api/auth/verify-token
- GET /api/restaurants
- GET /api/restaurants/:restaurantId
- GET /api/restaurants/:restaurantId/menu
- GET /api/orders
- POST /api/orders
- PATCH /api/orders/:orderId
- GET /api/orders/:orderId/location
- GET /api/coupons

## Run Steps

1. npm install
2. npm run serve-json
3. npm run dev
4. Open http://localhost:5173

## Known Operational Constraint

If port 3000 is busy, backend will not start and frontend API calls fail with 404 or network errors.

Use:

```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Then restart backend.
