import PlaceCardComponent from '../place-card-component/place-card-component';
import { getsortedOffers } from '../../consts/utils';
import { TOffer } from '../../types/offers-types';
import { SortingType } from '../../consts/sort';

type PlaceCardListProps = {
  offers: TOffer[];
  sortType: SortingType;
  onOfferHover: (offer?: TOffer) => void;
}

function PlaceCardListComponent({ offers, sortType, onOfferHover }: PlaceCardListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        getsortedOffers(sortType, offers).map((offer: TOffer) =>
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
