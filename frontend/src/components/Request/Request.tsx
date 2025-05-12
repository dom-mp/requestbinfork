import type { Request as RequestProps } from "../../types";
import { JSONTree } from "react-json-tree";
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

const Request = ({
  basketName,
  method,
  sentAt,
  headers,
  requestBodyContentType,
  requestBody,
}: RequestProps & { basketName: string }) => {
  const [showJSON, setShowJSON] = useState(false);
  const isJSON: boolean = requestBodyContentType
    .trim()
    .toLowerCase()
    .endsWith("json");

  return (
    <Stack direction="row">
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
              placeholder.com/hook/{basketName}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Headers
          </AccordionSummary>
          <AccordionDetails>
            {headers.split("\n").map((headerText) => {
              return <Typography variant="body1">{headerText}</Typography>;
            })}
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Body
          </AccordionSummary>

          <AccordionDetails>
            {isJSON && showJSON ? (
              <JSONTree data={JSON.parse(requestBody)} />
            ) : (
              <Box>
                <Typography
                  component="pre"
                  sx={{ wordBreak: "break-all", textWrap: "wrap" }}
                >
                  {requestBody}
                </Typography>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Stack>
  );
};

export default Request;
