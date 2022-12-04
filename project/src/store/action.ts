import { createAction } from '@reduxjs/toolkit';
import { FilmsType } from '../types/types';

export const changeGenre = createAction('films/changeGenre', (genre: string) => ({
  payload: genre,
}));

export const setFilms = createAction('films/setFilms', (films: FilmsType[]) => ({
  payload: films,
}));

export const setIncrementFilmsInList = createAction('films/setIncrementFilmsInList');

export const resetFilmsInList = createAction('films/resetFilmsInList');
