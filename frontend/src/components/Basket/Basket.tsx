import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import type { Request as RequestType } from "../../types";
import apiService from "../../services/requestBinAPI";
import { handleAPIError } from "../../utils";
import RequestList from "../RequestList";
import {
  Button,
  Paper,
  Container,
  Stack,
  Divider,
  Typography,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface BasketProps {
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>;
  setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Basket = ({ setSnackbarMessage, setSnackbarOpen }: BasketProps) => {
  const basketName = useParams().basketName ?? "";
  const [requests, setRequests] = useState<Array<RequestType>>([]);
  // const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleCopyLinkButtonClick = async () => {
    // TODO: fix link
    await navigator.clipboard.writeText(
      `https://placeholder.com/hook/${basketName}`
    );
    setSnackbarMessage("Basket URL copied to clipboard");
    setSnackbarOpen(true);
  };

  const handleDeleteBasketButtonClick = async () => {
    if (!confirm(`Delete basket "${basketName}"?`)) return;

    await apiService.deleteBasket(basketName);
    navigate("/");
    alert(`Basket "${basketName}" successfully deleted.`);
  };

  useEffect(() => {
    apiService
      .getRequests(basketName)
      .then((mockBaskets) => {
        setRequests(mockBaskets);
      })
      .catch((error: unknown) => {
        navigate("/");
        handleAPIError(error);
      });
  }, [basketName]);

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: "100%",
        flexGrow: 1,
        padding: 2,
      }}
    >
      {/* <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Basket url copied to clipboard."
      /> */}

      <Container>
        <Stack
          direction="row"
          sx={{
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">
            Basket:
            <Tooltip arrow title="Copy basket link" placement="top">
              <Button
                sx={{ flexGrow: 0, color: "info.main" }}
                onClick={handleCopyLinkButtonClick}
              >
                <Typography variant="h5" sx={{ paddingRight: 1 }}>
                  <code>/{basketName}</code>
                </Typography>
                <ContentCopyIcon fontSize="small" />
              </Button>
            </Tooltip>
          </Typography>

          <Tooltip arrow title="Delete basket" placement="top">
            <Button color="error" onClick={handleDeleteBasketButtonClick}>
              <DeleteForeverIcon />
            </Button>
          </Tooltip>

          <Typography variant="subtitle2">
            {requests.length} requests
          </Typography>
        </Stack>

        <Divider />
        <RequestList basketName={basketName} requests={requests} />
      </Container>
    </Paper>
  );
};

export default Basket;
