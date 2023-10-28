import css from './MovieDetailsInfo.module.css';
const defaultImg =
  '<https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700>';

const MovieDetailsInfo = ({ movie }) => {
  const {
    release_date,
    poster_path,
    original_title,
    vote_average,
    overview,
    genres,
  } = movie;
  const date = new Date(release_date);
  return (
    <div className={css.wrapper}>
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : defaultImg
        }
        alt={original_title}
        width={250}
      />
      <div className={css.movieInfoWrapper}>
        <h2>
          {original_title} ({date.getFullYear()})
        </h2>
        <p>User Score: {Math.round((vote_average * 100) / 10)}%</p>
        <h3>Overview</h3>
        <p>{overview}</p>
        <h3>Genres</h3>
        <ul className={css.genres}>
          {genres.map(genre => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieDetailsInfo;
