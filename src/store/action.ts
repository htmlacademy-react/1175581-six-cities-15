import { createAction } from '@reduxjs/toolkit';
import { TCity } from '../types/offers-types';
import type { SortType } from './reducer';


export const changeCity = createAction<TCity>('changeCity');

export const sort = createAction<SortType>('sort');

export const sortList = createAction<boolean>('sortList');


