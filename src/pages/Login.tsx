import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';
import Button from '../components/Button'


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();


  // Check localStorage to see if informations given match
  const handleLogin = () => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    const user = existingUsers.find((u: { email: string; password: string }) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('userLoggedIn', JSON.stringify(user));

      navigate('/movies');
    } else {
      window.alert('Email ou mot de passe incorrect.');
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h1>Connexion</h1>
        <form onSubmit={handleLogin}>
          <label>Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre email"
              aria-labelledby=""
            />
          </label>
          <label>Mot de passe:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
            />
          </label>
          <Button label="Se connecter" onClick={handleLogin} styleClass="nav-button login-button" type="submit" />

        </form>
        <p>Pas de compte? <Link to="/register" className="register-link">S'inscrire</Link></p>
      </div>
    </div>
  );
};

export default Login;