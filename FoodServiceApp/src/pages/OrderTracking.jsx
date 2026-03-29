import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './OrderTracking.css';

const OrderTracking = () => {
  // TODO: API call to fetch order details and tracking info
  // Endpoint: GET /api/orders/:orderId
  // Response: { success: true, data: { orderId, status, items, total, estimatedDelivery, deliveryPartner, location, timeline } }

  const { orderId } = useParams();
  const navigate = useNavigate();

  // Mock order data - replace with actual API call
  const [order] = useState({
    id: orderId || 'ORD-12345',
    status: 'out-for-delivery',
    restaurant: 'Pizza Paradise',
    items: [
      { id: 1, name: 'Margherita Pizza', qty: 1, price: 12.99 },
      { id: 2, name: 'Garlic Bread', qty: 1, price: 4.99 },
      { id: 3, name: 'Coke', qty: 1, price: 2.99 }
    ],
    total: 25.99,
    placedAt: '2024-03-25 2:30 PM',
    estimatedDelivery: '2:55 PM - 3:10 PM',
    deliveryPartner: {
      name: 'John Smith',
      rating: 4.8,
      phone: '+1-234-567-8900',
      vehicle: 'Honda Bike - AB 1234'
    },
    deliveryAddress: '123 Main St, Apt 4B, New York, NY 10001'
  });

  const orderTimeline = [
    {
      status: 'order-placed',
      label: 'Order Placed',
      time: '2:30 PM',
      completed: true
    },
    {
      status: 'confirmed',
      label: 'Confirmed',
      time: '2:32 PM',
      completed: true
    },
    {
      status: 'preparing',
      label: 'Preparing',
      time: '2:35 PM',
      completed: true
    },
    {
      status: 'out-for-delivery',
      label: 'Out for Delivery',
      time: '2:45 PM',
      completed: true
    },
    {
      status: 'delivered',
      label: 'Delivered',
      time: 'Soon',
      completed: false
    }
  ];

  const getStatusBadgeColor = () => {
    switch (order.status) {
      case 'order-placed':
      case 'confirmed':
        return '#ff9f43';
      case 'preparing':
        return '#ffa502';
      case 'out-for-delivery':
        return '#0099cc';
      case 'delivered':
        return '#10ac84';
      case 'cancelled':
        return '#ef5350';
      default:
        return '#999';
    }
  };

  const getStatusLabel = () => {
    const labels = {
      'order-placed': 'Order Placed',
      'confirmed': 'Order Confirmed',
      'preparing': 'Preparing Your Order',
      'out-for-delivery': 'Out for Delivery',
      'delivered': 'Delivered',
      'cancelled': 'Order Cancelled'
    };
    return labels[order.status] || 'Processing';
  };

  const etaMinutes = 4;

  return (
    <div className="order-tracking-container">
      {/* Header */}
      <div className="tracking-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ← Back
        </button>
        <h1>Order Tracking</h1>
        <button className="help-btn" onClick={() => alert('Contact support at: +1-800-QuickBite')}>
          Help?
        </button>
      </div>

      {/* Order Status Card */}
      <div className="status-card">
        <div className="status-icon" style={{ backgroundColor: getStatusBadgeColor() }}>
          {order.status === 'out-for-delivery' && '🚗'}
          {order.status === 'delivered' && '✓'}
          {order.status === 'preparing' && '👨‍🍳'}
          {order.status === 'confirmed' && '✓'}
          {order.status === 'order-placed' && '📝'}
        </div>
        <h2>{getStatusLabel()}</h2>
        <p className="order-id">Order #{order.id}</p>
        <p className="estimated-time">Estimated Delivery: {order.estimatedDelivery}</p>
      </div>

      <div className="tracking-content">
        {/* Timeline */}
        <div className="timeline-section">
          <h3>Order Timeline</h3>
          <div className="timeline">
            {orderTimeline.map((step, index) => (
              <div key={step.status} className={`timeline-item ${step.completed ? 'completed' : ''}`}>
                <div className="timeline-marker">
                  {step.completed ? '✓' : '○'}
                </div>
                <div className="timeline-content">
                  <h4>{step.label}</h4>
                  <p>{step.time}</p>
                </div>
                {index < orderTimeline.length - 1 && <div className="timeline-line"></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="tracking-details">
          {/* Delivery Partner */}
          {order.status === 'out-for-delivery' && (
            <div className="partner-section">
              <h3>Your Delivery Partner</h3>
              <div className="partner-card">
                <div className="partner-avatar">👤</div>
                <div className="partner-info">
                  <h4>{order.deliveryPartner.name}</h4>
                  <p className="rating">⭐ {order.deliveryPartner.rating}</p>
                  <p className="vehicle">{order.deliveryPartner.vehicle}</p>
                </div>
                <button className="btn-icon" title="Call delivery partner">
                  ☎️
                </button>
              </div>
              <p className="vehicle-location">Currently {etaMinutes} minutes away</p>
            </div>
          )}

          {/* Delivery Address */}
          <div className="address-section">
            <h3>Delivery Address</h3>
            <div className="address-box">
              <p>📍 {order.deliveryAddress}</p>
            </div>
          </div>

          {/* Order Details */}
          <div className="order-details-section">
            <h3>Order Details</h3>
            <div className="details-box">
              <div className="detail-header">
                <span>From: {order.restaurant}</span>
              </div>
              <div className="items-list">
                {order.items.map((item) => (
                  <div key={item.id} className="detail-item">
                    <span>{item.name} x {item.qty}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="detail-total">
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="tracking-actions">
            {order.status !== 'delivered' && (
              <>
                <button className="btn btn-secondary">
                  📞 Contact Delivery Partner
                </button>
                {/* TODO: API call to cancel order
                    Endpoint: PUT /api/orders/:orderId/cancel
                    Response: { success: true, message: 'Order cancelled' } */}
                <button className="btn btn-danger" onClick={() => alert('Cancel order functionality - requires API integration')}>
                  Cancel Order
                </button>
              </>
            )}
            {order.status === 'delivered' && (
              <button className="btn btn-primary" onClick={() => navigate('/feedback')}>
                🌟 Rate & Review
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Live Map Section (Placeholder) */}
      <div className="map-section">
        <h3>Live Tracking Map</h3>
        <div className="map-placeholder">
          {/* TODO: Integrate Google Maps or Mapbox for real-time tracking
              API: GET /api/orders/:orderId/location
              Response: { success: true, data: { latitude, longitude, timestamp } } */}
          <p>📍 Map integration coming soon</p>
          <p>Your delivery partner location will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
