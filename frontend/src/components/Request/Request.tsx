import type { Request as RequestType } from "../../types";
import StyledJSONTree from "../StyledJSONTree";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { hasContentTypeJSON } from "../../utils";

interface RequestProps extends RequestType {
  originURL: string;
  showJSON: boolean;
}

const Request = ({
  originURL,
  basketName,
  method,
  sentAt,
  headers,
  requestBody,
  showJSON,
}: RequestProps) => {
  const isJSON: boolean = hasContentTypeJSON(headers);

  // Catch null body + type check
  if (typeof requestBody !== "string") {
    requestBody = JSON.stringify(requestBody);
  }

  const rawJSON = (
    <Box>
      <Typography
        component="pre"
        sx={{ wordBreak: "break-all", textWrap: "wrap" }}
      >
        {requestBody}
      </Typography>
    </Box>
  );

  return (
    <Grid container>
      <Grid size="auto" sx={{ padding: 1, paddingRight: 2 }}>
        <Typography variant="h5">{method}</Typography>
        <Typography
          component="time"
          variant="caption"
          sx={{ wordWrap: "break-all" }}
        >
          {sentAt}
        </Typography>
      </Grid>

      <Grid size="grow" width="1000px" minWidth="250px">
        <Accordion>
          <AccordionDetails>
            <Typography
              component="code"
              sx={{ wordBreak: "break-all", textWrap: "wrap" }}
            >
              PATH: {originURL}/hook/{basketName}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Headers
          </AccordionSummary>

          <AccordionDetails>
            {headers.split("\n").map((headerText, i) => {
              return (
                <Typography
                  key={i}
                  variant="body1"
                  sx={{ wordBreak: "break-all", textWrap: "wrap" }}
                >
                  {headerText}
                </Typography>
              );
            })}
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Body
          </AccordionSummary>

          <AccordionDetails>
            {isJSON && showJSON ? (
              <StyledJSONTree json={requestBody} />
            ) : (
              rawJSON
            )}
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default Request;
