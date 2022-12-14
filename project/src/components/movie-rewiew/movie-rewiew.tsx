import { ReviewType } from '../../types/types';
import { getFormatReviewDate } from '../../utils';

type MovieReviewProps = {
  review: ReviewType;
}

export default function MovieReview ({review}: MovieReviewProps): JSX.Element {
  return (
    <div className="review" key={review.id} data-testid="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{review.user.name}</cite>
          <time className="review__date" dateTime={review.date}>{getFormatReviewDate(review.date)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{review.rating}</div>
    </div>
  );
}
