import { SortTypes } from '../../store/reducer';
import type { TSortValue } from './sort-types';
import SortComponent from '../sort-component/sort-component';
import { useAppSelector } from '../../hooks';
import { useDispatch } from 'react-redux';
import { sortList } from '../../store/action';

function SortListComponent(): JSX.Element {

  let isSortOpened = useAppSelector((state) => state.isSortOpened);
  const sortName = useAppSelector((state) => state.sortName);
  const dispatch = useDispatch();

  const showSort = () => {
    isSortOpened = true;
    dispatch(sortList(isSortOpened));
  };


  const closeSort = () => {
    isSortOpened = false;
    dispatch(sortList(isSortOpened));
  };


  const sortValues: TSortValue[] = [
    {
      name: 'Popular',
      action: SortTypes.Default
    },
    {
      name: 'Price: low to high',
      action: SortTypes.LowToHigh
    },
    {
      name: 'Price: high to low',
      action: SortTypes.HighToLow
    },
    {
      name: 'Top rated first',
      action: SortTypes.TopRatedFirst
    }
  ];

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={showSort}
      >
        {sortName}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isSortOpened ? 'places__options--opened' : 'places__options'}`}
        onClick={closeSort}
      >
        {
          sortValues.map((sortValue: TSortValue) =>
            (
              <SortComponent key={sortValue.name} sortValue={sortValue} />
            ))
        }
      </ul>
    </form>
  );
}

export default SortListComponent;
