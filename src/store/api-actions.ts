import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../consts/api';
import { addFavorite, loadOffers, redirectToRoute, removeFavorite, requireAuthorizationStatus, setComments, setFavorites, setFullOffer, setLoadingOffersStatus, setNearOffers, setNewComment, setUser } from './action';
import { TComment, TFullOffer, TGetComment, TNearOffer, TOffer } from '../types/offers-types';
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

export const fetchFavoriteAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFavorite',
  async (_arg, { dispatch, extra: api }) => {

    const { data } = await api.get<TOffer[]>(APIRoute.Favorite);
    dispatch(setFavorites(data));
  }
);

export const fetchNearOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchNearOffers',
  async (id, { dispatch, extra: api }) => {

    const { data } = await api.get<TNearOffer[]>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(setNearOffers(data));
  }
);

export const changeStatusAction = createAsyncThunk<void, { id: string; isFavorite: boolean }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'changeStatus',
  async ({ id, isFavorite }, { dispatch, getState, extra: api }) => {
    const state = getState();
    const {data} = await api.post<TFullOffer>(`${APIRoute.Favorite}/${id}/${+!isFavorite}`);
    const favoriteOffer = state.offers.find((offer) => offer.id === data.id);
    if(data.isFavorite && favoriteOffer) {
      dispatch(addFavorite(favoriteOffer));
    } else if (favoriteOffer) {
      dispatch(removeFavorite(favoriteOffer));
    }
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
      const { data } = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUser(data));
      dispatch(fetchFavoriteAction());
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
    dispatch(setUser(data));
    dispatch(fetchFavoriteAction());
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
    dispatch(setUser(null));
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


