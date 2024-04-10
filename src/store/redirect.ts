import {PayloadAction} from '@reduxjs/toolkit';
import browserHistory from '../history-route/browser-history';
import {Middleware} from 'redux';
import { rootReducer } from './process/root-process/root-process';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
