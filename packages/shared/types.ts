import { z } from 'zod';

export const reducer = z.enum(['replace', 'append', 'merge', 'sum']);
export const stateType = z.enum(['string', 'number', 'boolean', 'array', 'object']);

export const stateKey = z.object({
    type: stateType,
    reducer: reducer,
});

export const workflowNode = z.object({
    id: z.string().min(1),
    type: z.string().min(1),
    position: z.object({
        x: z.number(),
        y: z.number(),
    }),
    config: z.record(z.string(), z.unknown()),
    outputs: z.record(z.string(), z.string()).optional(),
});

export const workflowEdge = z.object({
    id: z.string().min(1),
    source: z.string().min(1),
    sourceHandle: z.string().min(1),
    target: z.string().min(1),
    targetHandle: z.string().min(1),
});

export const workflowDefinition = z.object({
    id: z.string().min(1),
    version: z.number().int().min(1),
    name: z.string().min(1),
    state: z.record(z.string(), stateKey),
    nodes: z.array(workflowNode),
    edges: z.array(workflowEdge),
});

export type Reducer = z.infer<typeof reducer>;
export type WorkflowNode = z.infer<typeof workflowNode>;
export type WorkflowEdge = z.infer<typeof workflowEdge>;
export type WorkflowDefinition = z.infer<typeof workflowDefinition>;
