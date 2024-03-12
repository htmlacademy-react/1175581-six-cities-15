import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { TCity } from '../../types/offers-types';
import leaflet from 'leaflet';
import { Map } from 'leaflet';
import { MAIN_TILE, TILE_ATTRIBUTION } from '../../consts/leaflet';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, city:TCity) {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      leaflet
        .tileLayer(
          MAIN_TILE,
          {
            attribution: TILE_ATTRIBUTION,
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}

export default useMap;
