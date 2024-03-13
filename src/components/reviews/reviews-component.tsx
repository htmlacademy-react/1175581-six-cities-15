import { AuthorizationStatus } from '../../consts/route-consts';
import ReviewFormComponent from '../review-form/review-form-component';
import ReviewsListComponent from '../reviews-list/reviews-list-component';
import { TReview } from '../../types/reviews-types';

type RewiewsComponentProps = {
  authorizationStatus: AuthorizationStatus;
  reviews: TReview[];
}

function ReviewsComponent({ authorizationStatus, reviews }: RewiewsComponentProps) {
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <>
      <ReviewsListComponent reviews={reviews} />
      {isAuth && <ReviewFormComponent />}
    </>
  );
}

export default ReviewsComponent;
