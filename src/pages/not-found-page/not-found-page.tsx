import { Link } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <main className="page__main page__main--index">
      <div className="container">
        <h1>404 Page not found</h1>
        <Link to="/">Вернуться на главную</Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
