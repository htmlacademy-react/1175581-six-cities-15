import { setError } from '../../store/action';
import { clearErrorAction } from '../../store/api-actions';
import { store } from '../..';

export const errorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};
