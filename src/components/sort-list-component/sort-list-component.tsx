import SortComponent from '../sort-component/sort-component';
import { useAppSelector } from '../../hooks';
import { useDispatch } from 'react-redux';

import { SortingType, SORT_TYPES } from '../../consts/sort';
import { displaySort } from '../../store/process/offers-process/offers-process';
import { getIsSortOpened, getSortType } from '../../store/process/offers-process/selectors';

function SortListComponent(): JSX.Element {

  let isSortOpened = useAppSelector(getIsSortOpened);
  const sortName = useAppSelector(getSortType);

  const dispatch = useDispatch();

  const showSort = () => {
    isSortOpened = true;
    dispatch(displaySort(isSortOpened));
  };


  const closeSort = () => {
    isSortOpened = false;
    dispatch(displaySort(isSortOpened));
  };


  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">{'Sort by '}</span>
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
          Object.entries(SORT_TYPES).map(([key, sortType]) => (
            <SortComponent
              key={key}
              sortType={sortType as SortingType}
            />))
        }
      </ul>
    </form>
  );
}

export default SortListComponent;
