import { TOffer, TCity } from '../../types/offers-types';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from './../../consts/leaflet.js';
import useMap from './useMap.tsx';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';

type MapComponentProps = {
  offers: TOffer[];
  city: TCity;
  selectedOffer: TOffer | null;
}

function MapComponent({ offers, city, selectedOffer }: MapComponentProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);


  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.city.location.latitude,
            lng: offer.city.location.longitude,
          }, {
            icon: selectedOffer !== null && offer.id === selectedOffer.id ? currentCustomIcon : defaultCustomIcon
          })
          .addTo(map);
      });
    }
  }, [map, offers, selectedOffer]);

  return (
    <section
      className="cities__map map"
      ref={mapRef}
    />
  );
}

export default MapComponent;
