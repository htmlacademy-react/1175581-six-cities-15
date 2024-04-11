import { CITIES } from '../../consts/cities';
import { TOffer } from '../../types/offer';
import FavoritesLocationComponent from '../favorites-location-component/favorites-location-component';

type FavoritesListProps = {
  favorites: TOffer[];
}

function FavoritesListComponent({ favorites }: FavoritesListProps): JSX.Element {

  return (
    <ul className="favorites__list">
      {CITIES.map((city) => {
        const currentfavorites = favorites.filter((offer) => offer.city.name === city.name);
        return currentfavorites.length !== 0 ?
          <FavoritesLocationComponent
            key={city.name}
            city={city}
            currentFavorites={currentfavorites}
          /> : '';
      })}
    </ul>
  );
}

export default FavoritesListComponent;
