import { useNavigate } from 'react-router-dom';
import { TOffer } from '../../types/offers-types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import BookMarkComponent from '../book-mark-component/book-mark-component';
import { AppRoute, AuthorizationStatus } from '../../consts/route-consts';
import PremiumComponent from '../premium-component/premium-component';
import { ratingStars } from '../../consts/rating';
import { memo, useCallback } from 'react';
import { getAuthStatus } from '../../selectors/selectors';
import { getRating } from '../../consts/utils';
import { changeBookMarkNearOffers } from '../../store/process/near-process/near-process';
import { changeBookMarkOffers } from '../../store/process/offers-process/offers-process';
import { changeFavoriteAction } from '../../store/api-actions';

type PlaceCardProps = {
  offer: TOffer;
  block: string;
  imgWidth?: number;
  imgHeight?: number;
  handleOfferHover?: (offer?: TOffer) => void;
}


function PlaceCardComponent({ offer, block, imgWidth, imgHeight, handleOfferHover }: PlaceCardProps): JSX.Element {

  const userStatus = useAppSelector(getAuthStatus);
  const { price, title, type, id, isFavorite, isPremium, rating } = offer;
  const ratingRounded = Math.round(rating);
  const ratingStar = getRating(ratingRounded, ratingStars);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const handleMouseOn = useCallback(() => {
    handleOfferHover?.(offer);
  }, [handleOfferHover, offer]);

  const handleMouseOff = useCallback(() => {
    handleOfferHover?.();
  }, [handleOfferHover]);


  const handleOfferClick = useCallback(() => {
    navigate(AppRoute.Offer.replace(':id', String(id)));
  }, [id, navigate]);


  const handleBookMarkClick = () => {
    if (userStatus === AuthorizationStatus.Auth) {
      if (block === 'near-places') {
        dispatch(changeBookMarkNearOffers(offer));
      }
      dispatch(changeBookMarkOffers(offer));
      dispatch(changeFavoriteAction({ id, isFavorite }));
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <article
      className={`${block}__card place-card`}
      onMouseEnter={handleMouseOn}
      onMouseLeave={handleMouseOff}
      onClick={(evt) => {
        evt.preventDefault();
        handleOfferClick();
      }}
    >
      {isPremium ? <PremiumComponent className='place-card' /> : ''}
      <div className={`${block}__image-wrapper place-card__image-wrapper`}>
        <div>
          <img
            className="place-card__image"
            src={offer.previewImage} width={imgWidth ? imgWidth : 260 }
            height={imgHeight ? imgHeight : 200 }
            alt="Place image"
          />
        </div>
      </div>
      <div className={block === 'favorites' ? 'favorites__card-info place-card__info' :
        'place-card__info'}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <BookMarkComponent
            isFavorite={isFavorite}
            onBookMarkClick={handleBookMarkClick}
            className={'place-card'}
            width={18}
            height={19}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingStar }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          {title}
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article >
  );
}

const placeCard = memo(PlaceCardComponent);
export default placeCard;
