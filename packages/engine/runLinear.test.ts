import { describe, it, expect } from 'vitest';
import { runLinear, type LinearStep } from './runLinear';

describe('runLinear', () => {
  it('runs linear steps and outputs the final result', () => {
    const step1: LinearStep<string, string> = {
      id: 'step1',
      run: (input: string): string => `1_${input}`,
    };
    const step2: LinearStep<string, string> = {
      id: 'step2',
      run: (input: string): string => `2_${input}`,
    };
    const output = runLinear<string, string>([step1, step2], 'hi!');
    expect(output).toEqual({ step1: '1_hi!', step2: '2_hi!' });
  });
});
