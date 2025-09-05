import React, { useEffect, useState } from 'react';
import OrganizationSidebar from '../../components/Sidebar/OrganizationSidebar';
import './OrgAfterDeathDonors.css';

const OrgAfterDeathDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchDonors() {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/organization/after-death-donors', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch donors');
        const data = await res.json();
        setDonors(data);
      } catch (err) {
        setError('Could not load after-death pledged donors.');
      }
      setLoading(false);
    }
    fetchDonors();
  }, []);

  const filteredDonors = donors.filter(donor => {
    const q = search.toLowerCase();
    return (
      donor.name?.toLowerCase().includes(q) ||
      donor.bloodGroup?.toLowerCase().includes(q) ||
      donor.location?.toLowerCase().includes(q) ||
      donor.phone?.toLowerCase().includes(q) ||
      donor.email?.toLowerCase().includes(q) ||
      (Array.isArray(donor.organs) && donor.organs.join(' ').toLowerCase().includes(q))
    );
  });
  return (
    <div className="dashboard-container">
      <OrganizationSidebar active="after-death-donors" />
      <div className="dashboard-main">
        <nav className="dashboard-navbar">
          <input className="dashboard-search" placeholder="Search donors..." value={search} onChange={e=>setSearch(e.target.value)} />
          <div className="dashboard-actions">
            <span className="dashboard-bell">🔔</span>
            <div className="dashboard-profile organization">🏢</div>
          </div>
        </nav>
        <div className="dashboard-content">
          <h1 className="after-death-donors-title">After-Death Pledged Donors</h1>
          {error && <div className="after-death-donors-error">{error}</div>}
          {loading ? (
            <div className="after-death-donors-loading">Loading...</div>
          ) : (
            <div className="after-death-donors-cards-list">
              {filteredDonors.length === 0 ? (
                <div className="after-death-donors-empty">No after-death pledged donors found.</div>
              ) : (
                filteredDonors.map((donor, idx) => (
                  <div className="after-death-donor-card" key={donor._id || idx}>
                    <div className="after-death-donor-card-header">
                      <span className="after-death-donor-avatar">⚰️</span>
                      <span className="after-death-donor-name">{donor.name}</span>
                      {donor.donationType === 'both' && (
                        <span className="donor-type-badge" style={{marginLeft:'0.7rem',background:'#fde68a',color:'#b45309',borderRadius:'0.5rem',padding:'0.1rem 0.6rem',fontSize:'0.95rem'}}>Both</span>
                      )}
                    </div>
                    <div className="after-death-donor-info">
                      <div><b>Age:</b> {donor.age}</div>
                      <div><b>Blood Type:</b> <span className="blood-type">{donor.bloodGroup || donor.bloodType}</span></div>
                      <div><b>Location:</b> {donor.location}</div>
                      <div><b>Organs Pledged:</b> {Array.isArray(donor.organs) ? donor.organs.map(org => <span key={org} className="organ-tag">{org}</span>) : donor.organs}</div>
                      <div><b>Phone:</b> {donor.phone}</div>
                      <div><b>Email:</b> {donor.email}</div>
                    </div>
                      <button style={{marginTop:'0.7rem',background:'#22c55e',color:'#fff',border:'none',borderRadius:'1rem',padding:'0.6rem 1.2rem',fontWeight:'bold',cursor:'pointer'}} onClick={()=>alert(`Request sent for donor: ${donor.name}`)}>Request</button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrgAfterDeathDonors;
