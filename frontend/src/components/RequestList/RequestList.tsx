import type { Request as RequestType } from "../../types";
import Request from "../../components/Request";
import EmptyBasketContent from "../EmptyBasketContent";
import { List, ListItem } from "@mui/material";

interface RequestListProps {
  originURL: string;
  basketName: string;
  requests: Array<RequestType>;
}

const RequestList = ({ originURL, basketName, requests }: RequestListProps) => {
  return (
    <List>
      {requests.length ? (
        requests.map((request, i) => (
          <ListItem key={i}>
            <Request
              originURL={originURL}
              {...request}
              basketName={basketName}
            />
          </ListItem>
        ))
      ) : (
        <EmptyBasketContent originURL={originURL} basketName={basketName} />
      )}
    </List>
  );
};

export default RequestList;
