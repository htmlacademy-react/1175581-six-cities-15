import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import { offers } from './mocks/offers';
import { favorites } from './mocks/favorites';
import { AuthorizationStatus } from './consts/route-consts';

const authorizationStatus = AuthorizationStatus.Auth;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

enum Settings {
  PlacesCount = 7,
}

root.render(
  <React.StrictMode>
    <App
      placesCount={Settings.PlacesCount}
      offers={offers}
      favorites={favorites}
      authorizationStatus = {authorizationStatus}
    />
  </React.StrictMode>
);
