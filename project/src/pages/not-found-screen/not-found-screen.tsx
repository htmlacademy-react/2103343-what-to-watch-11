import {Link} from 'react-router-dom';
import Logo from '../../components/logo/logo';

export default function NotFoundScreen (): JSX.Element {
  return(
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
      </header>

      <div className="user-page__title">
        <h1 className="user-page__head">404. Page not found</h1>
        <Link to="/" className="sign-in__link">Вернуться на главную</Link>
      </div>

    </div>
  );
}
