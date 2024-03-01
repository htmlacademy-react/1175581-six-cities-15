import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

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

  return (
    <div className={WrapClasses[pathname as keyof WrapClassTypes]}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
              </a>
            </div>
            {pathname !== '/login' ? (
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                      <span className="header__favorite-count">3</span>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            ) : null}
          </div>
        </div>
      </header>
      <Outlet />
      {pathname === '/favorites' ? (
        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
          </a>
        </footer>
      ) : null}
    </div>
  );
}

export default Layout;
