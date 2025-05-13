import express, { Request, Response } from "express";
import pool from "../controllers/postgresql";
import { QueryResult } from "pg";
import {
  isBasketNameUnique,
  generate_random_string,
  generate_token,
  storeToken,
  addNewBasket,
} from "../utils";
import type {
  // Request as RequestType,
  Basket,
} from "../types";

const router = express.Router();


router.get("/baskets", async (_req: Request, res: Response) => {
  const query: string = "SELECT * FROM baskets";
  try {
    const response: QueryResult<Basket> = await pool.query(query);
    const baskets = response.rows.map(({ name }) => name);
    res.status(200).json({ baskets });
  } catch (err) {
    console.error("Error while getting basket names: ", err);
    throw new Error("Failed to get basket names");
  }
});

router.get("/generate_name", async (_req: Request, res: Response) => {
  let basketName: string = "";

  do {
    basketName = generate_random_string().substring(2, 9);
  } while ((await isBasketNameUnique(basketName)) === false);

  res.status(200).json({ basketName });
});

router.get("/generate_token", async (_req: Request, res: Response) => {
  let token: string = await generate_token();
  await storeToken(token);

  res.status(200).json({ token });
});

router.post("/baskets/:name", async (req: Request, res: Response) => {
  const basketName = req.params.name;

  if ((await isBasketNameUnique(basketName)) === false) {
    res.status(409).json("Basket name taken");
    return;
  }

  try {
    await addNewBasket(basketName);
  } catch (err) {
    let message = "";

    if (err instanceof Error) {
      message = err.message;
    }

    res.status(500).json(message);
    return;
  }
  res.status(200).send();
});

router.delete(
  "/baskets/:name",
  (_req: Request<{ name: string }>, _res: Response) => {
  }
);

router.delete(
  "/:name/requests",
  (_req: Request<{ name: string }>, _res: Response) => {}
);

router.get(
  "/baskets/:name/requests",
  (_req: Request<{ name: string }>, _res: Response) => {}
);

router.delete(
  "/baskets/:name/requests",
  (_req: Request<{ name: string }>, _res: Response) => {}
);

export default router;
