import express, { Request, Response } from 'express';
// import { Request as RequestType } from '../types';

const router = express.Router();

router.get('/baskets', (_req: Request, _res: Response) => {

});

router.get('/generate_name', (_req: Request, _res: Response) => {

});

router.post('/baskets/:name', (_req: Request<{ name: string }>, _res: Response) => {

});

router.delete('/baskets/:name', (_req: Request<{ name: string }>, _res: Response) => {

});

router.get('/baskets/:name/requests', (_req: Request<{ name: string }>, _res: Response) => {

});

router.delete('/baskets/:name/requests', (_req: Request<{ name: string }>, _res: Response) => {

});

export default router;