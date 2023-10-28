import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { IoArrowBackSharp } from 'react-icons/io5';
import { searchMovieById } from 'api';
import MovieDetailsInfo from 'components/MovieDetailsInfo/MovieDetailsInfo';
import css from './MovieDetails.module.css';
const MovieDetail = () => {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/');
  const { movieId } = useParams();

  useEffect(() => {
    async function searchMovie() {
      setLoading(true);
      setError(false);
      try {
        const response = await searchMovieById(movieId);
        setMovie([response]);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    searchMovie();
  }, [movieId]);

  return (
    <div>
      <Link to={backLinkLocationRef.current} className={css.goBack}>
        <IoArrowBackSharp /> Go back
      </Link>
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
      {movie.map(movieInfo => {
        return <MovieDetailsInfo key={movieInfo.id} movie={movieInfo} />;
      })}
      <div className={css.addWrapper}>
        <h3>Additional information </h3>
        <ul className={css.addList}>
          <li>
            <Link to="cast" className={css.addLink}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" className={css.addLink}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      {error && <span>Something went wrong!</span>}
      <Outlet />
    </div>
  );
};

export default MovieDetail;
