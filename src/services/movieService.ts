import axios from 'axios'
import type { Movie } from '../types/movie'

const SEARCH_MOVIE_URL = 'https://api.themoviedb.org/3/search/movie'

interface MoviesResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export default async function fetchMovies(
  query: string,
  page: number,
): Promise<MoviesResponse> {
  const token = import.meta.env.VITE_TMDB_TOKEN as string

  const response = await axios.get<MoviesResponse>(SEARCH_MOVIE_URL, {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
