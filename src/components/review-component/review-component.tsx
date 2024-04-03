import { TComment } from '../../types/offers-types';

type ReviewComponentProps = {
  commentItem: TComment;
}

function ReviewComponent({ commentItem }: ReviewComponentProps): JSX.Element {

  const ratingStars = [
    { value: 1, width: '20%' },
    { value: 2, width: '40%' },
    { value: 3, width: '60%' },
    { value: 4, width: '80%' },
    { value: 5, width: '100%' },
  ];

  const { date, user, comment, rating } = commentItem;

  const ratingStar = ratingStars.find((item) => item.value === rating);

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
            <span style={{ width: ratingStar?.width }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date}>{date}</time>
      </div>
    </li>
  );
}

export default ReviewComponent;
