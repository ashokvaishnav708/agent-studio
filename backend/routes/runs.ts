import { Request, Response, Router } from 'express';
import { getInitialState, runToEnd, type ExecutorMap } from '@agentstudio/engine';
import { HttpError } from '../index';

export const runsRouter = Router();

// TODO: build real llm executors
const sampleExecutors: ExecutorMap = {
  start: async (_node, context) => ({ output: context.state.inputData }),
  llm: async (node) => ({ output: `output of ${node.id}` }),
  end: async (_node, context) => ({ output: context.state.outputData }),
};

runsRouter.post('/', async (req: Request, response: Response) => {
  const { graph, input } = req.body ?? {};
  if (!graph.nodes || !graph.edges)
    throw new HttpError(400, 'body must contain graph.nodes and graph.edges');

  const finalState = await runToEnd(
    graph,
    getInitialState(crypto.randomUUID(), graph, input),
    sampleExecutors,
  );

  // TODO: Add logger
  console.log(finalState);

  response.json(finalState);
});
