
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminApprovals.css';

const AdminApprovals = () => {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPending = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/admin/approvals', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPending(res.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('You must be logged in as admin to view approvals.');
      } else if (err.response && err.response.status === 403) {
        setError('Access denied. Only admins can view approvals.');
      } else {
        setError('Failed to fetch pending approvals');
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleAction = async (userId, action) => {
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `/api/admin/${action}`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPending(pending.filter(item => item._id !== userId));
    } catch (err) {
      setError('Action failed');
    }
  };

  return (
    <div className="dashboard-content">
      <h1 style={{fontWeight:'bold', fontSize:'2.2rem', marginBottom:'1.2rem'}}>Pending Approvals</h1>
  <div style={{padding:'2rem 1.2rem', width:'100%'}}>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : pending.length === 0 ? (
          <div>No pending requests.</div>
        ) : (
          <table className="approvals-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Email</th>
                <th>Name</th>
                <th>Type</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Proof of Evidence</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((item) => (
                <tr key={item._id}>
                  <td>{item.username}</td>
                  <td>{item.category}</td>
                  <td>{item.email}</td>
                  <td>{item.name || '-'}</td>
                  <td>{item.type || '-'}</td>
                  <td>{item.address || '-'}</td>
                  <td>{item.contact || '-'}</td>
                  <td>
                    {item.verificationDocs && item.verificationDocs.length > 0 && item.verificationDocs[0] ? (
                      <>
                        {item.verificationDocs[0].match(/\.(jpg|jpeg|png|gif)$/i) ? (
                          <button
                            onClick={() => window.open(`http://localhost:5000/uploads/${item.verificationDocs[0].replace(/^.*uploads[\\\/]/, '')}`, '_blank')}
                            style={{ color: 'blue', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                          >
                            Click to view photo
                          </button>
                        ) : item.verificationDocs[0].match(/\.pdf$/i) ? (
                          <a
                            href={`http://localhost:5000/uploads/${item.verificationDocs[0].replace(/^.*uploads[\\\/]/, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'blue', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                          >
                            Click to view PDF
                          </a>
                        ) : (
                          <button
                            onClick={() => window.open(`http://localhost:5000/uploads/${item.verificationDocs[0].split('/').pop()}`, '_blank')}
                            style={{ color: 'blue', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                          >
                            Click to view file
                          </button>
                        )}
                      </>
                    ) : 'No file'}
                  </td>
                  <td>{item.status}</td>
                  <td>
                    <button className="approve-btn" onClick={() => handleAction(item._id, 'approve')}>✅ Approve</button>
                    <button className="reject-btn" onClick={() => handleAction(item._id, 'reject')}>❌ Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminApprovals;
