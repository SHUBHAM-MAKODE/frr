import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './LogoutPage.css';

const LogoutPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { clearCart } = useCart();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Call server logout to invalidate token
        await logout();

        // Clear cart data
        clearCart();

        // Clear any other local storage data
        localStorage.removeItem('userPreferences');
        localStorage.removeItem('recentSearches');

        // Redirect to landing page after a short delay for UX
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1500);

      } catch (error) {
        console.error('Logout error:', error);
        // Still clear local state even if server call fails
        logout();
        clearCart();
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1500);
      }
    };

    performLogout();
  }, [navigate, logout, clearCart]);

  return (
    <div className="logout-page">
      <div className="logout-container">
        <div className="logout-content">
          <div className="logout-icon">
            <div className="spinner"></div>
          </div>
          <h2>Logging out...</h2>
          <p>Thank you for using QuickBite!</p>
          <p>Redirecting you to the homepage...</p>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
