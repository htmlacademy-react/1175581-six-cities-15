import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../../types/state';
import { TCurrentOfferState } from './current-offer-process';

export const getFullOffer = createSelector(
  (state: State) => state['currentOffer'],
  (state: TCurrentOfferState) => state.fullOffer
);
