import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Movies from './pages/Movies';
import Profil from './pages/Profil';
import NavBar from './components/NavBar';
import './App.css'


const App: React.FC = () => {
  const Wrapper = process.env.NODE_ENV === 'test' ? React.Fragment : Router;

  return (
    <Wrapper>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/profile" element={<Profil />} />
        </Routes>
      </div>
    </Wrapper>
  );
};

export default App;