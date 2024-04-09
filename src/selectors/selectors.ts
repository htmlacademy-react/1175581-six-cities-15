import { createSelector } from '@reduxjs/toolkit';
import { State } from '../types/state';

export const getOffers = createSelector(
  (state: State) => state,
  (state: State) => state.offers
);

export const getCurrentCity = createSelector(
  (state: State) => state,
  (state: State) => state.city
);

export const getCurrentOffers = createSelector(
  [getOffers, getCurrentCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city.name)
);

export const getNearOffers = createSelector(
  (state: State) => state,
  (state: State) => state.nearOffers
);

export const getNearOffersToShow = createSelector(
  [getNearOffers],
  (nearOffers) => nearOffers.slice(0 , 3)
);


export const getFullOffer = createSelector(
  (state: State) => state,
  (state: State) => state.fullOffer
);

export const getFavoriteOffers = createSelector(
  (state: State) => state,
  (state: State) => state.favorites
);

export const getComments = createSelector(
  (state: State) => state,
  (state: State) => state.comments
);

export const getAuthStatus = createSelector(
  (state: State) => state,
  (state: State) => state.authorizationStatus
);

export const getUser = createSelector(
  (state: State) => state,
  (state: State) => state.user
);

export const getSortType = createSelector(
  (state: State) => state,
  (state: State) => state.sortType
);
