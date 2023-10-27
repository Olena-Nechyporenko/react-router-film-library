import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function reviewsOfMovie() {
      setLoading(true);
      setError(false);
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=8861740be6f72a2c7bebec9b75a3bd87`
      );
      try {
        setReviews(response.data.results);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    reviewsOfMovie();
  }, [movieId]);

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
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <h3>Author: {review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
      {error && <span>Something went wrong!</span>}
    </>
  );
};

export default Reviews;
