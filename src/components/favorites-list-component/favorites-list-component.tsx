import FavoritesLocationItemComponent from '../favorites-location-item/favorites-location-component';

import { TFullOffer} from '../../types/offers-types';
import { cities } from '../../consts/cities';

type FavoritesListProps = {
  favorites: TFullOffer[];
}

function FavoritesListComponent({ favorites }: FavoritesListProps): JSX.Element {


  return (
    <ul className="favorites__list">
      {cities.map((city) => {
        const currentfavorites = favorites.filter((offer) => offer.city.name === city.name);
        return currentfavorites.length !== 0 ?
          <FavoritesLocationItemComponent
            key={city.name}
            cityName={city.name}
            currentFavorites={currentfavorites}
          /> : '';
      })}
    </ul>
  );
}

export default FavoritesListComponent;
