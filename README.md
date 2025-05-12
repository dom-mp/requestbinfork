# RequestBin

RequestBin is a tool that allows you to capture, log, and inspect HTTP requests sent to a public API endpoint.

## Features

- Create unique request bins.
- Each bin has two unique URLs:
  - An endpoint for receiving requests.
  - A front-end URL for viewing received requests.
- You can:
  - view details of captured requests, including:
    - HTTP method
    - Path
    - Headers
    - Body
  - See a list of all requests made to a bin.
  - Click on a request in the list to view its full details.

### Implementation Details

- Front-end is a single-page web app built with React + TypeScript + [vite](https://vite.dev/) and [material ui](https://mui.com/).
- Back-end is implemented with [express.js](https://expressjs.com/).
- Bin and request metadata are stored in PostgreSQL.
- Request payload data is stored in MongoDB.
- State persistence is implemented via browser local storage, allowing users to access the same bins across sessions.

## Installation

### Dependencies

- [`psql`](https://www.postgresql.org/download/)
- [`mongodb`](https://www.mongodb.com/docs/manual/administration/install-community/)
- [`npm`](https://github.com/npm/cli)
