import {FilmsType} from '../../types/types';

type VideoPlayerProps = {
  movie: FilmsType;
}

export default function VideoPlayer (props: VideoPlayerProps): JSX.Element{
  return(
    <video src={props.movie.previewVideoLink} poster={props.movie.previewImage} muted autoPlay width="280" height="175"/>
  );
}
