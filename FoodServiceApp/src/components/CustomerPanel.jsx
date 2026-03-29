import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './DashboardPanels.css';

const CustomerPanel = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const { items, totalAmount } = useCart();

  // Static data for demonstration
  const orders = [
    {
      id: 1,
      restaurant: 'Pizza Paradise',
      date: '2024-03-22',
      status: 'Delivered',
      total: 45.99,
      items: ['Large Pizza', 'Garlic Bread', 'Coke']
    },
    {
      id: 2,
      restaurant: 'Burger Barn',
      date: '2024-03-21',
      status: 'On the way',
      total: 28.50,
      items: ['Double Burger', 'Fries', 'Milkshake']
    },
    {
      id: 3,
      restaurant: 'Sushi Spot',
      date: '2024-03-20',
      status: 'Preparing',
      total: 67.25,
      items: ['Sushi Roll', 'Tempura', 'Miso Soup']
    }
  ];

  const favorites = [
    {
      id: 1,
      name: 'Pizza Paradise',
      cuisine: 'Italian',
      rating: 4.5,
      image: 'https://via.placeholder.com/100x100/ff6b6b/ffffff?text=Pizza'
    },
    {
      id: 2,
      name: 'Burger Barn',
      cuisine: 'American',
      rating: 4.3,
      image: 'https://via.placeholder.com/100x100/4ecdc4/ffffff?text=Burger'
    },
    {
      id: 3,
      name: 'Sushi Spot',
      cuisine: 'Japanese',
      rating: 4.7,
      image: 'https://via.placeholder.com/100x100/45b7d1/ffffff?text=Sushi'
    }
  ];

  const addresses = [
    { id: 1, type: 'Home', address: '123 Main St, Apt 4B, New York, NY 10001', isDefault: true },
    { id: 2, type: 'Work', address: '456 Business Ave, Floor 12, New York, NY 10002', isDefault: false }
  ];

  const paymentMethods = [
    { id: 1, type: 'Credit Card', last4: '1234', isDefault: true },
    { id: 2, type: 'Debit Card', last4: '5678', isDefault: false }
  ];

  const handleReorder = (orderId) => {
    // TODO: API call to reorder
    console.log('Reordering:', orderId);
    alert('Reorder functionality would add items to cart');
  };

  const handleTrackOrder = (orderId) => {
    // TODO: Navigate to order tracking page
    console.log('Tracking order:', orderId);
    alert('Order tracking would open tracking page');
  };

  const handleAddAddress = () => {
    // TODO: Open address form modal
    alert('Add address functionality would open a form');
  };

  const handleAddPaymentMethod = () => {
    // TODO: Open payment method form
    alert('Add payment method functionality would open a form');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div className="orders-section">
            <h2>My Orders</h2>
            <div className="orders-grid">
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h3>{order.restaurant}</h3>
                    <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-details">
                    <p><strong>Date:</strong> {order.date}</p>
                    <p><strong>Items:</strong> {order.items.join(', ')}</p>
                    <p><strong>Total:</strong> ${order.total}</p>
                  </div>
                  <div className="order-actions">
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleTrackOrder(order.id)}
                    >
                      Track Order
                    </button>
                    {order.status === 'Delivered' && (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleReorder(order.id)}
                      >
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'favorites':
        return (
          <div className="favorites-section">
            <h2>Favorite Restaurants</h2>
            <div className="favorites-grid">
              {favorites.map(restaurant => (
                <div key={restaurant.id} className="favorite-card">
                  <img src={restaurant.image} alt={restaurant.name} />
                  <div className="favorite-info">
                    <h3>{restaurant.name}</h3>
                    <p>{restaurant.cuisine}</p>
                    <div className="rating">⭐ {restaurant.rating}</div>
                  </div>
                  <Link
                    to={`/restaurant/${restaurant.id}`}
                    className="btn btn-primary"
                  >
                    Order Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        );

      case 'addresses':
        return (
          <div className="addresses-section">
            <div className="section-header">
              <h2>Delivery Addresses</h2>
              <button className="btn btn-primary" onClick={handleAddAddress}>
                Add Address
              </button>
            </div>
            <div className="addresses-list">
              {addresses.map(address => (
                <div key={address.id} className="address-card">
                  <div className="address-info">
                    <h3>{address.type}</h3>
                    <p>{address.address}</p>
                    {address.isDefault && <span className="default-badge">Default</span>}
                  </div>
                  <div className="address-actions">
                    <button className="btn btn-secondary">Edit</button>
                    {!address.isDefault && (
                      <button className="btn btn-outline">Set as Default</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="payment-section">
            <div className="section-header">
              <h2>Payment Methods</h2>
              <button className="btn btn-primary" onClick={handleAddPaymentMethod}>
                Add Payment Method
              </button>
            </div>
            <div className="payment-list">
              {paymentMethods.map(method => (
                <div key={method.id} className="payment-card">
                  <div className="payment-info">
                    <h3>{method.type}</h3>
                    <p>•••• {method.last4}</p>
                    {method.isDefault && <span className="default-badge">Default</span>}
                  </div>
                  <div className="payment-actions">
                    <button className="btn btn-secondary">Edit</button>
                    {!method.isDefault && (
                      <button className="btn btn-outline">Set as Default</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cart':
        return (
          <div className="cart-section">
            <h2>Shopping Cart</h2>
            {items.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty</p>
                <Link to="/restaurants" className="btn btn-primary">
                  Browse Restaurants
                </Link>
              </div>
            ) : (
              <div className="cart-content">
                <div className="cart-items">
                  {items.map(item => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-info">
                        <h3>{item.name}</h3>
                        <p>${item.price} x {item.quantity}</p>
                      </div>
                      <div className="item-total">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <div className="total">
                    <strong>Total: ${totalAmount.toFixed(2)}</strong>
                  </div>
                  <Link to="/checkout" className="btn btn-primary">
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="customer-panel">
      <div className="panel-tabs">
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          My Orders
        </button>
        <button
          className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          Favorites
        </button>
        <button
          className={`tab-btn ${activeTab === 'addresses' ? 'active' : ''}`}
          onClick={() => setActiveTab('addresses')}
        >
          Addresses
        </button>
        <button
          className={`tab-btn ${activeTab === 'payment' ? 'active' : ''}`}
          onClick={() => setActiveTab('payment')}
        >
          Payment Methods
        </button>
        <button
          className={`tab-btn ${activeTab === 'cart' ? 'active' : ''}`}
          onClick={() => setActiveTab('cart')}
        >
          Cart ({items.length})
        </button>
      </div>

      <div className="panel-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default CustomerPanel;
