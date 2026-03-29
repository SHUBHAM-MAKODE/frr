import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminPanel from '../components/AdminPanel';
import CustomerPanel from '../components/CustomerPanel';
import RestaurantPanel from '../components/RestaurantPanel';
import DeliveryPanel from '../components/DeliveryPanel';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'ADMIN':
        return <AdminPanel user={user} />;
      case 'CUSTOMER':
        return <CustomerPanel user={user} />;
      case 'RESTAURANT':
        return <RestaurantPanel user={user} />;
      case 'DELIVERY_AGENT':
        return <DeliveryPanel user={user} />;
      default:
        return <div className="unauthorized">
          <h2>Unauthorized Access</h2>
          <p>You don't have permission to access this dashboard.</p>
        </div>;
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>QuickBite Dashboard</h1>
          <div className="user-info">
            <span className="welcome">Welcome, {user.name}</span>
            <span className="role-badge">{user.role}</span>
            <Link to="/logout" className="logout-btn">
              Logout
            </Link>
          </div>
        </div>
      </header>
      
      <main className="dashboard-main">
        {renderDashboard()}
      </main>
    </div>
  );
};

export default Dashboard;
