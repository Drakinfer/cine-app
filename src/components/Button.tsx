import React, { ReactNode } from 'react';
import '../styles/NavBar.css';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
  label: ReactNode;
  onClick?: () => void;
  navigateTo?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  styleClass?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, navigateTo, type = 'button', styleClass = '' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (navigateTo) {
      navigate(navigateTo);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button className={`custom-button ${styleClass}`} type={type} onClick={handleClick}>
      {label}
    </button>
  );
};

export default Button;