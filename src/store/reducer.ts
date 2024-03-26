import { createReducer } from '@reduxjs/toolkit';
import { changeCity, sort, DisplaySortList, loadOffers, setError, setLoadingOffersStatus, requireAuthorizationStatus } from './action';
import { cities } from '../consts/cities';
import { TOffer, TCity } from '../types/offers-types';
import { sortTypes } from '../consts/sort';
import { AuthorizationStatus } from '../consts/route-consts';


export type SortType = {
  name: string;
  value: string;
};

type OffersState = {
  isSortOpened: boolean;
  sortType: SortType;
  city: TCity;
  offers: TOffer[];
  error: string | null;
  loadingOffersStatus: boolean;
  authorizationStatus: AuthorizationStatus;
}

const initialState: OffersState = {
  isSortOpened: false,
  sortType: sortTypes.Default,
  city: cities[0],
  offers: [],
  error: null,
  loadingOffersStatus: true,
  authorizationStatus: AuthorizationStatus.Unknown
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(sort, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(DisplaySortList, (state, action) => {
      state.isSortOpened = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setLoadingOffersStatus, (state, action) => {
      state.loadingOffersStatus = action.payload;
    })
    .addCase(requireAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
