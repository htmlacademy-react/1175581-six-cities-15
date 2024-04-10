import ReviewComponent from '../review-component/review-component';
import { useAppSelector } from '../../hooks';
import { TComment } from '../../types/data-types';
import dayjs from 'dayjs';
import { getComments } from '../../store/process/comments-process/selectors';


function ReviewsListComponent(): JSX.Element {

  const comments = useAppSelector(getComments);

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
