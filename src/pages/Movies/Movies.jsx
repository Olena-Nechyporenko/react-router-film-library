import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Field, Formik, Form } from 'formik';
import css from './Movies.module.css';
import MoviesListItems from 'components/MoviesListItems/MoviesListItems';
const Movies = () => {
  const initialValue = { keyword: '' };
  const [keyword, setKeyword] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (values, { resetForm }) => {
    setKeyword(values.keyword.trim());
    resetForm();
  };

  useEffect(() => {
    if (keyword === '') {
      return;
    }
    async function searchMovie() {
      setMovies([]);
      setLoading(true);
      setError(false);
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=8861740be6f72a2c7bebec9b75a3bd87&query=${keyword}`
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
  }, [keyword]);

  return (
    <>
      <Formik initialValues={initialValue} onSubmit={handleSubmit}>
        <Form className={css.form} autoComplete="off">
          <label className={css.label} htmlFor="keyword">
            <Field
              className={css.input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search movies"
              name="keyword"
            />
          </label>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>
        </Form>
      </Formik>
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
