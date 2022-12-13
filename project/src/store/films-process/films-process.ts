import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GENRE_DEFAULT, NameSpace } from '../../const';
import { FilmsProcess } from '../../types/state';

const initialState: FilmsProcess = {
  genre: GENRE_DEFAULT,
};

export const filmsProcess = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    }
  },
});

export const { setGenre } = filmsProcess.actions;
