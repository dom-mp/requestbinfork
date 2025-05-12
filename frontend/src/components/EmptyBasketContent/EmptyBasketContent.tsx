const EmptyBasketContent = ({ basketName }: { basketName: string }) => (
  <div className="emptyBasket">
    <h3>Empty Basket!</h3>
    <p>
      This basket is empty, send requests to{" "}
      <code>placeholder.com/hook/{basketName}</code> and they will appear here.
    </p>
  </div>
);

export default EmptyBasketContent;
