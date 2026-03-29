import React, { useState } from 'react';
import './RevenueAnalytics.css';

const RevenueAnalytics = () => {
  // TODO: API call to fetch revenue data
  // Endpoint: GET /api/restaurants/:restaurantId/analytics
  // Response: { success: true, data: { dailyRevenue: [], weeklyRevenue: [], monthlyRevenue: [], yearlyRevenue: [], trends } }

  const [timeRange, setTimeRange] = useState('monthly');

  // Mock revenue data
  const revenueData = {
    daily: [
      { date: '2024-03-25', revenue: 850.50, orders: 32, avgOrderValue: 26.58 },
      { date: '2024-03-24', revenue: 920.75, orders: 35, avgOrderValue: 26.31 },
      { date: '2024-03-23', revenue: 780.25, orders: 28, avgOrderValue: 27.87 },
      { date: '2024-03-22', revenue: 1050.00, orders: 40, avgOrderValue: 26.25 },
      { date: '2024-03-21', revenue: 890.50, orders: 34, avgOrderValue: 26.19 },
      { date: '2024-03-20', revenue: 760.25, orders: 29, avgOrderValue: 26.22 },
      { date: '2024-03-19', revenue: 1120.75, orders: 42, avgOrderValue: 26.68 }
    ],
    weekly: [
      { week: 'Week 1', revenue: 5850.50, orders: 225, avgOrderValue: 26.00 },
      { week: 'Week 2', revenue: 6320.75, orders: 240, avgOrderValue: 26.34 },
      { week: 'Week 3', revenue: 5920.25, orders: 228, avgOrderValue: 25.97 },
      { week: 'Week 4', revenue: 6780.00, orders: 255, avgOrderValue: 26.59 }
    ],
    monthly: [
      { month: 'January', revenue: 22500.00, orders: 850, avgOrderValue: 26.47 },
      { month: 'February', revenue: 24750.00, orders: 920, avgOrderValue: 26.90 },
      { month: 'March', revenue: 26125.50, orders: 990, avgOrderValue: 26.39 }
    ],
    yearly: [
      { year: '2022', revenue: 285000.00, orders: 10500, avgOrderValue: 27.14 },
      { year: '2023', revenue: 312500.00, orders: 11500, avgOrderValue: 27.17 },
      { year: '2024', revenue: 73375.50, orders: 2760, avgOrderValue: 26.58 }
    ]
  };

  const summaryStats = {
    totalRevenue: 26125.50,
    totalOrders: 990,
    averageOrderValue: 26.39,
    growthRate: 5.6,
    topCategory: 'Pizza',
    topItem: 'Margherita Pizza'
  };

  const getRangeData = () => {
    switch (timeRange) {
      case 'daily':
        return revenueData.daily;
      case 'weekly':
        return revenueData.weekly;
      case 'monthly':
        return revenueData.monthly;
      case 'yearly':
        return revenueData.yearly;
      default:
        return revenueData.monthly;
    }
  };

  return (
    <div className="revenue-analytics">
      {/* Header */}
      <div className="analytics-header">
        <h2>Revenue Analytics</h2>
        <div className="time-range-selector">
          <button
            className={`range-btn ${timeRange === 'daily' ? 'active' : ''}`}
            onClick={() => setTimeRange('daily')}
          >
            Daily
          </button>
          <button
            className={`range-btn ${timeRange === 'weekly' ? 'active' : ''}`}
            onClick={() => setTimeRange('weekly')}
          >
            Weekly
          </button>
          <button
            className={`range-btn ${timeRange === 'monthly' ? 'active' : ''}`}
            onClick={() => setTimeRange('monthly')}
          >
            Monthly
          </button>
          <button
            className={`range-btn ${timeRange === 'yearly' ? 'active' : ''}`}
            onClick={() => setTimeRange('yearly')}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="summary-stats">
        <div className="summary-card">
          <h4>Total Revenue</h4>
          <p className="large-value">${summaryStats.totalRevenue.toFixed(2)}</p>
          <span className="trend positive">↑ {summaryStats.growthRate}% this {timeRange}</span>
        </div>
        <div className="summary-card">
          <h4>Total Orders</h4>
          <p className="large-value">{summaryStats.totalOrders}</p>
          <span className="trend">Avg rating: 4.6 ⭐</span>
        </div>
        <div className="summary-card">
          <h4>Avg Order Value</h4>
          <p className="large-value">${summaryStats.averageOrderValue.toFixed(2)}</p>
          <span className="trend">Per order</span>
        </div>
        <div className="summary-card">
          <h4>Top Item</h4>
          <p className="large-value">{summaryStats.topItem}</p>
          <span className="trend">Category: {summaryStats.topCategory}</span>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="chart-section">
        <h3>Revenue Trend</h3>
        <div className="chart-placeholder">
          {/* TODO: Integrate Chart.js or Recharts for visualization
              Install: npm install recharts
              Show line/bar charts for revenue trends */}
          <p>📊 Chart visualization coming soon!</p>
          <p>This will display your revenue trends as an interactive chart</p>
        </div>
      </div>

      {/* Data Table */}
      <div className="data-table-section">
        <h3>{timeRange.charAt(0).toUpperCase() + timeRange.slice(1)} Revenue Details</h3>
        <div className="table-container">
          <table className="revenue-table">
            <thead>
              <tr>
                <th>{timeRange === 'daily' ? 'Date' : timeRange === 'weekly' ? 'Week' : timeRange === 'yearly' ? 'Year' : 'Month'}</th>
                <th>Revenue</th>
                <th>Orders</th>
                <th>Avg Order Value</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {getRangeData().map((row, index) => {
                const prevRow = index > 0 ? getRangeData()[index - 1] : null;
                const change = prevRow ? ((row.revenue - prevRow.revenue) / prevRow.revenue * 100).toFixed(1) : 0;
                const label = row.date || row.week || row.month || row.year;

                return (
                  <tr key={index}>
                    <td><strong>{label}</strong></td>
                    <td>${row.revenue.toFixed(2)}</td>
                    <td>{row.orders}</td>
                    <td>${row.avgOrderValue.toFixed(2)}</td>
                    <td className={change >= 0 ? 'positive' : 'negative'}>
                      {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="performance-section">
        <h3>Performance Metrics</h3>
        <div className="metrics-grid">
          <div className="metric-card">
            <h4>Peak Hours</h4>
            <p className="metric-value">12 PM - 2 PM</p>
            <span className="metric-info">Busiest time: Order now to prep ahead</span>
          </div>
          <div className="metric-card">
            <h4>Customer Retention</h4>
            <p className="metric-value">68%</p>
            <span className="metric-info">Repeat customers</span>
          </div>
          <div className="metric-card">
            <h4>Avg Prep Time</h4>
            <p className="metric-value">18 min</p>
            <span className="metric-info">Target: 15 min</span>
          </div>
          <div className="metric-card">
            <h4>Customer Satisfaction</h4>
            <p className="metric-value">4.6 ⭐</p>
            <span className="metric-info">Based on 990 reviews</span>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="export-section">
        <h3>Export Reports</h3>
        <div className="export-buttons">
          {/* TODO: API call to generate and download reports
              Endpoint: POST /api/restaurants/:restaurantId/reports/download
              Request: { format: 'pdf' | 'csv' | 'excel', timeRange }
              Response: Binary file download */}
          <button className="btn btn-secondary">📄 Download as PDF</button>
          <button className="btn btn-secondary">📊 Download as Excel</button>
          <button className="btn btn-secondary">📋 Download as CSV</button>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;
