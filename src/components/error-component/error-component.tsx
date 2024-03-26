import { useAppSelector } from '../../hooks';

function ErrorComponent(): JSX.Element | null {

  const error = useAppSelector((state) => state.error);

  return (error ? <div>{error}</div> : null);

}

export default ErrorComponent;

