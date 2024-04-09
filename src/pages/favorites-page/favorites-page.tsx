import { useEffect } from 'react';
import FavoritesListComponent from '../../components/favorites-list-component/favorites-list-component';
import { useAppSelector } from '../../hooks';
import { fetchFavoriteAction } from '../../store/api-actions';
import { getFavoriteOffers } from '../../selectors/selectors';
import { store } from '../..';

function FavoritesPage(): JSX.Element {

  const favorites = useAppSelector(getFavoriteOffers);

  useEffect(() => {
    store.dispatch(fetchFavoriteAction());
  });

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          {!favorites.length ?
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section> : ''}
          <FavoritesListComponent
            favorites={favorites}
          />
        </section>
      </div>
    </main>
  );
}

export default FavoritesPage;
