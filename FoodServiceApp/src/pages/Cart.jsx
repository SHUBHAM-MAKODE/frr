import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Cart.css';

const Cart = () => {
  const { items, updateQty, removeItem, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);

  // TODO: API call to fetch available coupons/promotions
  // Endpoint: GET /api/coupons
  // Response: { success: true, data: [{ code, discount, type, maxUses, minAmount }] }
  const validCoupons = {
    'WELCOME10': 0.10,
    'SAVE20': 0.20,
    'FREEDELIVER': 0.50
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (validCoupons[appliedCoupon]) {
      const discount = totalAmount * validCoupons[appliedCoupon];
      setCouponDiscount(discount);
      alert(`Coupon applied! Discount: $${discount.toFixed(2)}`);
    } else {
      alert('Invalid coupon code');
      setAppliedCoupon('');
      setCouponDiscount(0);
    }
  };

  const handleProceedToCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (items.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    // TODO: Store cart data in context/localStorage before navigating to checkout
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-header">
          <h1>Your Cart</h1>
        </div>
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some delicious items from your favorite restaurants</p>
          <Link to="/restaurants" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const deliveryFee = 3.99;
  const subTotal = totalAmount;
  const tax = (subTotal * 0.08).toFixed(2);
  const grandTotal = (parseFloat(subTotal) + parseFloat(tax) + deliveryFee - couponDiscount).toFixed(2);

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <button className="btn-text" onClick={() => clearCart()}>
          Clear Cart
        </button>
      </div>

      <div className="cart-content">
        {/* Cart Items */}
        <div className="cart-items-section">
          <h2>Order Summary</h2>
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="item-restaurant">{item.restaurantName || item.restaurant}</p>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="item-quantity">
                  <button
                    className="qty-btn"
                    onClick={() => updateQty(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    readOnly
                    className="qty-input"
                  />
                  <button
                    className="qty-btn"
                    onClick={() => updateQty(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="item-subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className="btn-remove"
                  onClick={() => removeItem(item.id)}
                  title="Remove item"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="order-summary">
          <h3>Order Summary</h3>

          {/* Coupon Section */}
          <div className="coupon-section">
            <h4>Apply Coupon</h4>
            <form onSubmit={handleApplyCoupon} className="coupon-form">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={appliedCoupon}
                onChange={(e) => setAppliedCoupon(e.target.value.toUpperCase())}
                className="coupon-input"
              />
              <button type="submit" className="btn btn-secondary">
                Apply
              </button>
            </form>
            <p className="coupon-hint">Try: WELCOME10, SAVE20, FREEDELIVER</p>
          </div>

          {/* Price Breakdown */}
          <div className="price-breakdown">
            <div className="price-row">
              <span>Subtotal</span>
              <span>${subTotal.toFixed(2)}</span>
            </div>
            <div className="price-row">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="price-row">
              <span>Tax (8%)</span>
              <span>${tax}</span>
            </div>
            {couponDiscount > 0 && (
              <div className="price-row discount">
                <span>Discount</span>
                <span>-${couponDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="price-row total">
              <span>Total</span>
              <span>${grandTotal}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            className="btn btn-primary btn-checkout"
            onClick={handleProceedToCheckout}
          >
            Proceed to Checkout
          </button>

          <Link to="/restaurants" className="btn btn-secondary btn-continue-shopping">
            Continue Shopping
          </Link>

          {/* Delivery Info */}
          <div className="delivery-info">
            <h4>Delivery Details</h4>
            <p>📍 Delivery to your saved address</p>
            <p>⏱️ Estimated delivery: 30-45 minutes</p>
            <p>🍽️ Hot & Fresh Guaranteed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
