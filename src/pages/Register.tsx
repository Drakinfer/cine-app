import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Register.css';
import Button from '../components/Button'

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username || !email || !password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    const existingUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    const userExists = existingUsers.some(
      (user) => user.username === username || user.email === email
    );

    if (userExists) {
      alert('L\'email ou le nom d\'utilisateur est déjà utilisé. Veuillez en choisir un autre.');
      return;
    }

    const id = Date.now().toString();

    const newUser: User = {
      id,
      username,
      email,
      password,
    };

    existingUsers.push(newUser);

    localStorage.setItem('users', JSON.stringify(existingUsers));

    setUsername('');
    setEmail('');
    setPassword('');

    alert('Inscription réussie!');
    navigate('/');
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h1>Inscription</h1>
        <form onSubmit={handleRegister}>
          <label>Nom d'utilisateur:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Entrez votre nom d'utilisateur"
          />
          </label>
          

          <label>Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entrez votre email"
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
          

          <Button label="S'inscrire" onClick={handleRegister} styleClass="nav-button register-button" type="submit" />

        </form>
        <p>Déjà un compte? <Link to="/login" className="register-link">Se Connecter</Link></p>
      </div>
    </div>
  );
};

export default Register;