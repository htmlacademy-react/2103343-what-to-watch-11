import { createReducer } from '@reduxjs/toolkit';
import { ALL_GENRES_FILTER_NAME, SHOW_MORE_COUNT } from '../const';
import { filmsMock } from '../mocks/films';
import { changeGenre, resetFilmsInList, setFilms, setIncrementFilmsInList } from './action';


const initialState = {
  genre: ALL_GENRES_FILTER_NAME,
  films: filmsMock,
  filmsIncrement: SHOW_MORE_COUNT
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(setFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setIncrementFilmsInList, (state) => {
      state.filmsIncrement = state.filmsIncrement + SHOW_MORE_COUNT;
    })
    .addCase(resetFilmsInList, (state) => {
      state.filmsIncrement = SHOW_MORE_COUNT;
    });
});

export {reducer};

