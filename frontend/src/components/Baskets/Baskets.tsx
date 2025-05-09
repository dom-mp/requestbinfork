interface BasketsProps {
  baskets: Array<string>;
}

const Baskets = ({ baskets }: BasketsProps) => {
  return (
    <>
      <div id="baskets">
        <h3>My Baskets</h3>

        <ul className="basket-list">
          {baskets.map((basketName) => (
            <li>{basketName}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Baskets;
