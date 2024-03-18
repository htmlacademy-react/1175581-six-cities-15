import { createAction } from '@reduxjs/toolkit';
import { TCity } from '../types/offers-types';


export const changeCity = createAction<TCity>('changeCity');

