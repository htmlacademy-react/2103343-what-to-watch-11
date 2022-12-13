import {FilmType} from '../../types/types';
import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import VideoPlayer from '../video-player/video-player';

type MovieCardProps = {
  film: FilmType;
}

export default function MovieCard ({film}: MovieCardProps): JSX.Element {
  const [activeCard, setActiveCard] = useState(false);

  const handleFilmCardMouseOver = () => {
    setActiveCard(true);
  };

  return (
    <article className="small-film-card catalog__films-card" id={film.id.toString()} onMouseOver={handleFilmCardMouseOver} onMouseOut={() => setActiveCard(false)} data-testid="film">
      <div className="small-film-card__image">
        {
          activeCard
            ? <VideoPlayer movie={film} isPlaying={activeCard} />
            : <img src={film.previewImage} alt={film.name} width="280" height="175" />
        }
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.Movie}/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
}
