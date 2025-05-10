import { useState, useEffect } from "react";
import "./CreateBasket.css";
import apiService from "../../services/requestBinAPI";

interface CreateBasketProps {
  setBaskets: React.Dispatch<React.SetStateAction<Array<string>>>;
}

const CreateBasket = ({ setBaskets }: CreateBasketProps) => {
  const [basketName, setBasketName] = useState<string>("");

  useEffect(() => {
    apiService
      .generateName()
      .then((generatedName) => setBasketName(generatedName));
  }, []);

  // TODO: refactored error handling after `utils.handleAPIError` is on main
  // TODO: message notification should be handled in react, if we want it
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const message = await apiService.createBasket(basketName);
      // Refetch all baskets.
      // - we don't add the new basket name to our state because
      //   the server does not return the basketName value so we
      //   have no way of knowing whether our state aligns with
      //   the server's state.

      const baskets = await apiService.getBaskets();
      setBaskets(baskets);
      alert(message);
    } catch (error: unknown) {
      alert(error);
    }
  };

  const handleBasketNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    setBasketName(event.currentTarget.value);
  };

  return (
    <div>
      <h1>New Basket</h1>
      <p>Create a basket to collect and inspect HTTP Requests</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="createBasket">placeholder.com/</label>
          <input
            type="text"
            id="new-basket-name"
            value={basketName}
            onChange={handleBasketNameChange}
          />
          <button type="submit" className="">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBasket;
