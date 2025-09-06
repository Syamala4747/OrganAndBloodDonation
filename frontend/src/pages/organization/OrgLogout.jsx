import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrganizationSidebar from '../../components/Sidebar/OrganizationSidebar';

const OrgLogout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Clear any organization session or token here if needed
    navigate('/signup');
  }, [navigate]);

  return (
    <div>
      <OrganizationSidebar active="logout" />
      <div style={{textAlign:'center',marginTop:'4rem',fontSize:'1.3rem',color:'#2563eb'}}>Logging out...</div>
    </div>
  );
};

export default OrgLogout;
