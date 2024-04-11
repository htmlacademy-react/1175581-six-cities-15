import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { AppRoute } from '../../consts/routeConsts';
import { getFavoriteOffers } from '../../store/process/favorites-process/selectors';
import { getUser } from '../../store/process/user-process/selectors';

function AuthComponent(): JSX.Element {

  const count = useAppSelector(getFavoriteOffers).length;
  const user = useAppSelector(getUser);

  const dispatch = useAppDispatch();

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link
          className="header__nav-link header__nav-link--profile"
          to={AppRoute.Favorites}
        >
          <div
            className="header__avatar-wrapper user__avatar-wrapper"
          >
            <img
              className='user__avatar'
              src={user?.avatarUrl}
              alt='User Avatar'
            />
          </div>
          <span className="header__user-name user__name">{user?.email}</span>
          <span className="header__favorite-count">{count}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <a
          className="header__nav-link"
          href="#"
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(logoutAction());
          }}
        >
          <span className="header__signout">Sign out</span>
        </a>
      </li>
    </ul>
  );
}

export default AuthComponent;
