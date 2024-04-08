import { useDispatch } from 'react-redux';
import { sort } from '../../store/action';
import { SortingType, sortTypes } from '../../consts/sort';
type SortComponentProps = {
  type: string;
  sortType: SortingType;
}

function SortComponent({ type, sortType }: SortComponentProps): JSX.Element {
  const dispatch = useDispatch();

  return (
    <li
      className="places__option places__option--active"
      tabIndex={0}
      onClick={() => {
        dispatch(sort(sortTypes[type as keyof typeof sortTypes]));
      }}
    >
      {sortType}
    </li>
  );
}

export default SortComponent;
