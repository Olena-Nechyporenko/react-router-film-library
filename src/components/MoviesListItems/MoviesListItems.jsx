import { Link } from 'react-router-dom';
import css from './MoviesListItems.module.css';
const MoviesListItems = ({ movies }) => {
  return (
    <>
      {movies.map(movie => (
        <li key={movie.id}>
          <Link to={`/${movie.id}`} className={css.link}>
            {movie.title}
          </Link>
        </li>
      ))}
    </>
  );
};

export default MoviesListItems;
