import Logo from '../../components/logo/logo';
import { FilmType } from '../../types/types';
import { AppRoute } from '../../const';
import AddReview from '../../components/add-review/add-review';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getFilms } from '../../selectors';

export default function AddReviewScreen(): JSX.Element {

  const movies = useAppSelector(getFilms);
  const params = useParams();

  const movie = movies.find((elem: FilmType) => elem.id.toString() === params.id);
  if (!movie) {
    return (
      <Navigate replace to="/404" />
    );
  }
  return (
    <section className="film-card film-card--full" style={{background: `${movie.backgroundColor}`}}>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={movie.backgroundImage} alt={movie.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">

          <Logo/>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.Movie}/${movie.id}`} className="breadcrumbs__link">{movie.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={movie.posterImage} alt={`${movie.name} poster`} width="218"
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
