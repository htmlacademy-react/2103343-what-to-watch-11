import { useEffect, useState } from 'react';
import { GENRE_DEFAULT, SHOW_MORE_COUNT } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCurrentGenre, getFilms } from '../../selectors';
import { FilmType } from '../../types/types';
import MovieCard from '../movie-card/movie-card';

export default function MovieList(): JSX.Element {
  const films = useAppSelector(getFilms);
  const genge = useAppSelector(getCurrentGenre);
  const isAllGenre = genge === GENRE_DEFAULT;

  const preparedFilms = isAllGenre
    ? films.data
    : films.data.filter((film) => film.genre === genge);

  const [renderedFilms, setRenderedFilms] = useState<number>(Math.min(preparedFilms.length, SHOW_MORE_COUNT));

  const showMoreHandler = () => setRenderedFilms(Math.min(preparedFilms.length, renderedFilms + SHOW_MORE_COUNT));

  useEffect(() => setRenderedFilms(Math.min(preparedFilms.length, SHOW_MORE_COUNT)), [genge]);

  return (
    <>
      <div className="catalog__films-list">
        {preparedFilms.slice(0, renderedFilms).map((film: FilmType) => <MovieCard film={film} key={film.id} />)}
      </div>
      {renderedFilms < preparedFilms.length ?
        <div className="catalog__more">
          <button className="catalog__button" type="button" onClick={showMoreHandler}>Show more</button>
        </div>
        : null}
    </>
  );
}
