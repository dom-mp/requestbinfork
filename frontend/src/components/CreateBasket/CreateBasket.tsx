import "./CreateBasket.css";

const CreateBasket = () => {
  return (
    <div>
      <h1>New Basket</h1>
      <p>Create a basket to collect and inspect HTTP Requests</p>
      <form>
        <div>
          <label htmlFor="createBasket">placeholder.com/</label>
          <input type="text" id="createBasket" placeholder="Create Tag" />
          <button type="submit" className="">
            Button
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBasket;
