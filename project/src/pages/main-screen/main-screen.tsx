import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import MovieList from '../../components/movie-list/movie-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import GenreList from '../../components/genres-list/genres-list';
import UserBlock from '../../components/user-block/user-block';
import { useEffect } from 'react';
import { fetchFavoriteFilmsAction, fetchFilmsAction, fetchPromoFilmAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';
import { getFilms, getPromoFilm } from '../../store/films-data/selectors';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import FavoriteButton from '../../components/favorite-button/favorite-button';

export default function MainScreen(): JSX.Element {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    dispatch(fetchPromoFilmAction());
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteFilmsAction());
    }
  }, [authorizationStatus, dispatch]);

  const promoFilm = useAppSelector(getPromoFilm);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">

          <Logo/>
          <UserBlock />

        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.posterImage} alt={promoFilm.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" onClick={() => navigate(`${AppRoute.Player}/${promoFilm.id}`)} type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <FavoriteButton filmId={promoFilm.id}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList />

          <MovieList />

        </section>

        <Footer/>

      </div>
    </>
  );
}

