type RatingStarsProps = {
  id: number;
  disabled: boolean;
};

export default function RatingStars ({id, disabled}: RatingStarsProps): JSX.Element{
  return(
    <>
      <input className="rating__input" id={`star-${id}`}
        type="radio"
        name="rating"
        value={`${id}`}
        disabled={disabled}
      />
      <label className="rating__label" htmlFor={`star-${id}`}>{`Rating ${id}`}</label>
    </>
  );
}
