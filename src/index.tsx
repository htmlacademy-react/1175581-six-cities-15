import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import { Provider } from 'react-redux';
import { offers } from './mocks/offers';
import { reviews } from './mocks/reviews';
import { favorites } from './mocks/favorites';
import { AuthorizationStatus } from './consts/route-consts';
import { store } from './store';

const authorizationStatus = AuthorizationStatus.Auth;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

enum Settings {
  PlacesCount = 7,
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        placesCount={Settings.PlacesCount}
        offers={offers}
        reviews={reviews}
        favorites={favorites}
        authorizationStatus={authorizationStatus}
      />
    </Provider>
  </React.StrictMode>
);
