import express, { Request, Response } from "express";
import { headersToString } from "../utils";
import { Request as RequestType } from "../types";
import MongoController from "../controllers/mongo";
import PostgresController from "../controllers/postgresql";

const router = express.Router();
const useMockAPI = process.env.USE_MOCK_API;
let pg: PostgresController;

if (!useMockAPI) {
  pg = new PostgresController();
}

router.all("/:name", async (req: Request<{ name: string }>, res: Response) => {
  console.log("here");
  const basketName = req.params.name;
  const exists: string | null = await pg.getBasketName(basketName);

  if (exists) {
    const request: RequestType = {
      basketName,
      sentAt: new Date().toISOString(),
      method: req.method,
      headers: headersToString(req.headers),
      bodyMongoId: null,
    };

    let mongo: MongoController;

    if (req.body) {
      mongo = new MongoController();
      await mongo.connectToDatabase();
      request.bodyMongoId = await mongo.saveRequestBody(req.body);
      await mongo.closeConnection();
    }

    pg.saveRequest(request);
    res.status(204).json();
  } else {
    res.status(404).json({ message: "Basket not found" });
    return;
  }
});

export default router;
