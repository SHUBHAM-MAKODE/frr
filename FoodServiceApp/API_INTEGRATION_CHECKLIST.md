# API Integration Checklist

This checklist reflects the current frontend integration against the local server and db.json.

## Base API Configuration

- Base URL: http://localhost:3000/api
- Port policy: 3000 only

## Auth APIs

### POST /api/users/login
Used in:
- src/context/AuthContext.jsx
- src/pages/LoginPage.jsx

Request body:

```json
{
  "email": "admin@foodapp.com",
  "password": "admin123"
}
```

Expected response:

```json
{
  "success": true,
  "data": {
    "token": "fake-jwt-token-...",
    "user": {
      "id": 1,
      "name": "Admin User",
      "email": "admin@foodapp.com",
      "phone": "9999999999",
      "role": "ADMIN"
    }
  }
}
```

### POST /api/users/register
Used in:
- src/context/AuthContext.jsx
- src/pages/RegisterPage.jsx

Request body:

```json
{
  "name": "rest",
  "email": "rest1@gmail.com",
  "password": "user123",
  "phone": "7897897899",
  "role": "RESTAURANT"
}
```

### POST /api/users/logout
Used in:
- src/context/AuthContext.jsx

### GET /api/auth/verify-token
Used in:
- src/api/jsonServerApi.js

## Restaurant APIs

### GET /api/restaurants
Used in:
- src/pages/RestaurantList.jsx

### GET /api/restaurants/:restaurantId
Used in:
- src/pages/RestaurantMenu.jsx

### GET /api/restaurants/:restaurantId/menu
Used in:
- src/pages/RestaurantMenu.jsx
- src/api/jsonServerApi.js

## Order APIs

### GET /api/orders
Used in:
- src/components/CustomerPanel.jsx
- src/pages/OrderTracking.jsx

### POST /api/orders
Used in:
- src/pages/Checkout.jsx

### PATCH /api/orders/:orderId
Used in:
- src/api/jsonServerApi.js

### GET /api/orders/:orderId/location
Used in:
- src/pages/OrderTracking.jsx

## Coupon APIs

### GET /api/coupons
Used in:
- src/pages/Cart.jsx
- src/api/jsonServerApi.js

### POST /api/coupons/validate
Used in:
- src/api/jsonServerApi.js

Note:
- This route is a placeholder unless explicitly implemented in server.js.

## Validation Checklist

- [ ] Backend started with npm run serve-json
- [ ] Log shows http://localhost:3000/api
- [ ] Frontend started with npm run dev
- [ ] Login works with admin@foodapp.com / admin123
- [ ] Register creates new user in db.json
- [ ] Restaurant list loads
- [ ] Cart coupon fetch works
- [ ] Checkout order creation works
