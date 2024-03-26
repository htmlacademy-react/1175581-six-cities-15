import axios, {AxiosInstance} from 'axios';
import { StatusCodes } from 'http-status-codes';

export const StatusCodesMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities';

const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT
  });
  return api;
};
