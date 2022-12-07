import { FilmType } from '../../types/types';
import { getRatingCountToName } from '../../utils';

type MovieOverviewProps = {
  movie: FilmType;
}

export default function MovieOverview({movie}: MovieOverviewProps): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{movie.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingCountToName (movie.rating)}</span>
          <span className="film-rating__count">{`${movie.scoresCount} ratings`}</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{movie.description}</p>

        <p className="film-card__director"><strong>{`Director: ${movie.director}`}</strong></p>
        <p className="film-card__starring"><strong>{`Starring: ${movie.starring.join(', ')} and other`}</strong></p>
      </div>
    </>
  );
}
