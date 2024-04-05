import { Link, useNavigate } from 'react-router-dom';
import { TOffer } from '../../types/offers-types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeStatusAction, fetchCommentsAction, fetchNearOffersAction, getOfferAction } from '../../store/api-actions';
import BookMarkComponent from '../book-mark-component/book-mark-component';
import { AppRoute, AuthorizationStatus } from '../../consts/route-consts';
import { changeBookMarkNearOffers, changeBookMarkOffers } from '../../store/action';
import PremiumComponent from '../premium-component/premium-component';
import { ratingStars } from '../../consts/rating';


type PlaceCardProps = {
  offer: TOffer;
  block: string;
  handleOfferHover?: (offer?: TOffer) => void;
}


function PlaceCardComponent({ offer, block, handleOfferHover }: PlaceCardProps): JSX.Element {
  const { price, title, type, id, isFavorite, isPremium, rating } = offer;

  const ratingRounded = Math.round(rating);

  const ratingStar = ratingStars.find((item) => item.value === ratingRounded);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userStatus = useAppSelector((state) => state.authorizationStatus);

  const handleMouseOn = () => {
    handleOfferHover?.(offer);
  };

  const handleMouseOff = () => {
    handleOfferHover?.();
  };


  const handleOfferClick = (data: string) => {
    dispatch(getOfferAction(data));
    dispatch(fetchNearOffersAction(id));
    dispatch(fetchCommentsAction());
  };


  const handleBookMarkClick = () => {
    if (userStatus === AuthorizationStatus.Auth) {
      if (block === 'near-places') {
        dispatch(changeBookMarkNearOffers(offer));
      }
      dispatch(changeBookMarkOffers(offer));
      dispatch(changeStatusAction({ id, isFavorite }));
    } else {
      navigate(AppRoute.Login);
    }
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
        {isPremium ? <PremiumComponent className='place-card'/> : ''}
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
              <span style={{ width: ratingStar?.width }} />
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
