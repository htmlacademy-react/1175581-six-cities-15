import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../../types/state';
import { TCommentsState } from './comments-process';

export const getComments = createSelector(
  (state: State) => state['comments'],
  (state: TCommentsState) => state.comments
);
