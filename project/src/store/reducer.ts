import { createReducer } from '@reduxjs/toolkit';
import { GENRE_DEFAULT } from '../const';
import { FilmsType } from '../types/types';
import { setGenre, setFilms, setLoadingStatus, loadFilms } from './action';


type InitialState = {
  genre: string;
  films: FilmsType[];
  isLoading: boolean;
};

const initialState: InitialState = {
  genre: GENRE_DEFAULT,
  films: [],
  isLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(setFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setLoadingStatus, (state, action) => {
      state.isLoading = action.payload;
    });
});

export {reducer};

