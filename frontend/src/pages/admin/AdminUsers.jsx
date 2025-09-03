
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminUsers.css';

const TABS = [
  { key: 'donor', label: 'Donors', icon: '🧑‍🦱' },
  { key: 'hospital', label: 'Hospitals', icon: '🏥' },
  { key: 'organization', label: 'Organizations', icon: '🏢' },
];

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('donor');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
      } catch (err) {
        setError('Failed to fetch users');
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(u => (u.category || '').toLowerCase() === activeTab);

  return (
    <div className="dashboard-content">
      <h1 style={{fontWeight:'bold', fontSize:'2.2rem', marginBottom:'1.2rem'}}>All Users</h1>
  <div style={{padding:'2rem 1.2rem', width:'100%'}}>
        <div className="users-tabs">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`users-tab-btn${activeTab === tab.key ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="tab-icon">{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>
        {error && <div className="users-error">{error}</div>}
        {loading ? (
          <div className="users-loading">Loading...</div>
        ) : (
          <div className="users-cards-list">
            {filteredUsers.length === 0 ? (
              <div className="users-empty">No {TABS.find(t=>t.key===activeTab).label} found.</div>
            ) : (
              filteredUsers.map(user => (
                <div className={`user-card user-card-${activeTab}`} key={user._id}>
                  <div className="user-card-header">
                    <span className="user-card-avatar">{TABS.find(t=>t.key===activeTab).icon}</span>
                    <span className="user-card-name">{user.username}</span>
                  </div>
                  <div className="user-card-info">
                    <div><b>Email:</b> {user.email}</div>
                    <div><b>Status:</b> <span className={`user-status user-status-${user.status}`}>{user.status}</span></div>
                    <div><b>Joined:</b> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</div>
                    {activeTab === 'hospital' && user.hospitalName && (
                      <div><b>Hospital Name:</b> {user.hospitalName}</div>
                    )}
                    {activeTab === 'organization' && user.organizationName && (
                      <div><b>Organization Name:</b> {user.organizationName}</div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
