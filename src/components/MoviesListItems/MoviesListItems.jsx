import { Link, useLocation } from 'react-router-dom';
import css from './MoviesListItems.module.css';
const MoviesListItems = ({ movies }) => {
  const location = useLocation();
  return (
    <>
      {movies.map(movie => (
        <li key={movie.id}>
          <Link
            to={`/${movie.id}`}
            state={{ from: location }}
            className={css.link}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </>
  );
};

export default MoviesListItems;
