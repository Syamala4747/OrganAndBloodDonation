import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalLogout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem('token');
    navigate('/signup');
  }, [navigate]);
  return null;
};

export default HospitalLogout;
