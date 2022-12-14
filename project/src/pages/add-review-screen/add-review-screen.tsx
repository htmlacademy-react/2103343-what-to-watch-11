import Logo from '../../components/logo/logo';
import { AppRoute } from '../../const';
import AddReview from '../../components/add-review/add-review';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import UserBlock from '../../components/user-block/user-block';
import { getFilm, getFilmStatus } from '../../store/films-data/selectors';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { fetchFilmAction } from '../../store/api-actions';
import { useEffect } from 'react';
import LoadingScreen from '../../components/loading/loading';

export default function AddReviewScreen(): JSX.Element {

  const params = useParams();
  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const isLoading = useAppSelector(getFilmStatus);

  useEffect(() => {
    if (params.id && film?.id.toString() !== params.id) {
      dispatch(fetchFilmAction(params.id));
    }
  }, [dispatch, film?.id, params.id]);

  if (isLoading && film) {
    return <LoadingScreen />;
  }

  if (!film) {
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
