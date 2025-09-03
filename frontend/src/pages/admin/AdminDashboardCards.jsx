import React from 'react';
import './AdminDashboardCards.css';

const cards = [
  { label: 'Total Donors', value: 1, color: 'green', icon: '👤', change: '+12% from last month' },
  { label: 'Total Hospitals', value: 0, color: 'blue', icon: '🏥', change: '+8% from last month' },
  { label: 'Organizations', value: 0, color: 'orange', icon: '🏢', change: '+3% from last month' },
  { label: 'Total Donations', value: 0, color: 'red', icon: '❤️', change: '+18% from last month' },
];

const AdminDashboardCards = () => (
  <div className="dashboard-cards-container">
    {cards.map((card, idx) => (
      <div key={idx} className={`dashboard-card ${card.color}`}>
        <div className="dashboard-card-icon">{card.icon}</div>
        <div className="dashboard-card-label">{card.label}</div>
        <div className="dashboard-card-value">{card.value}</div>
        <div className="dashboard-card-change">{card.change}</div>
      </div>
    ))}
  </div>
);

export default AdminDashboardCards;
