import { Link } from 'react-router-dom';
import { TOffer } from '../../types/offers-types';
import { useAppDispatch } from '../../hooks';
import { getOfferAction } from '../../store/api-actions';

type PlaceCardProps = {
  offer: TOffer;
  block: string;
  handleOfferHover?: (offer?: TOffer) => void;
}


function PlaceCardComponent({ offer, block, handleOfferHover }: PlaceCardProps): JSX.Element {
  const { price, title, type, id } = offer;

  const dispatch = useAppDispatch();

  const handleMouseOn = () => {
    handleOfferHover?.(offer);
  };

  const handleMouseOff = () => {
    handleOfferHover?.();
  };


  const handleOfferClick = (data : string) => {
    dispatch(getOfferAction(data));
  };

  return (
    <Link
      to={'#'}
      onClick={(evt) => {
        evt.preventDefault();
        handleOfferClick(id);
      }}
    >
      <article
        className={`${block}__card place-card`}
        onMouseEnter={handleMouseOn}
        onMouseLeave={handleMouseOff}
      >
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        <div className="cities__image-wrapper place-card__image-wrapper">
          <div>
            <img className="place-card__image" src={offer.previewImage} width={260} height={200} alt="Place image" />
          </div>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">€{price}</b>
              <span className="place-card__price-text">/&nbsp;night</span>
            </div>
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width={18} height={19}>
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{ width: '80%' }} />
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            {title}
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article >
    </Link>
  );
}

export default PlaceCardComponent;
