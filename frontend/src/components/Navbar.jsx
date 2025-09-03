import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-title">Organ Donation</span>
      </div>
      <div className="navbar-right">
        <span className="navbar-icon" title="Notifications" onClick={() => navigate('/donor/notifications')}>
          <i className="fa fa-bell"></i>
        </span>
        <span className="navbar-icon" title="Profile" onClick={() => navigate('/donor/profile')}>
          <i className="fa fa-user"></i>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
