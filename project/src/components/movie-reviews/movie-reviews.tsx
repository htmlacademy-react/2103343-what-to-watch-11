import { ReviewType } from '../../types/types';
import MovieReview from '../movie-rewiew/movie-rewiew';

type MovieReviewsProps = {
  reviews: ReviewType[];
}

export default function MovieReviews ({reviews}: MovieReviewsProps): JSX.Element {

  const getSeparateReviews = (reviews) => {
    const half = reviews.length / 2;
    return [reviews.slice(0, half), [reviews.slice(half)]
  }

  const [firstHalf, secondHalf] = getSeparateReviews(reviews);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {firstHalf.map((review) => <MovieReview key={review.id} review={review}/>)}
      </div>
      <div className="film-card__reviews-col">
        {secondHalf.map((review) => <MovieReview key={review.id} review={review}/>)}
      </div>
    </div>
  );
}

