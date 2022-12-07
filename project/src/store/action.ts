import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from '../const';
import { Films } from '../types/types';

export const setGenre = createAction('films/setGenre', (genre: string) => ({
  payload: genre,
}));

export const setFilms = createAction('films/setFilms', (films: Films) => ({
  payload: films,
}));

export const loadFilms = createAction<Films>('data/loadFilms');

export const setLoadingStatus = createAction<boolean>('data/setLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
