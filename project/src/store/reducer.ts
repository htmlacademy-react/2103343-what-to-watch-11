import { createReducer } from '@reduxjs/toolkit';
import { GENRE_DEFAULT, AuthorizationStatus } from '../const';
import { Films, FilmType, Reviews } from '../types/types';
import { setGenre, setLoadingStatus, loadFilms, requireAuthorization, loadFilm, loadFilmReviews, loadSimilarFilms, setFilmLoadingStatus, setReviewFormDisabled } from './action';


type InitialState = {
  genre: string;
  film: {
    data?: FilmType;
    isLoading: boolean;
  };
  films: {
    data: Films;
    isLoading: boolean;
  };
  similarFilms: Films;
  filmReviews: Reviews;
  isReviewFormDisabled: boolean;
  authorizationStatus: AuthorizationStatus;
};

const initialState: InitialState = {
  genre: GENRE_DEFAULT,
  films: {
    data: [],
    isLoading: false,
  },
  film: {
    isLoading: false,
  },
  similarFilms: [],
  filmReviews: [],
  isReviewFormDisabled: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(loadFilms, (state, action) => {
      state.films.data = action.payload;
    })
    .addCase(loadFilm, (state, action) => {
      state.film.data = action.payload;
    })
    .addCase(loadFilmReviews, (state, action) => {
      state.filmReviews = action.payload;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(setLoadingStatus, (state, action) => {
      state.films.isLoading = action.payload;
    })
    .addCase(setFilmLoadingStatus, (state, action) => {
      state.film.isLoading = action.payload;
    })
    .addCase(setReviewFormDisabled, (state, action) => {
      state.isReviewFormDisabled = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};

