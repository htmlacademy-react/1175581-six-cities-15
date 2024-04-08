import PlaceCardListComponent from '../../components/place-card-list-component/place-card-list-component';
import LocationsListComponent from '../../components/locations-list-component/locations-list-component.tsx';
import MapComponent from '../../components/map-component/map-component';
import SortListComponent from '../../components/sort-list-component/sort-list-component.tsx';

import { useState } from 'react';
import { useAppSelector } from '../../hooks/index.ts';

import { TFullOffer, TOffer } from '../../types/offers-types';
import { cities } from '../../consts/cities.ts';
import NoPlaceCardsComponent from '../../components/no-place-cards/no-place-cards-component.tsx';


function MainPage(): JSX.Element {


  const sortType = useAppSelector((state) => state.sortType);

  const currentCity = useAppSelector((state) => state.city);

  const offers = useAppSelector((state) => state.offers);

  const currentOffers = offers.filter((offer) => offer.city.name === currentCity.name);

  const [selectedOffer, setSelectedOffer] = useState<TOffer | TFullOffer | null>(null);

  const handleOfferHover = (offer?: TOffer): void => {

    setSelectedOffer(offer || null);

  };

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
            <b className="places__found">{currentOffers.length} places to stay in {currentCity.name}</b>
            <SortListComponent />
            {currentOffers.length ?
              <PlaceCardListComponent
                offers={currentOffers}
                sortType={sortType}
                onOfferHover={handleOfferHover}
              /> :
              <NoPlaceCardsComponent />}
          </section>
          <div className="cities__right-section">
            {currentOffers.length ?
              <MapComponent
                offers={currentOffers}
                city={currentCity}
                selectedOffer={selectedOffer}
              /> :
              <section
                className="cities__map map"
              />}
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainPage;

