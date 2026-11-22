import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { type Executor } from '@agentstudio/engine';

export const llmExecutor: Executor = async (node, context) => {
  const prompt = node.data.prompt as string;

  const result = await generateText({
    model: anthropic('claude-sonnet-5'),
    instructions: 'You are a helpful assistant.',
    prompt: prompt,
  });

  return { output: { text: result.text, prompt } };
};
