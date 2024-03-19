import { createAction } from '@reduxjs/toolkit';
import { TCity } from '../types/offers-types';
import { SortTypesEnum } from './reducer';


export const changeCity = createAction<TCity>('changeCity');

export const sort = createAction<SortTypesEnum>('sort');

export const sortList = createAction<boolean>('sortList');

export const sortName = createAction<string>('sortName');

