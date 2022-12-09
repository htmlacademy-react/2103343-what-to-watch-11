import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { FilmType } from '../../types/types';
import { getFilms } from '../../selectors';

export default function PlayerScreen(): JSX.Element {

  const films = useAppSelector(getFilms);
  const params = useParams();
  const navigate = useNavigate();

  const film = films.find((elem: FilmType) => elem.id.toString() === params.id);
  if (!film) {
    return (
      <Navigate replace to="/404" />
    );
  }
  return (
    <div className="player">
      <video src="#" className="player__video" poster={film.backgroundImage}></video>

      <button type="button" className="player__exit" onClick={() => navigate(`${AppRoute.Movie}/${film.id}`)}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">{film.runTime}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{film.name}</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
