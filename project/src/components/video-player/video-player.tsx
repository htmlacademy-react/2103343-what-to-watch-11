import {FilmType} from '../../types/types';
import { useRef, useEffect } from 'react';

type VideoPlayerProps = {
  movie: FilmType;
  isPlaying: boolean;
}

export default function VideoPlayer ({isPlaying, movie}: VideoPlayerProps): JSX.Element{

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {

    if(videoRef.current === null){
      return;
    }

    if (isPlaying) {
      setTimeout(() => {
        if(videoRef.current !== null) {
          videoRef.current.play();
        }
      }, 1000);
      return;
    }

    videoRef.current.pause();

  }, [isPlaying]);
  return(
    <video src={movie.previewVideoLink} poster={movie.previewImage} ref={videoRef} muted loop width="280" height="175"/>
  );
}
