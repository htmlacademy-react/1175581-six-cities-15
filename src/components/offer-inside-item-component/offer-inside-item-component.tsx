type OfferInsideItemComponentProps = {
  good: string;
}

function OfferInsideItemComponent({good}: OfferInsideItemComponentProps) {
  return (
    <li className="offer__inside-item">
      {good}
    </li>
  );
}

export default OfferInsideItemComponent;
