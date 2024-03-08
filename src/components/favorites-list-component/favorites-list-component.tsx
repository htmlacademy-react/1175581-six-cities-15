import { TOffer } from '../../types/offers-types';
import { CITIES } from '../../consts/cities';
import FavoritesLocationItemComponent from '../favorites-location-item/favorites-location-component';

type FavoritesListProps = {
  favorites: TOffer[];
}

function FavoritesListComponent({ favorites }: FavoritesListProps): JSX.Element {


  return (
    <ul className="favorites__list">
      {CITIES.map((city) => {
        const currentfavorites = favorites.filter((offer) => offer.city.name === city);
        return currentfavorites.length !== 0 ?
          <FavoritesLocationItemComponent
            key={city}
            cityName={city}
            currentFavorites={currentfavorites}
          /> : '';
      })}
    </ul>
  );
}

export default FavoritesListComponent;
