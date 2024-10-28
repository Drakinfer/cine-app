import React, { useState } from 'react';
import { MovieDTO } from '../dtos/MovieDTO';
import Button from './Button'
import '../styles/Carousel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface CarouselProps {
  movies: MovieDTO[];
  onMovieClick?: (movie: MovieDTO) => void;
  onRemoveFavorite?: (movieId: number) => void; // Only for Profile
}

const Carousel: React.FC<CarouselProps> = ({ movies, onMovieClick, onRemoveFavorite }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const moviesPerView = window.innerWidth < 1024 ? 1 : 5;

  const goToPrevPage = () => {
    setCurrentIndex((prev) => Math.max(prev - moviesPerView, 0));
  };

  const goToNextPage = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + moviesPerView, movies.length - moviesPerView)
    );
  };

  return (
    <div className="carousel-container">
      <Button 
            label={<FontAwesomeIcon icon={faChevronLeft} />} 
            onClick={goToPrevPage} 
            disabled={currentIndex === 0} 
            styleClass="carousel-control"
            />
      <div className="carousel-slides" style={{ display: "flex", overflow: "hidden" }}>
        {movies.slice(currentIndex, currentIndex + moviesPerView).map((movie) => (
          <div key={movie.id} className="movie-item">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <h4>{movie.title}</h4>
            {onRemoveFavorite && (
                        <Button label="Supprimer Favori" onClick={() => onRemoveFavorite(movie.id)} styleClass="remove-favorite-btn" />
                    )}
          </div>
        ))}
      </div>
      <Button 
                label={<FontAwesomeIcon icon={faChevronRight} />} 
                onClick={goToNextPage} 
                disabled={currentIndex + moviesPerView >= movies.length}
                styleClass="carousel-control"
            /> 
    </div>
  );
};

export default Carousel;