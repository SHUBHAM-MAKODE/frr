import api from "./axiosInstance";

// ============================
// JSON Server API wrappers
// ============================

// AUTH
export const login = async (credentials) => {
  // POST: /api/users/login
  return api.post("/users/login", credentials);
};

export const register = async (userData) => {
  // POST: /api/users/register
  return api.post("/users/register", userData);
};

export const logout = async (token) => {
  // POST: /api/users/logout
  return api.post("/users/logout", { token });
};

export const verifyToken = async () => {
  // GET: /api/auth/verify-token
  return api.get("/auth/verify-token");
};

// RESTAURANTS
export const getRestaurants = (params) => {
  // GET: /api/restaurants?cuisine=&sort=&search=&location=
  return api.get("/restaurants", { params });
};

export const getRestaurant = (restaurantId) => {
  // GET: /api/restaurants/:restaurantId
  return api.get(`/restaurants/${restaurantId}`);
};

export const getRestaurantMenu = (restaurantId) => {
  // GET: /api/restaurants/:restaurantId/menu
  return api.get(`/restaurants/${restaurantId}/menu`);
};

export const addRestaurant = (payload) => {
  // POST: /api/restaurants
  return api.post("/restaurants", payload);
};

export const updateRestaurant = (restaurantId, payload) => {
  // PUT: /api/restaurants/:restaurantId
  return api.put(`/restaurants/${restaurantId}`, payload);
};

export const toggleRestaurantStatus = (restaurantId, status) => {
  // PUT: /api/restaurants/:restaurantId/status
  return api.patch(`/restaurants/${restaurantId}`, {
    isOpen: status === "open",
  });
};

// ORDER
export const getUserOrders = (params) => {
  // GET: /api/orders?userId=:userId
  return api.get("/orders", { params });
};

export const createOrder = (payload) => {
  // POST: /api/orders
  return api.post("/orders", payload);
};

export const updateOrderStatus = (orderId, status) => {
  // PUT: /api/orders/:orderId/status
  return api.patch(`/orders/${orderId}`, { status });
};

// Coupon endpoint mapper
export const getCoupons = () => {
  // GET: /api/coupons
  return api.get("/coupons");
};

export const validateCoupon = (payload) => {
  // POST: /api/coupons/validate
  // json-server doesn't support custom action directly, but this is a placeholder for future Express logic.
  return api.post("/coupons/validate", payload);
};

// TODO: Add more wrappers for user profiles, addresses, cart, admin, delivery, etc.
