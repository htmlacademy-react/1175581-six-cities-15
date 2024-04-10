import { createSelector } from '@reduxjs/toolkit';
import { TCommentsState } from './comments-process';
import { State } from '../../../types/state';

export const getComments = createSelector(
  (state: State) => state['comments'],
  (state: TCommentsState) => state.comments
);
