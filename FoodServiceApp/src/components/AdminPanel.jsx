import React, { useState } from 'react';
import './DashboardPanels.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Static data for demonstration
  const stats = {
    totalUsers: 1250,
    totalRestaurants: 45,
    totalOrders: 3420,
    totalRevenue: 45670,
    pendingApprovals: 12,
    complaints: 8
  };

  const pendingRestaurants = [
    { id: 1, name: 'Pizza Paradise', email: 'owner@pizzaparadise.com', phone: '123-456-7890', cuisine: 'Italian', submittedDate: '2024-03-20' },
    { id: 2, name: 'Burger Barn', email: 'owner@burgerbarn.com', phone: '123-456-7891', cuisine: 'American', submittedDate: '2024-03-21' },
    { id: 3, name: 'Sushi Spot', email: 'owner@sushispot.com', phone: '123-456-7892', cuisine: 'Japanese', submittedDate: '2024-03-22' }
  ];

  const complaints = [
    { id: 1, user: 'John Doe', restaurant: 'Pizza Paradise', order: '#12345', issue: 'Late delivery', date: '2024-03-22', status: 'Pending' },
    { id: 2, user: 'Jane Smith', restaurant: 'Burger Barn', order: '#12346', issue: 'Wrong order', date: '2024-03-22', status: 'Pending' },
    { id: 3, user: 'Bob Johnson', restaurant: 'Sushi Spot', order: '#12347', issue: 'Food quality', date: '2024-03-21', status: 'Resolved' }
  ];

  const admins = [
    { id: 1, name: 'Super Admin', email: 'admin@quickbite.com', role: 'SUPER_ADMIN', status: 'Active' },
    { id: 2, name: 'Support Admin', email: 'support@quickbite.com', role: 'SUPPORT_ADMIN', status: 'Active' }
  ];

  const handleApproveRestaurant = (restaurantId) => {
    // TODO: API call to approve restaurant
    console.log('Approving restaurant:', restaurantId);
    alert('Restaurant approved successfully!');
  };

  const handleRejectRestaurant = (restaurantId) => {
    // TODO: API call to reject restaurant
    console.log('Rejecting restaurant:', restaurantId);
    alert('Restaurant rejected!');
  };

  const handleResolveComplaint = (complaintId) => {
    // TODO: API call to resolve complaint
    console.log('Resolving complaint:', complaintId);
    alert('Complaint resolved!');
  };

  const handleDeleteUser = (userId) => {
    // TODO: API call to delete user
    console.log('Deleting user:', userId);
    alert('User deleted successfully!');
  };

  const handleAddAdmin = () => {
    // TODO: API call to add admin
    alert('Add admin functionality would open a modal/form');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="overview-grid">
            <div className="stat-card">
              <h3>Total Users</h3>
              <div className="stat-value">{stats.totalUsers}</div>
            </div>
            <div className="stat-card">
              <h3>Total Restaurants</h3>
              <div className="stat-value">{stats.totalRestaurants}</div>
            </div>
            <div className="stat-card">
              <h3>Total Orders</h3>
              <div className="stat-value">{stats.totalOrders}</div>
            </div>
            <div className="stat-card">
              <h3>Total Revenue</h3>
              <div className="stat-value">${stats.totalRevenue.toLocaleString()}</div>
            </div>
          </div>
        );

      case 'restaurants':
        return (
          <div className="data-section">
            <h2>Pending Restaurant Approvals</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Restaurant Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Cuisine</th>
                    <th>Submitted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRestaurants.map(restaurant => (
                    <tr key={restaurant.id}>
                      <td>{restaurant.name}</td>
                      <td>{restaurant.email}</td>
                      <td>{restaurant.phone}</td>
                      <td>{restaurant.cuisine}</td>
                      <td>{restaurant.submittedDate}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => handleApproveRestaurant(restaurant.id)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleRejectRestaurant(restaurant.id)}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'complaints':
        return (
          <div className="data-section">
            <h2>User Complaints</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Restaurant</th>
                    <th>Order</th>
                    <th>Issue</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map(complaint => (
                    <tr key={complaint.id}>
                      <td>{complaint.user}</td>
                      <td>{complaint.restaurant}</td>
                      <td>{complaint.order}</td>
                      <td>{complaint.issue}</td>
                      <td>{complaint.date}</td>
                      <td>
                        <span className={`status-badge ${complaint.status.toLowerCase()}`}>
                          {complaint.status}
                        </span>
                      </td>
                      <td>
                        {complaint.status === 'Pending' && (
                          <button
                            className="btn btn-primary"
                            onClick={() => handleResolveComplaint(complaint.id)}
                          >
                            Resolve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="data-section">
            <div className="section-header">
              <h2>User Management</h2>
              <button className="btn btn-primary" onClick={handleAddAdmin}>
                Add Admin
              </button>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map(admin => (
                    <tr key={admin.id}>
                      <td>{admin.name}</td>
                      <td>{admin.email}</td>
                      <td>{admin.role}</td>
                      <td>
                        <span className="status-badge active">Active</span>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteUser(admin.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="analytics-section">
            <h2>Revenue Analytics</h2>

            {/* Daily Analytics */}
            <div className="analytics-subsection">
              <h3>Daily Revenue</h3>
              <div className="analytics-grid">
                <div className="analytics-card">
                  <p className="label">Today</p>
                  <p className="value">$8,450.75</p>
                  <p className="change positive">↑ 12% from yesterday</p>
                </div>
                <div className="analytics-card">
                  <p className="label">Yesterday</p>
                  <p className="value">$7,540.50</p>
                  <p className="change neutral">Same period</p>
                </div>
                <div className="analytics-card">
                  <p className="label">This Week (Avg)</p>
                  <p className="value">$7,856.25</p>
                  <p className="change positive">↑ 8% from last week</p>
                </div>
                <div className="analytics-card">
                  <p className="label">Daily Orders</p>
                  <p className="value">324</p>
                  <p className="change positive">↑ 15 orders more</p>
                </div>
              </div>
            </div>

            {/* Monthly Analytics */}
            <div className="analytics-subsection">
              <h3>Monthly Revenue Breakdown</h3>
              <div className="analytics-grid">
                <div className="analytics-card">
                  <p className="label">This Month</p>
                  <p className="value">$242,156.50</p>
                  <p className="change positive">↑ 18% from last month</p>
                </div>
                <div className="analytics-card">
                  <p className="label">Last Month</p>
                  <p className="value">$205,125.75</p>
                  <p className="change neutral">Previous month</p>
                </div>
                <div className="analytics-card">
                  <p className="label">Avg Daily Revenue</p>
                  <p className="value">$8,072.55</p>
                  <p className="change positive">↑ Higher than avg</p>
                </div>
                <div className="analytics-card">
                  <p className="label">Monthly Orders</p>
                  <p className="value">9,250</p>
                  <p className="change positive">↑ 1,200 orders more</p>
                </div>
              </div>
            </div>

            {/* Yearly Analytics */}
            <div className="analytics-subsection">
              <h3>Yearly Revenue Overview</h3>
              <div className="analytics-grid">
                <div className="analytics-card">
                  <p className="label">This Year</p>
                  <p className="value">$2,875,420.00</p>
                  <p className="change positive">↑ 24% from last year</p>
                </div>
                <div className="analytics-card">
                  <p className="label">Last Year</p>
                  <p className="value">$2,318,540.00</p>
                  <p className="change neutral">Previous year</p>
                </div>
                <div className="analytics-card">
                  <p className="label">Avg Monthly Revenue</p>
                  <p className="value">$239,618.33</p>
                  <p className="change positive">Growing trend</p>
                </div>
                <div className="analytics-card">
                  <p className="label">Yearly Orders</p>
                  <p className="value">112,850</p>
                  <p className="change positive">↑ 28,320 orders more</p>
                </div>
              </div>
            </div>

            {/* TODO: API call to fetch detailed analytics
                Endpoint: GET /api/admin/analytics?timeRange={daily|monthly|yearly}
                Response: { success: true, data: { revenue, orders, trends, topRestaurants, topItems } } */}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="admin-panel">
      <div className="panel-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'restaurants' ? 'active' : ''}`}
          onClick={() => setActiveTab('restaurants')}
        >
          Restaurant Approvals
        </button>
        <button
          className={`tab-btn ${activeTab === 'complaints' ? 'active' : ''}`}
          onClick={() => setActiveTab('complaints')}
        >
          Complaints
        </button>
        <button
          className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
        <button
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          User Management
        </button>
      </div>

      <div className="panel-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPanel;
