import NotFoundPage from '../not-found-page/not-found-page';
import ReviewsComponent from '../../components/reviews/reviews-component';
import MapComponent from '../../components/map-component/map-component';
import PlaceCardComponent from '../../components/place-card-component/place-card-component';
import { TNearOffer } from '../../types/offers-types';
import { changeStatusAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import BookMarkComponent from '../../components/book-mark-component/book-mark-component';
import { changeBookMarkFullOffer } from '../../store/action';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts/route-consts';
import OfferPageImageComponent from '../../components/offer-page-image-component/offer-page-image-component';
import PremiumComponent from '../../components/premium-component/premium-component';
import { ratingStars } from '../../consts/rating';
import OfferInsideItemComponent from '../../components/offer-inside-item-component/offer-inside-item-component';
import OfferHostComponent from '../../components/offer-host-component/offer-host-component';

function OfferPage(): JSX.Element {

  const nearOffers = useAppSelector((state) => state.nearOffers);
  const nearOffersToShow = [...nearOffers].slice(0, 3);

  const fullOffer = useAppSelector((state) => state.fullOffer);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const comments = useAppSelector((state) => state.comments);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  if (!fullOffer) {
    return (<NotFoundPage />);
  }

  const { price, title, bedrooms, maxAdults, goods, host, description, isFavorite, isPremium, rating, id, images } = fullOffer;

  const imagesToShow = images.slice(0, 6);

  const ratingRounded = Math.round(rating);

  const ratingStar = ratingStars.find((item) => item.value === ratingRounded);

  const handleBookMarkClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(changeBookMarkFullOffer(fullOffer));
      dispatch(changeStatusAction({ id, isFavorite }));
    } else {
      navigate(AppRoute.Login);
    }
  };


  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {imagesToShow.map((image) =>
              <OfferPageImageComponent key={image} image={image} />
            )}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {isPremium ?
              <PremiumComponent className='offer' /> :
              ''}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {title}
              </h1>
              <BookMarkComponent
                isFavorite={isFavorite}
                className={'offer'}
                onBookMarkClick={handleBookMarkClick}
                width={31}
                height={33}
              />
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: ratingStar?.width }} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                Apartment
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {bedrooms} {`Bedroom${bedrooms > 1 ? 's' : ''}`}
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {maxAdults} {`Adult${maxAdults > 1 ? 's' : ''}`}
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">€{price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {goods.map((good) =>
                  <OfferInsideItemComponent key={good} good={good} />
                )}
              </ul>
            </div>
            <OfferHostComponent host={host} description={description} />
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">Reviews · <span className="reviews__amount">{comments.length}</span></h2>
              <ReviewsComponent
                authorizationStatus={authorizationStatus}
              />
            </section>
          </div>
        </div>
        <MapComponent offers={nearOffersToShow} city={fullOffer.city} className={'offer__map map'} currentOffer={fullOffer} />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {
              nearOffersToShow.map((offer: TNearOffer) =>
                (
                  <PlaceCardComponent
                    key={offer.id}
                    offer={offer}
                    block="near-places"
                  />
                ))
            }
          </div>
        </section>
      </div>
    </main>
  );
}

export default OfferPage;
