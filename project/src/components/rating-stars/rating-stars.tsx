type RatingStarsProps = {
  starId: number;
  disabled: boolean;
};

export default function RatingStars ({starId, disabled}: RatingStarsProps): JSX.Element{
  return(
    <>
      <input className="rating__input" id={`star-${starId}`} type="radio" name="rating" value={`${starId}`} disabled={disabled}/>
      <label className="rating__label" htmlFor={`star-${starId}`}>{`Rating ${starId}`}</label>
    </>
  );
}
