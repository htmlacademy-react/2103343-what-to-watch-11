import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { reviewMock} from './mocks/reviews';
import { store } from './store';
import { fetchFilmAction } from './store/api-actions';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const featuredMovie = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  releaseYear: 2014
};

store.dispatch(fetchFilmAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App
        {...featuredMovie}
        reviews={reviewMock}
      />
    </Provider>
  </React.StrictMode>,
);
