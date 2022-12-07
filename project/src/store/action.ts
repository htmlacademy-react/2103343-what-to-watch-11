import { createAction } from '@reduxjs/toolkit';
import { FilmsType } from '../types/types';

export const setGenre = createAction('films/setGenre', (genre: string) => ({
  payload: genre,
}));

export const setFilms = createAction('films/setFilms', (films: FilmsType[]) => ({
  payload: films,
}));

export const loadFilms = createAction<FilmsType>('data/loadFilms');

export const setFilmsDataLoadingStatus = createAction<boolean>('data/setFilmsDataLoadingStatus');

export const setError = createAction<string | null>('app/setError');
