import { AuthorizationStatus } from '../../consts/route-consts';
import ReviewFormComponent from '../review-form/review-form-component';
import ReviewsListComponent from '../reviews-list/reviews-list-component';

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
