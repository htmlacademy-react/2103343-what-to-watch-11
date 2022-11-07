type RatingStarsProps = {
  starId: number;
};

export default function RatingStars ({starId}: RatingStarsProps): JSX.Element{
  return(
    <>
      <input className="rating__input" id={`star-${starId}`} type="radio" name="rating" value={`${starId}`} />
      <label className="rating__label" htmlFor={`star-${starId}`}>{`Rating ${starId}`}</label>
    </>
  );
}
