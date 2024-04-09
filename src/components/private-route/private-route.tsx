import { AuthorizationStatus } from '../../consts/route-consts';
import { AppRoute } from '../../consts/route-consts';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../selectors/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}


function PrivateRoute(props: PrivateRouteProps): JSX.Element {

  const {children} = props;
  const authorizationStatus = useAppSelector(getAuthStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
