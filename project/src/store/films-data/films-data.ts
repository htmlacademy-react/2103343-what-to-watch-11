import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FilmsData } from '../../types/state';
import { FilmType } from '../../types/types';
import { commentAction, fetchFavoriteFilmsAction, fetchFilmAction, fetchFilmReviewsAction, fetchFilmsAction, fetchPromoFilmAction, fetchSimilarFilmsAction } from '../api-actions';

const initialState: FilmsData = {
  films: {
    data: [],
    isLoading: false,
  },

  filmReviews:{
    data: [],
    isLoading: false,
  },

  similarFilms:{
    data: [],
    isLoading: false,
  },

  promoFilm: {} as FilmType,

  isFilmLoading: false,

  favoriteFilms:{
    data: [],
    isLoading: false,
  },

  isReviewFormDisabled: false,
};

export const filmsData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setReviewFormDisabled: (state, action: PayloadAction<boolean>) => {
      state.isReviewFormDisabled = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.films.isLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films.data = action.payload;
        state.films.isLoading = false;
      })
      .addCase(fetchFilmAction.pending, (state) => {
        state.isFilmLoading = true;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isFilmLoading = false;
      })
      .addCase(fetchFilmReviewsAction.pending, (state) => {
        state.filmReviews.isLoading = true;
      })
      .addCase(fetchFilmReviewsAction.fulfilled, (state, action) => {
        state.filmReviews.data = action.payload;
        state.filmReviews.isLoading = false;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
      })
      .addCase(fetchSimilarFilmsAction.pending, (state) => {
        state.similarFilms.isLoading = true;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms.data = action.payload;
        state.similarFilms.isLoading = false;
      })
      .addCase(fetchFavoriteFilmsAction.pending, (state) => {
        state.favoriteFilms.isLoading = true;
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms.data = action.payload;
        state.favoriteFilms.isLoading = false;
      })
      .addCase(commentAction.pending, (state) => {
        state.isReviewFormDisabled = true;
      })
      .addCase(commentAction.fulfilled, (state) => {
        state.isReviewFormDisabled = false;
      })
      .addCase(commentAction.rejected, (state) => {
        state.isReviewFormDisabled = false;
      });
  }
});

export const {setReviewFormDisabled} = filmsData.actions;
