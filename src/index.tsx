import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app/app';
import { createAPI } from './services/api';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { checkAuthAction, fetchFavoriteAction, fetchOffersAction } from './store/api-actions';
import 'react-toastify/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { redirect } from './store/redirect';
import { rootReducer } from './store/process/root-process/root-process';

const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    }).concat(redirect)
}
);


store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());
store.dispatch(fetchFavoriteAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);
