import { State } from './types/state';

export const getCurrentGenre = (state: State) => state.genre;
export const getFilms = (state: State) => state.films;
export const setLoading = (state: State) => state.isLoading;
