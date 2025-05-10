import { useState, useEffect } from "react";
import { useParams } from "react-router";
import type { Request as RequestType } from "../../types";
import Request from "../../components/Request";
import apiService from "../../services/requestBinAPI";
import { handleAPIError } from "../../utils";
import "./Basket.css";

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
    <>
      <div className="basket">
        <h2>
          Basket: <code>/{basketName}</code>
        </h2>
        <section className="requests">
          {requests.map((request, i) => (
            <Request key={i} {...request} />
          ))}
        </section>
      </div>
    </>
  );
};

export default Basket;
