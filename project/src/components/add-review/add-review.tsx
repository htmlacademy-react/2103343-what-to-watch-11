import { useState, SyntheticEvent, BaseSyntheticEvent, ChangeEvent, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIRoute, CommentLength } from '../../const';
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

  const isFormValid = useMemo(() =>
    formData.rating !== null &&
    formData.comment.length >= CommentLength.Min &&
    formData.comment.length <= CommentLength.Max,
  [formData.rating, formData.comment]);

  const handleFormChange = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLInputElement | HTMLTextAreaElement;
    setFormData({...formData, [target.name]: target.value});
  };

  const handleTextChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    if (evt.target.value) {
      setFormData({ ...formData, comment: evt.target.value });
    } else {
      setFormData({ ...formData, comment: '' });
    }
  };


  const handleFormSubmit = (evt: BaseSyntheticEvent) => {
    evt.preventDefault();
    dispatch(setReviewFormDisabled(true));

    if (formData.rating && formData.comment && film && isFormValid) {
      const [comment, rating] = [formData.comment, formData.rating];
      dispatch(commentAction([film.id, {comment, rating}]));
      navigate(`${APIRoute.Movies}/${film.id.toString()}`);
    }
  };

  return (
    <form action="#" className="add-review__form" >
      <div className="rating">
        <div className="rating__stars" onChange={handleFormChange}>

          {stars.map((number) => <RatingStars id={number} key={number.toString()} disabled={isReviewFormDisabled}/>)}

        </div>
      </div>

      <div className="add-review__text" style={{ backgroundColor: '#FFFFFF', opacity: '75%'}}>
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" onChange={handleTextChange} defaultValue={formData.comment} disabled={isReviewFormDisabled}></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" onClick={handleFormSubmit} type="submit" disabled={!isFormValid || isReviewFormDisabled}>Post</button>
        </div>
      </div>
    </form>
  );
}
