import React, { useState } from 'react';
import './DashboardPanels.css';

const DeliveryPanel = () => {
  const [activeTab, setActiveTab] = useState('available');

  // Static data for demonstration
  const stats = {
    todayDeliveries: 8,
    totalDeliveries: 156,
    totalEarnings: 245.50,
    averageRating: 4.7
  };

  const availableOrders = [
    {
      id: 1,
      restaurant: 'Pizza Paradise',
      customer: 'John Doe',
      address: '123 Main St, Apt 4B',
      distance: '2.3 km',
      estimatedTime: '25 min',
      payment: '$15.99',
      items: ['Large Pizza', 'Garlic Bread']
    },
    {
      id: 2,
      restaurant: 'Burger Barn',
      customer: 'Jane Smith',
      address: '456 Oak Ave',
      distance: '1.8 km',
      estimatedTime: '20 min',
      payment: '$22.50',
      items: ['Double Burger', 'Fries']
    },
    {
      id: 3,
      restaurant: 'Sushi Spot',
      customer: 'Bob Johnson',
      address: '789 Pine Rd',
      distance: '3.1 km',
      estimatedTime: '30 min',
      payment: '$45.75',
      items: ['Sushi Roll', 'Tempura', 'Miso Soup']
    }
  ];

  const currentDeliveries = [
    {
      id: 4,
      restaurant: 'Taco Fiesta',
      customer: 'Alice Brown',
      address: '321 Elm St',
      status: 'Picked Up',
      timeLeft: '15 min',
      payment: '$18.99'
    },
    {
      id: 5,
      restaurant: 'Curry House',
      customer: 'Charlie Wilson',
      address: '654 Maple Dr',
      status: 'On the way',
      timeLeft: '8 min',
      payment: '$32.25'
    }
  ];

  const deliveryHistory = [
    {
      id: 101,
      restaurant: 'Pizza Paradise',
      customer: 'David Lee',
      date: '2024-03-22',
      time: '1:30 PM',
      payment: '$28.50',
      status: 'Delivered',
      rating: 5
    },
    {
      id: 102,
      restaurant: 'Burger Barn',
      customer: 'Emma Davis',
      date: '2024-03-22',
      time: '12:15 PM',
      payment: '$19.99',
      status: 'Delivered',
      rating: 4
    },
    {
      id: 103,
      restaurant: 'Sushi Spot',
      customer: 'Frank Miller',
      date: '2024-03-21',
      time: '7:45 PM',
      payment: '$52.75',
      status: 'Delivered',
      rating: 5
    }
  ];

  const handleAcceptOrder = (order) => {
    // TODO: API call to accept order
    console.log('Accepting order:', order);
    setActiveTab('current');
    alert('Order accepted! Navigate to restaurant to pick up.');
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    // TODO: API call to update delivery status
    console.log('Updating delivery status:', orderId, newStatus);
    alert(`Delivery status updated to ${newStatus}`);
  };

  const handleCompleteDelivery = (orderId) => {
    // TODO: API call to complete delivery and collect rating
    console.log('Completing delivery:', orderId);
    alert('Delivery completed! Customer rating requested.');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="overview-grid">
            <div className="stat-card">
              <h3>Today's Deliveries</h3>
              <div className="stat-value">{stats.todayDeliveries}</div>
            </div>
            <div className="stat-card">
              <h3>Total Deliveries</h3>
              <div className="stat-value">{stats.totalDeliveries}</div>
            </div>
            <div className="stat-card">
              <h3>Total Earnings</h3>
              <div className="stat-value">${stats.totalEarnings.toFixed(2)}</div>
            </div>
            <div className="stat-card">
              <h3>Average Rating</h3>
              <div className="stat-value">⭐ {stats.averageRating}</div>
            </div>
          </div>
        );

      case 'available':
        return (
          <div className="available-orders-section">
            <h2>Available Orders</h2>
            <div className="orders-list">
              {availableOrders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h3>Order #{order.id}</h3>
                    <span className="payment-amount">{order.payment}</span>
                  </div>
                  <div className="order-details">
                    <p><strong>Restaurant:</strong> {order.restaurant}</p>
                    <p><strong>Customer:</strong> {order.customer}</p>
                    <p><strong>Address:</strong> {order.address}</p>
                    <p><strong>Distance:</strong> {order.distance}</p>
                    <p><strong>Est. Time:</strong> {order.estimatedTime}</p>
                    <p><strong>Items:</strong> {order.items.join(', ')}</p>
                  </div>
                  <div className="order-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAcceptOrder(order)}
                    >
                      Accept Order
                    </button>
                    <button className="btn btn-secondary">
                      View Map
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'current':
        return (
          <div className="current-deliveries-section">
            <h2>Current Deliveries</h2>
            <div className="orders-list">
              {currentDeliveries.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h3>Order #{order.id}</h3>
                    <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-details">
                    <p><strong>Restaurant:</strong> {order.restaurant}</p>
                    <p><strong>Customer:</strong> {order.customer}</p>
                    <p><strong>Address:</strong> {order.address}</p>
                    <p><strong>Time Remaining:</strong> {order.timeLeft}</p>
                    <p><strong>Payment:</strong> {order.payment}</p>
                  </div>
                  <div className="order-actions">
                    {order.status === 'Picked Up' && (
                      <button
                        className="btn btn-success"
                        onClick={() => handleUpdateStatus(order.id, 'On the way')}
                      >
                        Start Delivery
                      </button>
                    )}
                    {order.status === 'On the way' && (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleCompleteDelivery(order.id)}
                      >
                        Complete Delivery
                      </button>
                    )}
                    <button className="btn btn-secondary">
                      Navigate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="delivery-history-section">
            <h2>Delivery History</h2>
            <div className="orders-list">
              {deliveryHistory.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h3>Order #{order.id}</h3>
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-details">
                    <p><strong>Restaurant:</strong> {order.restaurant}</p>
                    <p><strong>Customer:</strong> {order.customer}</p>
                    <p><strong>Date:</strong> {order.date}</p>
                    <p><strong>Time:</strong> {order.time}</p>
                    <p><strong>Payment:</strong> {order.payment}</p>
                    <p><strong>Rating:</strong> {'⭐'.repeat(order.rating)}</p>
                  </div>
                  <div className="order-actions">
                    <button className="btn btn-secondary">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="profile-section">
            <h2>Delivery Profile</h2>
            <div className="profile-form">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" defaultValue="John Delivery" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" defaultValue="(555) 987-6543" />
              </div>
              <div className="form-group">
                <label>Vehicle Type</label>
                <select defaultValue="motorcycle">
                  <option value="motorcycle">Motorcycle</option>
                  <option value="bicycle">Bicycle</option>
                  <option value="car">Car</option>
                  <option value="scooter">Scooter</option>
                </select>
              </div>
              <div className="form-group">
                <label>Vehicle Number</label>
                <input type="text" defaultValue="DL-1234" />
              </div>
              <div className="form-group">
                <label>License Number</label>
                <input type="text" defaultValue="DL202456789" />
              </div>
              <div className="form-group">
                <label>Working Hours</label>
                <div className="time-inputs">
                  <input type="time" defaultValue="09:00" />
                  <span>to</span>
                  <input type="time" defaultValue="21:00" />
                </div>
              </div>
              <button className="btn btn-primary">Update Profile</button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="delivery-panel">
      <div className="panel-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'available' ? 'active' : ''}`}
          onClick={() => setActiveTab('available')}
        >
          Available Orders
        </button>
        <button
          className={`tab-btn ${activeTab === 'current' ? 'active' : ''}`}
          onClick={() => setActiveTab('current')}
        >
          Current Deliveries
        </button>
        <button
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Delivery History
        </button>
        <button
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
      </div>

      <div className="panel-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default DeliveryPanel;
