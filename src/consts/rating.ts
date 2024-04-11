export type TRatingStar = {
  value: number;
  width: string;
}

export const RATING_STARS : TRatingStar[] = [
  { value: 1, width: '20%' },
  { value: 2, width: '40%' },
  { value: 3, width: '60%' },
  { value: 4, width: '80%' },
  { value: 5, width: '100%' },
];
