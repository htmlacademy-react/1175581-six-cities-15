import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchCurrentOfferAction } from '../../api-actions';
import { TFullOffer } from '../../../types/current-offer';

export type TCurrentOfferState = {
  fullOffer: TFullOffer| null;
  isOfferDataLoading: boolean;
  hasErrorOfferLoading: boolean;
  hasErrorNearOffersLoading: boolean;
}

const initialState: TCurrentOfferState = {
  fullOffer: null,
  isOfferDataLoading: true,
  hasErrorOfferLoading: false,
  hasErrorNearOffersLoading: false,
};

export const currentOfferProcess = createSlice({
  name: 'currentOffer',
  initialState,
  reducers: {
    clearOffer: (state) => {
      state.fullOffer = null;
    },
    changeBookMarkFullOffer: (state, action: PayloadAction<TFullOffer>) => {
      const curOffer = action.payload;
      if(state.fullOffer?.id === curOffer.id) {
        const flag = state.fullOffer.isFavorite;
        state.fullOffer.isFavorite = !flag;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentOfferAction.pending, (state) => {
        state.isOfferDataLoading = true;
        state.hasErrorOfferLoading = false;
      })

      .addCase(fetchCurrentOfferAction.fulfilled, (state, action) => {
        state.fullOffer = action.payload;
        state.isOfferDataLoading = false;
      })

      .addCase(fetchCurrentOfferAction.rejected, (state) => {
        state.isOfferDataLoading = false;
        state.hasErrorOfferLoading = true;
      });

  }
});

export const { clearOffer, changeBookMarkFullOffer } = currentOfferProcess.actions;
