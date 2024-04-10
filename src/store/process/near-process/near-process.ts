import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOffer } from '../../../types/offers-types';
import { fetchNearOffersAction } from '../../api-actions';

export type TNearOffersState = {
  nearOffers: TOffer[];
  isSetNearOffersDataSending: boolean;
  isNearOffersDataLoading: boolean;
  hasErrorNearOffersLoading: boolean;
  hasErrorNearOfferSending: boolean;
}

const initialState: TNearOffersState = {
  nearOffers: [],
  isSetNearOffersDataSending: false,
  isNearOffersDataLoading: true,
  hasErrorNearOffersLoading: false,
  hasErrorNearOfferSending: false,
};

export const nearProcess = createSlice({
  name: 'near',
  initialState,
  reducers: {
    clearNearOffers: (state) => {
      state.nearOffers = [];
    },
    changeBookMarkNearOffers: (state, action: PayloadAction<TOffer>) => {
      const curOffer = action.payload;
      state.nearOffers.map((offer) => {
        if (offer.id === curOffer.id) {
          const flag = offer.isFavorite;
          offer.isFavorite = !flag;
        }
      });
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNearOffersAction.pending, (state) => {
        state.isNearOffersDataLoading = true;
        state.hasErrorNearOffersLoading = false;
      })
      .addCase(fetchNearOffersAction.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
        state.isNearOffersDataLoading = false;
      })
      .addCase(fetchNearOffersAction.rejected, (state) => {
        state.isNearOffersDataLoading = false;
        state.hasErrorNearOffersLoading = true;
      });
  }
});

export const { clearNearOffers, changeBookMarkNearOffers } = nearProcess.actions;
