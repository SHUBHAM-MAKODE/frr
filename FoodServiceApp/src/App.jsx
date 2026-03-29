import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'
import RestaurantList from './pages/RestaurantList'
import RestaurantMenu from './pages/RestaurantMenu'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderTracking from './pages/OrderTracking'
import LogoutPage from './pages/LogoutPage'
import InfoPage from './pages/InfoPage'
import FeedbackPage from './pages/FeedbackPage'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            {/* Restaurant Routes */}
            <Route path="/restaurants" element={<RestaurantList />} />
            <Route path="/restaurant/:id" element={<RestaurantMenu />} />

            {/* Cart & Checkout Routes */}
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />

            {/* Order Routes */}
            <Route path="/order-tracking/:orderId" element={
              <ProtectedRoute>
                <OrderTracking />
              </ProtectedRoute>
            } />

            {/* Logout Route */}
            <Route path="/logout" element={<LogoutPage />} />

            {/* Info Routes */}
            <Route path="/deals" element={<InfoPage title="Deals" description="Latest offers and discounts will appear here." />} />
            <Route path="/about" element={<InfoPage title="About Us" description="Learn more about QuickBite and our mission." />} />
            <Route path="/contact" element={<InfoPage title="Contact" description="Reach out to our support team from this page." />} />
            <Route path="/help" element={<InfoPage title="Help Center" description="Browse FAQs and support resources." />} />
            <Route path="/privacy" element={<InfoPage title="Privacy Policy" description="Privacy policy content will be added here." />} />
            <Route path="/terms" element={<InfoPage title="Terms of Service" description="Terms and conditions will be published here." />} />
            <Route path="/feedback" element={
              <ProtectedRoute>
                <FeedbackPage />
              </ProtectedRoute>
            } />

            {/* Catch All - Redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
