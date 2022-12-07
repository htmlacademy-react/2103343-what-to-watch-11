import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { loadFilms, setLoadingStatus } from './action';
import { APIRoute } from '../const';
import { FilmsType } from '../types/types.js';

export const fetchFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilms',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setLoadingStatus(true));
    const { data } = await api.get<FilmsType[]>(APIRoute.Movies);
    dispatch(setLoadingStatus(false));
    dispatch(loadFilms(data));
  },
);
