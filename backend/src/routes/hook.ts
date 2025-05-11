import express, { Request, Response } from "express";
import {
  getBasketId,
  headersToString,
  saveRequestBody,
  saveRequest,
} from "../utils";

import { Request as RequestType } from "../types";

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
    }

    if (req.body) {
      request.mongoBodyId = await saveRequestBody(req.body);
    }

    saveRequest(request);
    res.status(204).json();
  } else {
    res.status(404).json({ message: "Basket not found" });
    return;
  }
});

export default router;
