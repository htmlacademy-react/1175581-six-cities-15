import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../../types/state';
import { TFavoriteState } from './favorites-process';

export const getFavoriteOffers = createSelector(
  (state: State) => state['favorites'],
  (state: TFavoriteState) => state.favorites
);
