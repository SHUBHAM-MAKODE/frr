import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
// import { createOrder } from '../services/orderService.js'; // TODO: Uncomment when API is ready
// import { processPayment } from '../services/paymentService.js'; // TODO: Uncomment when API is ready
import './Checkout.css';

const Checkout = () => {
  const { user } = useAuth();
  const { items, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    deliveryAddress: '',
    paymentMethod: 'CARD',
    specialInstructions: '',
    tip: 0
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Calculate totals
  const subtotal = totalAmount;
  const deliveryFee = 2.99;
  const tax = subtotal * 0.08; // 8% tax
  const tip = parseFloat(formData.tip) || 0;
  const total = subtotal + deliveryFee + tax + tip;

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some items to your cart to proceed with checkout.</p>
          <button
            onClick={() => navigate('/restaurants')}
            className="btn btn-primary"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // TODO: Replace with actual API calls
      // const orderData = {
      //   userId: user.id,
      //   items: items,
      //   deliveryAddress: formData.deliveryAddress,
      //   paymentMethod: formData.paymentMethod,
      //   specialInstructions: formData.specialInstructions,
      //   subtotal,
      //   deliveryFee,
      //   tax,
      //   tip,
      //   total
      // };

      // const order = await createOrder(orderData);
      // await processPayment({ orderId: order.id, amount: total, method: formData.paymentMethod });

      // Simulate order processing
      setTimeout(() => {
        clearCart();
        alert('Order placed successfully!');
        navigate('/dashboard');
      }, 2000);

    } catch {
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>

        <div className="checkout-grid">
          {/* Order Summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {items.map((item, index) => (
                <div key={index} className="checkout-item">
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="price-row">
                <span>Delivery Fee:</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="price-row">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="price-row">
                <span>Tip:</span>
                <span>${tip.toFixed(2)}</span>
              </div>
              <div className="price-row total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="checkout-form">
            <h2>Delivery & Payment</h2>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <h3>Delivery Information</h3>
                <div className="form-group">
                  <label>Delivery Address</label>
                  <textarea
                    value={formData.deliveryAddress}
                    onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                    placeholder="Enter your complete delivery address"
                    rows="3"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Special Instructions (Optional)</label>
                  <textarea
                    value={formData.specialInstructions}
                    onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                    placeholder="Any special requests for delivery..."
                    rows="2"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Payment Method</h3>
                <div className="payment-options">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="CARD"
                      checked={formData.paymentMethod === 'CARD'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    />
                    <span>Credit/Debit Card</span>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="CASH"
                      checked={formData.paymentMethod === 'CASH'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    />
                    <span>Cash on Delivery</span>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="WALLET"
                      checked={formData.paymentMethod === 'WALLET'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    />
                    <span>Digital Wallet</span>
                  </label>
                </div>
              </div>

              <div className="form-section">
                <h3>Add Tip</h3>
                <div className="tip-options">
                  <button
                    type="button"
                    className={`tip-btn ${formData.tip === '5' ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, tip: '5' })}
                  >
                    5%
                  </button>
                  <button
                    type="button"
                    className={`tip-btn ${formData.tip === '10' ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, tip: '10' })}
                  >
                    10%
                  </button>
                  <button
                    type="button"
                    className={`tip-btn ${formData.tip === '15' ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, tip: '15' })}
                  >
                    15%
                  </button>
                  <input
                    type="number"
                    placeholder="Custom"
                    value={formData.tip}
                    onChange={(e) => setFormData({ ...formData, tip: e.target.value })}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary place-order-btn"
                disabled={loading}
              >
                {loading ? 'Placing Order...' : `Place Order - $${total.toFixed(2)}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
