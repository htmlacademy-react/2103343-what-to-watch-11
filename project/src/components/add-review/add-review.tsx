import { useState, SyntheticEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { commentAction } from '../../store/api-actions';
import { setReviewFormDisabled } from '../../store/films-data/films-data';
import { getFilm, getReviewFormStatus } from '../../store/films-data/selectors';
import { AddReviewType } from '../../types/types';
import RatingStars from '../rating-stars/rating-stars';

export default function AddReview (): JSX.Element{

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const film = useAppSelector(getFilm);
  const isReviewFormDisabled = useAppSelector(getReviewFormStatus);

  const stars = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1] as const;

  const [formData, setFormData] = useState<AddReviewType>({
    rating: 0,
    comment: '',
  });

  const handleFormChange = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLInputElement | HTMLTextAreaElement;
    setFormData({...formData, [target.name]: target.value});
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(setReviewFormDisabled(true));

    if (formData.rating && formData.comment && film) {
      const [comment, rating] = [formData.comment, formData.rating];
      dispatch(commentAction([film.id, {comment, rating}]));
      navigate(`${APIRoute.Movies}/${film.id.toString()}`);
    }
  };

  return (
    <form action="#" className="add-review__form" onChange={handleFormChange} onSubmit={handleFormSubmit}>
      <div className="rating">
        <div className="rating__stars">

          {stars.map((number) => <RatingStars starId={number} key={number.toString()} disabled={isReviewFormDisabled}/>)}

        </div>
      </div>

      <div className="add-review__text" >
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" defaultValue={formData.comment} disabled={isReviewFormDisabled}></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={isReviewFormDisabled}>Post</button>
        </div>
      </div>
    </form>
  );
}
