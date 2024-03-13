import { TOffer } from '../types/offers-types';
import { TReview } from '../types/reviews-types';
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

type AppPageProps = {
  placesCount: number;
  offers: TOffer[];
  reviews: TReview[];
  favorites: TOffer[];
  authorizationStatus: AuthorizationStatus;
}

function App({ placesCount, offers, reviews, favorites, authorizationStatus }: AppPageProps): JSX.Element {
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
              element={<MainPage placesCount={placesCount} offers={offers} />}
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
              element={<OfferPage authorizationStatus= {authorizationStatus} offers={offers} reviews= {reviews} />}
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
