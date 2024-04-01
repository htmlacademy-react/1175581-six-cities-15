type BookMarkComponentProps = {
  isFavorite: boolean;
  onBookMarkClick: () => void;
}

function BookMarkComponent({ isFavorite, onBookMarkClick }: BookMarkComponentProps): JSX.Element {

  return (
    <button
      className={isFavorite ? 'place-card__bookmark-button--active button' : 'place-card__bookmark-button button'}
      type="button"
      onClick={(evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        onBookMarkClick();
      }}
    >
      <svg className="place-card__bookmark-icon" width={18} height={19}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default BookMarkComponent;
