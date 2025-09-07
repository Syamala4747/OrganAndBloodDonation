
import React, { useState } from 'react';
import axios from 'axios';
import HospitalSidebar from '../../components/Sidebar/HospitalSidebar';
import './HospitalSupport.css';

const HospitalSupport = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      await axios.post('/api/support/email', { ...form, to: 'syamala7072@gmail.com' });
      setStatus('Your query has been sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('Failed to send. Please try again later.');
    }
  };

  return (
  <div className="dashboard-container" style={{width:'100vw', minHeight:'100vh', display:'flex'}}>
  <HospitalSidebar active="support" />
  <div className="main-content dashboard-main" style={{width: '100%', maxWidth: 'none', flex: 1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'100vh'}}>
        <div className="dashboard-content" style={{background:'#fff', borderRadius:'1.2rem', boxShadow:'0 2px 12px #e0e7ef', padding:'2.5rem', margin:'2rem 0', maxWidth:'600px', width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
          <h2 style={{color:'#2563eb', fontWeight:'bold', fontSize:'1.5rem', marginBottom:'1rem'}}>Contact & Support</h2>
          <div style={{background:'#eaf6fb', borderRadius:'0.7rem', padding:'0.7rem', margin:'0.7rem 0', color:'#2563eb', fontWeight:'500', fontSize:'1.08rem', textAlign:'center', width:'100%'}}>
            For any queries or support, please contact the hospital team.<br />
            Email: lifeshare4747@gmail.com<br />
            Phone: +91-7207476697
          </div>
          <form onSubmit={handleSubmit} style={{background:'#fff', borderRadius:'0.7rem', padding:'0.7rem', boxShadow:'0 1px 4px rgba(0,0,0,0.04)', maxWidth:'400px', margin:'1.2rem auto', width:'100%'}}>
            <h3 style={{color:'#2563eb', fontSize:'1.08rem'}}>Send an Email Query</h3>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required style={{width:'100%',margin:'0.3rem 0',padding:'0.5rem',borderRadius:'0.5rem',border:'1px solid #e5e7eb',fontSize:'0.97rem'}} />
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Your Email" required style={{width:'100%',margin:'0.3rem 0',padding:'0.5rem',borderRadius:'0.5rem',border:'1px solid #e5e7eb',fontSize:'0.97rem'}} />
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Query" required rows={4} style={{width:'100%',margin:'0.3rem 0',padding:'0.5rem',borderRadius:'0.5rem',border:'1px solid #e5e7eb',fontSize:'0.97rem'}} />
            <button type="submit" style={{background:'#2563eb',color:'#fff',padding:'0.15rem 0.6rem',border:'none',borderRadius:'0.5rem',fontWeight:'600',marginTop:'0.3rem',cursor:'pointer',fontSize:'0.97rem'}}>Send Query</button>
            {status && <div style={{marginTop:'0.7rem',color:'#2563eb'}}>{status}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default HospitalSupport;
