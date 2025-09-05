
import React, { useState } from 'react';
import axios from 'axios';
import OrganizationSidebar from '../../components/Sidebar/OrganizationSidebar';
import './OrgContact.css';

const OrgContact = () => {
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
      <OrganizationSidebar active="contact" />
      <div className="dashboard-main" style={{width: '100%', maxWidth: 'none', flex: 1, display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start'}}>
        <div className="dashboard-content" style={{width: '100%', maxWidth: 'none', marginLeft:0}}>
          <h2>Contact & Support</h2>
          <div style={{background:'#f3f4f6', borderRadius:'1.2rem', padding:'1.2rem', margin:'1.2rem 0', color:'#ea580c', fontWeight:'500', fontSize:'1.08rem', textAlign:'center', width:'100%'}}>
            For any queries or support, please contact the organization team.<br />
            Email: support@organization.com<br />
            Phone: +91-9876543210
          </div>
          <form onSubmit={handleSubmit} style={{background:'#fff', borderRadius:'1.2rem', padding:'1.2rem', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', maxWidth:'500px', margin:'2rem auto', width:'100%'}}>
            <h3 style={{color:'#ea580c'}}>Send an Email Query</h3>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required style={{width:'100%',margin:'0.5rem 0',padding:'0.7rem',borderRadius:'0.5rem',border:'1px solid #e5e7eb'}} />
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Your Email" required style={{width:'100%',margin:'0.5rem 0',padding:'0.7rem',borderRadius:'0.5rem',border:'1px solid #e5e7eb'}} />
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Query" required rows={4} style={{width:'100%',margin:'0.5rem 0',padding:'0.7rem',borderRadius:'0.5rem',border:'1px solid #e5e7eb'}} />
            <button type="submit" style={{background:'#ea580c',color:'#fff',padding:'0.7rem 1.5rem',border:'none',borderRadius:'0.5rem',fontWeight:'600',marginTop:'0.5rem',cursor:'pointer'}}>Send Query</button>
            {status && <div style={{marginTop:'1rem',color:'#ea580c'}}>{status}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrgContact;
