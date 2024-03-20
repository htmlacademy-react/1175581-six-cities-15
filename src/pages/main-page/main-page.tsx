import PlaceCardListComponent from '../../components/place-card-list-component/place-card-list-component';
import LocationsListComponent from '../../components/locations-list-component/locations-list-component.tsx';
import MapComponent from '../../components/map-component/map-component';
import SortListComponent from '../../components/sort-list-component/sort-list-component.tsx';

import { useState } from 'react';
import { useAppSelector } from '../../hooks/index.ts';

import { TOffer } from '../../types/offers-types';
import { cities } from '../../consts/cities.ts';
import { sortTypes } from '../../consts/sort.ts';


function MainPage(): JSX.Element {

  const sortType = useAppSelector((state) => state.sortType.value);

  const currentCity = useAppSelector((state) => state.city);

  const offers = useAppSelector((state) => state.offers);

  const currentOffers = offers.filter((offer) => offer.city.name === currentCity.name);

  const [selectedOffer, setSelectedOffer] = useState<TOffer | null>(null);

  const handleOfferHover = (offer?: TOffer): void => {

    setSelectedOffer(offer || null);

  };

  let filteredOffers = JSON.parse(JSON.stringify(currentOffers)) as TOffer[];


  switch (sortType) {
    case sortTypes.LowToHigh.value:
      filteredOffers.sort((a, b) => a.price - b.price);
      break;
    case sortTypes.HighToLow.value:
      filteredOffers.sort((a, b) => b.price - a.price);
      break;
    case sortTypes.TopRatedFirst.value:
      filteredOffers.sort((a, b) => a.rating - b.rating);
      break;
    default:
      filteredOffers = currentOffers;
  }

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <LocationsListComponent cities={cities} currentCity={currentCity} />
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{filteredOffers.length} places to stay in {currentCity.name}</b>
            <SortListComponent />
            <PlaceCardListComponent
              offers={filteredOffers}
              onOfferHover={handleOfferHover}
            />
          </section>
          <div className="cities__right-section">
            <MapComponent offers={filteredOffers} city={currentCity} selectedOffer={selectedOffer} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainPage;

