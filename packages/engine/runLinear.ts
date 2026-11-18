export type LinearStep<I, O> = {
  id: string;
  run: (input: I) => O;
};

export function runLinear<I, O>(steps: LinearStep<I, O>[], input: I): Record<string, O> {
  const outputs: Record<string, O> = {};

  steps.forEach((step) => {
    outputs[step.id] = step.run(input);
  });

  return outputs;
}
