// ============================================================
// FOOD DELIVERY APP - API INTEGRATION GUIDE
// ============================================================
// Use this alongside json-server mock backend (server.js + db.json)
// To start the fake server:
//   npm run serve-json
// Then start the frontend:
//   npm run dev
// NOTE: axios baseURL is now http://localhost:8081/api
// ============================================================
// This file documents all API endpoints that need to be created
// for the frontend to work with the backend.
// ============================================================

/**
 * ============================================================
 * AUTHENTICATION ENDPOINTS
 * ============================================================
 */

// POST /api/auth/register
// Request: { email, password, name, phone, role }
// Response: { success: true, data: { id, email, name, role, token } }
// Purpose: User registration for customers, restaurants, delivery agents

// POST /api/auth/login
// Request: { email, password }
// Response: { success: true, data: { id, email, name, role, token } }
// Purpose: User login and authentication

// POST /api/auth/logout
// Request: { token }
// Response: { success: true, message: "Logged out successfully" }
// Purpose: Invalidate user session

// GET /api/auth/verify-token
// Headers: { Authorization: "Bearer {token}" }
// Response: { success: true, data: { user } }
// Purpose: Verify if token is valid

/**
 * ============================================================
 * RESTAURANT ENDPOINTS
 * ============================================================
 */

// GET /api/restaurants
// Query params: ?cuisine={cuisine}&sort={sortBy}&search={searchTerm}&location={location}
// Response: { success: true, data: [{ id, name, cuisine, rating, reviews, deliveryTime, minOrder, deliveryFee, image, cuisines, isOpen }] }
// Purpose: Get list of all restaurants with filters

// GET /api/restaurants/:restaurantId
// Response: { success: true, data: { id, name, cuisines, address, rating, stats, description, phone, image } }
// Purpose: Get details of a specific restaurant

// GET /api/restaurants/:restaurantId/menu
// Response: { success: true, data: [{ id, name, category, price, description, image, available }] }
// Purpose: Get menu items of a restaurant

// GET /api/restaurants/:restaurantId/dashboard
// Headers: { Authorization: "Bearer {token}" }
// Response: { success: true, data: { stats, recentOrders, topItems, peakHours } }
// Purpose: Get restaurant dashboard data (for restaurant owners)

// GET /api/restaurants/:restaurantId/analytics
// Headers: { Authorization: "Bearer {token}" }
// Query params: ?timeRange={daily|weekly|monthly|yearly}
// Response: { success: true, data: { dailyRevenue: [], weeklyRevenue: [], monthlyRevenue: [], yearlyRevenue: [], trends } }
// Purpose: Get revenue analytics for restaurants

// POST /api/restaurants
// Headers: { Authorization: "Bearer {token}" }
// Request: { name, cuisine, address, phone, description, image }
// Response: { success: true, data: { id, ...restaurantData } }
// Purpose: Register a new restaurant

// PUT /api/restaurants/:restaurantId
// Headers: { Authorization: "Bearer {token}" }
// Request: { name, cuisine, address, phone, description, image }
// Response: { success: true, data: { ...restaurantData } }
// Purpose: Update restaurant details

// PUT /api/restaurants/:restaurantId/status
// Headers: { Authorization: "Bearer {token}" }
// Request: { status: "open" | "closed" }
// Response: { success: true, data: { status } }
// Purpose: Toggle restaurant open/closed status

/**
 * ============================================================
 * MENU ITEMS ENDPOINTS
 * ============================================================
 */

// GET /api/menu/:itemId
// Response: { success: true, data: { id, name, category, price, description, image, available } }
// Purpose: Get details of a menu item

// POST /api/restaurants/:restaurantId/menu
// Headers: { Authorization: "Bearer {token}" }
// Request: { name, category, price, description, available, image }
// Response: { success: true, data: { id, ...menuItem } }
// Purpose: Add a new menu item

// PUT /api/menu/:itemId
// Headers: { Authorization: "Bearer {token}" }
// Request: { name, category, price, description, available, image }
// Response: { success: true, data: { ...menuItem } }
// Purpose: Update menu item details

