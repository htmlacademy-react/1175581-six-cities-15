import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../consts/api';
import { loadOffers, redirectToRoute, requireAuthorizationStatus, setComments, setFullOffer, setLoadingOffersStatus, setNewComment } from './action';
import { TComment, TFullOffer, TGetComment, TOffer } from '../types/offers-types';
import { AppRoute, AuthorizationStatus } from '../consts/route-consts';
import { AuthData, UserData } from '../consts/auth';
import { dropToken, saveToken } from '../services/token';

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

export const fetchCommentsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchComments',
  async (_arg, { dispatch, getState, extra: api }) => {

    const state = getState();
    const id = state.fullOffer?.id;
    const { data } = await api.get<TComment[]>(`${APIRoute.Comments}/${id}`);

    dispatch(setComments(data));

  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async ({ email, password }, { dispatch, extra: api }) => {

    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });

    saveToken(data.token);

    dispatch(requireAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));

  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
);

export const getOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'getOffer',
  async (id, { dispatch, extra: api }) => {

    const { data } = await api.get<TFullOffer>(`${APIRoute.Offers}/${id}`);

    dispatch(setFullOffer(data));

    dispatch(redirectToRoute(AppRoute.Offer.replace(':id', String(id))));
  }
);

export const sendCommentAction = createAsyncThunk<void, TGetComment, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'sendComment',
  async ({ comment, rating }, { dispatch, getState, extra: api }) => {

    const state = getState();

    const id = state.fullOffer?.id;

    const { data } = await api.post<TComment>(`${APIRoute.Comments}/${id}`, { comment, rating });

    dispatch(setNewComment(data));

    dispatch(redirectToRoute(AppRoute.Offer.replace(':id', String(id))));
  }
);


