import React, { useState, useEffect } from 'react';
import HospitalSidebar from '../../components/Sidebar/HospitalSidebar';

export default function HospitalProfile() {
  const [hospital, setHospital] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', licenseId: '', address: '', contact: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/hospital/profile', {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (res.ok) {
          const data = await res.json();
          setHospital(data);
          setForm({
            name: data.name || '',
            licenseId: data.licenseId || '',
            address: data.address || '',
            contact: data.contact || ''
          });
        }
      } catch (err) {}
    }
    fetchProfile();
  }, []);

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => setEditMode(false);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/hospital/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        const data = await res.json();
        setHospital(data);
        setEditMode(false);
      }
    } catch (err) {}
    setLoading(false);
  };

  return (
    <div className="dashboard-container">
      <div style={{position:'fixed', left:0, top:0, height:'100vh', width:'260px', zIndex:10}}>
        <HospitalSidebar active="profile" />
      </div>
      <div className="dashboard-main" style={{marginLeft:'260px', width: 'calc(100vw - 260px)'}}>
        <nav className="dashboard-navbar">
          <input className="dashboard-search" placeholder="Search donors..." />
          <div className="dashboard-actions">
            <span className="dashboard-bell">🔔</span>
            <div className="dashboard-profile hospital">🏥</div>
          </div>
        </nav>
        <div className="dashboard-content" style={{background:'#f7faff', borderRadius:'1.2rem', boxShadow:'0 4px 24px #e0e7ef', padding:'2.5rem', margin:'2rem 0', maxWidth:'540px', width:'100%', display:'flex', flexDirection:'column', alignItems:'center', fontFamily:'Inter, sans-serif'}}>
          <h2 style={{color:'#2563eb', fontWeight:'bold', fontSize:'2rem', marginBottom:'1.5rem', textAlign:'left', width:'100%'}}>Hospital Profile</h2>
          <div className="profile-card" style={{background:'#fff', border:'1px solid #e0e7ef', borderRadius:'1rem', padding:'2.2rem', boxShadow:'0 2px 8px #e0e7ef', width:'100%', display:'flex', flexDirection:'column', alignItems:'flex-start', margin:'0 auto'}}>
            {!editMode ? (
              <div className="profile-details" style={{width:'100%', display:'flex', flexDirection:'column', gap:'1.2rem'}}>
                <div style={{display:'flex',alignItems:'center',fontSize:'1.13rem',color:'#222'}}>
                  <span style={{marginRight:'0.7rem',color:'#2563eb',fontSize:'1.3rem'}}>🏥</span>
                  <span style={{fontWeight:'bold',marginRight:'0.5rem'}}>Name:</span>
                  <span>{hospital?.name || <span style={{color:'#f87171'}}>Not provided</span>}</span>
                </div>
                <div style={{display:'flex',alignItems:'center',fontSize:'1.13rem',color:'#222'}}>
                  <span style={{marginRight:'0.7rem',color:'#2563eb',fontSize:'1.3rem'}}>🆔</span>
                  <span style={{fontWeight:'bold',marginRight:'0.5rem'}}>License ID:</span>
                  <span>{hospital?.licenseId || <span style={{color:'#f87171'}}>Not provided</span>}</span>
                </div>
                <div style={{display:'flex',alignItems:'center',fontSize:'1.13rem',color:'#222'}}>
                  <span style={{marginRight:'0.7rem',color:'#2563eb',fontSize:'1.3rem'}}>📍</span>
                  <span style={{fontWeight:'bold',marginRight:'0.5rem'}}>Address:</span>
                  <span>{hospital?.address || <span style={{color:'#f87171'}}>Not provided</span>}</span>
                </div>
                <div style={{display:'flex',alignItems:'center',fontSize:'1.13rem',color:'#222'}}>
                  <span style={{marginRight:'0.7rem',color:'#2563eb',fontSize:'1.3rem'}}>📞</span>
                  <span style={{fontWeight:'bold',marginRight:'0.5rem'}}>Contact:</span>
                  <span>{hospital?.contact || <span style={{color:'#f87171'}}>Not provided</span>}</span>
                </div>
                <button className="edit-btn" onClick={handleEdit} style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:'0.5rem',padding:'0.3rem 1.2rem',fontWeight:'bold',marginTop:'1.2rem',cursor:'pointer',fontSize:'1rem',alignSelf:'flex-end',boxShadow:'0 1px 4px #e0e7ef',transition:'background 0.2s'}}>Edit</button>
              </div>
            ) : (
              <form onSubmit={handleSave} style={{width:'100%', display:'flex', flexDirection:'column', gap:'1.1rem'}}>
                <div style={{display:'flex',alignItems:'center'}}>
                  <span style={{marginRight:'0.7rem',color:'#2563eb',fontSize:'1.3rem'}}>🏥</span>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Hospital Name" style={{flex:1,padding:'0.5rem',borderRadius:'0.4rem',border:'1px solid #e0e7ef',fontSize:'1.08rem'}} required />
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                  <span style={{marginRight:'0.7rem',color:'#2563eb',fontSize:'1.3rem'}}>🆔</span>
                  <input type="text" name="licenseId" value={form.licenseId} onChange={handleChange} placeholder="License ID" style={{flex:1,padding:'0.5rem',borderRadius:'0.4rem',border:'1px solid #e0e7ef',fontSize:'1.08rem'}} required />
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                  <span style={{marginRight:'0.7rem',color:'#2563eb',fontSize:'1.3rem'}}>📍</span>
                  <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Address" style={{flex:1,padding:'0.5rem',borderRadius:'0.4rem',border:'1px solid #e0e7ef',fontSize:'1.08rem'}} required />
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                  <span style={{marginRight:'0.7rem',color:'#2563eb',fontSize:'1.3rem'}}>📞</span>
                  <input type="text" name="contact" value={form.contact} onChange={handleChange} placeholder="Contact" style={{flex:1,padding:'0.5rem',borderRadius:'0.4rem',border:'1px solid #e0e7ef',fontSize:'1.08rem'}} required />
                </div>
                <div style={{display:'flex',gap:'0.8rem',marginTop:'1.2rem',justifyContent:'flex-end'}}>
                  <button type="button" onClick={handleCancel} style={{background:'#e0e7ef',color:'#2563eb',border:'none',borderRadius:'0.5rem',padding:'0.3rem 1.2rem',fontWeight:'bold',cursor:'pointer',fontSize:'1rem'}}>Cancel</button>
                  <button type="submit" disabled={loading} style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:'0.5rem',padding:'0.3rem 1.2rem',fontWeight:'bold',cursor:'pointer',fontSize:'1rem',boxShadow:'0 1px 4px #e0e7ef',transition:'background 0.2s'}}>{loading ? "Saving..." : "Save"}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