// DELETE /api/menu/:itemId
// Headers: { Authorization: "Bearer {token}" }
// Response: { success: true, message: "Item deleted" }
// Purpose: Delete a menu item

// PUT /api/menu/:itemId/availability
// Headers: { Authorization: "Bearer {token}" }
// Request: { available: true | false }
// Response: { success: true, data: { available } }
// Purpose: Toggle menu item availability

/**
 * ============================================================
 * ORDER ENDPOINTS
 * ============================================================
 */

// GET /api/orders
// Headers: { Authorization: "Bearer {token}" }
// Response: { success: true, data: [{ id, restaurant, status, total, date, items }] }
// Purpose: Get user's order history

// GET /api/orders/:orderId
// Headers: { Authorization: "Bearer {token}" }
// Response: { success: true, data: { orderId, status, items, total, estimatedDelivery, deliveryPartner, location, timeline } }
// Purpose: Get order details and tracking info

// POST /api/orders
// Headers: { Authorization: "Bearer {token}" }
// Request: { restaurantId, items: [{itemId, quantity}], deliveryAddressId, paymentMethodId, coupon, specialInstructions }
// Response: { success: true, data: { orderId, total, estimatedDelivery, status: "CONFIRMED" } }
// Purpose: Create a new order

// PUT /api/orders/:orderId/status
// Headers: { Authorization: "Bearer {token}" }
// Request: { status: "PENDING" | "CONFIRMED" | "PREPARING" | "READY" | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED" }
// Response: { success: true, message: "Status updated" }
// Purpose: Update order status (by restaurant/delivery partner)

// PUT /api/orders/:orderId/cancel
// Headers: { Authorization: "Bearer {token}" }
// Response: { success: true, message: "Order cancelled" }
// Purpose: Cancel an order

// GET /api/orders/:orderId/location
// Headers: { Authorization: "Bearer {token}" }
// Response: { success: true, data: { latitude, longitude, timestamp } }
// Purpose: Get real-time delivery partner location

/**
 * ============================================================
 * CART ENDPOINTS (Optional - can be managed on frontend)
 * ============================================================
 */

// POST /api/cart
// Headers: { Authorization: "Bearer {token}" }
// Request: { items: [{ itemId, quantity }] }
// Response: { success: true, data: { cartId, items, total } }
// Purpose: Create/update cart

// GET /api/cart
// Headers: { Authorization: "Bearer {token}" }
// Response: { success: true, data: { cartId, items, total } }
// Purpose: Get user's cart

/**
 * ============================================================
 * USER ENDPOINTS
 * ============================================================
 */

// GET /api/users/:userId
// Headers: { Authorization: "Bearer {token}" }
// Response: { success: true, data: { id, name, email, phone, role, avatar } }
// Purpose: Get user profile

// PUT /api/users/:userId
// Headers: { Authorization: "Bearer {token}" }
// Request: { name, phone, avatar }
// Response: { success: true, data: { ...userData } }
// Purpose: Update user profile

// GET /api/users/:userId/addresses
// Headers: { Authorization: "Bearer {token}" }
// Response: { success: true, data: [{ id, type, address, landmark, isDefault }] }
// Purpose: Get user's saved addresses

// POST /api/users/:userId/addresses
// Headers: { Authorization: "Bearer {token}" }
// Request: { type, address, landmark, isDefault }
// Response: { success: true, data: { id, ...address } }
// Purpose: Add new address

// PUT /api/users/:userId/addresses/:addressId
// Headers: { Authorization: "Bearer {token}" }
// Request: { type, address, landmark, isDefault }
// Response: { success: true, data: { ...address } }
// Purpose: Update address

// DELETE /api/users/:userId/addresses/:addressId
// Headers: { Authorization: "Bearer {token}" }
// Response: { success: true, message: "Address deleted" }
// Purpose: Delete address

// GET /api/users/:userId/payment-methods
// Headers: { Authorization: "Bearer {token}" }
// Response: { success: true, data: [{ id, type, brand, last4, expiry, upiId, isDefault }] }
// Purpose: Get user's payment methods

