import { TOffer, TCity } from '../../types/offers-types';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from './../../consts/leaflet.js';
import useMap from './useMap.tsx';
import leaflet, { LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';

type MapComponentProps = {
  className?: string;
  offers: TOffer[];
  city: TCity;
  selectedOffer?: TOffer | null;
}

function MapComponent({ offers, city, selectedOffer, className }: MapComponentProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

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
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
      markerLayer.current.addTo(map);
      markerLayer.current.clearLayers();
    }
  }, [city, map]);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: selectedOffer && offer.id === selectedOffer.id ? currentCustomIcon : defaultCustomIcon
          })
          .addTo(map);
      });
    }
  }, [city.location.latitude, city.location.longitude, city.location.zoom, currentCustomIcon, defaultCustomIcon, map, offers, selectedOffer]);

  return (
    <section
      className={className ? className : 'cities__map map'}
      ref={mapRef}
    />
  );
}

export default MapComponent;
