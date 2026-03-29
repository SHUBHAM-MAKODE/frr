import React, { useState } from 'react';
import './RestaurantDashboard.css';

const RestaurantDashboard = () => {
  // TODO: API call to fetch restaurant dashboard data
  // Endpoint: GET /api/restaurants/:restaurantId/dashboard
  // Response: { success: true, data: { stats, recentOrders, topItems, peakHours } }

  const [activeTab, setActiveTab] = useState('overview');

  // Mock restaurant data
  const [restaurantdata] = useState({
    id: 1,
    name: 'Pizza Paradise',
    status: 'open',
    rating: 4.5,
    totalOrders: 1250,
    monthlyRevenue: 12500
  });

  // Mock stats
  const stats = {
    todayOrders: 32,
    todayRevenue: 850.50,
    todayAverageRating: 4.6,
    activeOrders: 5,
    preparingOrders: 3,
    readyOrders: 2
  };

  // Mock recent orders
  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'John Doe',
      items: ['Margherita Pizza', 'Garlic Bread'],
      total: 24.99,
      status: 'preparing',
      placedAt: '2024-03-25 2:30 PM',
      estimatedTime: 20
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      items: ['Pepperoni Pizza', 'Caesar Salad'],
      total: 32.50,
      status: 'ready',
      placedAt: '2024-03-25 2:15 PM',
      estimatedTime: 0
    },
    {
      id: 'ORD-003',
      customer: 'Bob Johnson',
      items: ['Veggie Pizza', 'Coke', 'Chocolate Cake'],
      total: 28.75,
      status: 'out-for-delivery',
      placedAt: '2024-03-25 1:50 PM',
      estimatedTime: 0
    },
    {
      id: 'ORD-004',
      customer: 'Alice Williams',
      items: ['BBQ Pizza'],
      total: 16.99,
      status: 'pending',
      placedAt: '2024-03-25 2:45 PM',
      estimatedTime: 25
    }
  ];

  // Mock menu items with sales data
  const topMenuItems = [
    {
      id: 1,
      name: 'Margherita Pizza',
      category: 'Pizza',
      price: 12.99,
      soldToday: 45,
      revenue: 584.55,
      rating: 4.7
    },
    {
      id: 2,
      name: 'Pepperoni Pizza',
      category: 'Pizza',
      price: 14.99,
      soldToday: 38,
      revenue: 569.62,
      rating: 4.6
    },
    {
      id: 3,
      name: 'Garlic Bread',
      category: 'Sides',
      price: 4.99,
      soldToday: 52,
      revenue: 259.48,
      rating: 4.8
    },
    {
      id: 4,
      name: 'Caesar Salad',
      category: 'Salads',
      price: 8.99,
      soldToday: 28,
      revenue: 251.72,
      rating: 4.5
    }
  ];

  // Handle order status update
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    // TODO: API call to update order status
    // Endpoint: PUT /api/orders/:orderId/status
    // Request: { status: newStatus }
    // Response: { success: true, message: 'Status updated' }
    console.log(`Updating order ${orderId} to ${newStatus}`);
    alert(`Order ${orderId} status would be updated to ${newStatus}`);
  };

  const handleToggleRestaurantStatus = () => {
    // TODO: API call to toggle restaurant open/close status
    // Endpoint: PUT /api/restaurants/:restaurantId/status
    // Request: { status: newStatus }
    // Response: { success: true, data: { status } }
    alert('Restaurant status would be toggled - requires API integration');
  };

  return (
    <div className="restaurant-dashboard">
      {/* Header */}
      <div className="restaurant-dashboard-header">
        <div className="restaurant-info">
          <h2>{restaurantdata.name}</h2>
          <p>⭐ {restaurantdata.rating} | {restaurantdata.totalOrders} Total Orders</p>
        </div>
        <button
          className={`status-btn ${restaurantdata.status}`}
          onClick={handleToggleRestaurantStatus}
        >
          {restaurantdata.status === 'open' ? '🟢 Open' : '🔴 Closed'}
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
          onClick={() => setActiveTab('menu')}
        >
          Menu
        </button>
        <button
          className={`tab-btn ${activeTab === 'revenue' ? 'active' : ''}`}
          onClick={() => setActiveTab('revenue')}
        >
          Revenue
        </button>
      </div>

      {/* Tab Content */}
      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="tab-content">
            {/* Stats Grid */}
            <div className="stats-grid">
              <div className="stat-card">
                <h4>Today's Orders</h4>
                <p className="stat-value">{stats.todayOrders}</p>
                <span className="stat-change">↑ 15% from yesterday</span>
              </div>
              <div className="stat-card">
                <h4>Today's Revenue</h4>
                <p className="stat-value">${stats.todayRevenue.toFixed(2)}</p>
                <span className="stat-change">↑ 8% from yesterday</span>
              </div>
              <div className="stat-card">
                <h4>Avg Rating Today</h4>
                <p className="stat-value">{stats.todayAverageRating}</p>
                <span className="stat-change">⭐ Based on {stats.todayOrders} reviews</span>
              </div>
              <div className="stat-card">
                <h4>Active Orders</h4>
                <p className="stat-value">{stats.activeOrders}</p>
                <span className="stat-details">{stats.preparingOrders} preparing, {stats.readyOrders} ready</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="actions-grid">
                <button className="action-btn">📝 Manage Menu</button>
                <button className="action-btn">👥 View Reviews</button>
                <button className="action-btn">📊 View Analytics</button>
                <button className="action-btn">⚙️ Settings</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="tab-content">
            <h3>Recent Orders</h3>
            <div className="orders-list">
              {recentOrders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span className="order-id">{order.id}</span>
                    <span className={`order-status ${order.status}`}>
                      {order.status === 'pending' && '⏳ Pending'}
                      {order.status === 'preparing' && '👨‍🍳 Preparing'}
                      {order.status === 'ready' && '✓ Ready'}
                      {order.status === 'out-for-delivery' && '🚗 Out for Delivery'}
                    </span>
                  </div>
                  <div className="order-details">
                    <p><strong>Customer:</strong> {order.customer}</p>
                    <p><strong>Items:</strong> {order.items.join(', ')}</p>
                    <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                    <p><strong>Placed:</strong> {order.placedAt}</p>
                  </div>
                  <div className="order-actions">
                    {order.status === 'pending' && (
                      <button
                        className="btn btn-small"
                        onClick={() => handleUpdateOrderStatus(order.id, 'preparing')}
                      >
                        Start Preparing
                      </button>
                    )}
                    {order.status === 'preparing' && (
                      <button
                        className="btn btn-small"
                        onClick={() => handleUpdateOrderStatus(order.id, 'ready')}
                      >
                        Mark Ready
                      </button>
                    )}
                    {order.status === 'ready' && (
                      <button
                        className="btn btn-small"
                        onClick={() => handleUpdateOrderStatus(order.id, 'out-for-delivery')}
                      >
                        Out for Delivery
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="tab-content">
            <h3>Top Menu Items</h3>
            <div className="menu-items-table">
              <table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Sold Today</th>
                    <th>Revenue</th>
                    <th>Rating</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {topMenuItems.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>{item.soldToday}</td>
                      <td>${item.revenue.toFixed(2)}</td>
                      <td>⭐ {item.rating}</td>
                      <td>
                        <button className="btn-icon" title="Edit item">✏️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'revenue' && (
          <div className="tab-content">
            <h3>Revenue Overview</h3>
            <div className="revenue-section">
              <p>📊 Detailed revenue analytics and charts coming soon!</p>
              {/* TODO: Integrate charts library (Chart.js or Recharts)
                  Show: Daily, Weekly, Monthly revenue trends
                  API Endpoint: GET /api/restaurants/:restaurantId/revenue
                  Response: { success: true, data: { daily: [], weekly: [], monthly: [] } } */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDashboard;
