import React from 'react';
import '../styles/MovieModal.css';

interface MovieDetailsModalProps {
  movie: {
    id: number;
    title: string;
    overview: string;
    genres?: string[];
    release_date: string;
    vote_average: number;
    trailers: string[];
  };
  onClose: () => void;
  onAddToFavorites: (movieId: number) => void;
  isFavorite: boolean;
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ movie, onClose, onAddToFavorites, isFavorite }) => {
  const randomTrailer = movie.trailers.length > 0 ? movie.trailers[Math.floor(Math.random() * movie.trailers.length)] : null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p><strong>Genres :</strong> {movie.genres?.join(', ') || 'Aucun genre disponible'}</p>
        <p><strong>Date de sortie :</strong> {movie.release_date}</p>
        <p><strong>Note :</strong> {movie.vote_average}/10</p>
        {randomTrailer && (
          <div className="movie-trailer">
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${randomTrailer}`}
              title="Bande-annonce"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
        {!isFavorite && <button onClick={() => onAddToFavorites(movie.id)}>Ajouter aux favoris</button>}

      </div>
    </div>
  );
};

export default MovieDetailsModal;