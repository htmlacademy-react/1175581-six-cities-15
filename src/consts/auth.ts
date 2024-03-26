import { Token } from '../services/token';

export type AuthData = {
  email: string;
  password: string;
}

export type UserData = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token : Token;
}
