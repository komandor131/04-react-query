import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import ReactPaginateComponent from 'react-paginate'
import { Toaster, toast } from 'react-hot-toast'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Loader from '../Loader/Loader'
import MovieGrid from '../MovieGrid/MovieGrid'
import MovieModal from '../MovieModal/MovieModal'
import SearchBar from '../SearchBar/SearchBar'
import fetchMovies from '../../services/movieService'
import type { Movie } from '../../types/movie'
import css from './App.module.css'

interface PageChangeEvent {
  selected: number
}

const ReactPaginate =
  (
    ReactPaginateComponent as unknown as {
      default?: typeof ReactPaginateComponent
    }
  ).default ?? ReactPaginateComponent

export default function App() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== '',
  })

  const movies = data?.results ?? []
  const totalPages = data?.total_pages ?? 0

  useEffect(() => {
    if (isSuccess && query !== '' && movies.length === 0) {
      toast.error('No movies found for your request.')
    }
  }, [isSuccess, movies.length, query])

  const handleSearch = (newQuery: string): void => {
    setQuery(newQuery)
    setPage(1)
    setSelectedMovie(null)
  }

  const handleSelectMovie = (movie: Movie): void => {
    setSelectedMovie(movie)
  }

  const handleCloseModal = (): void => {
    setSelectedMovie(null)
  }

  const handlePageChange = ({ selected }: PageChangeEvent): void => {
    setPage(selected + 1)
    setSelectedMovie(null)
  }

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && !isLoading && <ErrorMessage />}
      {!isLoading && !isError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      {!isLoading && !isError && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
      <Toaster position="top-right" />
    </div>
  )
}
