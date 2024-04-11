import ReviewsComponent from '../../components/reviews-component/reviews-component';
import MapComponent from '../../components/map-component/map-component';
import PlaceCardComponent from '../../components/place-card-component/place-card-component';
import { changeFavoriteAction, fetchCommentsAction, fetchCurrentOfferAction, fetchNearOffersAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import BookMarkComponent from '../../components/book-mark-component/book-mark-component';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts/route-consts';
import OfferPageImageComponent from '../../components/offer-page-image-component/offer-page-image-component';
import PremiumComponent from '../../components/premium-component/premium-component';
import { ratingStars } from '../../consts/rating';
import OfferInsideItemComponent from '../../components/offer-inside-item-component/offer-inside-item-component';
import OfferHostComponent from '../../components/offer-host-component/offer-host-component';
import { getImagesToShow, getRating } from '../../consts/utils';
import { useEffect } from 'react';
import { changeBookMarkFullOffer, clearOffer } from '../../store/process/current-offer-process/current-offer-process';
import { getNearOffersToShow } from '../../store/process/near-process/selectors';
import { getFullOffer } from '../../store/process/current-offer-process/selectors';
import { getComments } from '../../store/process/comments-process/selectors';
import { getAuthStatus } from '../../store/process/user-process/selectors';
import { TOffer } from '../../types/offer';
import { clearComments } from '../../store/process/comments-process/comments-process';
import LoaderComponent from '../../components/loader-component/loader-component';
import { clearNearOffers } from '../../store/process/near-process/near-process';

function OfferPage(): JSX.Element {

  const { id } = useParams();

  const nearOffersToShow = useAppSelector(getNearOffersToShow);
  const fullOffer = useAppSelector(getFullOffer);
  const comments = useAppSelector(getComments);
  const authorizationStatus = useAppSelector(getAuthStatus);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchCurrentOfferAction(id));
      dispatch(fetchNearOffersAction(id));
      dispatch(fetchCommentsAction(id));
    }


    dispatch(clearOffer());
    dispatch(clearNearOffers());
    dispatch(clearComments());


  }, [dispatch, id]);

  if (!fullOffer) {
    return (<LoaderComponent />);
  }

  const { price, title, bedrooms, maxAdults, goods, host, description, isFavorite, isPremium, rating, images } = fullOffer;

  const imagesToShow = getImagesToShow(images);

  const ratingRounded = Math.round(rating);

  const ratingStar = getRating(ratingRounded, ratingStars);

  const handleBookMarkClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth && id) {
      dispatch(changeBookMarkFullOffer(fullOffer));
      dispatch(changeFavoriteAction({ id, isFavorite }));
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
            (
              <OfferPageImageComponent
                key={image}
                image={image}
              />
            )
            )}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {isPremium ?
              <PremiumComponent
                className='offer'
              /> :
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
                <span style={{ width: ratingStar }} />
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
                (
                  <OfferInsideItemComponent
                    key={good}
                    good={good}
                  />)
                )}
              </ul>
            </div>
            <OfferHostComponent
              host={host}
              description={description}
            />
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">Reviews · <span className="reviews__amount">{comments.length}</span></h2>
              <ReviewsComponent
                authorizationStatus={authorizationStatus}
              />
            </section>
          </div>
        </div>
        <MapComponent
          offers={nearOffersToShow}
          city={fullOffer.city}
          className={'offer__map map'}
          currentOffer={fullOffer}
        />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {
              nearOffersToShow.map((offer: TOffer) =>
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
