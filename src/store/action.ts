import { createAction } from '@reduxjs/toolkit';
import { TCity, TComment, TFullOffer, TOffer } from '../types/offers-types';
import type { SortType } from './reducer';
import { AppRoute, AuthorizationStatus } from '../consts/route-consts';
import { UserData } from '../consts/auth';


export const changeCity = createAction<TCity>('changeCity');

export const sort = createAction<SortType>('sort');

export const DisplaySortList = createAction<boolean>('DisplaySortList');

export const loadOffers = createAction<TOffer[]>('loadOffers');

export const setLoadingOffersStatus = createAction<boolean>('true');

export const requireAuthorizationStatus = createAction<AuthorizationStatus>('requireAuthorizationStatus');

export const setError = createAction<string | null>('setError');

export const setFullOffer = createAction<TFullOffer>('fullOffer');

export const setNewComment = createAction<TComment>('setNewComment');

export const setComments = createAction<TComment[]>('setComments');

export const setUser = createAction<UserData | null>('setUser');

export const redirectToRoute = createAction<AppRoute | string>('redirectToRoute');


