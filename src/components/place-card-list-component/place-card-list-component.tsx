import PlaceCardComponent from '../place-card-component/place-card-component';
import { TOffer } from '../../types/offers-types';

type PlaceCardListProps = {
  offers: TOffer[];
  onOfferHover: (offer?: TOffer) => void;
}

function PlaceCardListComponent({ offers, onOfferHover }: PlaceCardListProps): JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer: TOffer) =>
          (
            <PlaceCardComponent
              key={offer.id}
              offer={offer}
              handleOfferHover={onOfferHover}
              block="cities"
            />
          ))
      }
    </div >
  );
}

export default PlaceCardListComponent;
