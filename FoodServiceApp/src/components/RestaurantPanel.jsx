import React, { useState } from 'react';
import RevenueAnalytics from './RevenueAnalytics';
import './DashboardPanels.css';

const RestaurantPanel = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddMenuModal, setShowAddMenuModal] = useState(false);

  // TODO: API call to fetch restaurant data
  // Endpoint: GET /api/restaurants/:restaurantId
  // Response: { success: true, data: { id, name, cuisines, address, rating, stats } }

  // Static data for demonstration
  const stats = {
    totalOrders: 156,
    todayOrders: 12,
    totalRevenue: 2340.50,
    averageRating: 4.5,
    activeMenuItems: 25,
    preparingOrders: 3,
    readyOrders: 2
  };

  const menuItems = [
    { id: 1, name: 'Margherita Pizza', category: 'Pizza', price: 12.99, available: true, image: 'https://via.placeholder.com/80x80/ff6b6b/ffffff?text=Pizza' },
    { id: 2, name: 'Caesar Salad', category: 'Salads', price: 8.99, available: true, image: 'https://via.placeholder.com/80x80/4ecdc4/ffffff?text=Salad' },
    { id: 3, name: 'Pasta Carbonara', category: 'Pasta', price: 14.99, available: false, image: 'https://via.placeholder.com/80x80/45b7d1/ffffff?text=Pasta' },
    { id: 4, name: 'Tiramisu', category: 'Desserts', price: 6.99, available: true, image: 'https://via.placeholder.com/80x80/9b59b6/ffffff?text=Dessert' }
  ];

  const orders = [
    { id: 1, customer: 'John Doe', items: ['Margherita Pizza', 'Caesar Salad'], total: 21.98, status: 'Preparing', time: '12:30 PM' },
    { id: 2, customer: 'Jane Smith', items: ['Pasta Carbonara'], total: 14.99, status: 'Ready', time: '12:45 PM' },
    { id: 3, customer: 'Bob Johnson', items: ['Tiramisu', 'Caesar Salad'], total: 15.98, status: 'Delivered', time: '11:30 AM' }
  ];

  const [menuItem, setMenuItem] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    available: true
  });

  const handleAddMenuItem = () => {
    // TODO: API call to add menu item
    // Endpoint: POST /api/restaurants/:restaurantId/menu
    // Request: { name, category, price, description, available }
    // Response: { success: true, data: { id, ...menuItem } }
    console.log('Adding menu item:', menuItem);
    alert('Menu item added successfully!');
    setMenuItem({ name: '', category: '', price: '', description: '', available: true });
    setShowAddMenuModal(false);
  };

  const handleToggleAvailability = (itemId) => {
    // TODO: API call to toggle item availability
    // Endpoint: PUT /api/menu/:itemId/availability
    // Response: { success: true, data: { available: boolean } }
    console.log('Toggling availability for item:', itemId);
    alert('Item availability updated!');
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    // TODO: API call to update order status
    // Endpoint: PUT /api/orders/:orderId/status
    // Request: { status: newStatus }
    // Response: { success: true, message: 'Status updated' }
    console.log('Updating order status:', orderId, newStatus);
    alert(`Order status updated to ${newStatus}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="overview-grid">
            <div className="stat-card">
              <h3>Total Orders</h3>
              <div className="stat-value">{stats.totalOrders}</div>
            </div>
            <div className="stat-card">
              <h3>Today's Orders</h3>
              <div className="stat-value">{stats.todayOrders}</div>
            </div>
            <div className="stat-card">
              <h3>Total Revenue</h3>
              <div className="stat-value">${stats.totalRevenue.toFixed(2)}</div>
            </div>
            <div className="stat-card">
              <h3>Average Rating</h3>
              <div className="stat-value">⭐ {stats.averageRating}</div>
            </div>
          </div>
        );

      case 'menu':
        return (
          <div className="menu-section">
            <div className="section-header">
              <h2>Menu Management</h2>
              <button 
                className="btn btn-primary"
                onClick={() => setShowAddMenuModal(true)}
              >
                Add Menu Item
              </button>
            </div>
            <div className="menu-grid">
              {menuItems.map(item => (
                <div key={item.id} className="menu-item-card">
                  <img src={item.image} alt={item.name} />
                  <div className="menu-item-info">
                    <h3>{item.name}</h3>
                    <p className="category">{item.category}</p>
                    <p className="price">${item.price}</p>
                    <span className={`availability-badge ${item.available ? 'available' : 'unavailable'}`}>
                      {item.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                  <div className="menu-item-actions">
                    <button className="btn btn-secondary">Edit</button>
                    <button 
                      className={`btn ${item.available ? 'btn-warning' : 'btn-success'}`}
                      onClick={() => handleToggleAvailability(item.id)}
                    >
                      {item.available ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {showAddMenuModal && (
              <div className="modal">
                <div className="modal-content">
                  <h3>Add Menu Item</h3>
                  <form onSubmit={(e) => { e.preventDefault(); handleAddMenuItem(); }}>
                    <div className="form-group">
                      <label>Item Name</label>
                      <input
                        type="text"
                        value={menuItem.name}
                        onChange={(e) => setMenuItem({...menuItem, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        value={menuItem.category}
                        onChange={(e) => setMenuItem({...menuItem, category: e.target.value})}
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="Pizza">Pizza</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Salads">Salads</option>
                        <option value="Desserts">Desserts</option>
                        <option value="Beverages">Beverages</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Price</label>
                      <input
                        type="number"
                        step="0.01"
                        value={menuItem.price}
                        onChange={(e) => setMenuItem({...menuItem, price: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        value={menuItem.description}
                        onChange={(e) => setMenuItem({...menuItem, description: e.target.value})}
                        rows="3"
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={menuItem.available}
                          onChange={(e) => setMenuItem({...menuItem, available: e.target.checked})}
                        />
                        Available
                      </label>
                    </div>
                    <div className="modal-actions">
                      <button type="submit" className="btn btn-primary">Add Item</button>
                      <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={() => setShowAddMenuModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );

      case 'orders':
        return (
          <div className="orders-section">
            <h2>Current Orders</h2>
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h3>Order #{order.id}</h3>
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-details">
                    <p><strong>Customer:</strong> {order.customer}</p>
                    <p><strong>Items:</strong> {order.items.join(', ')}</p>
                    <p><strong>Total:</strong> ${order.total}</p>
                    <p><strong>Time:</strong> {order.time}</p>
                  </div>
                  <div className="order-actions">
                    {order.status === 'Preparing' && (
                      <button 
                        className="btn btn-success"
                        onClick={() => handleUpdateStatus(order.id, 'Ready')}
                      >
                        Mark Ready
                      </button>
                    )}
                    {order.status === 'Ready' && (
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleUpdateStatus(order.id, 'Out for Delivery')}
                      >
                        Out for Delivery
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="profile-section">
            <h2>Restaurant Profile</h2>
            <div className="profile-form">
              <div className="form-group">
                <label>Restaurant Name</label>
                <input type="text" defaultValue="Pizza Paradise" />
              </div>
              <div className="form-group">
                <label>Cuisine Type</label>
                <select defaultValue="Italian">
                  <option value="Italian">Italian</option>
                  <option value="American">American</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Indian">Indian</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Mexican">Mexican</option>
                </select>
              </div>
              <div className="form-group">
                <label>Address</label>
                <input type="text" defaultValue="123 Main St, New York, NY" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" defaultValue="(555) 123-4567" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea rows="4" defaultValue="Best pizza in town with fresh ingredients and authentic recipes." />
              </div>
              <button className="btn btn-primary">Update Profile</button>
            </div>
          </div>
        );

      case 'revenue':
        return <RevenueAnalytics user={user} />;

      default:
        return null;
    }
  };

  return (
    <div className="restaurant-panel">
      <div className="panel-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
          onClick={() => setActiveTab('menu')}
        >
          Menu Management
        </button>
        <button 
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button 
          className={`tab-btn ${activeTab === 'revenue' ? 'active' : ''}`}
          onClick={() => setActiveTab('revenue')}
        >
          Revenue Analytics
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

export default RestaurantPanel;
