import { useState, useEffect } from "react";
import apiService from "../../services/requestBinAPI";
import { handleAPIError } from "../../utils";
import { Box, Typography, Stack } from "@mui/material";

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const verifiedName = await apiService.createBasket(basketName);
      setBaskets((baskets) => baskets.concat(verifiedName));

      // TODO: success message notification should be handled in react eventually
      alert(`Basket ${verifiedName} successfully created.`);
    } catch (error: unknown) {
      handleAPIError(error);
    }
  };

  const handleBasketNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    setBasketName(event.currentTarget.value);
  };

  return (
    <Box>
      <Typography variant="h3">New Basket</Typography>
      <Typography variant="body1">
        Create a basket to collect and inspect HTTP Requests
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack direction="column" spacing={1}>
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
        </Stack>
      </form>
    </Box>
  );
};

export default CreateBasket;
