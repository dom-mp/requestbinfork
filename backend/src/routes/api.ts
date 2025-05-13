import express, { Request, Response } from "express";
// import pool from "../controllers/postgresql";
// import { QueryResult } from "pg";
import {
  // isBasketNameUnique,
  generateRandomString,
  generateToken,
  // storeToken,
  // addNewBasket,
} from "../utils";
// import type {
//   // Request as RequestType,
//   Basket,
// } from "../types";
import PostgresController from "../controllers/postgresql";

const router = express.Router();

const useMockAPI = process.env.USE_MOCK_API;
let pg: PostgresController;

if (!useMockAPI) {
  pg = new PostgresController();
}


// router.get("/baskets", async (_req: Request, res: Response) => {
//   const query: string = "SELECT * FROM baskets";
//   try {
//     const response: QueryResult<Basket> = await pool.query(query);
//     const baskets = response.rows.map(({ name }) => name);
//     res.status(200).json({ baskets });
//   } catch (err) {
//     console.error("Error while getting basket names: ", err);
//     throw new Error("Failed to get basket names");
//   }
// });

router.get("/generate_name", async (_req: Request, res: Response) => {
  let basketName: string = "";

  do {
    basketName = generateRandomString().substring(2, 9);
  } while ((await pg.doesBasketExist(basketName)));

  res.status(200).json({ basketName });
});

router.get("/generate_token", async (req: Request, res: Response) => {
  const basketName = req.query.name;

  if (typeof basketName !== "string") {
    res.status(422).send("missing basket name");
    return;
  } else if (!await pg.doesBasketExist(basketName)) {
    res.status(404).send("basket does not exist");
    return;
  }

  let token: string = await generateToken();
  await pg.storeToken(token, basketName);
  res.status(200).json({ token });
});

// router.post("/baskets/:name", async (req: Request, res: Response) => {
//   const basketName = req.params.name;

//   if ((await isBasketNameUnique(basketName)) === false) {
//     res.status(409).json("Basket name taken");
//     return;
//   }

//   try {
//     await addNewBasket(basketName);
//   } catch (err) {
//     let message = "";

//     if (err instanceof Error) {
//       message = err.message;
//     }

//     res.status(500).json(message);
//     return;
//   }
//   res.status(200).send();
// });

// router.delete(
//   "/baskets/:name",
//   (_req: Request<{ name: string }>, _res: Response) => {
//   }
// );

// router.delete(
//   "/:name/requests",
//   (_req: Request<{ name: string }>, _res: Response) => {}
// );

// router.get(
//   "/baskets/:name/requests",
//   (_req: Request<{ name: string }>, _res: Response) => {}
// );

// router.delete(
//   "/baskets/:name/requests",
//   (_req: Request<{ name: string }>, _res: Response) => {}
// );

export default router;
