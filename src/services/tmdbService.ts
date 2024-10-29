import axios from 'axios';

const API_KEY = '05f4fa4cf58c358bae85ab416f9924e0';
const BASE_URL = 'https://api.themoviedb.org/3';

// get the 20 popular Movies regarding the filters given 
export const fetchPopularMovies = async (filters: any = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        language: 'fr-FR',
        sort_by: 'popularity.desc',
        'primary_release_date.gte': filters.year ? `${filters.year}-01-01` : undefined,
        'primary_release_date.lte': filters.year ? `${filters.year}-12-31` : undefined,
        with_genres: filters.genre || undefined,
        with_original_language: filters.language || undefined,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Erreur lors de la récupération des films populaires:', error);
    return [];
  }
};

// get the detail of a movie
export const fetchMovieDetails = async (movieId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: 'fr-FR',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du film ID ${movieId}:`, error);
    return null;
  }
};

// get the trailer of a movie
export const fetchMovieVideos = async (movieId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
      params: {
        api_key: API_KEY,
        language: 'fr-FR',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(`Erreur lors de la récupération des vidéos pour le film ID ${movieId}:`, error);
    return [];
  }
};

// get movies genres list
export const fetchGenres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
        language: 'fr-FR',
      },
    });
    return response.data.genres;
  } catch (error) {
    console.error('Erreur lors de la récupération des genres:', error);
    return [];
  }
};

// get languages list of the API
export const fetchLanguages = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/configuration/languages`, {
      params: {
        api_key: API_KEY,
        language: 'fr-FR',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des langues:', error);
    return [];
  }
};