import React, { useEffect, useState } from 'react';
import HospitalSidebar from '../../components/Sidebar/HospitalSidebar';
import './HospitalLivingDonors.css';

const HospitalLivingDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchDonors() {
      setLoading(true);
      setError('');
      try {
  const res = await fetch('/api/organ-donation/living-donors');
        if (!res.ok) throw new Error('Failed to fetch donors');
        const data = await res.json();
        setDonors(data);
      } catch (err) {
        setError('Could not load living donors.');
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
      <HospitalSidebar active="living-donors" />
      <div className="dashboard-main">
        <nav className="dashboard-navbar">
          <input className="dashboard-search" placeholder="Search donors..." value={search} onChange={e=>setSearch(e.target.value)} />
          <div className="dashboard-actions">
            <span className="dashboard-bell">🔔</span>
            <div className="dashboard-profile hospital">🏥</div>
          </div>
        </nav>
        <div className="dashboard-content">
          <h1 className="living-donors-title">Living Donors</h1>
          {error && <div className="living-donors-error">{error}</div>}
          {loading ? (
            <div className="living-donors-loading">Loading...</div>
          ) : (
            <div className="living-donors-cards-list">
              {filteredDonors.length === 0 ? (
                <div className="living-donors-empty">No living donors found.</div>
              ) : (
                filteredDonors.map((donor, idx) => {
                  return (
                    <div className="living-donor-card" key={donor._id || idx}>
                      <div style={{display:'flex',alignItems:'flex-start',gap:'1.2rem'}}>
                        {donor.photo && donor.photo !== 'undefined' && donor.photo !== '' ? (
                          <img
                            src={`http://localhost:5000/uploads/${donor.photo}`}
                            alt="Profile"
                            style={{width:'64px',height:'64px',borderRadius:'50%',objectFit:'cover',border:'2px solid #e0e7ef',marginTop:'0.2rem'}}
                            onError={e => { e.target.onerror=null; e.target.src='https://ui-avatars.com/api/?name=Donor&background=f3f4f6&color=222&size=64'; }}
                          />
                        ) : (
                          <div style={{width:'64px',height:'64px',borderRadius:'50%',background:'#f3f4f6',color:'#2563eb',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2rem',fontWeight:'bold',border:'2px solid #e0e7ef',marginTop:'0.2rem'}}>
                            {donor.name ? donor.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) : 'DO'}
                          </div>
                        )}
                        <div className="living-donor-info" style={{flex:1}}>
                          <div style={{fontWeight:'bold',fontSize:'1.15rem',marginBottom:'0.3rem'}}>{donor.name}</div>
                          <div><b>Age:</b> {(donor.age !== undefined && donor.age !== null && donor.age !== '' && !isNaN(Number(donor.age))) ? donor.age : <span style={{color:'#f87171'}}>Not provided</span>}</div>
                          <div><b>City:</b> {donor.city || donor.location || <span style={{color:'#f87171'}}>Not provided</span>}</div>
                          <div><b>Blood Type:</b> <span className="blood-type">{donor.bloodGroup}</span></div>
                          <div><b>Organs Pledged:</b> {Array.isArray(donor.organs) ? donor.organs.map(org => <span key={org} className="organ-tag">{org}</span>) : donor.organs}</div>
                          <div><b>Phone:</b> {donor.phone}</div>
                          <div><b>Email:</b> {donor.email}</div>
                          {donor.medicalCertificate ? (
                            <div style={{marginTop:'0.5rem'}}>
                              <b>Medical Certificate:</b> <a href={`http://localhost:5000/uploads/${donor.medicalCertificate}`} target="_blank" rel="noopener noreferrer" style={{color:'#2563eb',textDecoration:'underline'}}>View/Download</a>
                            </div>
                          ) : (
                            <div style={{marginTop:'0.5rem',color:'#f87171'}}><b>Medical Certificate:</b> Not uploaded</div>
                          )}
                        </div>
                      </div>
                      {/* Organ selection and request button */}
                      {Array.isArray(donor.organs) && donor.organs.length > 0 ? (
                        <div style={{marginTop:'0.7rem'}}>
                          <select style={{marginRight:'0.7rem',padding:'0.4rem',borderRadius:'0.7rem',border:'1px solid #e5e7eb'}} id={`organ-select-${donor._id || idx}`}>
                            <option value="">Select organ</option>
                            {donor.organs.map(org => <option key={org} value={org}>{org}</option>)}
                          </select>
                          <button
                            style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:'1rem',padding:'0.6rem 1.2rem',fontWeight:'bold',cursor:'pointer'}}
                            onClick={async () => {
                              const organ = document.getElementById(`organ-select-${donor._id || idx}`).value;
                              if (!organ) return alert('Please select an organ to request.');
                              try {
                                const token = localStorage.getItem('token');
                                const res = await fetch('/api/hospital/request-donation', {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json',
                                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                                  },
                                  body: JSON.stringify({ donorId: donor._id, organ })
                                });
                                if (res.ok) {
                                  alert(`Request sent for ${organ} from donor: ${donor.name}`);
                                } else {
                                  alert('Failed to send request.');
                                }
                              } catch (err) {
                                alert('Failed to send request.');
                              }
                            }}
                          >Request</button>
                        </div>
                      ) : (
                        <button style={{marginTop:'0.7rem',background:'#2563eb',color:'#fff',border:'none',borderRadius:'1rem',padding:'0.6rem 1.2rem',fontWeight:'bold',cursor:'pointer'}} disabled>No organs available</button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalLivingDonors;
