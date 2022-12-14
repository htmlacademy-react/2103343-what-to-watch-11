import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import { AppRoute, AuthorizationStatus, SIMILAR_COUNT } from '../../const';
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import MovieTabs from '../../components/movie-tabs/movie-tabs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LoadingScreen from '../../components/loading/loading';
import { fetchFavoriteFilmsAction, fetchFilmAction, fetchFilmReviewsAction, fetchSimilarFilmsAction } from '../../store/api-actions';
import { useEffect } from 'react';
import UserBlock from '../../components/user-block/user-block';
import MovieSimilarList from '../../components/movie-similar-list/movie-similar-list';
import { getFilm, getFilmReviews, getFilmReviewsStatus, getFilmStatus, getSimilarFilms, getSimilarFilmsStatus } from '../../store/films-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import FavoriteButton from '../../components/favorite-button/favorite-button';

export default function MovieScreen(): JSX.Element {

  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {

    if (params.id) {
      dispatch(fetchFilmAction(params.id));
      dispatch(fetchFilmReviewsAction(params.id));
      dispatch(fetchSimilarFilmsAction(params.id));
      if (authorizationStatus === AuthorizationStatus.Auth) {
        dispatch(fetchFavoriteFilmsAction());
      }
    }

  }, [params.id, dispatch, authorizationStatus]);

  const film = useAppSelector(getFilm);
  const reviews = useAppSelector(getFilmReviews);
  const similarFilms = useAppSelector(getSimilarFilms).slice(0, SIMILAR_COUNT);

  const isFilmLoading = useAppSelector(getFilmStatus);
  const isReviewsLoading = useAppSelector(getFilmReviewsStatus);
  const isSimilarFilmsLoading = useAppSelector(getSimilarFilmsStatus);


  if (!film) {
    return (
      <Navigate replace to="/404" />
    );
  }
  if (isFilmLoading || isReviewsLoading || isSimilarFilmsLoading) {
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
                <FavoriteButton filmId={film.id}/>
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

            <MovieTabs film={film} reviews={reviews} />

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
