import PlaceCardComponent from '../place-card-component/place-card-component';
import { TOffer } from '../../types/offers-types';
import { useState } from 'react';
import { Nullable } from 'vitest';

type PlaceCardListProps = {
  offers: TOffer[];
}

function PlaceCardListComponent({ offers }: PlaceCardListProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<Nullable<TOffer>>(null);
  const handleHover = (offer?: TOffer) => {
    setActiveCard(offer || null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer: TOffer) => <PlaceCardComponent key={offer.id} offer={offer} handleHover={handleHover} />)
      }
    </div >
  );
}

export default PlaceCardListComponent;
