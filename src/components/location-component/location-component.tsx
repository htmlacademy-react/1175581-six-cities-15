import { useAppDispatch } from '../../hooks';

import cn from 'classnames';

import { TCity } from '../../types/data-types';
import { SortingType, SORT_TYPES } from '../../consts/sort';
import { changeCity, sort } from '../../store/process/offers-process/offers-process';


type LocationComponentProps = {
  city: TCity;
  currentCity:TCity;
}

function LocationComponent({ city, currentCity }: LocationComponentProps): JSX.Element {

  const dispatch = useAppDispatch();

  return (
    <li className="locations__item">
      <a
        className={cn('locations__item-link', 'tabs__item', {
          'tabs__item--active': city === currentCity,
        })}
        href="#"
        onClick={(evt) => {
          evt.preventDefault();
          dispatch(changeCity(city));
          dispatch(sort(SORT_TYPES.Default as SortingType));
        }}
      >
        <span>{city.name}</span>
      </a>
    </li >
  );
}

export default LocationComponent;
