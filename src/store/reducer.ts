import { createReducer } from '@reduxjs/toolkit';
import { changeCity, sort, sortList, sortName } from './action';
import { offers } from '../mocks/offers';
import { cities } from '../consts/cities';
import { TOffer, TCity } from '../types/offers-types';


export enum SortTypes {
  Default = 'Default',
  LowToHigh = 'LowToHigh',
  HighToLow = 'HighToLow',
  TopRatedFirst = 'TopRatedFirst',
}

export type SortTypesEnum = typeof SortTypes[keyof typeof SortTypes];

type OffersState = {
  isSortOpened: boolean;
  sortType: SortTypesEnum;
  sortName: string;
  city: TCity;
  offers: TOffer[];
}

const initialState: OffersState = {
  isSortOpened: false,
  sortType: SortTypes.Default,
  sortName: 'Popular',
  city: cities[0],
  offers: offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(sort, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(sortList, (state, action) => {
      state.isSortOpened = action.payload;
    })
    .addCase(sortName, (state, action) => {
      state.sortName = action.payload;
    });
});

export { reducer };
