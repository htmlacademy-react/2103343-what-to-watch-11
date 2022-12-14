import Logo from '../../components/logo/logo';
import { AppRoute } from '../../const';
import AddReview from '../../components/add-review/add-review';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import UserBlock from '../../components/user-block/user-block';
import { getFilm } from '../../store/films-data/selectors';
import NotFoundScreen from '../not-found-screen/not-found-screen';

export default function AddReviewScreen(): JSX.Element {

  const film = useAppSelector(getFilm);

  if (film === undefined) {
    return (
      <NotFoundScreen />
    );
  }
  return (
    <section className="film-card film-card--full" style={{background: `${film.backgroundColor}`}}>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">

          <Logo/>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.Movie}/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link">Add review</span>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={`${film.name} poster`} width="218"
            height="327"
          />
        </div>
      </div>

      <div className="add-review">
        <AddReview />
      </div>
    </section>
  );
}
