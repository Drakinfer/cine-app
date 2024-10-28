// src/App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('renders the Home page on default route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Bienvenue sur CineApp/i)).toBeInTheDocument();
  });

  it('renders the Register page on /register route', () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Inscription/i)).toBeInTheDocument();
  });

  it('renders the Login page on /login route', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Connexion/i)).toBeInTheDocument();
  });

  it('redirects to login if accessing Profile page when not logged in', () => {
    // Ensure localStorage does not have a logged-in user
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    render(
      <MemoryRouter initialEntries={['/profile']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Connexion/i)).toBeInTheDocument();

    jest.restoreAllMocks();
  });

  it('redirects to login if accessing Movies page when not logged in', () => {
    // Ensure localStorage does not have a logged-in user
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    render(
      <MemoryRouter initialEntries={['/movies']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Connexion/i)).toBeInTheDocument();

    jest.restoreAllMocks();
  });

  it('renders Profile page for a logged-in user', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'userLoggedIn') {
        return JSON.stringify({ id: 1, username: 'TestUser', email: 'testuser@example.com' });
      }
      return null;
    });

    render(
      <MemoryRouter initialEntries={['/profile']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Profil de TestUser/i)).toBeInTheDocument();

    jest.restoreAllMocks();
  });

  it('renders Movies page for a logged-in user', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'userLoggedIn') {
        return JSON.stringify({ id: 1, username: 'TestUser' });
      }
      return null;
    });

    render(
      <MemoryRouter initialEntries={['/movies']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Bonjour, TestUser/i)).toBeInTheDocument();

    jest.restoreAllMocks();
  });
});