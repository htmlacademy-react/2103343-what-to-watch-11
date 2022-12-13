import { AuthorizationStatus } from '../const';
import { store } from '../store/index';
import { Films, FilmType, Reviews } from './types';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
    authorizationStatus: AuthorizationStatus;
};

export type FilmsData = {
    films: Films;
    film?: FilmType;
    filmReviews: Reviews;
    promoFilm: FilmType;
    similarFilms: Films;
    favoriteFilms: Films;
    isFilmsLoading: boolean;
    isFilmLoading: boolean;
    isFilmReviewsLoading: boolean;
    isSimilarFilmsLoading: boolean;
    isFavoriteFilmsLoading: boolean;
    isReviewFormDisabled: boolean;
};

export type FilmsProcess = {
    genre: string;
};
