import { ReviewType } from "../../types/types";
import MovieReview from "../movie-rewiew/movie-rewiew";

type MovieReviewsProps = {
  reviews: ReviewType[]
}

export default function MovieReviews ({reviews}: MovieReviewsProps): JSX.Element {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.slice(0, reviews.length / 2).map((review) => <MovieReview key={review.id} review={review}/>)}
      </div>
      <div className="film-card__reviews-col">
        {reviews.slice(reviews.length / 2).map((review) => <MovieReview key={review.id} review={review}/>)}
      </div>
    </div>
  );
}

