export type NodeType = 'start' | 'llm' | 'end';

export interface Node {
  id: string;
  type: NodeType;
  data: Record<string, unknown>;
}

export interface Edge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  sourceHandle?: string;
}

export type Graph = {
  nodes: Node[];
  edges: Edge[];
};

export type RunStatus = 'running' | 'completed' | 'failed';

export type RunState = {
  runId: string;
  runStatus: RunStatus;
  stepCount: number;
  inputData: Record<string, unknown>;
  outputData: Record<string, unknown>;
  executedNodesEdges: Record<string, string[]>;
  nodesToExecute: string[];
  error?: string;
};

export type ExecutionResult = { output: unknown };

export type ExecutionContext = {
  runId: string;
  step: number;
  state: RunState;
};

export type Executor = (node: Node, context: ExecutionContext) => Promise<ExecutionResult>;

export type ExecutorMap = Record<NodeType, Executor>;
