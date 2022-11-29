import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import {FilmsType} from '../../types/types';
import MovieList from '../../components/movie-list/movie-list';
import { useAppSelector } from '../../hooks';
import GenreList from '../../components/genres-list/genres-list';
import { allGenresFilterName } from '../../const';

type MainScreenProps = {
  movies: FilmsType[];
  title: string;
  genre: string;
  releaseYear: number;
}

const getMovieListByGenre = (films: FilmsType[], genre: string) => {
  if (genre === allGenresFilterName) {
    return films;
  }
  return films.filter((film) => film.genre === genre);
};

const getGenres = (films: FilmsType[]): string[] => {
  const genres = new Set(films.map((film) => film.genre));
  return [allGenresFilterName, ...genres];
};

export default function MainScreen(props: MainScreenProps): JSX.Element {

  const currentGenre = useAppSelector((state) => state.genre);
  const selectedFilms = useAppSelector((state) => getMovieListByGenre(state.films, currentGenre));
  const genres = getGenres(props.movies);
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
              <h2 className="film-card__title">{props.title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{props.genre}</span>
                <span className="film-card__year">{props.releaseYear}</span>
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

          <MovieList movies={selectedFilms}/>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <Footer/>

      </div>
    </>
  );
}

