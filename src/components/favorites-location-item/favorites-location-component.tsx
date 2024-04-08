import { TOffer} from '../../types/offers-types';
import PlaceCardComponent from '../place-card-component/place-card-component';

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
            <PlaceCardComponent
              key={currentFavorite.id}
              offer={currentFavorite}
              block={'favorites'}
              imgWidth={150}
              imgHeight={110}
            />
          ))}
      </div>
    </li>
  );
}

export default FavoritesLocationComponent;
