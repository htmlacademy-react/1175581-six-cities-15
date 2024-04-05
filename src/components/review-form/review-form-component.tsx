import { FormEvent, Fragment, ReactEventHandler, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { sendCommentAction } from '../../store/api-actions';

type TChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

const raitings = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' },
];

function ReviewFormComponent() {
  const [reviewState, setReview] = useState({ rating: 0, review: '' });
  const { rating, review } = reviewState;
  const handleChange: TChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    setReview({ ...reviewState, [name]: value });
  };


  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(sendCommentAction({
      comment: review,
      rating: +rating
    }));

    setReview({ rating: 0, review: '' });
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {raitings.map(({ value, title }) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={value}
              checked={value === +reviewState.rating}
              id={`${value}-stars`}
              type="radio"
              onChange={handleChange}
            />
            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}

      </div>
      <textarea
        className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewState.review}
        onChange={handleChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={rating === 0 || review.length < 50 || review.length > 300}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewFormComponent;
