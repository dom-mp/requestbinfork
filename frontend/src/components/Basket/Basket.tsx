import { useState, useEffect } from "react";
import { useParams } from "react-router";
import type { Request as RequestType } from "../../types";
import apiService from "../../services/requestBinAPI";
import { handleAPIError } from "../../utils";
import RequestList from "../RequestList";
import { Paper, Container, Stack, Divider, Typography } from "@mui/material";

const Basket = () => {
  const basketName = useParams().basketName ?? "";
  const [requests, setRequests] = useState<Array<RequestType>>([]);

  const populateBasket = (basketName: string) => {
    try {
      apiService.getRequests(basketName).then((mockBaskets) => {
        setRequests(mockBaskets);
      });
    } catch (error: unknown) {
      handleAPIError(error);
    }
  };

  useEffect(() => {
    populateBasket(basketName);
  }, [basketName]);

  return (
    <Paper
      elevation={4}
      sx={{
        flexGrow: 1,
        padding: 2,
      }}
    >
      <Container>
        <Stack
          direction="row"
          sx={{
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ paddingRight: 3 }}>
            Basket: <code>/{basketName}</code>
          </Typography>
          <Divider />
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
