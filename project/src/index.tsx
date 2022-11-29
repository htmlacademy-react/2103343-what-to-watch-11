import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import {filmsMock} from './mocks/films';
import { reviewMock} from './mocks/reviews';
import { store } from './store';

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
    <Provider store={store}>
      <App
        {...featuredMovie}
        movies={filmsMock}
        reviews={reviewMock}
      />
    </Provider>
  </React.StrictMode>,
);
