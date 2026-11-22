import { llmExecutor } from './llm';
import { type ExecutorMap } from '@agentstudio/engine';

export const executors: ExecutorMap = {
  start: async (_node, context) => ({ output: context.state.inputData }),
  llm: llmExecutor,
  end: async (_node, context) => ({ output: context.state.outputData }),
};
