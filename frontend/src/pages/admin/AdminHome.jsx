import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/Sidebar/AdminSidebar';
import AdminApprovals from './AdminApprovals';
import AdminAnalytics from './AdminAnalytics';
import AdminUsers from './AdminUsers';
import './AdminHome.css';


const AdminHome = () => {
  const navigate = useNavigate();
  // Determine active sidebar item based on current path
  const path = window.location.pathname;
  let active = 'home';
  if (path.includes('/admin/approvals')) active = 'approvals';
  else if (path.includes('/admin/analytics')) active = 'analytics';
  else if (path.includes('/admin/users')) active = 'users';

  return (
    <div className="dashboard-container">
  <AdminSidebar active={active} onLogout={() => { localStorage.removeItem('token'); navigate('/signup'); }} />
  <div className="dashboard-main">
        <div className="dashboard-content">
          <Routes>
            <Route path="/" element={
              <>
                <h1 style={{fontWeight:'bold', fontSize:'2.8rem', marginBottom:'2.2rem', textAlign:'center', background:'linear-gradient(90deg,#f97316 60%,#38bdf8 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>Admin Dashboard</h1>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2.5rem', marginBottom:'2.5rem', justifyItems:'center'}}>
                  <div className="dashboard-card" style={{background:'rgba(34,197,94,0.08)', borderRadius:'1.5rem', boxShadow:'0 8px 32px rgba(34,197,94,0.10)', padding:'2.5rem 2rem', textAlign:'center', transition:'transform 0.2s', cursor:'pointer'}}>
                    <div style={{fontSize:'3rem', color:'#22c55e', marginBottom:'1rem'}}>👤</div>
                    <div style={{fontWeight:'bold', fontSize:'2rem', color:'#1e293b', marginBottom:'0.7rem'}}>Total Donors</div>
                    <div style={{fontSize:'1.2rem', color:'#334155'}}>View and manage all registered donors</div>
                  </div>
                  <div className="dashboard-card" style={{background:'rgba(37,99,235,0.08)', borderRadius:'1.5rem', boxShadow:'0 8px 32px rgba(37,99,235,0.10)', padding:'2.5rem 2rem', textAlign:'center', transition:'transform 0.2s', cursor:'pointer'}}>
                    <div style={{fontSize:'3rem', color:'#2563eb', marginBottom:'1rem'}}>🏥</div>
                    <div style={{fontWeight:'bold', fontSize:'2rem', color:'#1e293b', marginBottom:'0.7rem'}}>Total Hospitals</div>
                    <div style={{fontSize:'1.2rem', color:'#334155'}}>View and approve hospital requests</div>
                  </div>
                  <div className="dashboard-card" style={{background:'rgba(139,92,246,0.08)', borderRadius:'1.5rem', boxShadow:'0 8px 32px rgba(139,92,246,0.10)', padding:'2.5rem 2rem', textAlign:'center', transition:'transform 0.2s', cursor:'pointer'}}>
                    <div style={{fontSize:'3rem', color:'#8b5cf6', marginBottom:'1rem'}}>🏢</div>
                    <div style={{fontWeight:'bold', fontSize:'2rem', color:'#1e293b', marginBottom:'0.7rem'}}>Total Organizations</div>
                    <div style={{fontSize:'1.2rem', color:'#334155'}}>View and approve organization requests</div>
                  </div>
                  <div className="dashboard-card" style={{background:'rgba(239,68,68,0.08)', borderRadius:'1.5rem', boxShadow:'0 8px 32px rgba(239,68,68,0.10)', padding:'2.5rem 2rem', textAlign:'center', transition:'transform 0.2s', cursor:'pointer'}}>
                    <div style={{fontSize:'3rem', color:'#ef4444', marginBottom:'1rem'}}>📊</div>
                    <div style={{fontWeight:'bold', fontSize:'2rem', color:'#1e293b', marginBottom:'0.7rem'}}>Analytics</div>
                    <div style={{fontSize:'1.2rem', color:'#334155'}}>View dashboard analytics</div>
                  </div>
                </div>
                <div style={{marginTop:'2.5rem', textAlign:'center', color:'#334155', fontSize:'1.25rem', fontWeight:'500', background:'rgba(37,99,235,0.07)', borderRadius:'1rem', padding:'1.2rem 0'}}>Welcome, Admin! Use the sidebar to manage users, approvals, analytics, and more.</div>
              </>
            } />
            <Route path="approvals" element={<AdminApprovals />} />
            <Route path="users" element={<AdminUsers />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
