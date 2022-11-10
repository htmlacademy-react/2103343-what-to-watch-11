import {FilmsType} from '../../types/types';
import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import VideoPlayer from '../video-player/video-player';

type MovieCardProps = {
  movie: FilmsType;
}

export default function MovieCard ({movie}: MovieCardProps): JSX.Element {
  const [activeCard, setActiveCard] = useState(false);

  const handleFilmCardMouseOver = () => {
    setActiveCard(true);
  };

  return (
    <article className="small-film-card catalog__films-card" id={movie.id.toString()} onMouseOver={handleFilmCardMouseOver} onMouseOut={() => setActiveCard(false)}>
      <div className="small-film-card__image">
        {
          activeCard
            ? <VideoPlayer movie={movie} isPlaying={activeCard} />
            : <img src={movie.previewImage} alt={movie.name} width="280" height="175" />
        }
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.Movie}/${movie.id}`}>{movie.name}</Link>
      </h3>
    </article>
  );
}
