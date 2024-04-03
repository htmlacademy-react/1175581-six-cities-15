import FavoriteArticleComponent from '../favorite-article-component/favorite-article-component';

import { TOffer} from '../../types/offers-types';

type FavoritesLocationProps = {
  cityName: string;
  currentFavorites: TOffer[];
}

function FavoritesLocationComponent({ cityName, currentFavorites }: FavoritesLocationProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{cityName}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {currentFavorites.map((currentFavorite) =>
          (
            <FavoriteArticleComponent
              key={currentFavorite.id}
              currentFavorite={currentFavorite}
            />
          ))}
      </div>
    </li>
  );
}

export default FavoritesLocationComponent;
