import {FilmsType} from '../../types/types';
import { useState, useRef, useEffect } from 'react';

type VideoPlayerProps = {
  movie: FilmsType;
  isPlaying: boolean;
}

export default function VideoPlayer ({isPlaying, movie}: VideoPlayerProps): JSX.Element{
  const [, setIsLoading] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let isVideoPlayerMounted = true;

    if(videoRef.current === null){
      return;
    }

    videoRef.current.addEventListener('loadeddata', () => {
      if(isVideoPlayerMounted) {
        setIsLoading(false);
      }
    });

    if (isPlaying) {
      setTimeout(() => {
        if(videoRef.current !== null) {
          videoRef.current.play();
        }
      }, 1000);
      return;
    }

    videoRef.current.pause();

    return () => {
      isVideoPlayerMounted = false;
    };
  }, [isPlaying]);
  return(
    <video src={movie.previewVideoLink} poster={movie.previewImage} ref={videoRef} muted width="280" height="175"/>
  );
}
