import { createReducer } from '@reduxjs/toolkit';
import { changeCity } from './action';
import { offers } from '../mocks/offers';
import { cities } from '../consts/cities';
import { TOffer, TCity } from '../types/offers-types';


type OffersState = {
  city: TCity;
  offers: TOffer[];
}

const initialState: OffersState = {
  city: cities[0],
  offers: offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    });
});

export { reducer };
