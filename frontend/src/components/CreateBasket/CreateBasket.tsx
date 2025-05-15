import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router";
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
  originURL: string;
  setBaskets: React.Dispatch<React.SetStateAction<Array<string>>>;
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>;
  setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateBasket = ({
  originURL,
  setBaskets,
  setSnackbarMessage,
  setSnackbarOpen,
}: CreateBasketProps) => {
  const [basketName, setBasketName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    apiService
      .generateName()
      .then((generatedName) => setBasketName(generatedName))
      .catch((error: unknown) => {
        handleAPIError(error);
      });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const verifiedName = await apiService.createBasket(basketName);
      const generatedToken = await apiService.getToken(basketName);

      localStorage.setItem(`basketName_${verifiedName}`, generatedToken);
      setBaskets((baskets) => baskets.concat(verifiedName));
      setSnackbarMessage(`${verifiedName} basket was created!`);
      setSnackbarOpen(true);

      navigate(`/baskets/${basketName}`);
    } catch (error: unknown) {
      handleAPIError(error);
    }
  };

  const handleBasketNameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBasketName(event.currentTarget.value);
  };

  // TODO: set originURL to ngrok url for local testing
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
              spellCheck={false}
              variant="outlined"
              id="new-basket-name"
              value={basketName}
              onChange={handleBasketNameChange}
              size="medium"
              sx={{
                flexGrow: 0,
              }}
              slotProps={{
                input: {
                  sx: {
                    color: "text.secondary",
                  },
                  startAdornment: (
                    <InputAdornment position="start" sx={{ margin: 0 }}>
                      {originURL}/hook/
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
