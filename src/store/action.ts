import { createAction } from '@reduxjs/toolkit';
import { TCity, TOffer } from '../types/offers-types';
import type { SortType } from './reducer';
import { AppRoute, AuthorizationStatus } from '../consts/route-consts';


export const changeCity = createAction<TCity>('changeCity');

export const sort = createAction<SortType>('sort');

export const DisplaySortList = createAction<boolean>('DisplaySortList');

export const loadOffers = createAction<TOffer[]>('loadOffers');

export const setLoadingOffersStatus = createAction<boolean>('true');

export const requireAuthorizationStatus = createAction<AuthorizationStatus>('requireAuthorizationStatus');

export const setError = createAction<string | null>('setError');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');


