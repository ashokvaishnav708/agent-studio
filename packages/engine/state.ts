import type { Graph, RunState } from './types';

export function getInitialState(
  runId: string,
  graph: Graph,
  inputData: Record<string, unknown>,
): RunState {
  const start = graph.nodes.find(({ type }) => type === 'start');

  if (!start) throw new Error('Flow has no start node.');
  const memoryObject = graph.nodes.reduce<Record<string, string[]>>((acc, node) => {
    acc[node.id] = [];
    return acc;
  }, {});

  return {
    runId,
    runStatus: 'running',
    stepCount: 0,
    inputData,
    outputData: {},
    executedNodesEdges: memoryObject,
    nodesToExecute: [start.id],
  };
}
