import type { Graph, RunState, ExecutorMap } from './types';

export async function runSuperStep(
  graph: Graph,
  prev: RunState,
  executors: ExecutorMap,
): Promise<RunState> {
  const state: RunState = structuredClone(prev);

  const nodesToExecute = state.nodesToExecute;
  const step = state.stepCount;

  for (const id of nodesToExecute) state.executedNodesEdges[id] = [];

  try {
    const results = await Promise.all(
      nodesToExecute.map((id) => {
        const node = graph.nodes.find((node) => node.id === id);

        if (!node) return undefined;

        return executors[node.type](node, { runId: state.runId, step, state: prev });
      }),
    );

    nodesToExecute.forEach((id, index) => {
      state.outputData[id] = results[index]?.output;
      for (const edge of graph.edges.filter((edge) => edge.sourceNodeId === id)) {
        state.executedNodesEdges[edge.targetNodeId].push(edge.id);
      }
    });
  } catch (error) {
    state.runStatus = 'failed';
    state.error = error instanceof Error ? error.message : String(error);
    return state;
  }

  state.stepCount = step + 1;
  state.nodesToExecute = graph.nodes
    .filter((node) => state.executedNodesEdges[node.id].length > 0)
    .map((node) => node.id);
  if (state.nodesToExecute.length === 0) state.runStatus = 'completed';

  return state;
}
