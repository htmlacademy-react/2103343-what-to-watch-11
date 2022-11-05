import { useState, ChangeEvent } from 'react';
import { AddReviewType } from '../../types/types';
import RatingStars from '../rating-stars/rating-stars';

export default function AddReview (): JSX.Element{

  const stars = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  const [formData, setFormData] = useState<AddReviewType>({
    rating: 0,
    comment: '',
  });

  const handleFormChange = (evt: ChangeEvent<HTMLFormElement>) => {
    setFormData({...formData, [evt.target.name]: evt.target.value});
  };

  return (
    <form action="#" className="add-review__form" onChange={handleFormChange}>
      <div className="rating">
        <div className="rating__stars">

          {stars.map((number) => <RatingStars starId={number} key={number.toString()} />)}

        </div>
      </div>

      <div className="add-review__text" >
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" defaultValue={formData.comment}></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>
      </div>
    </form>
  );
}
