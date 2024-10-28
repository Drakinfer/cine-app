import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../pages/Login';
import { MemoryRouter } from 'react-router-dom';

describe('Login Page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form with email and password fields', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de Passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Se connecter/i })).toBeInTheDocument();
  });

  it('shows error when fields are empty and form is submitted', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.submit(screen.getByRole('button', { name: /Se connecter/i }));
    expect(window.alert).toHaveBeenCalledWith('Email ou mot de passe incorrect.');
});

  it('saves user info to localStorage on successful login', async () =>  {
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
        if (key === 'users') {
          return JSON.stringify([{ email: 'test@example.com', password: 'password' }]);
        }
        return null;
      });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), { target: { value: 'password' } });
    fireEvent.submit(screen.getByRole('button', { name: /Se connecter/i }));

    await waitFor(() => {
        expect(localStorage.setItem).toHaveBeenCalledWith('userLoggedIn', expect.any(String));
    });
  });
});