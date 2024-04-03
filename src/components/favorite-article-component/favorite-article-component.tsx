import { useAppDispatch } from '../../hooks';
import { changeStatusAction } from '../../store/api-actions';
import { TOffer } from '../../types/offers-types';
import BookMarkComponent from '../book-mark-component/book-mark-component';

type FavoriteArticleProps = {
  currentFavorite: TOffer;
}

function FavoriteArticleComponent({ currentFavorite }: FavoriteArticleProps): JSX.Element {
  const { id, title, type, price, previewImage, isFavorite } = currentFavorite;

  const dispatch = useAppDispatch();

  const handleFavBookMarkClick = () => {
    dispatch(changeStatusAction({id, isFavorite}));
  };

  return (
    <article className="favorites__card place-card">
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={`${previewImage}`} width={150} height={110} alt="Place image" />
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <BookMarkComponent isFavorite={isFavorite} onBookMarkClick={handleFavBookMarkClick} className={'place-card'} width={18} height={19}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: '100%' }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default FavoriteArticleComponent;
