import { z } from 'zod';

type Reducer = 'replace'|'append' | 'merge' |'sum';

const state = z.object({
    type: z.string().nonempty(),
    reducer: z.string<Reducer>(),
})

export const workflowState = z.object({
    jobs: z.object(state),
    approved: z.object(state),
});

export const workflowNode = z.object({
    id: z.string().nonempty(),
    type: z.string().nonempty(),
    position: z.object({
        x: z.number().nonoptional(),
        y: z.number().nonoptional(),
    }),
    config: z.object(),
    outputs: z.object().optional(),
});

export const workflowEdge = z.object({
    id: z.string().nonempty(),
    source: z.string().nonempty(),
    sourceHandle: z.string().nonempty(),
    target: z.string().nonempty(),
    tagetHandle: z.string().nonempty(),
});

export const workflowDefinition = z.object({
    id: z.string().nonempty(),
    version: z.number().min(0),
    name: z.string().nonempty(),
    state: z.object(state),
    nodes: z.array(workflowNode),
    edges: z.array(workflowEdge),
});
