import FavoritesListComponent from '../../components/favorites-list-component/favorites-list-component';
import { TOffer } from '../../types/offers-types';

type FavoritePageProps = {
  favorites: TOffer[];
}

function FavoritesPage({ favorites }: FavoritePageProps): JSX.Element {
  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <FavoritesListComponent favorites={favorites} />
        </section>
      </div>
    </main>
  );
}

export default FavoritesPage;
