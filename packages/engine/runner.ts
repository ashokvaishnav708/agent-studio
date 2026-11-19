import type { Graph, RunState, ExecutorMap } from './types';

import { runSuperStep } from './superStep';

export async function runToEnd(graph: Graph, state: RunState, executors: ExecutorMap) {
  let currentState = state;
  while (currentState.runStatus === 'running') {
    currentState = await runSuperStep(graph, currentState, executors);
  }
  return currentState;
}
