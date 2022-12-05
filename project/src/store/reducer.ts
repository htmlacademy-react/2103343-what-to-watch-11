import { createReducer } from '@reduxjs/toolkit';
import { GENRE_DEFAULT } from '../const';
import { filmsMock } from '../mocks/films';
import { setGenre, setFilms } from './action';


const initialState = {
  genre: GENRE_DEFAULT,
  films: filmsMock,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(setFilms, (state, action) => {
      state.films = action.payload;
    });
});

export {reducer};

