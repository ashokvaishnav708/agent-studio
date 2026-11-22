import { Request, Response, Router } from 'express';
import { getInitialState, runToEnd } from '@agentstudio/engine';
import { HttpError } from '../index';
import { executors } from '../executors';

export const runsRouter = Router();

runsRouter.post('/', async (req: Request, response: Response) => {
  const { graph, input } = req.body ?? {};
  if (!graph.nodes || !graph.edges)
    throw new HttpError(400, 'body must contain graph.nodes and graph.edges');

  const finalState = await runToEnd(
    graph,
    getInitialState(crypto.randomUUID(), graph, input),
    executors,
  );

  // TODO: Add logger
  console.log(finalState);

  response.json(finalState);
});
