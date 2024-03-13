import ReviewComponent from '../review-component/review-component';
import { TReview } from '../../types/reviews-types';

type RewiewsListComponentProps = {
  reviews: TReview[];
}

function ReviewsListComponent({ reviews }: RewiewsListComponentProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {
        reviews.map((review: TReview) =>
          (
            <ReviewComponent
              key={review.id}
              review={review}
            />
          ))
      }

    </ul>
  );
}

export default ReviewsListComponent;
