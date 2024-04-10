export const sortTypes = {
  Default: 'Popular',
  LowToHigh: 'Price: low to high',
  HighToLow: 'Price: high to low',
  TopRatedFirst: 'Top rated first'
};

export type SortingType = keyof typeof sortTypes;
