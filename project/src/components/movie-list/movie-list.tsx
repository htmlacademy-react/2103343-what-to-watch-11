import { useEffect, useState } from 'react';
import { GENRE_DEFAULT, SHOW_MORE_COUNT } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmsAction } from '../../store/api-actions';
import { getFilms } from '../../store/films-data/selectors';
import { getGenre } from '../../store/films-process/selectors';
import { FilmType } from '../../types/types';
import MovieCard from '../movie-card/movie-card';

export default function MovieList(): JSX.Element {
  const dispatch = useAppDispatch();
  const films = useAppSelector(getFilms);
  const genge = useAppSelector(getGenre);
  const isAllGenre = genge === GENRE_DEFAULT;

  useEffect(() => {
    if (films.length <= 0) {
      dispatch(fetchFilmsAction());
    }
  }, [films, dispatch]);

  const preparedFilms = isAllGenre
    ? films
    : films.filter((film) => film.genre === genge);

  const [renderedFilms, setRenderedFilms] = useState<number>(Math.min(preparedFilms.length, SHOW_MORE_COUNT));

  const showMoreHandler = () => setRenderedFilms(Math.min(preparedFilms.length, renderedFilms + SHOW_MORE_COUNT));

  useEffect(() => setRenderedFilms(Math.min(preparedFilms.length, SHOW_MORE_COUNT)), [preparedFilms.length, genge]);

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
