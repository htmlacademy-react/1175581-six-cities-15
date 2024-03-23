import { createAction } from '@reduxjs/toolkit';
import { TCity, TOffer } from '../types/offers-types';
import type { SortType } from './reducer';


export const changeCity = createAction<TCity>('changeCity');

export const sort = createAction<SortType>('sort');

export const DisplaySortList = createAction<boolean>('DisplaySortList');

export const loadOffers = createAction<TOffer[]>('loadOffers');

export const setError = createAction<string | null>('setError');


