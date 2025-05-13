import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import apiService from "../../services/requestBinAPI";
import { handleAPIError } from "../../utils";
import {
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";

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

  const handleBasketNameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setBasketName(event.currentTarget.value);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: "100%",
        flexGrow: 1,
        padding: 4,
      }}
    >
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <Typography variant="h3">New Basket</Typography>
        <Typography variant="body1">
          Create a basket to collect and inspect HTTP Requests
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack direction={{ sm: "row", xs: "column" }} spacing={1}>
            <TextField
              required
              autoFocus
              variant="outlined"
              id="new-basket-name"
              color="info"
              value={basketName}
              onChange={handleBasketNameChange}
              sx={{ width: "26ch" }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      placeholder.com/
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button type="submit" variant="contained">
              Create
            </Button>
          </Stack>
        </form>
      </Stack>
    </Paper>
  );
};

export default CreateBasket;
