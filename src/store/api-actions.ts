import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../consts/api';
import { TComment, TFullOffer, TOffer } from '../types/offers-types';
import { AppRoute } from '../consts/route-consts';
import { AuthData, UserData } from '../consts/auth';
import { dropToken, saveToken } from '../services/token';
import { redirectToRoute } from './action';

export const fetchOffersAction = createAsyncThunk<TOffer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TOffer[]>(APIRoute.Offers);
    return data;
  }
);

export const fetchFavoriteAction = createAsyncThunk<TOffer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFavorite',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TOffer[]>(APIRoute.Favorite);
    return data;
  }
);

export const fetchNearOffersAction = createAsyncThunk<TOffer[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchNearOffers',
  async (id, { extra: api }) => {
    const { data } = await api.get<TOffer[]>(`${APIRoute.Offers}/${id}/nearby`);
    return data;
  }
);

export const fetchCurrentOfferAction = createAsyncThunk<TFullOffer, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'getOffer',
  async (id, { extra: api }) => {
    const { data } = await api.get<TFullOffer>(`${APIRoute.Offers}/${id}`);
    return data;
  }
);

export const changeFavoriteAction = createAsyncThunk<TFullOffer, { id: string; isFavorite: boolean }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'changeStatus',
  async ({ id, isFavorite }, { extra: api }) => {
    const { data } = await api.post<TFullOffer>(`${APIRoute.Favorite}/${id}/${+!isFavorite}`);
    return data;
  }
);

export const fetchCommentsAction = createAsyncThunk<TComment[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchComments',
  async (id, { extra: api }) => {
    const { data } = await api.get<TComment[]>(`${APIRoute.Comments}/${id}`);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));
    return data;

  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    window.location.reload();
  }
);


export const sendCommentAction = createAsyncThunk<TComment, { comment: string; rating: number; id: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'sendComment',
  async ({ comment, rating, id }, { dispatch, extra: api }) => {
    const { data } = await api.post<TComment>(`${APIRoute.Comments}/${id}`, { comment, rating });
    dispatch(redirectToRoute(AppRoute.Offer.replace(':id', String(id))));
    return data;
  }
);


