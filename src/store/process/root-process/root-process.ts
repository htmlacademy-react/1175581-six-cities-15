import { combineReducers } from '@reduxjs/toolkit';
import { userProcess } from '../user-process/user-process';
import { offersProcess } from '../offers-process/offers-process';
import { nearProcess } from '../near-process/near-process';
import { favoritesProcess } from '../favorites-process/favorites-process';
import { commentsProcess } from '../comments-process/comments-process';
import { currentOfferProcess } from '../current-offer-process/current-offer-process';

export const rootReducer = combineReducers({
  'user': userProcess.reducer,
  'offers': offersProcess.reducer,
  'near': nearProcess.reducer,
  'favorites': favoritesProcess.reducer,
  'currentOffer': currentOfferProcess.reducer,
  'comments': commentsProcess.reducer,
});
