import type { Request as RequestProps } from "../../types";
import StyledJSONTree from "../StyledJSONTree";
import { useState } from "react";
import {
  Box,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Switch,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { hasContentTypeJSON } from "../../utils";

const Request = ({
  basketName,
  method,
  sentAt,
  headers,
  requestBody,
}: RequestProps) => {
  const [showJSON, setShowJSON] = useState(false);
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
    <Stack
      direction="row"
      sx={{
        gap: 3,
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography variant="h5">{method}</Typography>
        <Typography
          component="time"
          variant="caption"
          sx={{ wordWrap: "break-all" }}
        >
          {sentAt}
        </Typography>

        {isJSON && (
          <Tooltip arrow title="Format JSON" placement="right">
            <Switch
              checked={showJSON}
              onChange={(e) => {
                setShowJSON(e.target.checked);
              }}
            />
          </Tooltip>
        )}
      </Box>

      <Box>
        <Accordion>
          <AccordionDetails>
            <Typography component="code">
              PATH: placeholder.com/hook/{basketName}
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
      </Box>
    </Stack>
  );
};

export default Request;
