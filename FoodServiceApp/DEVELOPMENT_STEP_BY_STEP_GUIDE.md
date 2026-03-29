# Food Service App - Step-by-Step Development Guide

This guide explains what to build first, then what to build next, and exactly which JSX files to update in each step.

## Step 1: Project Setup and App Shell

Goal:

- Make app boot correctly with routing and providers.

Work in:

- src/main.jsx
- src/App.jsx

What to develop:

- Wrap app with router and top-level providers.
- Define all route paths.
- Add catch-all route for unknown URLs.
- Keep route groups clear: public, protected, info pages.

Done when:

- App opens at / with no routing errors.
- Unknown route redirects to home.

## Step 2: Authentication Foundation

Goal:

- Implement login, register, logout, and persistent session state.

Work in:

- src/context/AuthContext.jsx
- src/components/ProtectedRoute.jsx
- src/pages/LoginPage.jsx
- src/pages/RegisterPage.jsx
- src/pages/LogoutPage.jsx
- src/pages/AuthPages.css

What to develop:

- Auth context with user state, login, register, logout methods.
- Local storage sync for token, user, role.
- Protected route guard logic.
- Login/register forms with validation and error rendering.
- Logout flow that clears local state even if server logout fails.

Done when:

- Login redirects to dashboard.
- Reload preserves logged-in user.
- Protected pages block unauthenticated access.

## Step 3: API Layer and Base Connectivity

Goal:

- Centralize API requests and keep base URL consistent.

Work in:

- src/api/axiosInstance.js
- src/api/jsonServerApi.js
- server.js
- db.json

What to develop:

- Axios instance with base URL set to http://localhost:3000/api.
- Request interceptor to attach token.
- Response interceptor to handle 401.
- API wrapper functions for auth, restaurants, orders, coupons.
- Backend custom routes for login/register/logout/verify-token.

Done when:

- Login and register requests return expected payload.
- All API calls go to port 3000.

## Step 4: Landing and Public Discovery Pages

Goal:

- Build user-facing public entry flow before checkout features.

Work in:

- src/pages/LandingPage.jsx
- src/pages/LandingPage.css
- src/pages/RestaurantList.jsx
- src/pages/RestaurantList.css
- src/pages/RestaurantMenu.jsx
- src/pages/RestaurantMenu.css

What to develop:

- Landing hero, service highlights, and footer links.
- Restaurant listing with search/filter/sort.
- Restaurant detail menu view by route param.
- Add-to-cart action wiring from menu page.

Done when:

- User can browse restaurants and menu items.
- Menu actions can add items into cart context.

## Step 5: Cart State and Checkout Flow

Goal:

- Implement complete order creation path.

Work in:

- src/context/CartContext.jsx
- src/pages/Cart.jsx
- src/pages/Cart.css
- src/pages/Checkout.jsx
- src/pages/Checkout.css

What to develop:

- Cart reducer/actions for add, remove, quantity, clear.
- Cart list UI with totals and coupon entry.
- Checkout steps: address, payment, review.
- Place-order call and post-order redirect.

Done when:

- User can add items, edit cart, and place an order.
- Successful checkout navigates to dashboard or tracking.

## Step 6: Order Tracking and Post-Order UX

Goal:

- Show status progression after checkout.

Work in:

- src/pages/OrderTracking.jsx
- src/pages/OrderTracking.css
- src/pages/FeedbackPage.jsx
- src/pages/InfoPage.jsx

What to develop:

- Timeline/status UI for order states.
- Delivery partner/location rendering.
- Feedback capture page.
- Info pages for deals/about/contact/help/privacy/terms.

Done when:

- Tracking page works with orderId route param.
- Footer/info routes render correctly.

## Step 7: Role-Based Dashboard Composition

Goal:

- Render correct panel by user role.

Work in:

- src/pages/Dashboard.jsx
- src/pages/Dashboard.css
- src/components/CustomerPanel.jsx
- src/components/RestaurantPanel.jsx
- src/components/DeliveryPanel.jsx
- src/components/AdminPanel.jsx
- src/components/DashboardPanels.css

What to develop:

- Role switch in dashboard page.
- Customer widgets (orders/favorites/profile).
- Restaurant operations view.
- Delivery assignment/status view.
- Admin moderation and platform controls.

Done when:

- Each role lands on the expected dashboard content.

## Step 8: Restaurant Analytics and Advanced Views

Goal:

- Add operations analytics for restaurant/admin perspectives.

Work in:

- src/components/RevenueAnalytics.jsx
- src/components/RevenueAnalytics.css
- src/components/RestaurantDashboard.jsx
- src/components/RestaurantDashboard.css

What to develop:

- Revenue trend cards/charts.
- Time-range filters.
- Export/report actions.
- Restaurant performance metrics.

Done when:

- Analytics panels render stable data and interactions.

## Step 9: Route Hardening and UX Cleanup

Goal:

- Ensure route protection and navigation are reliable.

Work in:

- src/App.jsx
- src/components/ProtectedRoute.jsx

What to develop:

- Protect sensitive routes only.
- Keep public routes accessible.
- Confirm fallback route behavior.
- Ensure redirects after auth actions are correct.

Done when:

- No accidental route exposure.
- Navigation feels consistent for all roles.

## Step 10: Data Validation and Error Handling

Goal:

- Make UI resilient to API failure and malformed responses.

Work in:

- src/pages/LoginPage.jsx
- src/pages/RegisterPage.jsx
- src/pages/RestaurantList.jsx
- src/pages/RestaurantMenu.jsx
- src/pages/Checkout.jsx
- src/pages/OrderTracking.jsx

What to develop:

- User-friendly error messages.
- Empty/loading/error states.
- Defensive checks around API response shapes.
- Remove render-time randomness and unstable values.

Done when:

- No crashes from missing data.
- Error states are clear and recoverable.

## Step 11: Verification and Quality Gates

Goal:

- Validate correctness before release.

Work in:

- eslint.config.js
- package.json

Commands to run:

- npm run lint
- npm run build

Manual checks:

- Login, register, logout.
- Browse restaurants and menus.
- Add to cart and checkout.
- Open order tracking.
- Verify each role dashboard.
- Verify info pages and feedback route.

Done when:

- Lint passes.
- Build passes.
- Critical flows work end to end.

## Suggested Daily Development Order

Day 1:

- Step 1, Step 2, Step 3

Day 2:

- Step 4, Step 5

Day 3:

- Step 6, Step 7

Day 4:

- Step 8, Step 9

Day 5:

- Step 10, Step 11

## Quick Ownership Map by File

Auth and session:

- src/context/AuthContext.jsx
- src/components/ProtectedRoute.jsx
- src/pages/LoginPage.jsx
- src/pages/RegisterPage.jsx
- src/pages/LogoutPage.jsx

Catalog and ordering:

- src/pages/RestaurantList.jsx
- src/pages/RestaurantMenu.jsx
- src/context/CartContext.jsx
- src/pages/Cart.jsx
- src/pages/Checkout.jsx
- src/pages/OrderTracking.jsx

Role dashboards:

- src/pages/Dashboard.jsx
- src/components/CustomerPanel.jsx
- src/components/RestaurantPanel.jsx
- src/components/DeliveryPanel.jsx
- src/components/AdminPanel.jsx

API and backend:

- src/api/axiosInstance.js
- src/api/jsonServerApi.js
- server.js
- db.json

Routing and app shell:

- src/main.jsx
- src/App.jsx
