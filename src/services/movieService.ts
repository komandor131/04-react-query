import axios from 'axios'
import type { MoviesResponse } from '../types/movie'

const SEARCH_MOVIE_URL = 'https://api.themoviedb.org/3/search/movie'

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
