import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';


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
    />
  </React.StrictMode>
);
