import { useDispatch } from 'react-redux';

import { sort } from '../../store/process/offers-process/offers-process';
import { SortingType} from '../../consts/sort';
type SortComponentProps = {
  sortType: SortingType;
}

function SortComponent({ sortType }: SortComponentProps): JSX.Element {
  const dispatch = useDispatch();

  return (
    <li
      className="places__option places__option--active"
      tabIndex={0}
      onClick={() => {
        dispatch(sort(sortType));
      }}
    >
      {sortType}
    </li>
  );
}

export default SortComponent;
