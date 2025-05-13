import express, { Request, Response } from "express";
import { getBasketId, headersToString, saveRequest } from "../utils";
import { Request as RequestType } from "../types";
import MongoController from "../controllers/mongo";

const router = express.Router();

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

    let mongo: MongoController;

    if (req.body) {
      mongo = new MongoController();
      request.mongoBodyId = await mongo.saveRequestBody(req.body);
      await mongo.closeConnection();
    }

    saveRequest(request);
    res.status(204).json();
  } else {
    res.status(404).json({ message: "Basket not found" });
    return;
  }
});

export default router;
