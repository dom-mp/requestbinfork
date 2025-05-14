interface EmptyBasketContentProps {
  originURL: string;
  basketName: string;
}

const EmptyBasketContent = ({
  originURL,
  basketName,
}: EmptyBasketContentProps) => (
  <div className="emptyBasket">
    <h3>Empty Basket!</h3>
    <p>
      This basket is empty, send requests to{" "}
      <code>
        {originURL}/hook/{basketName}
      </code>{" "}
      and they will appear here.
    </p>
  </div>
);

export default EmptyBasketContent;
