import express, { Request, Response } from "express";
import { getBasketId, headersToString, saveRequest } from "../utils";
import { Request as RequestType } from "../types";
import MongoController from "../controllers/mongo";

const router = express.Router();

const useMockAPI = process.env.USE_MOCK_API;
let mongo: MongoController;

if (!useMockAPI) {
  mongo = new MongoController();
}

router.all("/:name", async (req: Request<{ name: string }>, res: Response) => {
  const basketName = req.params.name;
  const basketId: number | null = await getBasketId(basketName);

  if (basketId) {
    const request: RequestType = {
      basketId,
      sentAt: new Date().toISOString(),
      method: req.method,
      headers: headersToString(req.headers),
      mongoBodyId: null,
    };

    if (req.body) {
      request.mongoBodyId = await mongo.saveRequestBody(req.body);
    }

    saveRequest(request);
    await mongo.closeConnection();
    res.status(204).json();
  } else {
    res.status(404).json({ message: "Basket not found" });
    return;
  }
});

export default router;
