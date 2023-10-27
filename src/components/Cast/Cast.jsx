import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import css from './Cast.module.css';
const Cast = () => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    async function castOfMovie() {
      setLoading(true);
      setError(false);
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=8861740be6f72a2c7bebec9b75a3bd87`
      );
      try {
        setCast(response.data.cast);
      } catch {
        setError(false);
      } finally {
        setLoading(false);
      }
    }
    castOfMovie();
  }, [movieId]);

  const defaultImg =
    '<https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700>';
  return (
    <>
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
      <ul className={css.castList}>
        {cast.map(({ id, profile_path, name, character }) => (
          <li key={id} className={css.castItem}>
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                  : defaultImg
              }
              alt={name}
              width={200}
            />
            <h3>{name}</h3>
            <p>Character: {character}</p>
          </li>
        ))}
      </ul>
      {error && <span>Something went wrong!</span>}
    </>
  );
};

export default Cast;
