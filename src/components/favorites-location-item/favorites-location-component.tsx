import { useDispatch } from 'react-redux';
import { FavoriteImageSize } from '.';
import { TCity} from '../../types/data-types';
import PlaceCardComponent from '../place-card-component/place-card-component';
import { changeCity } from '../../store/process/offers-process/offers-process';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../consts/route-consts';
import { TOffer } from '../../types/offer';

type FavoritesLocationProps = {
  city: TCity;
  currentFavorites: TOffer[];
}

function FavoritesLocationComponent({ city, currentFavorites }: FavoritesLocationProps): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a
            className="locations__item-link"
            href="#"
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(changeCity(city));
              navigate(AppRoute.Main);
            }}
          >
            <span>{city.name}</span>
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
              imgWidth={FavoriteImageSize.width}
              imgHeight={FavoriteImageSize.height}
            />
          ))}
      </div>
    </li>
  );
}

export default FavoritesLocationComponent;
