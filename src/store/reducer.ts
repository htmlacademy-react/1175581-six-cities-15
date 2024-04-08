import { createReducer } from '@reduxjs/toolkit';
import { changeCity, sort, DisplaySortList, loadOffers, setError, setLoadingOffersStatus, requireAuthorizationStatus, setFullOffer, setNewComment, setComments, setUser, setFavorites, setNearOffers, addFavorite, removeFavorite, changeBookMarkOffers, changeBookMarkNearOffers, changeBookMarkFullOffer } from './action';
import { cities } from '../consts/cities';
import { TOffer, TCity, TFullOffer, TComment, TNearOffer } from '../types/offers-types';
import { AuthorizationStatus } from '../consts/route-consts';
import { UserData } from '../consts/auth';
import type { SortingType } from '../consts/sort';


type OffersState = {
  isSortOpened: boolean;
  sortType: SortingType;
  city: TCity;
  offers: TOffer[];
  favorites: TOffer[];
  nearOffers: TNearOffer[];
  fullOffer: TFullOffer | null;
  comments: TComment[];
  newComment: TComment | null;
  user: UserData | null;
  error: string | null;
  loadingOffersStatus: boolean;
  authorizationStatus: AuthorizationStatus;
}

const initialState: OffersState = {
  isSortOpened: false,
  sortType: 'Default',
  city: cities[0],
  offers: [],
  favorites: [],
  nearOffers: [],
  fullOffer: null,
  comments: [],
  newComment: null,
  user: null,
  error: null,
  loadingOffersStatus: true,
  authorizationStatus: AuthorizationStatus.Unknown
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(sort, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(DisplaySortList, (state, action) => {
      state.isSortOpened = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setLoadingOffersStatus, (state, action) => {
      state.loadingOffersStatus = action.payload;
    })
    .addCase(requireAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setFullOffer, (state, action) => {
      state.fullOffer = action.payload;
    })
    .addCase(setNewComment, (state, action) => {
      state.newComment = action.payload;
      state.comments.push(action.payload);
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setNearOffers, (state, action) => {
      state.nearOffers = action.payload;
    })
    .addCase(setFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(addFavorite, (state, action) => {
      state.favorites.push(action.payload);
    })
    .addCase(removeFavorite, (state, action) => {
      state.favorites = state.favorites.filter((favorite) => favorite.id !== action.payload.id);
    })
    .addCase(changeBookMarkOffers, (state, action) => {
      const curOffer = action.payload;
      state.offers.map((offer) => {
        if (offer.id === curOffer.id) {
          const flag = offer.isFavorite;
          offer.isFavorite = !flag;
        }
      });
    })
    .addCase(changeBookMarkNearOffers, (state, action) => {
      const curOffer = action.payload;
      state.nearOffers.map((offer) => {
        if (offer.id === curOffer.id) {
          const flag = offer.isFavorite;
          offer.isFavorite = !flag;
        }
      });
    })
    .addCase(changeBookMarkFullOffer, (state, action) => {
      const curOffer = action.payload;
      if(state.fullOffer?.id === curOffer.id) {
        const flag = state.fullOffer.isFavorite;
        state.fullOffer.isFavorite = !flag;
      }
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    });
});

export { reducer };
