import { Reviews } from '../../types/types';
import MovieReview from '../movie-rewiew/movie-rewiew';

type MovieReviewsProps = {
  reviews: Reviews;
}

export default function MovieReviews ({reviews}: MovieReviewsProps): JSX.Element {
  const halfReviews = reviews.length / 2;
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.slice(0, halfReviews).map((review) => <MovieReview key={review.id} review={review}/>)}
      </div>
      <div className="film-card__reviews-col">
        {reviews.slice(halfReviews).map((review) => <MovieReview key={review.id} review={review}/>)}
      </div>
    </div>
  );
}

