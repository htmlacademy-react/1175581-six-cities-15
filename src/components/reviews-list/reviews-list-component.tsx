import ReviewComponent from '../review-component/review-component';

function ReviewsListComponent(): JSX.Element {
  return (
    <ul className="reviews__list">
      <ReviewComponent />
    </ul>
  );
}

export default ReviewsListComponent;
