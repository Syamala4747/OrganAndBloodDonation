import React, { useState } from 'react';
// robot image import removed
import HospitalSidebar from '../../components/Sidebar/HospitalSidebar';
import './HospitalHome.css';

const HospitalHome = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  return (
  <div className="dashboard-container" style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif', width: '100vw', display: 'flex' }}>
      <HospitalSidebar active="home" />
      <div className="main-content dashboard-main" style={{ width: '100%', flexGrow: 1, alignSelf: 'stretch' }}>
        {/* Hero Section */}
        <div style={{ background: 'linear-gradient(90deg, #eaf6fb 60%, #fdf6fb 100%)', borderRadius: '1.5rem', boxShadow: '0 8px 32px #e0e7ef', margin: '2rem 0 1.5rem 0', padding: '2.5rem 3rem', animation: 'fadeInUp 1.2s' }}>
          <h1 style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '2.7rem', marginBottom: '1.2rem', letterSpacing: '1px', textTransform: 'lowercase' }}>welcome, hospital team!</h1>
          <p style={{ fontSize: '1.25rem', color: '#374151', marginBottom: '1.2rem', maxWidth: '500px', textTransform: 'lowercase' }}>
            manage organ and blood donations, connect with donors, and track your hospital’s impact—all in one secure, modern dashboard.
          </p>
          <button style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: '0.7rem', padding: '0.8rem 2rem', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 2px 8px #e0e7ef', cursor: 'pointer', transition: 'background 0.2s', textTransform: 'lowercase' }}>get started</button>
        </div>

  {/* Quick Stats removed as requested */}

        {/* Features Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          <div style={{ background: '#fdf6fb', borderRadius: '1.2rem', padding: '2rem', boxShadow: '0 2px 12px #e0e7ef', animation: 'fadeInUp 1.6s', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ color: '#2563eb', fontWeight: 'bold', marginBottom: '1rem', fontSize: '1.3rem', textTransform: 'lowercase' }}>� advanced search</h3>
            <div style={{ fontSize: '1.13rem', marginBottom: '0.7rem', lineHeight: '1.7', textAlign: 'center', textTransform: 'lowercase' }}>
              find and filter living donors by organ, location, and status.
            </div>
          </div>
          <div style={{ background: '#eaf6fb', borderRadius: '1.2rem', padding: '2rem', boxShadow: '0 2px 12px #e0e7ef', animation: 'fadeInUp 1.7s', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ color: '#2563eb', fontWeight: 'bold', marginBottom: '1rem', fontSize: '1.3rem', textTransform: 'lowercase' }}>📄 document management</h3>
            <div style={{ fontSize: '1.13rem', marginBottom: '0.7rem', lineHeight: '1.7', textAlign: 'center', textTransform: 'lowercase' }}>
              securely view donor photos and medical certificates.
            </div>
          </div>
          <div style={{ background: '#f3f7fd', borderRadius: '1.2rem', padding: '2rem', boxShadow: '0 2px 12px #e0e7ef', animation: 'fadeInUp 1.8s', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ color: '#2563eb', fontWeight: 'bold', marginBottom: '1rem', fontSize: '1.3rem', textTransform: 'lowercase' }}>📊 analytics</h3>
            <div style={{ fontSize: '1.13rem', marginBottom: '0.7rem', lineHeight: '1.7', textAlign: 'center', textTransform: 'lowercase' }}>
              track donation requests, approvals, and outcomes in real time.
            </div>
          </div>
          <div style={{ background: '#f6fdfb', borderRadius: '1.2rem', padding: '2rem', boxShadow: '0 2px 12px #e0e7ef', animation: 'fadeInUp 1.9s', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ color: '#2563eb', fontWeight: 'bold', marginBottom: '1rem', fontSize: '1.3rem', textTransform: 'lowercase' }}>🔔 instant notifications</h3>
            <div style={{ fontSize: '1.13rem', marginBottom: '0.7rem', lineHeight: '1.7', textAlign: 'center', textTransform: 'lowercase' }}>
              stay updated with donor responses and system alerts.
            </div>
          </div>
          <div style={{ background: '#f6fdfb', borderRadius: '1.2rem', padding: '2rem', boxShadow: '0 2px 12px #e0e7ef', animation: 'fadeInUp 2.0s', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ color: '#2563eb', fontWeight: 'bold', marginBottom: '1rem', fontSize: '1.3rem' }}>� Collaboration</h3>
            <div style={{ fontSize: '1.13rem', marginBottom: '0.7rem', lineHeight: '1.7', textAlign: 'center' }}>
              Connect with organizations and other hospitals for joint initiatives.
            </div>
          </div>
          <div style={{ background: '#eaf6fb', borderRadius: '1.2rem', padding: '2rem', boxShadow: '0 2px 12px #e0e7ef', animation: 'fadeInUp 2.1s', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ color: '#2563eb', fontWeight: 'bold', marginBottom: '1rem', fontSize: '1.3rem' }}>🛡️ Privacy & Security</h3>
            <div style={{ fontSize: '1.13rem', marginBottom: '0.7rem', lineHeight: '1.7', textAlign: 'center' }}>
              All data is encrypted and confidential.
            </div>
          </div>
        </div>

        {/* Support & Chatbot */}
        <div style={{ background: '#f6fdfb', borderRadius: '1.2rem', padding: '2rem', boxShadow: '0 2px 12px #e0e7ef', animation: 'fadeInUp 2.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
          <h3 style={{ color: '#2563eb', fontWeight: 'bold', marginBottom: '1rem', fontSize: '1.3rem' }}>🤖 AI Chatbot & Support</h3>
          <div style={{ fontSize: '1.13rem', marginBottom: '0.7rem', lineHeight: '1.7', textAlign: 'center' }}>
            Get instant answers to your questions, support for common issues, and reach out for help anytime.
          </div>
        </div>

        <style>{`
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
          @keyframes zoomIn { from { opacity: 0; transform: scale(0.7); } to { opacity: 1; transform: scale(1); } }
          @keyframes slideDownFade { from { opacity: 0; transform: translateY(-40px); } to { opacity: 1; transform: none; } }
        `}</style>
      </div>
    </div>
  );
};

export default HospitalHome;
