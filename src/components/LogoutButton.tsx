import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button'


const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn');

    navigate('/');
    
    window.location.reload();
  };

  return (
    <Button label="Déconnexion" onClick={handleLogout} styleClass="nav-button logout-button" />
  );
};

export default LogoutButton;
