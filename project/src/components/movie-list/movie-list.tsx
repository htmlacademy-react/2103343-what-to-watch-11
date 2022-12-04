import { FilmsType } from '../../types/types';
import MovieCard from '../movie-card/movie-card';

type MovieListProps = {
  movies: FilmsType[];
}

export default function MovieList({movies}: MovieListProps): JSX.Element {

  return (
    <div className="catalog__films-list">
      {movies.map((movie: FilmsType) => <MovieCard movie={movie} key={movie.id} />)}
    </div>
  );
}
