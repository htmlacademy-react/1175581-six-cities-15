import { TOffer } from '../types/offers-types';
import { sortTypes, type SortingType } from './sort';

export const getsortedOffers = (sortType: SortingType, offers: TOffer[]) => {
  switch (sortType) {
    case sortTypes.LowToHigh:
      return offers.toSorted((a, b) => a.price - b.price);
    case sortTypes.HighToLow:
      return offers.toSorted((a, b) => b.price - a.price);
    case sortTypes.TopRatedFirst:
      return offers.toSorted((a, b) => a.rating - b.rating);
    default:
      return offers;
  }
};

