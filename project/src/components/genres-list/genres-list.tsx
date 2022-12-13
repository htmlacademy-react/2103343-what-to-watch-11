import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { getGenres } from '../../utils';
import { getGenre } from '../../store/films-process/selectors';
import { getFilms } from '../../store/films-data/selectors';
import { setGenre } from '../../store/films-process/films-process';

export default function GenreList(): JSX.Element {

  const dispatch = useAppDispatch();
  const films = useAppSelector(getFilms);
  const currentGenre = useAppSelector(getGenre);
  const genres = useMemo(() => getGenres(films), [films]);

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li
          key={genre}
          data-testid="genre"
          className={cn(
            'catalog__genres-item',
            { 'catalog__genres-item--active': genre === currentGenre }
          )}
        >
          <Link
            to="#"
            className="catalog__genres-link"
            onClick={() => {
              dispatch(setGenre(genre));
            }}
          >
            {genre}
          </Link>
        </li>
      ))}
    </ul>
  );
}
