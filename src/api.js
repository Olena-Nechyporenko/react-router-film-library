import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org';
const API_KEY = '8861740be6f72a2c7bebec9b75a3bd87';

//  For Home Page
export const getTrendingMovie = async () => {
  const response = await axios.get(
    `${BASE_URL}/3/trending/movie/day?api_key=${API_KEY}`
  );
  return response.data;
};

// For Movie Page
export const searchMovieByKeyword = async queryValue => {
  const response = await axios.get(
    `${BASE_URL}/3/search/movie?api_key=${API_KEY}&query=${queryValue}`
  );
  return response.data;
};

// For Movie Details Page
export const searchMovieById = async movieId => {
  const response = await axios.get(
    `${BASE_URL}/3/movie/${movieId}?api_key=${API_KEY}`
  );
  return response.data;
};

// For Cast Component
export const getCasts = async movieId => {
  const response = await axios.get(
    `${BASE_URL}/3/movie/${movieId}/credits?api_key=${API_KEY}`
  );
  return response.data;
};

// For Review Component
export const getReviews = async movieId => {
  const response = await axios.get(
    `${BASE_URL}/3/movie/${movieId}/reviews?api_key=${API_KEY}`
  );
  return response.data;
};
