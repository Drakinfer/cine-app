import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '../../components/NavBar';
import { MemoryRouter } from 'react-router-dom';

describe('NavBar Component', () => {
  it('displays Login and Register when not logged in', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    expect(screen.getByText(/Accueil/i)).toBeInTheDocument();
  });

  it('displays Accueil, Films, Profile and Logout when logged in', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('true');
    
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByText(/Accueil/i)).toBeInTheDocument();
    expect(screen.getByText(/Films/i)).toBeInTheDocument();
    expect(screen.getByText(/Profil/i)).toBeInTheDocument();
    expect(screen.getByText(/Déconnexion/i)).toBeInTheDocument();
    jest.restoreAllMocks();
  });
});