import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LandingPage.css';

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurants?location=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Static data for latest deals
  const latestDeals = [
    {
      id: 1,
      title: '50% OFF on Burgers',
      description: 'Get half price on all burgers today!',
      restaurant: 'Burger Palace',
      discount: '50%',
      image: 'https://via.placeholder.com/300x200/ff6b6b/ffffff?text=50%25+OFF'
    },
    {
      id: 2,
      title: 'Free Delivery',
      description: 'No delivery charges on orders above $30',
      restaurant: 'All Restaurants',
      discount: 'FREE',
      image: 'https://via.placeholder.com/300x200/4ecdc4/ffffff?text=FREE+DELIVERY'
    },
    {
      id: 3,
      title: 'Buy 1 Get 1',
      description: 'Buy one pizza get one free',
      restaurant: 'Pizza Heaven',
      discount: 'BOGO',
      image: 'https://via.placeholder.com/300x200/45b7d1/ffffff?text=BUY+1+GET+1'
    }
  ];

  // Static services data
  const services = [
    {
      id: 1,
      title: 'Food Delivery',
      description: 'Get your favorite food delivered to your doorstep',
      icon: '🚚',
      features: ['30-min delivery', 'Live tracking', 'Contactless delivery']
    },
    {
      id: 2,
      title: 'Restaurant Partners',
      description: 'Partner with us to grow your business',
      icon: '🤝',
      features: ['Easy onboarding', 'Analytics dashboard', 'Marketing support']
    },
    {
      id: 3,
      title: 'Delivery Jobs',
      description: 'Join our delivery team and earn money',
      icon: '💼',
      features: ['Flexible hours', 'Competitive pay', 'Insurance coverage']
    },
    {
      id: 4,
      title: 'Catering Services',
      description: 'Catering for events and parties',
      icon: '🍽️',
      features: ['Custom menus', 'Bulk ordering', 'Event planning']
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <header className="hero-section">
        <nav className="navbar">
          <div className="logo">
            <h1>🍔 QuickBite</h1>
          </div>
          <div className="nav-links">
            {user ? (
              <>
                <Link to="/dashboard" className="btn btn-outline">Dashboard</Link>
                <Link to="/logout" className="btn btn-outline">Logout</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">Login</Link>
                <Link to="/register" className="btn btn-primary">Sign Up</Link>
              </>
            )}
          </div>
        </nav>

        <div className="hero-content">
          <h1>Hungry? We've got you covered.</h1>
          <p>The best food from local restaurants, delivered to your doorstep in minutes.</p>

          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-box">
              <input
                type="text"
                placeholder="Enter your location or search for restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="btn-search">
                🔍 Search
              </button>
            </div>
          </form>
        </div>
      </header>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            {services.map(service => (
              <div key={service.id} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, index) => (
                    <li key={index}>✓ {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Deals Section */}
      <section className="deals-section">
        <div className="container">
          <h2 className="section-title">🔥 Latest Deals</h2>
          <div className="deals-grid">
            {latestDeals.map(deal => (
              <div key={deal.id} className="deal-card">
                <div className="deal-image">
                  <img src={deal.image} alt={deal.title} />
                  <div className="deal-badge">{deal.discount}</div>
                </div>
                <div className="deal-content">
                  <h3>{deal.title}</h3>
                  <p>{deal.description}</p>
                  <div className="deal-restaurant">{deal.restaurant}</div>
                  <button className="btn btn-secondary">Order Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose QuickBite?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Hot food delivered in under 30 minutes</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📍</div>
              <h3>Live Tracking</h3>
              <p>Track your order in real-time</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💳</div>
              <h3>Secure Payment</h3>
              <p>Multiple payment options with 100% security</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Top Rated</h3>
              <p>Only the best restaurants in your area</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>QuickBite</h3>
              <p>Your trusted food delivery partner</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/restaurants">Restaurants</Link></li>
                <li><Link to="/deals">Deals</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Connect</h4>
              <div className="social-links">
                <span>📘</span>
                <span>🐦</span>
                <span>📷</span>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 QuickBite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
