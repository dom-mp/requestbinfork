import type { Request as RequestProps } from "../../types";
import { JSONTree } from "react-json-tree";
import { useState } from "react";

const Request = ({
  basketName,
  method,
  sentAt,
  headers,
  requestBodyContentType,
  requestBody,
}: RequestProps & { basketName: string }) => {
  const [showJSON, setShowJSON] = useState(false);

  const showJSONToggle = () => {
    setShowJSON(!showJSON);
  };

  // console.log(basketName);

  return (
    <div className="request">
      <section>
        <h4>{method}</h4>
        <time>{sentAt}</time>
      </section>
      <section>
        <span>{basketName}</span>
        <details>
          <summary>Headers</summary>
          {headers}
        </details>
        <details>
          <summary>Body</summary>
          {requestBodyContentType === "application/json" && showJSON ? (
            <JSONTree data={JSON.parse(requestBody)} />
          ) : (
            requestBody
          )}
          <button onClick={showJSONToggle}>JSONify</button>
        </details>
      </section>
    </div>
  );
};

export default Request;
