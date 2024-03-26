import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../consts/route-consts';
import PrivateRoute from '../components/private-route/private-route';
import Layout from '../pages/layout/layout';
import MainPage from '../pages/main-page/main-page';
import LoginPage from '../pages/login-page/login-page';
import FavoritesPage from '../pages/favorites-page/favorites-page';
import OfferPage from '../pages/offer-page/offer-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';

import { TOffer } from '../types/offers-types';
import { TReview } from '../types/reviews-types';
import { useAppSelector } from '../hooks';
import LoaderComponent from '../components/loader-component/loader-component';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../history-route/browser-history';

type AppPageProps = {
  reviews: TReview[];
  favorites: TOffer[];
}

function App({ reviews, favorites }: AppPageProps): JSX.Element {

  const loadingOfferStatus = useAppSelector((state) => state.loadingOffersStatus);

  if (loadingOfferStatus) {
    return <LoaderComponent />;
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
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
                <PrivateRoute >
                  <FavoritesPage favorites={favorites} />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Offer}
              element={<OfferPage reviews={reviews} />}
            />
            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Route>
        </Routes>
      </ HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
