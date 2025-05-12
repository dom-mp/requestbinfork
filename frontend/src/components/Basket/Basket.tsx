import { useState, useEffect } from "react";
import { useParams } from "react-router";
import type { Request as RequestType } from "../../types";
import Request from "../../components/Request";
import apiService from "../../services/requestBinAPI";
import { handleAPIError } from "../../utils";

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
        {requests.length === 0 ? (
          <h2>
            Basket: <code>/{basketName}</code>
          </h2>
        ) : (
          <>
            <h2>
              Basket: <code>/{basketName}</code>
            </h2>
            <h3># of requests {requests.length}</h3>
          </>
        )}

        <section className="requests">
          {requests.length === 0 ? (
            <div className="emptyBasket">
              <h3>Empty Basket!</h3>
              <p>
                This basket is empty, send requests to url/{basketName} and they
                will appear here.
              </p>
            </div>
          ) : (
            requests.map((request, i) => (
              <Request key={i} {...request} basketName={basketName} />
            ))
          )}
        </section>
      </div>
    </>
  );
};

export default Basket;
