import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../../types/state';
import { TLoginState } from './user-process';

export const getAuthStatus = createSelector(
  (state: State) => state['user'],
  (state: TLoginState) => state.authorizationStatus
);

export const getUser = createSelector(
  (state: State) => state['user'],
  (state: TLoginState) => state.user
);
