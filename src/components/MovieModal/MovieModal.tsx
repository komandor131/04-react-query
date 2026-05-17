import { useEffect, type MouseEventHandler } from 'react'
import { createPortal } from 'react-dom'
import type { Movie } from '../../types/movie'
import css from './MovieModal.module.css'

const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original'

interface MovieModalProps {
  movie: Movie
  onClose: () => void
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow

    const handleEscapeKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [onClose])

  const handleBackdropClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const handleCloseButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    onClose()
  }

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          type="button"
          aria-label="Close modal"
          onClick={handleCloseButtonClick}
        >
          &times;
        </button>
        <img
          src={`${BACKDROP_BASE_URL}${movie.backdrop_path}`}
          alt={movie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.body,
  )
}
