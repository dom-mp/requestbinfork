import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import type { Request as RequestType } from "../../types";
import apiService from "../../services/requestBinAPI";
import { handleAPIError } from "../../utils";
import DialogComponent from "../Dialog";
import RequestList from "../RequestList";
import Grid from "@mui/material/Grid";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import CodeIcon from "@mui/icons-material/Code";
import CodeOffIcon from "@mui/icons-material/Code";
import SwapVertIcon from "@mui/icons-material/SwapVert";

interface BasketProps {
  originURL: string;
  setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>;
  setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getBaskets: () => Promise<void>;
}

const Basket = ({
  originURL,
  setSnackbarMessage,
  setSnackbarOpen,
  getBaskets,
}: BasketProps) => {
  const POLLING_INTERVAL = 1000; // poll every 1 second
  const basketName = useParams().basketName ?? "";
  const [requests, setRequests] = useState<Array<RequestType>>([]);
  const [deleteDialogState, setDeleteDialogState] = useState(false);
  const [showJSON, setShowJSON] = useState(false);
  const [reverse, setReverse] = useState(true);
  const navigate = useNavigate();

  const handleCopyLinkButtonClick = async () => {
    await navigator.clipboard.writeText(`${originURL}/hook/${basketName}`);
    setSnackbarMessage("Basket URL copied to clipboard");
    setSnackbarOpen(true);
  };

  const handleDeleteBasketButtonClick = async () => {
    try {
      await apiService.deleteBasket(basketName);
      // Just rerequesting baskets, prioritise consistency > performance for now
      await getBaskets();
      setSnackbarMessage(`Deleted basket /${basketName}`);
      setSnackbarOpen(true);
      localStorage.removeItem(basketName);
      navigate("/");
    } catch (error: unknown) {
      handleAPIError(error);
    }
  };

  const handleClearBasketButtonClick = async () => {
    if (!confirm(`Delete all requests in basket "${basketName}"?`)) return;

    await apiService.clearBasket(basketName);
    setRequests(await apiService.getRequests(basketName));
    alert(`Basket "${basketName}" successfully cleared.`);
  };

  const handleReverseButtonClick = () => {
    setReverse((val) => !val);
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requests = await apiService.getRequests(basketName);
        setRequests(reverse ? requests.toReversed() : requests);
      } catch (error: unknown) {
        handleAPIError(error);
      }
    };

    fetchRequests();
    const intervalId = setInterval(fetchRequests, POLLING_INTERVAL);

    return () => clearInterval(intervalId);
  }, [basketName, reverse]);

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: "1500px",
        minWidth: "100%",
        flexGrow: 1,
        padding: 2,
      }}
    >
      <Container>
        <Grid
          container
          spacing={{ xs: 1, sm: 2 }}
          columns={{ xs: 4, sm: 12 }}
          sx={{ paddingBottom: 2 }}
        >
          <Grid size="grow" sx={{ minWidth: "100%" }}>
            <Stack direction="row" spacing={1} alignItems="baseline">
              <Typography variant="h5">BASKET:</Typography>

              <Tooltip
                arrow
                title={`${requests.length} requests in basket`}
                placement="right-start"
              >
                <Badge badgeContent={requests.length} color="primary">
                  <Typography
                    variant="h5"
                    color="secondary"
                    sx={{ paddingRight: 1 }}
                  >
                    /{basketName}
                  </Typography>
                </Badge>
              </Tooltip>
            </Stack>
          </Grid>

          <Grid size={4} sx={{ textAlign: "right" }}>
            <ButtonGroup variant="text">
              <Tooltip arrow title="Copy basket link" placement="top">
                <Button onClick={handleCopyLinkButtonClick}>
                  <ContentCopyIcon fontSize="small" />
                </Button>
              </Tooltip>

              <Tooltip arrow title={`Reverse order`} placement="top">
                <Button color="success" onClick={handleReverseButtonClick}>
                  <SwapVertIcon />
                </Button>
              </Tooltip>
              <Tooltip arrow title="Format JSON" placement="top">
                <Button
                  color="info"
                  variant={showJSON ? "contained" : "text"}
                  onClick={() => setShowJSON((val) => !val)}
                >
                  {showJSON ? <CodeOffIcon /> : <CodeIcon />}
                </Button>
              </Tooltip>

              <Tooltip arrow title="Clear basket" placement="top">
                <Button color="warning" onClick={handleClearBasketButtonClick}>
                  <ClearAllIcon />
                </Button>
              </Tooltip>

              <Tooltip arrow title="Delete basket" placement="top">
                <Button
                  color="error"
                  onClick={() => setDeleteDialogState(true)}
                >
                  <DeleteForeverIcon />
                </Button>
              </Tooltip>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Divider />
        <RequestList
          originURL={originURL}
          basketName={basketName}
          requests={requests}
          showJSON={showJSON}
        />
      </Container>

      <DialogComponent
        prompt="Are you sure you want to delete this Basket?"
        dialogState={deleteDialogState}
        setDialogState={setDeleteDialogState}
        handleConfirm={handleDeleteBasketButtonClick}
      />
    </Paper>
  );
};

export default Basket;
