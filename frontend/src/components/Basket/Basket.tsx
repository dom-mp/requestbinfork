import { useState, useEffect } from "react";
import { useParams } from "react-router";
// import Request from "./components/Request";
import apiService from "../../services/requestBinAPI";
import type { Request } from "../../types";
import "./Basket.css";

const Basket = () => {
  // temporary RequestProp type placeholder
  interface RequestProp {
    request: Request;
  }
  // temporary Request component placeholder
  const Request = ({ request }: RequestProp) => <>{request}</>;

  const [requests, setRequests] = useState<Array<Request>>([]);
  const { basketName } = useParams();

  useEffect(() => {
    apiService.getRequests(basketName as string).then((mockBaskets) => {
      setRequests(mockBaskets);
    });
  }, []);

  return (
    <>
      <div>
        <h1>Basket: {basketName}</h1>
      </div>
      <div>
        {requests.map((request) => (
          <Request key={"d"} request={request} />
        ))}
      </div>
    </>
  );
};

export default Basket;
