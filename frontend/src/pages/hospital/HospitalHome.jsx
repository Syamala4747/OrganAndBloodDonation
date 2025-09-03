import React from 'react';
import HospitalSidebar from '../../components/Sidebar/HospitalSidebar';
import './HospitalHome.css';

const HospitalHome = () => {
  return (
    <div className="dashboard-container">
      <HospitalSidebar active="home" />
      <div className="dashboard-main">
        <nav className="dashboard-navbar">
          <input className="dashboard-search" placeholder="Search donors..." />
          <div className="dashboard-actions">
            <span className="dashboard-bell">🔔</span>
            <div className="dashboard-profile hospital">🏥</div>
          </div>
        </nav>
        <div className="dashboard-content">
          <h1>Find Donors</h1>
          <p>Search for blood and organ donors in your area.</p>
          {/* Add donor search, filters, donor list, etc. here */}
        </div>
      </div>
    </div>
  );
};

export default HospitalHome;
