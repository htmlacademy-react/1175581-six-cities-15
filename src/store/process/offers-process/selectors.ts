import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../../types/state';
import { TOffersState } from './offers-process';

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
