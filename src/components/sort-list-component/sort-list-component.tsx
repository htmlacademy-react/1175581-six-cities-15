import SortComponent from '../sort-component/sort-component';
import { useAppSelector } from '../../hooks';
import { useDispatch } from 'react-redux';
import { DisplaySortList } from '../../store/action';
import { SortingType, sortTypes } from '../../consts/sort';

function SortListComponent(): JSX.Element {

  let isSortOpened = useAppSelector((state) => state.isSortOpened);
  const sortName = useAppSelector((state) => state.sortType);
  const dispatch = useDispatch();

  const showSort = () => {
    isSortOpened = true;
    dispatch(DisplaySortList(isSortOpened));
  };


  const closeSort = () => {
    isSortOpened = false;
    dispatch(DisplaySortList(isSortOpened));
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
          Object.entries(sortTypes).map(([key, sortType]) => (<SortComponent key={key} sortType={sortType as SortingType} type={key}/>))
        }
      </ul>
    </form>
  );
}

export default SortListComponent;
