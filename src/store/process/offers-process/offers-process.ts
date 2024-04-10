import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SortingType } from '../../../consts/sort';
import { TCity, TOffer } from '../../../types/data-types';
import { fetchOffersAction } from '../../api-actions';
import { cities } from '../../../consts/cities';

export type TOffersState = {
  city: TCity;
  sortType: SortingType;
  isSortOpened: boolean;
  offers: TOffer[];
  isOffersDataLoading: boolean;
  hasErrorOffersLoading: boolean;
}

const initialState: TOffersState = {
  city: cities[0],
  sortType: 'Default',
  isSortOpened: false,
  offers: [],
  isOffersDataLoading: true,
  hasErrorOffersLoading: false,
};

export const offersProcess = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<TCity>) => {
      state.city = action.payload;
    },
    sort: (state, action: PayloadAction<SortingType>) => {
      state.sortType = action.payload;
    },
    displaySort : (state, action: PayloadAction<boolean>) => {
      state.isSortOpened = action.payload;
    },
    changeBookMarkOffers: (state, action: PayloadAction<TOffer>) => {
      const curOffer = action.payload;
      state.offers.map((offer) => {
        if (offer.id === curOffer.id) {
          const flag = offer.isFavorite;
          offer.isFavorite = !flag;
        }
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
        state.hasErrorOffersLoading = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.hasErrorOffersLoading = true;
      });
  }
});

export const { changeCity, sort, displaySort, changeBookMarkOffers } = offersProcess.actions;
