import { AuthorizationStatus } from '../const';
import { store } from '../store/index';
import { Films, FilmType, Reviews } from './types';
import { UserData } from './user-data';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
    authorizationStatus: AuthorizationStatus;
    userData: UserData | null;
};

export type FilmsData = {
    films: {
        data: Films;
        isLoading: boolean;
    };

    film?: FilmType;
    isFilmLoading: boolean;

    filmReviews: {
        data: Reviews;
        isLoading: boolean;
    };

    promoFilm: FilmType;

    similarFilms: {
        data: Films;
        isLoading: boolean;
    };

    favoriteFilms: {
        data: Films;
        isLoading: boolean;
    };

    isReviewFormDisabled: boolean;
};

export type FilmsProcess = {
    genre: string;
};
