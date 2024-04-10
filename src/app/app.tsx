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

import { useAppSelector } from '../hooks';
import LoaderComponent from '../components/loader-component/loader-component';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../history-route/browser-history';
import LoginRoute from '../components/login-route/login-route';
import { getIsOffersDataLoading } from '../selectors/selectors';


function App(): JSX.Element {

  const loadingOfferStatus = useAppSelector(getIsOffersDataLoading);

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
              element={
                <LoginRoute>
                  <LoginPage/>
                </LoginRoute>
              }
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute >
                  <FavoritesPage />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Offer}
              element={<OfferPage />}
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
