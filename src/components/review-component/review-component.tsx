
import { ratingStars } from '../../consts/rating';
import { TComment } from '../../types/offers-types';
import { getFormatedDate, getRating } from '../../consts/utils';

type ReviewComponentProps = {
  commentItem: TComment;
}

function ReviewComponent({ commentItem }: ReviewComponentProps): JSX.Element {

  const { date, user, comment, rating } = commentItem;

  const formatedDate = getFormatedDate(date);

  const ratingStar = getRating(rating, ratingStars);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width={54} height={54} alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: ratingStar }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date}>{formatedDate}</time>
      </div>
    </li>
  );
}

export default ReviewComponent;
