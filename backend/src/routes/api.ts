import express, { Request, Response } from 'express';
import {
  isBasketNameUnique,
  generate_random_string,
  generate_token,
  storeToken
} from '../utils';
// import type { Request as RequestType } from '../types';

const router = express.Router();

router.get('/', (_req: Request, _res: Response) => {

});

router.get('/generate_name', (_req: Request, res: Response) => {
  let basketName: string = '';

  do {
    basketName = generate_random_string().substring(2, 9);
  } while (!isBasketNameUnique(basketName))

  res.status(200).json({ basketName });
});

router.get('/generate_token', async (_req: Request, res: Response) => {
  let token: string = await generate_token();
  await storeToken(token);

  res.status(200).json({ token });
});

router.post('/:name', (_req: Request<{ name: string }>, _res: Response) => {

});

router.delete('/:name', (_req: Request<{ name: string }>, _res: Response) => {

});

router.get('/:name/requests', (_req: Request<{ name: string }>, _res: Response) => {

});

router.delete('/:name/requests', (_req: Request<{ name: string }>, _res: Response) => {

});

export default router;