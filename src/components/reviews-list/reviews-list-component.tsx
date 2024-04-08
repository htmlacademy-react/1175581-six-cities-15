import ReviewComponent from '../review-component/review-component';
import { useAppSelector } from '../../hooks';
import { TComment } from '../../types/offers-types';
import dayjs from 'dayjs';


function ReviewsListComponent(): JSX.Element {

  const comments = useAppSelector((state) => state.comments);

  const commentsToShow = comments
    .toSorted((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf())
    .slice(0, 10);

  return (
    <ul className="reviews__list">
      {
        commentsToShow.map((commentItem: TComment) =>
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
