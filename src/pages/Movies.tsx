import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPopularMovies, fetchMovieVideos, fetchGenres, fetchLanguages } from '../services/tmdbService';
import { MovieDTO } from '../dtos/MovieDTO';
import { GenreDTO } from '../dtos/GenreDTO';
import LanguageMapping from '../dtos/LanguageMapping'
import MovieDetailsModal from '../components/MovieModal';
import Carousel from '../components/Carousel';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/Movies.css';

interface Language {
  iso_639_1: string;
  english_name: string;
}

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<MovieDTO[]>([]);
  const [genres, setGenres] = useState<GenreDTO[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMovie, setSelectedMovie] = useState<MovieDTO | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [year, setYear] = useState<Date | null>(null);
  const [filters, setFilters] = useState({
    year: '',
    genre: '',
    language: '',
  });
  const navigate = useNavigate();

  // get filters saved in LocaleStorage
  useEffect(() => {
    const savedFilters = localStorage.getItem('movieFilters');
    if (savedFilters) {
      const parsedFilters = JSON.parse(savedFilters);
      setFilters(parsedFilters);

      if (parsedFilters.year) {
        setYear(new Date(`${parsedFilters.year}-01-01`));
      }
    }
  }, []); 

  // get movies from API at loading and when filters change
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('userLoggedIn');

    if (userLoggedIn) {
      const user = JSON.parse(userLoggedIn);
      setUsername(user.username);

      const fetchMoviesAndGenres = async () => {
        setLoading(true);
        const [popularMovies, movieGenres] = await Promise.all([
          fetchPopularMovies(filters),
          fetchGenres(),
        ]);
        setMovies(popularMovies);
        setGenres(movieGenres);

        if (filters.language === ""){
          const movieLanguages = Array.from(
            new Set(popularMovies.map((movie: MovieDTO) => movie.original_language))
          );
      
          const fetchedLanguages = await fetchLanguages();
      
          const filteredLanguages = fetchedLanguages.filter((lang: Language) =>
            movieLanguages.includes(lang.iso_639_1)
          );
      
          setLanguages(filteredLanguages); 
        }
        setLoading(false);

        const userFavorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
        setFavorites(userFavorites);
      };

      fetchMoviesAndGenres();
    } else {
      navigate('/login');
    }
  }, [filters, navigate]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(updatedFilters);
    localStorage.setItem('movieFilters', JSON.stringify(updatedFilters));
  };

  const handleYearChange = (date: Date | null) => {
    setYear(date);
    setFilters((prevFilters) => ({
      ...prevFilters,
      year: date ? date.getFullYear().toString() : ''
    }));
  };

  const getGenreNames = (genreIds: number[]): string[] => {
    return genreIds.map((id) => {
      const genre = genres.find((g) => g.id === id);
      return genre ? genre.name : 'Inconnu';
    });
  };

  // Open the modal for with selected movie information
  const openMovieDetails = async (movie: MovieDTO) => {
    const trailers = await fetchMovieVideos(movie.id);
    const youtubeTrailers = trailers
      .filter((trailer: any) => trailer.site === 'YouTube' && trailer.type === 'Trailer')
      .map((trailer: any) => trailer.key);

    const movieWithGenres = {
      ...movie,
      genres: getGenreNames(movie.genre_ids) || [],
      trailers: youtubeTrailers || [],
    };

    setSelectedMovie(movieWithGenres);
  };
  
    const closeMovieDetails = () => {
      setSelectedMovie(null);
    };

    // add movie id to LocalStorage users favorites
    const addToFavorites = (movieId: number) => {
      const updatedFavorites = [...favorites, movieId];
      setFavorites(updatedFavorites);
      localStorage.setItem('userFavorites', JSON.stringify(updatedFavorites));
    };

    const isFavorite = (movieId: number) => {
      return favorites.includes(movieId);
    };

    return (
      <div className="movies-container">
        <h1>Bonjour, {username}!</h1>
  
        <div className="filters">
  <label>
    Année de sortie:
    <DatePicker
      selected={year}
      onChange={handleYearChange}
      showYearPicker
      dateFormat="yyyy"
      placeholderText="Sélectionnez une année"
    />
  </label>

  <label>
    Genre:
    <select name="genre" value={filters.genre} onChange={handleFilterChange}>
      <option value="">Tous les genres</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  </label>

  <label>
    Langue:
    <select name="language" value={filters.language} onChange={handleFilterChange}>
      <option value="">Toutes les langues</option>
      {languages.map((lang) => (
        <option key={lang.iso_639_1} value={lang.iso_639_1}>
          {LanguageMapping[lang.iso_639_1] || lang.english_name || "Langue inconnue"}
        </option>
      ))}
    </select>
  </label>
</div>
  
{!loading && (
  <Carousel movies={movies} onMovieClick={openMovieDetails} />
)}

{selectedMovie && (
  <MovieDetailsModal movie={selectedMovie} onClose={closeMovieDetails} onAddToFavorites={addToFavorites} isFavorite={isFavorite(selectedMovie.id)} />
)}
</div>
);
};

export default Movies;