
type OfferPageImageComponentProps = {
  image: string;
}

function OfferPageImageComponent({image}: OfferPageImageComponentProps): JSX.Element {
  return (
    <div className="offer__image-wrapper">
      <img className="offer__image" src={image} alt="Photo studio" />
    </div>
  );
}

export default OfferPageImageComponent;
