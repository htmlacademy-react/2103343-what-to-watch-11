import cn from 'classnames';
import { useAppDispatch } from '../../hooks';
import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { changeGenre } from '../../store/action';

type GenreListProps = {
  currentGenre: string;
  genres: string[];
}

export default function GenreList({currentGenre, genres}:GenreListProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li
          key={genre}
          className={cn(
            'catalog__genres-item',
            { 'catalog__genres-item--active': genre === currentGenre }
          )}
        >
          <Link
            to="#"
            className="catalog__genres-link"
            onClick={(evt: MouseEvent) => {
              evt.preventDefault();
              dispatch(changeGenre(genre));
            }}
          >
            {genre}
          </Link>
        </li>
      ))}
    </ul>
  );
}
