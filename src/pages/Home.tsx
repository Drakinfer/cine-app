import React from 'react';
import Button from '../components/Button'
import '../styles/Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <video autoPlay loop muted className="background-video">
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1>Bienvenue sur CineApp !</h1>
        <div className="buttons">
          <Button label="Connexion" navigateTo="/login" styleClass="nav-button" />
          <Button label="Inscription" navigateTo="/register" styleClass="nav-button" />

        </div>
      </div>
    </div>
  );
};

export default Home;