# Quick Start Guide

## 1. Install Dependencies

```bash
npm install
```

## 2. Start Backend (Port 3000)

```bash
npm run serve-json
```

Expected log:

JSON Server is running on http://localhost:3000/api

## 3. Start Frontend

```bash
npm run dev
```

Open:

http://localhost:5173

## 4. Login Credentials

- admin@foodapp.com / admin123
- john@example.com / password
- rest1@gmail.com / user123

## 5. Port Policy

This app now uses one API port only:
- 3000

Axios base URL is fixed to:
- http://localhost:3000/api

Server default port is fixed to:
- 3000

## 6. Main Routes

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

## 7. Common Errors

### Error: POST /api/users/login 404

Cause:
- Backend is not running on port 3000.

Fix:
1. Start backend with npm run serve-json.
2. Verify log shows http://localhost:3000/api.
3. Refresh browser with Ctrl+Shift+R.

### Error: Port 3000 is in use

Find process:

```powershell
netstat -ano | findstr :3000
```

Stop process by PID:

```powershell
taskkill /PID <PID> /F
```

Then run npm run serve-json again.

## 8. API Endpoints In Use

Auth:
- POST /api/users/login
- POST /api/users/register
- POST /api/users/logout
- GET /api/auth/verify-token

Catalog:
- GET /api/restaurants
- GET /api/restaurants/:restaurantId
- GET /api/restaurants/:restaurantId/menu

Orders:
- GET /api/orders
- POST /api/orders
- PATCH /api/orders/:orderId
- GET /api/orders/:orderId/location

Coupons:
- GET /api/coupons
