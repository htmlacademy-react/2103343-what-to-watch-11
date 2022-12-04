type ShowMoreButtonProps = {
  onClick: () => void;
};

export default function ShowMoreButton({onClick}: ShowMoreButtonProps): JSX.Element {
  return (
    <button className="catalog__button" type="button" onClick={onClick}>Show more</button>
  );
}
