import LocationComponent from '../location-component/location-component';

import { TCity } from '../../types/data-types';

type LocationsListComponentProps = {
  cities: TCity[];
  currentCity: TCity;
}

function LocationsListComponent({ cities, currentCity }: LocationsListComponentProps): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          cities.map((city) =>
            (
              <LocationComponent
                key={city.name}
                city={city}
                currentCity={currentCity}
              />
            ))
        }
      </ul>
    </section>
  );
}

export default LocationsListComponent;
