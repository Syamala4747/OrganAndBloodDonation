import React from 'react';
import OrganizationSidebar from '../../components/Sidebar/OrganizationSidebar';
import './OrgHome.css';

const OrgHome = () => {
  return (
    <div className="dashboard-container">
      <OrganizationSidebar active="home" />
      <div className="dashboard-main">
        <nav className="dashboard-navbar">
          <input className="dashboard-search" placeholder="Search donors..." />
          <div className="dashboard-actions">
            <span className="dashboard-bell">🔔</span>
            <div className="dashboard-profile organization">🏢</div>
          </div>
        </nav>
        <div className="dashboard-content">
          <h1>Post-Death Donation Coordination</h1>
          <p>Manage donors who have pledged after-death organ donation.</p>
          {/* Add registered donors list, notifications, contact, etc. here */}
        </div>
      </div>
    </div>
  );
};

export default OrgHome;
