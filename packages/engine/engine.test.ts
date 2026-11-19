import { describe, it, expect } from 'vitest';
import { getInitialState, runToEnd, type Graph, type ExecutorMap } from './index';

const executors: ExecutorMap = {
  start: async (_node, context) => ({ output: context.state.inputData }),
  llm: async (node) => ({ output: `output of ${node.id}` }),
  end: async (_node, context) => ({ output: context.state.outputData }),
};

const node = (id: string, type: any) => ({ id, type, data: {} });
const edge = (sourceNodeId: string, targetNodeId: string) => ({
  id: `${sourceNodeId}->${targetNodeId}`,
  sourceNodeId,
  targetNodeId,
});

describe('engine', () => {
  it('runs a linear graph', async () => {
    const g: Graph = {
      nodes: [node('start', 'start'), node('a', 'llm'), node('end', 'end')],
      edges: [edge('start', 'a'), edge('a', 'end')],
    };
    const final = await runToEnd(g, getInitialState('r1', g, { topic: 'cats' }), executors);
    expect(final.runStatus).toBe('completed');
    expect(final.stepCount).toBe(3);
    expect(final.outputData.a).toBe('output of a');
  });

  it('runs independent nodes in the same superstep', async () => {
    const g: Graph = {
      nodes: [node('start', 'start'), node('a', 'llm'), node('b', 'llm'), node('end', 'end')],
      edges: [edge('start', 'a'), edge('start', 'b'), edge('a', 'end'), edge('b', 'end')],
    };
    const final = await runToEnd(g, getInitialState('r2', g, {}), executors);
    expect(final.stepCount).toBe(3); // start | a,b | end
  });

  it('fails the run when a node throws', async () => {
    const g: Graph = {
      nodes: [node('start', 'start'), node('a', 'llm')],
      edges: [edge('start', 'a')],
    };
    const broken = {
      ...executors,
      llm: async () => {
        throw new Error('boom');
      },
    };
    const final = await runToEnd(g, getInitialState('r3', g, {}), broken);
    expect(final.runStatus).toBe('failed');
    expect(final.error).toBe('boom');
  });

  // Currently the two parallel nodes with different length does not join at the same time
  // For eg: start -> |A B| -> |B| -> C -> A -> end -> C -> end
  it.todo('runs a join node once when branches have different lengths');
});
