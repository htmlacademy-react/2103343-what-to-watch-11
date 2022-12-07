import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { loadFilms, setError, setFilmsDataLoadingStatus } from './action';
import { APIRoute, TIMEOUT_ERROR } from '../const';
import { store } from './';
import { FilmsType } from '../types/types.js';

export const clearErrorAction = createAsyncThunk(
  'app/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_ERROR,
    );
  },
);

export const fetchFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilms',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setFilmsDataLoadingStatus(true));
    const { data } = await api.get<FilmsType>(APIRoute.Movies);
    dispatch(setFilmsDataLoadingStatus(false));
    dispatch(loadFilms(data));
  },
);
