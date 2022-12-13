import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import LoadingScreen from '../../components/loading/loading';
import { APIRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmAction } from '../../store/api-actions';
import { getFilm, getFilmStatus } from '../../store/films-data/selectors';


export default function PlayerScreen(): JSX.Element {

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useAppDispatch();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isFullscreen, setFullscreen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [durationTime, setDurationTime] = useState(0);

  const progressValue = `${(currentTime / durationTime) * 100}%`;
  const timeLeft = durationTime - currentTime;


  useEffect(() => {

    let isVideoPlayerMounted = true;

    if (params.id && isVideoPlayerMounted) {
      dispatch(fetchFilmAction(params.id));
    }
    return () => {
      isVideoPlayerMounted = false;
    };
  }, [dispatch, params.id]);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if (isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }

    return () => setFullscreen(false);
  }, [isFullscreen]);

  useEffect(() => {
    let isVideoPlayerMounted = true;
    const videoRefCurrentProp = videoRef.current;

    if (videoRefCurrentProp === null) {
      return;
    }

    const handleDurationTimeWatch = () => {
      if (videoRefCurrentProp && isVideoPlayerMounted) {
        setDurationTime(Math.trunc(videoRefCurrentProp.duration));
      }
    };

    const handleCurrentTimeWatch = () => {
      if (videoRefCurrentProp && isVideoPlayerMounted) {
        setCurrentTime(Math.trunc(videoRefCurrentProp.currentTime));
      }
    };

    videoRefCurrentProp.addEventListener('loadeddata', handleDurationTimeWatch);

    videoRefCurrentProp.addEventListener('timeupdate', handleCurrentTimeWatch);

    return () => {
      isVideoPlayerMounted = false;
      videoRefCurrentProp.removeEventListener('loadeddata', handleDurationTimeWatch);
      videoRefCurrentProp.removeEventListener('timeupdate', handleCurrentTimeWatch);
    };
  });

  const film = useAppSelector(getFilm);
  const isFilmLoading = useAppSelector(getFilmStatus);

  if (film === undefined) {
    return (
      <Navigate replace to="/404" />
    );
  }

  const handleExitButtonClick = () => {
    navigate(`${APIRoute.Movies}/${film.id.toString()}`);
    setIsPlaying(false);
  };

  const handlePauseButtonClick = () => {
    if (videoRef.current === null) {
      return;
    }
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const handlePlayButtonClick = () => {
    if (videoRef.current === null) {
      return;
    }
    videoRef.current.play();
    setIsPlaying(true);
  };

  if (isFilmLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className="player">
      <video src={film.videoLink} className="player__video" poster={film.backgroundImage} ref={videoRef} autoPlay></video>

      <button type="button" className="player__exit" onClick={handleExitButtonClick}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={currentTime} max={durationTime}></progress>
            <div className="player__toggler" style={{left: progressValue}}>Toggler</div>
          </div>
          <div className="player__time-value">{timeLeft}</div>
        </div>

        <div className="player__controls-row">
          {isPlaying
            ? (
              <button type="button" className="player__play" onClick={handlePauseButtonClick}>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </button>)
            : (
              <button type="button" className="player__play" onClick={handlePlayButtonClick}>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>)}
          <div className="player__name">{film.name}</div>

          <button type="button" className="player__full-screen" onClick={() => setFullscreen(true)}>
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
