import { Films } from '../../types/types';
import MovieCard from '../movie-card/movie-card';

type FilmsListProps = {
  films: Films;
}

export default function MovieSimilarList ({ films }: FilmsListProps): JSX.Element {

  return (
    <div className="catalog__films-list" >
      {films.map((film) => <MovieCard key={film.id} film={film} />)}
    </div>
  );
}
