import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {State} from '../types/state';
import {Action} from 'redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { APIRoute } from '../const';
import { checkAuthAction, commentAction, fetchFavoriteFilmsAction, fetchFilmAction, fetchFilmReviewsAction, fetchFilmsAction, fetchPromoFilmAction, fetchSimilarFilmsAction, setFavoriteFilmAction } from './api-actions';
import { filmMock, filmsMock, reviewsMock } from '../mocks/moks';
import { AddReviewType } from '../types/types';


describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch loadFilms when GET /films', async () => {
    const films = filmsMock;
    mockAPI
      .onGet(APIRoute.Movies)
      .reply(200, films);

    const store = mockStore();

    await store.dispatch(fetchFilmsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmsAction.pending.type,
      fetchFilmsAction.fulfilled.type
    ]);
  });

  it('should dispatch loadFilm when GET /films/{filmId}', async () => {
    const film = filmMock;
    mockAPI
      .onGet(`${APIRoute.Movies}/${film.id}`)
      .reply(200, film);

    const store = mockStore();

    await store.dispatch(fetchFilmAction(film.id.toString()));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmAction.pending.type,
      fetchFilmAction.fulfilled.type
    ]);
  });

  it('should dispatch loadFilmReviews when GET /comments/{filmId}', async () => {
    const reviews = reviewsMock;
    const film = filmMock;
    mockAPI
      .onGet(`${APIRoute.Reviews}/${film.id}`)
      .reply(200, reviews);

    const store = mockStore();

    await store.dispatch(fetchFilmReviewsAction(film.id.toString()));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmReviewsAction.pending.type,
      fetchFilmReviewsAction.fulfilled.type
    ]);
  });

  it('should dispatch loadPromoFilm when GET /promo', async () => {
    const promoFilm = filmMock;
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, promoFilm);

    const store = mockStore();

    await store.dispatch(fetchPromoFilmAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPromoFilmAction.pending.type,
      fetchPromoFilmAction.fulfilled.type
    ]);
  });

  it('should dispatch loadSimilarFilms when GET /films/{filmId}/similar', async () => {
    const similarFilms = filmsMock;
    const film = filmMock;
    mockAPI
      .onGet(`${APIRoute.Movies}/${film.id}/similar`)
      .reply(200, similarFilms);

    const store = mockStore();

    await store.dispatch(fetchSimilarFilmsAction(film.id.toString()));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchSimilarFilmsAction.pending.type,
      fetchSimilarFilmsAction.fulfilled.type
    ]);
  });

  it('should dispatch loadFavoriteFilms when GET /favorite', async () => {
    const favoriteFilms = filmsMock;
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, favoriteFilms);

    const store = mockStore();

    await store.dispatch(fetchFavoriteFilmsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavoriteFilmsAction.pending.type,
      fetchFavoriteFilmsAction.fulfilled.type
    ]);
  });

  it('should dispatch postNewComment when POST /comments/{filmId}', async () => {
    const fakeComment: AddReviewType = {comment: 'Good movie!', rating: 10};
    const film = filmMock;

    mockAPI
      .onPost(`${APIRoute.Reviews}/${film.id}`)
      .reply(200, []);


    const store = mockStore();

    await store.dispatch(commentAction([film.id,fakeComment]));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      commentAction.pending.type,
      commentAction.fulfilled.type
    ]);
  });

  it('should dispatch setFavoriteFilm when POST /favorite/{filmId}/{status}', async () => {
    const film = filmMock;
    const status = true;

    mockAPI
      .onPost(`${APIRoute.Favorite}/${film.id}/${Number(status)}`)
      .reply(200, []);


    const store = mockStore();

    await store.dispatch(setFavoriteFilmAction([film.id, status]));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      setFavoriteFilmAction.pending.type,
      fetchFavoriteFilmsAction.pending.type,
      setFavoriteFilmAction.fulfilled.type,
    ]);
  });

});
