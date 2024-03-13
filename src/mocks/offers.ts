import { TOffer, TCity } from '../types/offers-types';

export const offers: TOffer[] = [
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f001',
    title: 'Amsterdam-title1',
    type: 'apartment1',
    price: 100,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 11
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 11
    },
    isFavorite: false,
    isPremium: false,
    rating: 4,
    previewImage: 'https://url-to-image/image.png'
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f002',
    title: 'Amsterdam-title1',
    type: 'apartment2',
    price: 110,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3609553943508,
        longitude: 4.85309666406198,
        zoom: 11
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 11
    },
    isFavorite: false,
    isPremium: false,
    rating: 4,
    previewImage: 'https://url-to-image/image.png'
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f003',
    title: 'Amsterdam-title1',
    type: 'apartment3',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.929309666406198,
        zoom: 11
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 11
    },
    isFavorite: false,
    isPremium: false,
    rating: 4,
    previewImage: 'https://url-to-image/image.png'
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f004',
    title: 'Amsterdam-title1',
    type: 'apartment4',
    price: 130,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 11
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 11
    },
    isFavorite: false,
    isPremium: false,
    rating: 4,
    previewImage: 'https://url-to-image/image.png'
  },
];

export const city: TCity = {
  name: 'Amsterdam',
  location: {
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
    zoom: 11
  }
};