// POST /api/users/:userId/payment-methods
// Headers: { Authorization: "Bearer {token}" }
// Request: { type, cardNumber, expiry, cvv, isDefault } // or upiId for UPI
// Response: { success: true, data: { id, type, last4, isDefault } }
// Purpose: Add new payment method

// DELETE /api/users/:userId/payment-methods/:paymentMethodId
// Headers: { Authorization: "Bearer {token}" }
// Response: { success: true, message: "Payment method deleted" }
// Purpose: Delete payment method

/**
 * ============================================================
 * COUPON/PROMOTION ENDPOINTS
 * ============================================================
 */

// GET /api/coupons
// Response: { success: true, data: [{ code, discount, type: "percentage"|"fixed", maxUses, minAmount, expiryDate }] }
// Purpose: Get available coupons

// POST /api/coupons/validate
// Request: { code, amount }
// Response: { success: true, data: { discount, message } } or { success: false, message: "Invalid coupon" }
// Purpose: Validate and get coupon discount

/**
 * ============================================================
 * ADMIN ENDPOINTS
 * ============================================================
 */

// GET /api/admin/dashboard
// Headers: { Authorization: "Bearer {token}" }
// Response: { success: true, data: { totalUsers, totalRestaurants, totalOrders, totalRevenue, pendingApprovals, complaints } }
// Purpose: Get admin dashboard overview

// GET /api/admin/restaurants/pending
// Headers: { Authorization: "Bearer {token}" }
// Response: { success: true, data: [{ id, name, email, phone, cuisine, submittedDate }] }
// Purpose: Get pending restaurant approvals

// POST /api/admin/restaurants/:restaurantId/approve
// Headers: { Authorization: "Bearer {token}" }
// Response: { success: true, message: "Restaurant approved" }
// Purpose: Approve a restaurant

// POST /api/admin/restaurants/:restaurantId/reject
// Headers: { Authorization: "Bearer {token}" }
// Request: { reason }
// Response: { success: true, message: "Restaurant rejected" }
// Purpose: Reject a restaurant application

// GET /api/admin/complaints
// Headers: { Authorization: "Bearer {token}" }
// Response: { success: true, data: [{ id, user, restaurant, order, issue, date, status }] }
// Purpose: Get customer complaints

// PUT /api/admin/complaints/:complaintId/resolve
// Headers: { Authorization: "Bearer {token}" }
// Request: { resolution }
// Response: { success: true, message: "Complaint resolved" }
// Purpose: Resolve a complaint

// GET /api/admin/analytics
// Headers: { Authorization: "Bearer {token}" }
// Query params: ?timeRange={daily|monthly|yearly}
// Response: { success: true, data: { revenue, orders, trends, topRestaurants } }
// Purpose: Get admin analytics

// POST /api/admin/reports/download
// Headers: { Authorization: "Bearer {token}" }
// Request: { format: "pdf"|"csv"|"excel", timeRange }
// Response: Binary file download
// Purpose: Generate and download reports

/**
 * ============================================================
 * DELIVERY AGENT ENDPOINTS
 * ============================================================
 */

// GET /api/delivery/active-orders
// Headers: { Authorization: "Bearer {token}" }
// Response: { success: true, data: [{ id, restaurant, customer, location, status, items }] }
// Purpose: Get available delivery orders

// POST /api/delivery/orders/:orderId/accept
// Headers: { Authorization: "Bearer {token}" }
// Response: { success: true, message: "Order accepted" }
// Purpose: Accept a delivery order

// PUT /api/delivery/orders/:orderId/location
// Headers: { Authorization: "Bearer {token}" }
// Request: { latitude, longitude }
// Response: { success: true, message: "Location updated" }
// Purpose: Update delivery agent location

// PUT /api/delivery/orders/:orderId/complete
// Headers: { Authorization: "Bearer {token}" }
// Response: { success: true, message: "Delivery completed" }
// Purpose: Mark delivery as completed

/**
 * ============================================================
 * RATING AND REVIEW ENDPOINTS
 * ============================================================
 */

// POST /api/ratings
// Headers: { Authorization: "Bearer {token}" }
// Request: { orderId, restaurantId, rating: 1-5, review, foodQuality, deliverySpeed, packaging }
// Response: { success: true, data: { id, ...rating } }
// Purpose: Submit rating and review

