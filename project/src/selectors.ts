import { State } from './types/state';

export const getCurrentGenre = (state: State) => state.genre;
export const getFilms = (state: State) => state.films;
export const getFilm = (state: State) => state.film.data;
export const getLoading = (state: State) => state.films.isLoading;
export const getFilmLoading = (state: State) => state.film.isLoading;
export const getAuthorization = (state: State) => state.authorizationStatus;
export const getReview = (state: State) => state.filmReviews;
export const getSimilarFilms = (state: State) => state.similarFilms;
export const getReviewFormStatus = (state: State) => state.isReviewFormDisabled;
