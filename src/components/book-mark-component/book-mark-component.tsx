type BookMarkComponentProps = {
  isFavorite: boolean;
  onBookMarkClick: () => void;
  className: string;
  width: number;
  height: number;
}

function BookMarkComponent({ isFavorite, onBookMarkClick, className, width, height }: BookMarkComponentProps): JSX.Element {

  return (
    <button
      className={isFavorite ? `${className}__bookmark-button--active button` : `${className}__bookmark-button button`}
      type="button"
      onClick={(evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        onBookMarkClick();
      }}
    >
      <svg className={`${className}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button >
  );
}

export default BookMarkComponent;

