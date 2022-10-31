import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {filmsMock} from './mocks/films';
import { reviewMock} from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const featuredMovie = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  releaseYear: 2014
};

root.render(
  <React.StrictMode>
    <App
      {...featuredMovie}
      movies={filmsMock}
      reviews={reviewMock}
    />
  </React.StrictMode>,
);
