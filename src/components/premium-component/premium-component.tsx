type PremiumComponentProps = {
  className: string;
}

function PremiumComponent({className}: PremiumComponentProps) {
  return (
    <div className={`${className}__mark`}>
      <span>Premium</span>
    </div>
  );
}

export default PremiumComponent;
