import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import MovieList from '../../components/movie-list/movie-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import GenreList from '../../components/genres-list/genres-list';
import { getGenres, getMovieListByGenre } from '../../utils';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import { setIncrementFilmsInList } from '../../store/action';
import { getCurrentGenre, getFilms, getIncrement } from '../../selectors';

type MainScreenProps = {
  title: string;
  genre: string;
  releaseYear: number;
}

export default function MainScreen({title, genre, releaseYear}: MainScreenProps): JSX.Element {

  const movies = useAppSelector(getFilms);
  const renderedFilmsIncrement = useAppSelector(getIncrement);
  const currentGenre = useAppSelector(getCurrentGenre);

  const selectedFilms = useAppSelector((state) => getMovieListByGenre(state.films, currentGenre));
  const renderedFilms = useAppSelector((state) => getMovieListByGenre(state.films, currentGenre)).slice(0, renderedFilmsIncrement);

  const genres = getGenres(movies);
  const dispatch = useAppDispatch();

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">

          <Logo/>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{releaseYear}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList currentGenre={currentGenre} genres={genres}/>

          <MovieList movies={renderedFilms}/>

          <div className="catalog__more">
            {selectedFilms.length > renderedFilms.length &&
              <ShowMoreButton onClick={() => dispatch(setIncrementFilmsInList())}/>}
          </div>
        </section>

        <Footer/>

      </div>
    </>
  );
}

