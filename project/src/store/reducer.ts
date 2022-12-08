import { createReducer } from '@reduxjs/toolkit';
import { GENRE_DEFAULT, AuthorizationStatus } from '../const';
import { Films } from '../types/types';
import { setGenre, setFilms, setLoadingStatus, loadFilms, requireAuthorization } from './action';


type InitialState = {
  genre: string;
  films: {
  data: Films;
  isLoading: boolean;
  };
  authorizationStatus: AuthorizationStatus;
};

const initialState: InitialState = {
  genre: GENRE_DEFAULT,
  films: {
    data: [],
    isLoading: false,
  },
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(setFilms, (state, action) => {
      state.films.data = action.payload;
    })
    .addCase(loadFilms, (state, action) => {
      state.films.data = action.payload;
    })
    .addCase(setLoadingStatus, (state, action) => {
      state.films.isLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};

