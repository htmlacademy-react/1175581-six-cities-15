import ReviewComponent from '../review-component/review-component';
import { useAppSelector } from '../../hooks';
import { TComment } from '../../types/offers-types';
import dayjs from 'dayjs';


function ReviewsListComponent(): JSX.Element {

  const comments = useAppSelector((state) => state.comments);

  const commentsToShow = [...comments]
    .slice(0, 10)
    .sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());

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
