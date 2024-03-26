import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../consts/api';
import { loadOffers, setError, setLoadingOffersStatus } from './action';
import { TOffer } from '../types/offers-types';
import { TIME_SHOW_ERROR } from '../consts/error';
import { store } from '..';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setLoadingOffersStatus(true));
    const { data } = await api.get<TOffer[]>(APIRoute.Offers);
    dispatch(loadOffers(data));
    dispatch(setLoadingOffersStatus(false));
  }
);

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(() => store.dispatch(setError(null)),
      TIME_SHOW_ERROR
    );
  }
);
