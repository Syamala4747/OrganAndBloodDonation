import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DonorSidebar from '../../components/Sidebar/DonorSidebar';
import './DonorStatus.css';

const DonorStatus = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/donor/status', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStatus(res.data);
      } catch (err) {
        setStatus(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, []);

  return (
    <div className="dashboard-container" style={{width:'100vw', minHeight:'100vh', display:'flex'}}>
      <DonorSidebar active="status" />
      <div className="dashboard-main" style={{width: '100%', maxWidth: 'none', flex: 1, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start'}}>
        <div className="dashboard-content" style={{width: '100%', maxWidth: 'none', marginLeft:0}}>
          <h2>Status</h2>
          {loading ? (
            <div>Loading...</div>
          ) : status ? (
            <div className="living-donor-card" style={{background:'#fff', borderRadius:'1.2rem', boxShadow:'0 2px 12px #e0e7ef', padding:'1.2rem', margin:'2rem auto', maxWidth:'480px', width:'100%', display:'flex', flexDirection:'row', alignItems:'center', gap:'1.2rem', position:'relative', boxSizing:'border-box', justifyContent:'center'}}>
              <div style={{width:'130px',height:'100%',minHeight:'220px',background:'#f3f4f6',borderRadius:'1rem',boxShadow:'0 1px 4px #e0e7ef',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center',marginRight:'1rem'}}>
                  {status.photo && status.photo !== 'undefined' && status.photo !== '' ? (
                    <div style={{flex:'0 0 320px',width:'320px',height:'320px',display:'flex',alignItems:'center',justifyContent:'center',background:'#f3f4f6',borderRadius:'1.5rem',overflow:'hidden'}}>
                      <img
                        src={`http://localhost:5000/uploads/${status.photo}`}
                        alt="Donor Photo"
                        style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',borderRadius:'2rem',boxShadow:'none',border:'4px solid #e0e7ef'}}
                        onError={e => { e.target.onerror=null; e.target.src='https://ui-avatars.com/api/?name=Donor&background=f3f4f6&color=222&size=120'; }}
                      />
                    </div>
                ) : (
                  <div style={{width:'120px',height:'120px',borderRadius:'50%',background:'#eaf6fb',color:'#2563eb',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.7rem',fontWeight:'bold',border:'2px solid #e0e7ef'}}>
                    {status.name ? status.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) : 'DO'}
                  </div>
                )}
              </div>
              <div className="living-donor-info" style={{flex:1, display:'flex', flexDirection:'column', gap:'0.4rem', justifyContent:'center'}}>
                <div style={{fontWeight:'bold',fontSize:'1.05rem',marginBottom:'0.1rem',color:'#222'}}>Donor Status</div>
                <div style={{fontSize:'0.97rem'}}><b>Name:</b> {status.name}</div>
                <div style={{fontSize:'0.97rem'}}><b>Email:</b> {status.email}</div>
                <div style={{fontSize:'0.97rem'}}><b>Phone:</b> {status.phone}</div>
                <div style={{fontSize:'0.97rem'}}><b>Age:</b> {status.age ? status.age : <span style={{color:'#f87171'}}>Not provided</span>} &nbsp; <b>City:</b> {status.city || status.location || <span style={{color:'#f87171'}}>Not provided</span>}</div>
                <div style={{fontSize:'0.97rem'}}><b>Blood Type:</b> <span className="blood-type" style={{background:'#1e293b',color:'#fff',borderRadius:'0.5rem',padding:'0.1rem 0.6rem',fontWeight:'bold',fontSize:'0.97rem',marginLeft:'0.5rem'}}>{status.bloodGroup}</span></div>
                {status.isRegistered ? (
                  <>
                    <div style={{fontSize:'0.97rem'}}><b>Organs Registered:</b> {
                      Array.isArray(status.organs)
                        ? status.organs.map(org => <span key={org} className="organ-tag" style={{background:'#fde68a',color:'#b45309',borderRadius:'0.5rem',padding:'0.15rem 0.7rem',marginRight:'0.3rem',fontWeight:'bold',fontSize:'0.97rem'}}>{org}</span>)
                        : status.organs
                    }</div>
                    <div style={{fontSize:'0.97rem'}}><b>Donation Type:</b> {status.donationType === 'before_death' ? 'Before Death (Living Donation)' : status.donationType === 'after_death' ? 'After Death (Cadaveric Donation)' : status.donationType || 'N/A'}</div>
                    {status.medicalCertificate && status.medicalCertificate !== 'undefined' && status.medicalCertificate !== '' ? (
                      <div style={{marginTop:'0.1rem',fontSize:'0.97rem'}}>
                        <b>Medical Certificate:</b> <a href={`http://localhost:5000/uploads/${status.medicalCertificate}`} target="_blank" rel="noopener noreferrer" style={{color:'#2563eb',textDecoration:'underline'}}>View/Download</a>
                      </div>
                    ) : (
                      <div style={{marginTop:'0.1rem',color:'#f87171',fontSize:'0.97rem'}}><b>Medical Certificate:</b> Not uploaded</div>
                    )}
                    {status.photo && status.photo !== 'undefined' && status.photo !== '' ? (
                      <div style={{marginTop:'0.1rem',fontSize:'0.97rem'}}>
                      </div>
                    ) : null}
                    <div style={{marginTop:'1rem'}}>
                      <button style={{background:'linear-gradient(90deg, #22c55e 60%, #60a5fa 100%)',color:'#fff',border:'none',borderRadius:'0.7rem',padding:'0.5rem 1.2rem',fontWeight:'bold',cursor:'default',fontSize:'1.08rem',boxShadow:'0 1px 4px #e0e7ef'}}>Registered</button>
                    </div>
                  </>
                ) : (
                  <div style={{marginTop:'1rem', color:'#2563eb'}}>
                    You have not registered for organ donation yet.<br />
                    <span style={{color:'#22c55e'}}>Save lives by registering as a donor!</span>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DonorStatus;
