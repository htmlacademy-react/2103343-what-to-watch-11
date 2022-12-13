import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FilmsData } from '../../types/state';
import { FilmType } from '../../types/types';
import { commentAction, fetchFavoriteFilmsAction, fetchFilmAction, fetchFilmReviewsAction, fetchFilmsAction, fetchPromoFilmAction, fetchSimilarFilmsAction } from '../api-actions';

const initialState: FilmsData = {
  films: [],
  filmReviews: [],
  similarFilms: [],
  promoFilm: {} as FilmType,
  favoriteFilms: [],
  isFilmsLoading: false,
  isFilmLoading: false,
  isFilmReviewsLoading: false,
  isSimilarFilmsLoading: false,
  isReviewFormDisabled: false,
  isFavoriteFilmsLoading: false,
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
        state.isFilmsLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isFilmsLoading = false;
      })
      .addCase(fetchFilmAction.pending, (state) => {
        state.isFilmLoading = true;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isFilmLoading = false;
      })
      .addCase(fetchFilmReviewsAction.pending, (state) => {
        state.isFilmReviewsLoading = true;
      })
      .addCase(fetchFilmReviewsAction.fulfilled, (state, action) => {
        state.filmReviews = action.payload;
        state.isFilmReviewsLoading = false;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
      })
      .addCase(fetchSimilarFilmsAction.pending, (state) => {
        state.isSimilarFilmsLoading = true;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
        state.isSimilarFilmsLoading = false;
      })
      .addCase(fetchFavoriteFilmsAction.pending, (state) => {
        state.isFavoriteFilmsLoading = true;
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
        state.isFavoriteFilmsLoading = false;
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
