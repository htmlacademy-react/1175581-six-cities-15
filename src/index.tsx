import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app/app';
import { reviews } from './mocks/reviews';
import { favorites } from './mocks/favorites';
import { AuthorizationStatus } from './consts/route-consts';
import { store } from './store';

import { Provider } from 'react-redux';

const authorizationStatus = AuthorizationStatus.Auth;

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
