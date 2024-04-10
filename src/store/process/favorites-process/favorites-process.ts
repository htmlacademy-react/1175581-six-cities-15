import { createSlice } from '@reduxjs/toolkit';
import { TOffer } from '../../../types/offers-types';
import { changeFavoriteAction, fetchFavoriteAction } from '../../api-actions';


export type TFavoriteState = {
  favorites: TOffer[];
  isSetFavoriteOffersDataSending: boolean;
  isFavoriteOffersDataLoading: boolean;
  hasErrorFavoriteOffersLoading: boolean;
  hasErrorFavoriteOfferSending: boolean;
}

const initialState: TFavoriteState = {
  favorites: [],
  isSetFavoriteOffersDataSending: false,
  isFavoriteOffersDataLoading: true,
  hasErrorFavoriteOffersLoading: false,
  hasErrorFavoriteOfferSending: false,
};

export const favoritesProcess = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavoriteOffers: (state) => {
      state.favorites = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteAction.pending, (state) => {
        state.isFavoriteOffersDataLoading = true;
        state.hasErrorFavoriteOffersLoading = false;
      })
      .addCase(fetchFavoriteAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isFavoriteOffersDataLoading = false;
      })
      .addCase(fetchFavoriteAction.rejected, (state) => {
        state.isFavoriteOffersDataLoading = false;
        state.hasErrorFavoriteOffersLoading = true;
      })
      .addCase(changeFavoriteAction.pending, (state) => {
        state.isSetFavoriteOffersDataSending = true;
        state.hasErrorFavoriteOfferSending = false;
      })
      .addCase(changeFavoriteAction.fulfilled, (state, action) => {
        if (action.payload.isFavorite) {
          state.favorites.push(
            {
              id: action.payload.id,
              title: action.payload.title,
              type: action.payload.type,
              price: action.payload.price,
              city: action.payload.city,
              location: action.payload.location,
              isFavorite: action.payload.isFavorite,
              isPremium: action.payload.isPremium,
              rating: action.payload.rating,
              previewImage: action.payload.images[0],
            }
          );
        } else {
          state.favorites = state.favorites.filter((favorite) => favorite.id !== action.payload.id);
        }
      }
      )
      .addCase(changeFavoriteAction.rejected, (state) => {
        state.isSetFavoriteOffersDataSending = false;
        state.hasErrorFavoriteOfferSending = true;
      });
  }
});

export const { clearFavoriteOffers } = favoritesProcess.actions;
