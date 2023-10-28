import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { searchMovieByKeyword } from 'api';
import MoviesListItems from 'components/MoviesListItems/MoviesListItems';
import SearchForm from 'components/SearchForm/SearchForm';
import css from './Movies.module.css';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getQueryFromUrl = searchParams.get('query') ?? '';

  const handleSubmit = value => {
    const nextParams = value !== '' ? { query: value } : {};
    setSearchParams(nextParams);
  };

  useEffect(() => {
    if (getQueryFromUrl === '') {
      return;
    }
    async function searchMovie() {
      setMovies([]);
      setLoading(true);
      setError(false);
      try {
        const response = await searchMovieByKeyword(getQueryFromUrl);
        if (response.results.length === 0) {
          return toast.error('Sorry, there are no movies. Try again');
        }
        setMovies(response.results);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    searchMovie();
  }, [getQueryFromUrl]);

  return (
    <>
      <SearchForm onSubmit={handleSubmit} />
      {loading && (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      )}
      <ul className={css.list}>
        {movies.length !== 0 && <MoviesListItems movies={movies} />}
      </ul>
      {error && <span>Something went wrong!</span>}
      <Toaster position="top-right" />
    </>
  );
};

export default Movies;
