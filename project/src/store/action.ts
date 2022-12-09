import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from '../const';
import { Films, FilmType, Reviews } from '../types/types';

export const setGenre = createAction('films/setGenre', (genre: string) => ({
  payload: genre,
}));

export const loadFilms = createAction<Films>('data/loadFilms');

export const loadFilm = createAction<FilmType>('data/loadFilm');

export const loadFilmReviews = createAction<Reviews>('data/loadFilmReviews');

export const loadSimilarFilms = createAction<Films>('data/loadSimilarFilms');

export const setLoadingStatus = createAction<boolean>('data/setLoadingStatus');

export const setFilmLoadingStatus = createAction<boolean>('data/setFilmLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const setReviewFormDisabled = createAction<boolean>('form/setReviewFormDisabled');

