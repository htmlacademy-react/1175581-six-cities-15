import PlaceCardListComponent from '../../components/place-card-list-component/place-card-list-component';
import LocationsListComponent from '../../components/locations-list-component/locations-list-component.tsx';
import MapComponent from '../../components/map-component/map-component';

import { useState } from 'react';
import { useAppSelector } from '../../hooks/index.ts';

import { TOffer } from '../../types/offers-types';
import { cities } from '../../consts/cities.ts';


function MainPage(): JSX.Element {


  const offers = useAppSelector((state) => state.offers);
  const currentCity = useAppSelector((state) => state.city);
  const currentOffers = offers.filter((offer) => offer.city.name === currentCity.name);

  const [selectedOffer, setSelectedOffer] = useState<TOffer | null>(null);

  const handleOfferHover = (offer?: TOffer): void => {

    setSelectedOffer(offer || null);

  };

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <LocationsListComponent cities={cities} currentCity= {currentCity} />
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{currentOffers.length} places to stay in {currentCity.name}</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width={7} height={4}>
                  <use xlinkHref="#icon-arrow-select" />
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                <li className="places__option" tabIndex={0}>Price: low to high</li>
                <li className="places__option" tabIndex={0}>Price: high to low</li>
                <li className="places__option" tabIndex={0}>Top rated first</li>
              </ul>
            </form>
            <PlaceCardListComponent
              offers={currentOffers}
              onOfferHover={handleOfferHover}
            />
          </section>
          <div className="cities__right-section">
            <MapComponent offers={currentOffers} city={currentCity} selectedOffer={selectedOffer} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainPage;

