import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../consts/route-consts';
import PrivateRoute from '../components/private-route/private-route';

import { AuthorizationStatus } from '../consts/route-consts';

import Layout from '../pages/layout/layout';
import MainPage from '../pages/main-page/main-page';
import LoginPage from '../pages/login-page/login-page';
import FavoritesPage from '../pages/favorites-page/favorites-page';
import OfferPage from '../pages/offer-page/offer-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';

import { TOffer } from '../types/offers-types';
import { TReview } from '../types/reviews-types';

type AppPageProps = {
  reviews: TReview[];
  favorites: TOffer[];
  authorizationStatus: AuthorizationStatus;
}

function App({ reviews, favorites, authorizationStatus }: AppPageProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<Layout />}
          >
            <Route
              index
              element={<MainPage />}
            />
            <Route
              path={AppRoute.Login}
              element={<LoginPage />}
            />

            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute authorizationStatus={authorizationStatus}>
                  <FavoritesPage favorites={favorites} />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Offer}
              element={<OfferPage authorizationStatus={authorizationStatus} reviews={reviews} />}
            />
            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
