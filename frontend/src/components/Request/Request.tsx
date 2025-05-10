import type { Request as RequestProps } from "../../types";

const Request = ({
  basketName,
  method,
  sentAt,
  headers,
  requestBodyContentType,
  requestBody,
}: RequestProps) => {
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
          {requestBody}
          {requestBodyContentType === "application/json" ? (
            <button>Format</button>
          ) : (
            ""
          )}
        </details>
      </section>
    </div>
  );
};

export default Request;
