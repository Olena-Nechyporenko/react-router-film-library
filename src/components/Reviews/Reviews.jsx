import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    async function reviewsOfMovie() {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=8861740be6f72a2c7bebec9b75a3bd87`
      );
      try {
        setReviews(response.data.results);
      } catch (err) {
        console.log(err);
      }
    }
    reviewsOfMovie();
  }, [movieId]);

  return (
    <ul>
      {reviews.map(review => (
        <li key={review.id}>
          <h3>Author: {review.author}</h3>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default Reviews;
