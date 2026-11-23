import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Node, Edge, XYPosition } from '@vue-flow/core';

export type NodeType = 'start' | 'llm' | 'end';

const defaults: Record<NodeType, Record<string, unknown>> = {
  start: { label: 'Start' },
  llm: { label: 'LLM', prompt: '{{input.topic}}' },
  end: { label: 'End', output: '{{nodes}}' },
};

export const useGraphStore = defineStore('graph', () => {
  const nodes = ref<Node[]>([]);
  const edges = ref<Edge[]>([]);
  const selectedId = ref<string | null>(null);
  const selected = computed(() => nodes.value.find(({ id }) => id === selectedId.value) ?? null);

  function uniqueId(type: NodeType) {
    let i = 1;
    while (nodes.value.some(({ id }) => id === `${type}_${i}`)) i++;
    return `${type}_${i}`;
  }

  function addNode(type: NodeType, position: XYPosition) {
    nodes.value.push({ id: uniqueId(type), type, position, data: structuredClone(defaults[type]) });
  }

  function toGraph() {
    return {
      nodes: nodes.value.map(({ id, type, position, data }) => ({ id, type, position, data })),
      edges: edges.value.map(({ id, source, target, sourceHandle }) => ({
        id,
        source,
        target,
        sourceHandle,
      })),
    };
  }

  return { nodes, edges, selected, selectedId, addNode, toGraph };
});
