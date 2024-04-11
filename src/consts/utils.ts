import dayjs from 'dayjs';

import { TRatingStar } from './rating';
import { sortTypes, type SortingType } from './sort';
import { TOffer } from '../types/offer';

export const getsortedOffers = (sortType: SortingType, offers: TOffer[]) => {
  switch (sortType) {
    case sortTypes.LowToHigh:
      return offers.toSorted((a, b) => a.price - b.price);
    case sortTypes.HighToLow:
      return offers.toSorted((a, b) => b.price - a.price);
    case sortTypes.TopRatedFirst:
      return offers.toSorted((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};


export const getImagesToShow = (images: string[]) => [...images].slice(0, 6);

export const getRating = (ratingRounded: number, ratingStars : TRatingStar[]) => ratingStars.find((item) => item.value === ratingRounded)?.width;

export const getFormatedDate = (date: string) => dayjs(date).format('MMMM YYYY');
