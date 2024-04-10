import { createAction } from '@reduxjs/toolkit';
import { AppRoute} from '../consts/route-consts';

export const redirectToRoute = createAction<AppRoute | string>('redirectToRoute');


