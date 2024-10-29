import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieDTO } from '../dtos/MovieDTO';
import { fetchMovieDetails } from '../services/tmdbService';
import Carousel from '../components/Carousel';
import '../styles/Profil.css';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

const Profil: React.FC = () => {
  const [favorites, setFavorites] = useState<MovieDTO[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Load user information and his favorite movie list
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    if (userLoggedIn) {
      const user = JSON.parse(userLoggedIn);
      setUser(user);
      setUpdatedUser(user)

      const favoriteMovieIds = JSON.parse(localStorage.getItem('userFavorites') || '[]');
      const fetchFavoritesDetails = async () => {
        const favoriteMovies: MovieDTO[] = [];
        for (const movieId of favoriteMovieIds) {
          const movieDetails = await fetchMovieDetails(movieId);
          if (movieDetails) {
            favoriteMovies.push({
              id: movieDetails.id,
              title: movieDetails.title,
              overview: movieDetails.overview,
              genre_ids: movieDetails.genre_ids,
              release_date: movieDetails.release_date,
              vote_average: movieDetails.vote_average,
              poster_path: movieDetails.poster_path,
              trailers: movieDetails.trailers || [],
              genres: movieDetails.genres || [],
            });
          }
        }
        setFavorites(favoriteMovies);
      };
      fetchFavoritesDetails();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (updatedUser) {
      setUpdatedUser({
        ...updatedUser,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (updatedUser) {
      setUser(updatedUser);
      localStorage.setItem('userLoggedIn', JSON.stringify(updatedUser));
      alert('Informations mises à jour avec succès !');
      setEditing(false); // Quitter le mode édition après soumission
    }
  };

  const removeFavorite = (movieId: number) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem('userFavorites', JSON.stringify(updatedFavorites.map((movie) => movie.id)));
  };

  return (
    <div>
     <div className="profile-container">
      <h2>Profil de {user ? user.username : 'Anonyme'}</h2>
        {user ? (
          <>
            {editing ? (
              <form onSubmit={handleSubmit}>
                <label>
                  Nom d'utilisateur :
                  <input
                    type="text"
                    name="username"
                    value={updatedUser?.username || ''}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Email :
                  <input
                    type="email"
                    name="email"
                    value={updatedUser?.email || ''}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Mot de passe :
                  <input
                    type="password"
                    name="password"
                    value={updatedUser?.password || ''}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <button type="submit">Sauvegarder</button>
                <button type="button" onClick={() => setEditing(false)}>Annuler</button>
              </form>
            ) : (
              <div>
                <p><strong>Nom d'utilisateur :</strong> {user.username}</p>
                <p><strong>Email :</strong> {user.email}</p>
                <button onClick={() => setEditing(true)}>Modifier les informations</button>
              </div>
            )}
          </>
        ) : (
          <p>Veuillez vous connecter pour voir votre profil.</p>
        )}
      </div>

      
      <div className={`favorites-list ${editing ? "hide" : ""}`}>
        <h3>Vos films favoris :</h3>
        {favorites.length > 0 ?       <Carousel movies={favorites} onRemoveFavorite={removeFavorite} />
 : (
          <p>Aucun film favori trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default Profil;