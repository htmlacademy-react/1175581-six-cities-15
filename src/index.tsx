import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app/app';
import { reviews } from './mocks/reviews';
import { favorites } from './mocks/favorites';
import { AuthorizationStatus } from './consts/route-consts';
import { createAPI } from './services/api';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './store/reducer';
import { fetchOffersAction } from './store/api-actions';

const authorizationStatus = AuthorizationStatus.Auth;

const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    })
}
);

store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        reviews={reviews}
        favorites={favorites}
        authorizationStatus={authorizationStatus}
      />
    </Provider>
  </React.StrictMode>
);
