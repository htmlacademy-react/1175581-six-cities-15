import ReviewComponent from '../review-component/review-component';
import { useAppSelector } from '../../hooks';
import { TComment } from '../../types/offers-types';


function ReviewsListComponent(): JSX.Element {

  const comments = useAppSelector((state) => state.comments);

  return (
    <ul className="reviews__list">
      {
        comments.map((commentItem: TComment) =>
          (
            <ReviewComponent
              key={commentItem.id}
              commentItem={commentItem}
            />
          ))
      }

    </ul>
  );
}

export default ReviewsListComponent;
