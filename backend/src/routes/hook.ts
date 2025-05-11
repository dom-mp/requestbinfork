import express, { Request, Response } from "express";
import {
  getBasketId,
  headersToString,
  saveRequestBody,
  saveRequest,
} from "../utils";

const router = express.Router();

router.all("/:name", async (req: Request<{ name: string }>, res: Response) => {
  const basketName = req.params.name;
  const basketId: number | null = await getBasketId(basketName);

  if (basketId) {
    const sentAt: string = new Date().toISOString();
    const method: string = req.method;
    const headers: string = headersToString(req.headers);
    let mongoBodyId: string | null = null;
    if (req.body) {
      console.log('here');
      mongoBodyId = await saveRequestBody(req.body);
    }

    saveRequest({ basketId, sentAt, method, headers, mongoBodyId });
    res.status(204).json();
  } else {
    res.status(404).json({ message: "Basket not found" });
    return;
  }
});

export default router;
