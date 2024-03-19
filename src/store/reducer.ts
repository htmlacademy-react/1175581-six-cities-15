import { createReducer } from '@reduxjs/toolkit';
import { changeCity, sort, sortList } from './action';
import { offers } from '../mocks/offers';
import { cities } from '../consts/cities';
import { TOffer, TCity } from '../types/offers-types';
import { sortTypes } from '../consts/sort';


export type SortType = {
  name: string;
  value: string;
};

type OffersState = {
  isSortOpened: boolean;
  sortType: SortType;
  city: TCity;
  offers: TOffer[];
}

const initialState: OffersState = {
  isSortOpened: false,
  sortType: sortTypes.Default,
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
    });
});

export { reducer };
