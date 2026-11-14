import { describe, test, expect } from 'vitest';
import linear from '#examples/linear.json';
import branch from '#examples/branch.json';
import map from '#examples/map.json';
import loop from '#examples/loop.json';
import merge from '#examples/merge.json';

import { workflowDefinition } from './types';

describe('Workflow definition type validations:', () => {
    test('linear workflow parse', () => {
        const result = workflowDefinition.safeParse(linear);
        expect(result.success).toBe(true);
        expect(result.data).toEqual(linear);
    });

    test('branch workflow type', () => {
        const result = workflowDefinition.safeParse(branch);
        expect(result.success).toBe(true);
        expect(result.data).toEqual(branch);
    });


    test('loop workflow type', () => {
        const result = workflowDefinition.safeParse(loop);
        expect(result.success).toBe(true);
        expect(result.data).toEqual(loop);
    });

    test('map workflow type', () => {
        const result = workflowDefinition.safeParse(map);
        expect(result.success).toBe(true);
        expect(result.data).toEqual(map);
    });

    test('merge workflow type', () => {
        const result = workflowDefinition.safeParse(merge);
        expect(result.success).toBe(true);
        expect(result.data).toEqual(merge);
    });
});