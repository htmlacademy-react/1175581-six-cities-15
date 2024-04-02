import NotFoundPage from '../not-found-page/not-found-page';
import ReviewsComponent from '../../components/reviews/reviews-component';
import MapComponent from '../../components/map-component/map-component';
import PlaceCardComponent from '../../components/place-card-component/place-card-component';
import { TNearOffer } from '../../types/offers-types';
import { changeStatusAction} from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import BookMarkComponent from '../../components/book-mark-component/book-mark-component';
import { changeBookMark } from '../../store/action';

function OfferPage(): JSX.Element {

  const nearOffers = useAppSelector((state) => state.nearOffers);
  const nearOffersToShow = [...nearOffers].slice(0, 3);

  const fullOffer = useAppSelector((state) => state.fullOffer);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const dispatch = useAppDispatch();

  if (!fullOffer) {
    return (<NotFoundPage />);
  }

  const { price, title, isFavorite, id } = fullOffer;


  const handleBookMarkClick = () => {
    dispatch(changeStatusAction({ id, isFavorite }));
    dispatch(changeBookMark(fullOffer));
  };


  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            <div className="offer__image-wrapper">
              <img className="offer__image" src="img/room.jpg" alt="Photo studio" />
            </div>
            <div className="offer__image-wrapper">
              <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio" />
            </div>
            <div className="offer__image-wrapper">
              <img className="offer__image" src="img/apartment-02.jpg" alt="Photo studio" />
            </div>
            <div className="offer__image-wrapper">
              <img className="offer__image" src="img/apartment-03.jpg" alt="Photo studio" />
            </div>
            <div className="offer__image-wrapper">
              <img className="offer__image" src="img/studio-01.jpg" alt="Photo studio" />
            </div>
            <div className="offer__image-wrapper">
              <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio" />
            </div>
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            <div className="offer__mark">
              <span>Premium</span>
            </div>
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
                <span style={{ width: '80%' }} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">4.8</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                Apartment
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                3 Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                Max 4 adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">€{price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                <li className="offer__inside-item">
                  Wi-Fi
                </li>
                <li className="offer__inside-item">
                  Washing machine
                </li>
                <li className="offer__inside-item">
                  Towels
                </li>
                <li className="offer__inside-item">
                  Heating
                </li>
                <li className="offer__inside-item">
                  Coffee machine
                </li>
                <li className="offer__inside-item">
                  Baby seat
                </li>
                <li className="offer__inside-item">
                  Kitchen
                </li>
                <li className="offer__inside-item">
                  Dishwasher
                </li>
                <li className="offer__inside-item">
                  Cabel TV
                </li>
                <li className="offer__inside-item">
                  Fridge
                </li>
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width={74} height={74} alt="Host avatar" />
                </div>
                <span className="offer__user-name">
                  Angelina
                </span>
                <span className="offer__user-status">
                  Pro
                </span>
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                </p>
                <p className="offer__text">
                  An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                </p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">Reviews · <span className="reviews__amount">1</span></h2>
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
