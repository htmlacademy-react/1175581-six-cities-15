import { AuthorizationStatus } from '../../consts/route-consts';
import { AppRoute } from '../../consts/route-consts';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../selectors/selectors';

type LoginRouteProps = {
  children: JSX.Element;
}


function LoginRoute(props: LoginRouteProps): JSX.Element {
  const {children} = props;
  const authorizationStatus = useAppSelector(getAuthStatus);

  return (
    authorizationStatus !== AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Main} />
  );
}

export default LoginRoute;
