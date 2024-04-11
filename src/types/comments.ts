import { TUser } from './user';


export type TComment = {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;
}

export type TGetComment = {
  comment: string;
  rating: number;
}

export type TReview = {
  id: string;
  date: string;
  user: TUser;
  comment: string;
  rating: number;
}
