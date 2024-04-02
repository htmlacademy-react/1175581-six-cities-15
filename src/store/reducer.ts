import { createReducer } from '@reduxjs/toolkit';
import { changeCity, sort, DisplaySortList, loadOffers, setError, setLoadingOffersStatus, requireAuthorizationStatus, setFullOffer, setNewComment, setComments, setUser, setFavorites, changeBookMark, setNearOffers } from './action';
import { cities } from '../consts/cities';
import { TOffer, TCity, TFullOffer, TComment, TNearOffer } from '../types/offers-types';
import { sortTypes } from '../consts/sort';
import { AuthorizationStatus } from '../consts/route-consts';
import { UserData } from '../consts/auth';


export type SortType = {
  name: string;
  value: string;
};


type OffersState = {
  isSortOpened: boolean;
  sortType: SortType;
  city: TCity;
  offers: TOffer[];
  favorites: TFullOffer[];
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
  sortType: sortTypes.Default,
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
    .addCase(changeBookMark, (state, action) => {
      const curOffer = action.payload;
      state.offers.map((offer) => {
        if (offer.id === curOffer.id) {
          const flag = offer.isFavorite;
          offer.isFavorite = !flag;
        }
      });
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    });
});

export { reducer };
