import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Outlet } from 'react-router-dom';
import { getTrendingMovie } from 'api';
import MoviesListItems from 'components/MoviesListItems/MoviesListItems';
import css from './Home.module.css';

const Home = () => {
  const [trendMovies, setTrendMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function trendingMovie() {
      setLoading(true);
      setError(false);
      try {
        const response = await getTrendingMovie();
        setTrendMovies(response.results);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    trendingMovie();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
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
        {trendMovies.length !== 0 && <MoviesListItems movies={trendMovies} />}
      </ul>
      {error && <span>Something went wrong!</span>}
      <Outlet />
    </div>
  );
};

export default Home;
