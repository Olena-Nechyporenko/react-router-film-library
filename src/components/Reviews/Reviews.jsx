import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { getReviews } from 'api';
const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function reviewsOfMovie() {
      setLoading(true);
      setError(false);
      try {
        const response = await getReviews(movieId);
        setReviews(response.results);
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
      {reviews.length === 0 ? (
        'There is no review'
      ) : (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}

      {error && <span>Something went wrong!</span>}
    </>
  );
};

export default Reviews;
