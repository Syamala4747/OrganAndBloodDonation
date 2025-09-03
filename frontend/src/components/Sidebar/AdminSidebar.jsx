import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const AdminSidebar = ({ active, onLogout }) => (
  <aside className="sidebar admin-sidebar">
    <div className="sidebar-logo">🛡️ Admin Panel</div>
    <nav>
      <ul>
        <li className={active === 'home' ? 'active' : ''}><Link to="/admin/">🏠 Dashboard Home</Link></li>
        <li className={active === 'approvals' ? 'active' : ''}><Link to="/admin/approvals">✅ Approvals</Link></li>
        <li className={active === 'analytics' ? 'active' : ''}><Link to="/admin/analytics">📊 Analytics</Link></li>
        <li className={active === 'reports' ? 'active' : ''}><Link to="/admin/reports">⚠️ Reports / Issues</Link></li>
        <li className={active === 'users' ? 'active' : ''}><Link to="/admin/users">👤 All Users</Link></li>
        <li onClick={onLogout} style={{cursor:'pointer'}}><span>⏏️</span> Logout</li>
      </ul>
    </nav>
  </aside>
);

export default AdminSidebar;
