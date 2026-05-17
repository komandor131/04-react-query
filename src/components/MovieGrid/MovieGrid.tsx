import type { KeyboardEvent, MouseEventHandler } from 'react'
import type { Movie } from '../../types/movie'
import css from './MovieGrid.module.css'

const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500'

interface MovieGridProps {
  movies: Movie[]
  onSelect: (movie: Movie) => void
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  const handleCardClick =
    (movie: Movie): MouseEventHandler<HTMLDivElement> =>
    () => {
      onSelect(movie)
    }

  const handleCardKeyDown =
    (movie: Movie) =>
    (event: KeyboardEvent<HTMLDivElement>): void => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onSelect(movie)
      }
    }

  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <div
            className={css.card}
            role="button"
            tabIndex={0}
            onClick={handleCardClick(movie)}
            onKeyDown={handleCardKeyDown(movie)}
          >
            <img
              className={css.image}
              src={`${POSTER_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  )
}
