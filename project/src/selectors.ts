import { State } from './types/state';

export const getCurrentGenre = (state: State) => state.genre;
export const getFilms = (state: State) => state.films;

