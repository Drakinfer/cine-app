import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../../pages/Register';
import { MemoryRouter } from 'react-router-dom';

describe('Register Page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders registration form with username, email, and password fields', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/Nom d'utilisateur:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de Passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /S'inscrire/i })).toBeInTheDocument();
  });

  it('shows error if fields are empty and form is submitted', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.submit(screen.getByRole('button', { name: /S'inscrire/i }));
    expect(window.alert).toHaveBeenCalledWith('Veuillez remplir tous les champs.');
  });

  it('saves user info to localStorage on successful registration', () => {
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
        if (key === 'users') {
          return JSON.stringify([{ email: 'test@example.com', password: 'password' }]);
        }
        return null;
      });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nom d'utilisateur:/i), { target: { value: 'TestUser' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getByLabelText(/Mot de Passe/i), { target: { value: 'password' } });
    fireEvent.submit(screen.getByRole('button', { name: /S'inscrire/i }));

    expect(localStorage.setItem).toHaveBeenCalledWith('users', expect.any(String));
  });

  it('shows error if username or email already exists', () => {
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'users') {
        return JSON.stringify([{ username: 'TestUser', email: 'testuser@example.com' }]);
      }
      return null;
    });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nom d'utilisateur:/i), { target: { value: 'TestUser' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getByLabelText(/Mot de Passe/i), { target: { value: 'password' } });
    fireEvent.submit(screen.getByRole('button', { name: /S'inscrire/i }));

    expect(window.alert).toHaveBeenCalledWith('L\'email ou le nom d\'utilisateur est déjà utilisé. Veuillez en choisir un autre.');
    jest.restoreAllMocks();
  });
});
