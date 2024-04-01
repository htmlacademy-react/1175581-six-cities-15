import { Link, Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AuthComponent from '../../components/auth-component/auth-component';
import NoAuthComponent from '../../components/no-auth-component/no-auth-component';
import { useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../consts/route-consts';

type WrapClassTypes = {
  '/': string;
  '/login': string;
  '/favorites': string;
  '/offer': string;
}

const WrapClasses: WrapClassTypes = {
  '/': 'page page--gray page--main',
  '/login': 'page page--gray page--login',
  '/favorites': 'page',
  '/offer': 'page',
};

function Layout(): JSX.Element {
  const { pathname } = useLocation();

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    <div className={WrapClasses[pathname as keyof WrapClassTypes]}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Main} className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
              </Link>
            </div>
            {pathname !== '/login' && authorizationStatus !== AuthorizationStatus.NoAuth ? (
              <nav className="header__nav">
                <AuthComponent />
              </nav>
            ) : <NoAuthComponent />}
          </div>
        </div>
      </header>
      <Outlet />
      {pathname === '/favorites' ? (
        <footer className="footer container">
          <Link to={AppRoute.Main} className="footer__logo-link">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
          </Link>
        </footer>
      ) : null}
    </div>
  );
}

export default Layout;
