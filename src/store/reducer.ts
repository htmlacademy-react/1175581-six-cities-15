import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillPlaceCardList } from './action';
import { city, offers } from '../mocks/offers';

const initialState = {
  city: city,
  offers: offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state) => {
    console.log(state);
  });
});

export { reducer };
