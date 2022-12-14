import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { redirectToRoute } from './action';
import { APIRoute, AppRoute } from '../const';
import { AddReviewType, Films, FilmType, Reviews } from '../types/types.js';
import { AuthData } from '../types/auth-data.js';
import { UserData } from '../types/user-data.js';
import {saveToken, dropToken} from '../services/token';

export const fetchFilmsAction = createAsyncThunk<Films, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilms',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Films>(APIRoute.Movies);
    return data;
  },
);

export const fetchFilmAction = createAsyncThunk<FilmType, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilm',
  async (id, { extra: api }) => {
    const { data } = await api.get<FilmType>(`${APIRoute.Movies}/${id}`);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.Main));
    dispatch(checkAuthAction());
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const fetchFilmReviewsAction = createAsyncThunk<Reviews, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilmReviews',
  async (id, { extra: api }) => {
    const { data } = await api.get<Reviews>(`${APIRoute.Reviews}/${id}`);
    return data;
  },
);

export const commentAction = createAsyncThunk<void, [number, AddReviewType], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/comment',
  async ([id, {comment, rating}], { extra: api }) => {
    await api.post<Reviews>(`${APIRoute.Reviews}/${id}`, {comment, rating});
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk<Films, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarFilms',
  async (id, { extra: api }) => {
    const { data } = await api.get<Films>(`${APIRoute.Movies}/${id}/similar`);
    return data;
  },
);

export const fetchPromoFilmAction = createAsyncThunk<FilmType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromoFilm',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<FilmType>(APIRoute.Promo);
    return data;
  },
);

export const fetchFavoriteFilmsAction = createAsyncThunk<Films, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavoriteFilms',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Films>(APIRoute.Favorite);
    return data;
  },
);

export const setFavoriteFilmAction = createAsyncThunk<void, [number, boolean], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/setFavoriteFilm',
  async ([id, status], { dispatch, extra: api}) => {
    await api.post<FilmType>(`${APIRoute.Favorite}/${id}/${Number(status)}`);
    dispatch(fetchFavoriteFilmsAction());
  },
);
