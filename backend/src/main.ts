import express from "express";
import mockApiRouter from "./routes/mockApi";
import apiRouter from "./routes/api";
import hookRouter from "./routes/hook";
import PostgresClient from "./controllers/postgresql";
import MongoClient from "./controllers/mongo";

const app = express();

// Middleware to store raw data in the request
app.use((req, _res, next) => {
  let data = "";

  req.setEncoding("utf8");
  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    (req as any).rawBody = data;
    next();
  });
});

app.use(express.json());
app.use(express.static("dist"));

const PORT = 3000;
const useMockAPI = process.env.USE_MOCK_API;
// allows us to run the mock api conditionally with:
// `API_MODE=mock  ts-node-dev ./src/main.ts`
// OR `npm run mock`

let pg: PostgresClient;
let mongo: MongoClient;

if (useMockAPI) {
  console.log("Starting mock API...");
  app.use("/mockApi", mockApiRouter);
} else {
  pg = new PostgresClient();
  mongo = new MongoClient();
  (async () => await mongo.connectToDatabase())();
  app.use("/api", apiRouter(pg, mongo));
  app.use("/hook", hookRouter(pg, mongo));
}

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
