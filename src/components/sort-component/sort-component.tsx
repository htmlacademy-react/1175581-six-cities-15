import { useDispatch } from 'react-redux';
import { sort } from '../../store/action';
import { sortTypes } from '../../consts/sort';
import type { SortType } from '../../store/reducer';

type SortComponentProps = {
  type: string;
  sortType: SortType;
}

function SortComponent({ type, sortType }: SortComponentProps): JSX.Element {
  const dispatch = useDispatch();

  return (
    <li
      className="places__option places__option--active"
      tabIndex={0}
      onClick={() => {
        dispatch(sort(sortTypes[type as keyof typeof sortTypes] as SortType));
      }}
    >
      {sortType.name}
    </li>
  );
}

export default SortComponent;
