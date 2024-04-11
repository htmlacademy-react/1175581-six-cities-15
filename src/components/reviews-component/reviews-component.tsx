import { AuthorizationStatus } from '../../consts/routeConsts';
import ReviewFormComponent from '../review-form-component/review-form-component';
import ReviewsListComponent from '../reviews-list-component/reviews-list-component';


type RewiewsComponentProps = {
  authorizationStatus: AuthorizationStatus;

}

function ReviewsComponent({ authorizationStatus }: RewiewsComponentProps) {
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <>
      <ReviewsListComponent />
      {isAuth && <ReviewFormComponent />}
    </>
  );
}

export default ReviewsComponent;
