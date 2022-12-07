import { useEffect, useState } from 'react';
import { GENRE_DEFAULT, SHOW_MORE_COUNT } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCurrentGenre, getFilms } from '../../selectors';
import { FilmsType } from '../../types/types';
import MovieCard from '../movie-card/movie-card';

export default function MovieList(): JSX.Element {
  const movies = useAppSelector(getFilms);
  const genge = useAppSelector(getCurrentGenre);
  const isAllGenre = genge === GENRE_DEFAULT;

  const preparedMovies = isAllGenre
    ? movies
    : movies.filter((movie) => movie.genre === genge);

  const [renderedMovies, setRenderedMovies] = useState<number>(Math.min(preparedMovies.length, SHOW_MORE_COUNT));

  const showMoreHandler = () => setRenderedMovies(Math.min(preparedMovies.length, renderedMovies + SHOW_MORE_COUNT));

  useEffect(() => setRenderedMovies(Math.min(preparedMovies.length, SHOW_MORE_COUNT)), [genge]);

  return (
    <>
      <div className="catalog__films-list">
        {preparedMovies.slice(0, renderedMovies).map((movie: FilmsType) => <MovieCard movie={movie} key={movie.id} />)}
      </div>
      {renderedMovies < preparedMovies.length ?
        <div className="catalog__more">
          <button className="catalog__button" type="button" onClick={showMoreHandler}>Show more</button>
        </div> : null}
    </>
  );
}
