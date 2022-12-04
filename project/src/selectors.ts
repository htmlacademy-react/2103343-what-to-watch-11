import { FilmsType } from './types/types';

export const getCurrentGenre = (state: {genre: string}) => state.genre;
export const getFilms = (state: {films: FilmsType[]}) => state.films;
export const getIncrement = (state: {filmsIncrement: number}) => state.filmsIncrement;
