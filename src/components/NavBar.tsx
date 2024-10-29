import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from './Button'
import LogoutButton from './LogoutButton';
import '../styles/NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const NavBar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // state to handle burger menu opening on mobile screen
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    setIsLoggedIn(!!userLoggedIn);
  }, [location]);

  return (
    <div className="navbar-container">
      <div className="burger-icon" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="2x" />
      </div>

      <nav className={`nav-links ${isOpen ? 'show' : ''}`} id="nav-links">
        <ul>
          <li><Button label="Accueil" navigateTo="/" styleClass="nav-button" /></li>
          {isLoggedIn && <li><Button label="Films" navigateTo="/movies" styleClass="nav-button" /></li>}
          {isLoggedIn && <li><Button label="Profil" navigateTo="/profile" styleClass="nav-button" /></li>}
          {isLoggedIn && <li><LogoutButton /></li>}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
