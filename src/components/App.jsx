import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Cast from './Cast/Cast';
import Reviews from './Reviews/Reviews';
import { lazy } from 'react';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';

const Home = lazy(() =>
  import('pages/Home/Home').then(module => {
    return module;
  })
);
const Movies = lazy(() =>
  import('pages/Movies/Movies').then(module => {
    return module;
  })
);
const MovieDetails = lazy(() =>
  import('pages/MovieDetails/MovieDetails').then(module => {
    return module;
  })
);

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
