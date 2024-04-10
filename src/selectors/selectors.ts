import { createSelector } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { TOffersState } from '../store/process/offers-process/offers-process';
import { TNearOffersState } from '../store/process/near-process/near-process';
import { TCurrentOfferState } from '../store/process/current-offer-process/current-offer-process';
import { TFavoriteState } from '../store/process/favorites-process/favorites-process';
import { TCommentsState } from '../store/process/comments-process/comments-process';
import { TLoginState } from '../store/process/user-process/user-process';

export const getOffers = createSelector(
  (state: State) => state['offers'],
  (state: TOffersState) => state.offers
);

export const getCurrentCity = createSelector(
  (state: State) => state['offers'],
  (state: TOffersState) => state.city
);

export const getCurrentOffers = createSelector(
  [getOffers, getCurrentCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city.name)
);

export const getNearOffers = createSelector(
  (state: State) => state['near'],
  (state: TNearOffersState) => state.nearOffers
);

export const getNearOffersToShow = createSelector(
  [getNearOffers],
  (nearOffers) => nearOffers.slice(0 , 3)
);


export const getFullOffer = createSelector(
  (state: State) => state['currentOffer'],
  (state: TCurrentOfferState) => state.fullOffer
);

export const getFavoriteOffers = createSelector(
  (state: State) => state['favorites'],
  (state: TFavoriteState) => state.favorites
);

export const getComments = createSelector(
  (state: State) => state['comments'],
  (state: TCommentsState) => state.comments
);

export const getAuthStatus = createSelector(
  (state: State) => state['user'],
  (state: TLoginState) => state.authorizationStatus
);

export const getUser = createSelector(
  (state: State) => state['user'],
  (state: TLoginState) => state.user
);

export const getSortType = createSelector(
  (state: State) => state['offers'],
  (state: TOffersState) => state.sortType
);

export const getIsSortOpened = createSelector(
  (state: State) => state['offers'],
  (state: TOffersState) => state.isSortOpened
);

export const getIsOffersDataLoading = createSelector(
  (state: State) => state['offers'],
  (state: TOffersState) => state.isOffersDataLoading
);