// GET /api/restaurants/:restaurantId/reviews
// Response: { success: true, data: [{ id, userId, userName, rating, review, date }] }
// Purpose: Get restaurant reviews

/**
 * ============================================================
 * NOTIFICATION ENDPOINTS (Optional for future)
 * ============================================================
 */

// GET /api/notifications
// Headers: { Authorization: "Bearer {token}" }
// Response: { success: true, data: [{ id, type, message, read, date }] }
// Purpose: Get user notifications

// PUT /api/notifications/:notificationId/read
// Headers: { Authorization: "Bearer {token}" }
// Response: { success: true, message: "Notification marked as read" }
// Purpose: Mark notification as read

/**
 * ============================================================
 * ERROR RESPONSE FORMAT
 * ============================================================
 * All endpoints should return errors in this format:
 * { success: false, message: "Error message", error: { code: "ERROR_CODE", details: {} } }
 */

export const API_ENDPOINTS = {
  // Auth
  "POST /api/auth/register": "User Registration",
  "POST /api/auth/login": "User Login",
  "POST /api/auth/logout": "User Logout",
  "GET /api/auth/verify-token": "Verify Token",

  // Restaurants
  "GET /api/restaurants": "Get All Restaurants",
  "GET /api/restaurants/:restaurantId": "Get Restaurant Details",
  "GET /api/restaurants/:restaurantId/menu": "Get Restaurant Menu",
  "GET /api/restaurants/:restaurantId/dashboard": "Get Restaurant Dashboard",
  "GET /api/restaurants/:restaurantId/analytics": "Get Revenue Analytics",
  "POST /api/restaurants": "Create Restaurant",
  "PUT /api/restaurants/:restaurantId": "Update Restaurant",
  "PUT /api/restaurants/:restaurantId/status": "Toggle Restaurant Status",

  // Menu
  "GET /api/menu/:itemId": "Get Menu Item",
  "POST /api/restaurants/:restaurantId/menu": "Add Menu Item",
  "PUT /api/menu/:itemId": "Update Menu Item",
  "DELETE /api/menu/:itemId": "Delete Menu Item",
  "PUT /api/menu/:itemId/availability": "Toggle Item Availability",

  // Orders
  "GET /api/orders": "Get User Orders",
  "GET /api/orders/:orderId": "Get Order Details",
  "POST /api/orders": "Create Order",
  "PUT /api/orders/:orderId/status": "Update Order Status",
  "PUT /api/orders/:orderId/cancel": "Cancel Order",
  "GET /api/orders/:orderId/location": "Get Delivery Location",

  // Users
  "GET /api/users/:userId": "Get User Profile",
  "PUT /api/users/:userId": "Update User Profile",
  "GET /api/users/:userId/addresses": "Get User Addresses",
  "POST /api/users/:userId/addresses": "Add Address",
  "PUT /api/users/:userId/addresses/:addressId": "Update Address",
  "DELETE /api/users/:userId/addresses/:addressId": "Delete Address",
  "GET /api/users/:userId/payment-methods": "Get Payment Methods",
  "POST /api/users/:userId/payment-methods": "Add Payment Method",
  "DELETE /api/users/:userId/payment-methods/:paymentMethodId":
    "Delete Payment Method",

  // Coupons
  "GET /api/coupons": "Get Coupons",
  "POST /api/coupons/validate": "Validate Coupon",

  // Admin
  "GET /api/admin/dashboard": "Admin Dashboard",
  "GET /api/admin/restaurants/pending": "Get Pending Restaurants",
  "POST /api/admin/restaurants/:restaurantId/approve": "Approve Restaurant",
  "POST /api/admin/restaurants/:restaurantId/reject": "Reject Restaurant",
  "GET /api/admin/complaints": "Get Complaints",
  "PUT /api/admin/complaints/:complaintId/resolve": "Resolve Complaint",
  "GET /api/admin/analytics": "Get Admin Analytics",
  "POST /api/admin/reports/download": "Download Reports",
};
