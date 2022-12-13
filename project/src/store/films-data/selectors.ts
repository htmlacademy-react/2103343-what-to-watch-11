import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Films, FilmType, Reviews } from '../../types/types';

export const getFilms = (state: State): Films => state[NameSpace.Data].films;

export const getFilm = (state: State): FilmType | undefined => state[NameSpace.Data].film;

export const getFilmReviews = (state: State): Reviews => state[NameSpace.Data].filmReviews;

export const getPromoFilm = (state: State): FilmType => state[NameSpace.Data].promoFilm;

export const getSimilarFilms = (state: State): Films => state[NameSpace.Data].similarFilms;

export const getFilmsStatus = (state: State): boolean => state[NameSpace.Data].isFilmsLoading;

export const getFilmStatus = (state: State): boolean => state[NameSpace.Data].isFilmLoading;

export const getFilmReviewsStatus = (state: State): boolean => state[NameSpace.Data].isFilmReviewsLoading;

export const getSimilarFilmsStatus = (state: State): boolean => state[NameSpace.Data].isSimilarFilmsLoading;

export const getReviewFormStatus = (state: State): boolean => state[NameSpace.Data].isReviewFormDisabled;

export const getFavoriteFilms = (state: State): Films => state[NameSpace.Data].favoriteFilms;

export const getFavoriteFilmsStatus = (state: State): boolean => state[NameSpace.Data].isFavoriteFilmsLoading;
