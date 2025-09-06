import React, { useEffect, useState } from 'react';
import HospitalSidebar from '../../components/Sidebar/HospitalSidebar';
import './HospitalLivingDonors.css';

const HospitalLivingDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

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

  const handleRequest = async (donor, idx) => {
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
  };

  return (
    <div className="dashboard-container">
      <div style={{position:'fixed', left:0, top:0, height:'100vh', width:'260px', zIndex:10}}>
        <HospitalSidebar active="living-donors" />
      </div>
      <div className="dashboard-main" style={{marginLeft:'260px', width: 'calc(100vw - 260px)', maxWidth: 'none'}}>
        <nav className="dashboard-navbar">
          <input className="dashboard-search" placeholder="Search donors..." value={search} onChange={e=>setSearch(e.target.value)} />
          <div className="dashboard-actions">
            <span className="dashboard-bell">🔔</span>
            <div className="dashboard-profile hospital">🏥</div>
          </div>
        </nav>
  <div className="dashboard-content" style={{background:'linear-gradient(135deg, #eaf6fb 60%, #fdf6fb 100%)', borderRadius:'1.5rem', boxShadow:'0 8px 32px #e0e7ef', margin:'2rem auto', padding:'2.5rem', width:'100vw', maxWidth:'600px', minHeight:'80vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
          <h1 className="living-donors-title">Living Donors</h1>
          {error && <div className="living-donors-error">{error}</div>}
          {loading ? (
            <div className="living-donors-loading">Loading...</div>
          ) : (
            <div className="living-donors-cards-list" style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
              {filteredDonors.length === 0 ? (
                <div className="living-donors-empty">No living donors found.</div>
              ) : (
                filteredDonors.map((donor, idx) => (
                  <div className="living-donor-card" key={donor._id || idx} style={{background:'#fff', borderRadius:'1.2rem', boxShadow:'0 2px 12px #e0e7ef', padding:'1.2rem', marginBottom:'1.2rem', maxWidth:'480px', width:'100%', display:'flex', flexDirection:'row', alignItems:'center', gap:'1.2rem', position:'relative', boxSizing:'border-box', justifyContent:'center', marginLeft:'auto', marginRight:'auto'}}>
                    <div style={{width:'130px',height:'100%',minHeight:'220px',background:'#f3f4f6',borderRadius:'1rem',boxShadow:'0 1px 4px #e0e7ef',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center',marginRight:'1rem'}}>
                      {donor.photo && donor.photo !== 'undefined' && donor.photo !== '' ? (
                        <img
                          src={`http://localhost:5000/uploads/${donor.photo}`}
                          alt="Donor Photo"
                          style={{width:'120px',height:'210px',borderRadius:'0.7rem',objectFit:'cover'}}
                          onError={e => { e.target.onerror=null; e.target.src='https://ui-avatars.com/api/?name=Donor&background=f3f4f6&color=222&size=120'; }}
                        />
                      ) : (
                        <div style={{width:'100px',height:'100px',borderRadius:'50%',background:'#eaf6fb',color:'#2563eb',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.5rem',fontWeight:'bold',border:'2px solid #e0e7ef'}}>
                          {donor.name ? donor.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) : 'DO'}
                        </div>
                      )}
                    </div>
                    <div className="living-donor-info" style={{flex:1, display:'flex', flexDirection:'column', gap:'0.4rem', justifyContent:'center'}}>
                      <div style={{fontWeight:'bold',fontSize:'1.05rem',marginBottom:'0.1rem',color:'#222'}}>{donor.name}</div>
                      <div style={{fontSize:'0.97rem'}}><b>Age:</b> {(donor.age !== undefined && donor.age !== null && donor.age !== '' && !isNaN(Number(donor.age))) ? donor.age : <span style={{color:'#f87171'}}>Not provided</span>} &nbsp; <b>City:</b> {donor.city || donor.location || <span style={{color:'#f87171'}}>Not provided</span>}</div>
                      <div style={{fontSize:'0.97rem'}}><b>Blood Type:</b> <span className="blood-type" style={{background:'#1e293b',color:'#fff',borderRadius:'0.5rem',padding:'0.1rem 0.6rem',fontWeight:'bold',fontSize:'0.97rem',marginLeft:'0.5rem'}}>{donor.bloodGroup}</span></div>
                      <div style={{fontSize:'0.97rem'}}><b>Organs Pledged:</b> {
                        Array.isArray(donor.organs)
                          ? donor.organs
                              .filter(org => ['Blood', 'Kidney', 'Partial Liver'].includes(org))
                              .map(org => <span key={org} className="organ-tag" style={{background:'#fde68a',color:'#b45309',borderRadius:'0.5rem',padding:'0.15rem 0.7rem',marginRight:'0.3rem',fontWeight:'bold',fontSize:'0.97rem'}}>{org}</span>)
                          : donor.organs
                      }</div>
                      {donor.medicalCertificate && donor.medicalCertificate !== 'undefined' && donor.medicalCertificate !== '' ? (
                        <div style={{marginTop:'0.1rem',fontSize:'0.97rem'}}>
                          <b>Medical Certificate:</b> <a href={`http://localhost:5000/uploads/${donor.medicalCertificate}`} target="_blank" rel="noopener noreferrer" style={{color:'#2563eb',textDecoration:'underline'}}>View/Download</a>
                        </div>
                      ) : (
                        <div style={{marginTop:'0.1rem',color:'#f87171',fontSize:'0.97rem'}}><b>Medical Certificate:</b> Not uploaded</div>
                      )}
                      {Array.isArray(donor.organs) && donor.organs.length > 0 ? (
                        <div style={{marginTop:'0.7rem', display:'flex', alignItems:'center', gap:'0.5rem'}}>
                          <select style={{padding:'0.08rem 0.4rem',borderRadius:'0.5rem',border:'1px solid #e5e7eb',fontSize:'0.92rem',background:'#f3f4f6',color:'#2563eb',fontWeight:'bold'}} id={`organ-select-${donor._id || idx}`}>
                            {donor.organs
                              .filter(org => ['Blood', 'Kidney', 'Partial Liver'].includes(org))
                              .map(org => <option key={org} value={org}>{org}</option>)}
                          </select>
                          <button
                            style={{background:'linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)',color:'#fff',border:'none',borderRadius:'0.5rem',padding:'0.08rem 0.4rem',fontWeight:'bold',cursor:'pointer',fontSize:'0.92rem',boxShadow:'0 1px 4px #e0e7ef',transition:'background 0.2s'}}
                            onClick={() => handleRequest(donor, idx)}
                          >Request</button>
                        </div>
                      ) : (
                        <button style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:'0.5rem',padding:'0.08rem 0.4rem',fontWeight:'bold',cursor:'pointer',fontSize:'0.92rem'}} disabled>No organs available</button>
                      )}
                    </div>
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

export default HospitalLivingDonors;
