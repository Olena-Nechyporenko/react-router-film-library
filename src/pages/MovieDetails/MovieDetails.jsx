import { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import axios from 'axios';

const MovieDetail = () => {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    async function searchMovieById() {
      setLoading(true);
      setError(false);
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=8861740be6f72a2c7bebec9b75a3bd87`
      );
      try {
        console.log(response.data);
        setMovie([response.data]);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    searchMovieById();
  }, [movieId]);

  const defaultImg =
    '<https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700>';
  return (
    <div>
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
      {movie.map(
        ({
          id,
          release_date,
          poster_path,
          original_title,
          vote_average,
          overview,
          genres,
        }) => {
          const date = new Date(release_date);
          return (
            <div key={id}>
              <img
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                    : defaultImg
                }
                alt={original_title}
                width={250}
              />
              <div>
                <h2>
                  {original_title} ({date.getFullYear()})
                </h2>
                <p>User score: {vote_average}</p>
                <h3>Overview</h3>
                <p>{overview}</p>
                <h3>Genres</h3>
                {genres.map(genre => (
                  <div key={genre.id}>{genre.name}</div>
                ))}
              </div>
            </div>
          );
        }
      )}
      <div>
        <h3>Additional information </h3>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>
      {error && <span>Something went wrong!</span>}
      <Outlet />
    </div>
  );
};

export default MovieDetail;
