import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Films, FilmType, Reviews } from '../../types/types';

export const getFilms = (state: State): Films => state[NameSpace.Data].films.data;

export const getFilm = (state: State): FilmType | undefined => state[NameSpace.Data].film;

export const getFilmReviews = (state: State): Reviews => state[NameSpace.Data].filmReviews.data;

export const getPromoFilm = (state: State): FilmType => state[NameSpace.Data].promoFilm;

export const getSimilarFilms = (state: State): Films => state[NameSpace.Data].similarFilms.data;

export const getFilmsStatus = (state: State): boolean => state[NameSpace.Data].films.isLoading;

export const getFilmStatus = (state: State): boolean => state[NameSpace.Data].isFilmLoading;

export const getFilmReviewsStatus = (state: State): boolean => state[NameSpace.Data].filmReviews.isLoading;

export const getSimilarFilmsStatus = (state: State): boolean => state[NameSpace.Data].similarFilms.isLoading;

export const getReviewFormStatus = (state: State): boolean => state[NameSpace.Data].isReviewFormDisabled;

export const getFavoriteFilms = (state: State): Films => state[NameSpace.Data].favoriteFilms.data;

export const getFavoriteFilmsStatus = (state: State): boolean => state[NameSpace.Data].favoriteFilms.isLoading;
