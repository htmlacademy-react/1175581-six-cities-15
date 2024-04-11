import { createAction } from '@reduxjs/toolkit';
import { AppRoute} from '../consts/routeConsts';

export const redirectToRoute = createAction<AppRoute | string>('redirectToRoute');


