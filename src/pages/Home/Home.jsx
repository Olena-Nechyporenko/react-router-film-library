import axios from 'axios';
import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Link, Outlet } from 'react-router-dom';
import css from './Home.module.css';

const Home = () => {
  const [trendMovies, setTrendMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function trendingMovie() {
      setLoading(true);
      setError(false);
      const response = await axios.get(
        'https://api.themoviedb.org/3/trending/movie/day?api_key=8861740be6f72a2c7bebec9b75a3bd87'
      );
      try {
        setTrendMovies(response.data.results);
      } catch (err) {
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
        {trendMovies.map(movie => {
          return (
            <li key={movie.id}>
              <Link to={`${movie.id}`} className={css.link}>
                {movie.title}
              </Link>
            </li>
          );
        })}
      </ul>
      {error && <span>Something went wrong!</span>}
      <Outlet />
    </div>
  );
};

export default Home;
