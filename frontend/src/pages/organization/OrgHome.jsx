import React from 'react';
import OrganizationSidebar from '../../components/Sidebar/OrganizationSidebar';
import './OrgHome.css';

const OrgHome = () => {
  return (
    <div className="dashboard-container">
      <OrganizationSidebar active="home" />
  <div className="dashboard-main" style={{marginLeft:0, paddingLeft:0}}>
  {/* Top navbar removed for cleaner layout */}
        <div className="dashboard-content" style={{minHeight:'100vh', width:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start', background:'#f7faff'}}>
          <h1 style={{color:'#2563eb', fontWeight:'bold', fontSize:'2.2rem', marginTop:'2rem'}}>Welcome to Organization Panel</h1>
          <p style={{fontSize:'1.15rem', color:'#374151', marginBottom:'2rem', maxWidth:'900px', textAlign:'center'}}>
            This project is a comprehensive platform for organ and blood donation management, designed to connect organizations, hospitals, and donors in a secure, transparent, and efficient way.<br/><br/>
            <b>Project Vision:</b> To save lives by making organ and blood donation accessible, trustworthy, and easy to coordinate for all stakeholders.<br/><br/>
            <b>What You Can Do Here:</b>
          </p>
          <ul style={{fontSize:'1.13rem', color:'#2563eb', marginBottom:'2rem', maxWidth:'800px'}}>
            <li>Register and manage after-death donor pledges</li>
            <li>Collaborate with hospitals for donation procedures</li>
            <li>Receive and respond to real-time notifications</li>
            <li>Access secure donor and organization data</li>
            <li>Get support and guidance for your organization’s needs</li>
            <li>Promote awareness and education about organ donation</li>
            <li>Track and report your organization’s activities and impact</li>
          </ul>
          <div style={{background:'#eaf6fb', borderRadius:'1rem', padding:'1.5rem', marginBottom:'2rem', maxWidth:'700px', color:'#2563eb', fontSize:'1.12rem', textAlign:'center', boxShadow:'0 2px 12px #e0e7ef'}}>
            <b>About the Platform:</b><br/>
            - Built with modern web technologies for speed and security<br/>
            - Designed for ease of use by organizations, hospitals, and donors<br/>
            - Privacy and data protection are top priorities<br/>
            - Continuous support and updates for all users<br/>
          </div>
          <div style={{marginTop:'1.2rem', textAlign:'center', maxWidth:'700px'}}>
            <b>Ready to make a difference?</b><br/>
            Start managing your organization’s donors, collaborate with hospitals, and help save lives.<br/>
            For help or questions, visit the support section or contact our team.
          </div>
        </div>
      </div>
    </div>
      );
};

export default OrgHome;
