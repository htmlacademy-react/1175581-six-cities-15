import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../../types/state';
import { TNearOffersState } from './near-process';

export const getNearOffers = createSelector(
  (state: State) => state['near'],
  (state: TNearOffersState) => state.nearOffers
);

export const getNearOffersToShow = createSelector(
  [getNearOffers],
  (nearOffers) => nearOffers.slice(0 , 3)
);
