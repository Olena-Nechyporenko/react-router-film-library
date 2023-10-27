import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
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
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=8861740be6f72a2c7bebec9b75a3bd87&query=${getQueryFromUrl}`
      );
      try {
        if (response.data.results.length === 0) {
          return toast.error('Sorry, there are no movies. Try again');
        }
        setMovies(response.data.results);
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
