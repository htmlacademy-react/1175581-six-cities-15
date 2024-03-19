import { useDispatch } from 'react-redux';
import { sort, sortName } from '../../store/action';
import type { TSortValue } from '../sort-list-component/sort-types';
import { SortTypesEnum } from '../../store/reducer';

type SortComponentProps = {
  sortValue: TSortValue;
}

function SortComponent({sortValue}: SortComponentProps): JSX.Element {
  const dispatch = useDispatch();

  return (
    <li
      className="places__option places__option--active"
      data-sort={sortValue.action}
      tabIndex={0}
      onClick={(evt) => {
        const value = (evt.target as HTMLLIElement).dataset;
        dispatch(sort(value.sort as SortTypesEnum));
        dispatch(sortName(sortValue.name));
      }}
    >
      {sortValue.name}
    </li>
  );
}

export default SortComponent;
