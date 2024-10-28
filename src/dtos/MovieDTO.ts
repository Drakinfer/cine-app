export interface MovieDTO {
  id: number;
  title: string;
  original_language?: string;
  overview: string;
  genre_ids: number[];
  release_date: string;
  vote_average: number;
  poster_path: string;
  trailers: string[];
  genres: string[]
}