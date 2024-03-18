import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/action';

import cn from 'classnames';

import { TCity } from '../../types/offers-types';


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
        }}
      >
        <span>{city.name}</span>
      </a>
    </li >
  );
}

export default LocationComponent;
