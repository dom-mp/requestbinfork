import express, { Request, Response } from 'express';
// import { Request as RequestType } from '../types';

const router = express.Router();

router.get('/', (_req: Request, _res: Response) => {

});

router.get('/generate_name', (_req: Request, _res: Response) => {

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