export const SORT_TYPES = {
  Default: 'Popular',
  LowToHigh: 'Price: low to high',
  HighToLow: 'Price: high to low',
  TopRatedFirst: 'Top rated first'
};

export type SortingType = keyof typeof SORT_TYPES;
