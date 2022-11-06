import { FilmsType } from '../../types/types';
import MovieCard from '../movie-card/movie-card';
import { useState } from 'react';

type MovieListProps = {
  movies: FilmsType[];
}

export default function MovieList({movies}: MovieListProps): JSX.Element {
  const [activeCard, setActiveCard] = useState(0);

  const handleFilmCardMouseOver = () => {
    setActiveCard(activeCard + 1);
  };

  return (
    <div className="catalog__films-list" onMouseOver={handleFilmCardMouseOver} onMouseOut={() => setActiveCard(0)}>
      {movies.map((movie: FilmsType) => <MovieCard movie={movie} key={movie.id} />)}
    </div>
  );
}
