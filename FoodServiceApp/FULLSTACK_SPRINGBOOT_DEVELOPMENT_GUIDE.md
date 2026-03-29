# Full-Stack Development Guide (React + Spring Boot)

This guide helps you build the complete application together:

- Frontend: React (already present in this repository)
- Backend: Spring Boot (new service you are creating)

It is aligned with your current frontend API usage and routes.

## 1. Recommended Project Layout

Keep frontend and backend side by side:

- FoodServiceApp/ (current frontend)
- FoodServiceApp-backend/ (new Spring Boot backend)

Example:

```text
workspace/
  FoodServiceApp/
    src/
    package.json
  FoodServiceApp-backend/
    src/main/java/
    src/main/resources/
    pom.xml
```

## 2. Backend Bootstrap (Spring Boot)

Create project with:

- Java 17+
- Spring Boot 3.x
- Maven

Dependencies:

- spring-boot-starter-web
- spring-boot-starter-data-jpa
- spring-boot-starter-validation
- spring-boot-starter-security
- jjwt-api, jjwt-impl, jjwt-jackson (JWT)
- mysql-connector-j (or postgresql)
- spring-boot-starter-test

Set backend port to 3000 (to match frontend):

```properties
# src/main/resources/application.properties
server.port=3000
server.servlet.context-path=/api
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

## 3. Core Backend Package Structure

Use this package layout:

```text
com.foodapp
  config/
    SecurityConfig.java
    CorsConfig.java
    JwtFilter.java
  controller/
    AuthController.java
    RestaurantController.java
    OrderController.java
    CouponController.java
    UserController.java
  dto/
    request/
    response/
  entity/
    User.java
    Restaurant.java
    MenuItem.java
    Order.java
    OrderItem.java
    Coupon.java
  repository/
    UserRepository.java
    RestaurantRepository.java
    MenuItemRepository.java
    OrderRepository.java
    CouponRepository.java
  service/
    AuthService.java
    RestaurantService.java
    OrderService.java
    CouponService.java
  exception/
    GlobalExceptionHandler.java
```

## 4. Build in This Order (Backend)

### Step A: Auth First

Create:

- User entity (id, name, email, password, phone, role)
- Register API
- Login API
- JWT generation + token validation
- Logout API (optional stateless success response)

Endpoints required by current frontend:

- POST /api/users/register
- POST /api/users/login
- POST /api/users/logout
- GET /api/auth/verify-token

Return shape expected by frontend:

```json
{
  "success": true,
  "data": {
    "token": "...",
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

### Step B: Restaurants and Menu

Create:

- Restaurant entity
- MenuItem entity (with restaurantId relation)

Endpoints:

- GET /api/restaurants
- GET /api/restaurants/{restaurantId}
- GET /api/restaurants/{restaurantId}/menu

### Step C: Orders

Create:

- Order + OrderItem entities
- Order status enum (PENDING, CONFIRMED, PREPARING, READY, OUT_FOR_DELIVERY, DELIVERED)

Endpoints:

- GET /api/orders
- POST /api/orders
- PATCH /api/orders/{orderId}
- GET /api/orders/{orderId}/location

### Step D: Coupons

Create:

- Coupon entity

Endpoints:

- GET /api/coupons
- POST /api/coupons/validate (optional now, implement if used)

## 5. Frontend Mapping (What to Connect)

When backend endpoints are ready, verify integration against these frontend files:

Auth flow:

- [src/context/AuthContext.jsx](src/context/AuthContext.jsx)
- [src/pages/LoginPage.jsx](src/pages/LoginPage.jsx)
- [src/pages/RegisterPage.jsx](src/pages/RegisterPage.jsx)

API client:

- [src/api/axiosInstance.js](src/api/axiosInstance.js)
- [src/api/jsonServerApi.js](src/api/jsonServerApi.js)

Restaurant/catalog flow:

- [src/pages/RestaurantList.jsx](src/pages/RestaurantList.jsx)
- [src/pages/RestaurantMenu.jsx](src/pages/RestaurantMenu.jsx)

Order flow:

- [src/pages/Cart.jsx](src/pages/Cart.jsx)
- [src/pages/Checkout.jsx](src/pages/Checkout.jsx)
- [src/pages/OrderTracking.jsx](src/pages/OrderTracking.jsx)

Routing and guards:

- [src/App.jsx](src/App.jsx)
- [src/components/ProtectedRoute.jsx](src/components/ProtectedRoute.jsx)

## 6. CORS and Security Setup

Allow frontend origin in Spring Boot:

- http://localhost:5173

Security recommendations:

- BCrypt for password hashing
- JWT with expiry
- Role-based endpoint access for ADMIN/RESTAURANT/CUSTOMER/DELIVERY_AGENT
- Validate all request DTOs using Bean Validation

## 7. Response Standardization

Use one response wrapper across backend:

```json
{
  "success": true,
  "message": "optional",
  "data": {}
}
```

For errors:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "must be valid"
  }
}
```

This keeps frontend error handling simple.

## 8. Database Design (Initial)

Minimum tables:

- users
- restaurants
- menu_items
- orders
- order_items
- coupons

Optional later:

- addresses
- payment_methods
- notifications
- complaints

## 9. End-to-End Run Commands

Frontend:

```bash
npm install
npm run dev
```

Backend:

```bash
mvn clean install
mvn spring-boot:run
```

Expected URLs:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000/api

## 10. Suggested 7-Day Plan

Day 1:

- Backend project setup + entities + DB config

Day 2:

- Auth APIs + JWT + CORS

Day 3:

- Restaurant + menu APIs

Day 4:

- Orders APIs

Day 5:

- Coupons + validation + error handler

Day 6:

- Integration testing with frontend flows

Day 7:

- Role authorization, cleanup, documentation

## 11. Definition of Done

Backend is complete when:

- All required endpoints return expected response format
- Login/register works from frontend UI
- Restaurant list and menu load from DB
- Checkout creates order in DB
- Order tracking fetches live order/location data
- Lint/build pass on frontend and tests pass on backend

## 12. Important Note for Your Current Project

Since your frontend is fixed to port 3000 for API calls, your Spring Boot backend must run on 3000.
If you run another process on 3000, frontend calls will fail.

You can use your existing json-server temporarily, then replace it API by API with Spring Boot.
