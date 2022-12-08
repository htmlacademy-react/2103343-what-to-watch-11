import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import { AppRoute, AuthorizationStatus, SIMILAR_COUNT } from '../../const';
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import MovieTabs from '../../components/movie-tabs/movie-tabs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorization, getFilm, getFilmLoading, getReview, getSimilarFilms } from '../../selectors';
import LoadingScreen from '../../components/loading/loading';
import { fetchFilmAction, fetchFilmReviewsAction, fetchSimilarFilmsAction } from '../../store/api-actions';
import { useEffect } from 'react';
import UserBlock from '../../components/user-block/user-block';
import MovieSimilarList from '../../components/movie-similar-list/movie-similar-list';

export default function MovieScreen(): JSX.Element {
  const film = useAppSelector(getFilm);
  const reviews = useAppSelector(getReview);
  const similarFilms = useAppSelector(getSimilarFilms).slice(0, SIMILAR_COUNT);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isFilmLoading = useAppSelector(getFilmLoading);
  const authorizationStatus = useAppSelector(getAuthorization);

  useEffect(() => {

    if (params.id) {
      dispatch(fetchFilmAction(params.id));
      dispatch(fetchFilmReviewsAction(params.id));
      dispatch(fetchSimilarFilmsAction(params.id));
    }

  }, [params.id, dispatch]);

  if (!film) {
    return (
      <Navigate replace to="/404" />
    );
  }
  if (isFilmLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <>
      <section className="film-card film-card--full" style={{background: `${film.backgroundColor}`}}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">

            <Logo/>

            <UserBlock/>

          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(`${AppRoute.Player}/${film.id}`)}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                {authorizationStatus === AuthorizationStatus.Auth && <Link className="btn film-card__button" to={`${AppRoute.Movie}/${film.id}/${AppRoute.AddReview}`}>Add review</Link>}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={`${film.name} poster`} width="218"
                height="327"
              />
            </div>

            <MovieTabs movie={film} reviews={reviews} />

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <MovieSimilarList films={similarFilms}/>

        </section>

        <Footer/>

      </div>
    </>
  );
}
