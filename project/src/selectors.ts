import { State } from './types/state';

export const getCurrentGenre = (state: State) => state.genre;
export const getFilms = (state: State) => state.films.data;
export const getLoading = (state: State) => state.films.isLoading;
export const getAuthorization = (state: State) => state.authorizationStatus;
