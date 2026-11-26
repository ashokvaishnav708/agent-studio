<template>
  <div class="h-full w-full" @drop="onDrop" @dragover="onDragOver">
    <VueFlow
      v-model:nodes="graph.nodes"
      v-model:edges="graph.edges"
      fit-view-on-init
      @node-click="({ node }) => (graph.selectedId = node.id)"
      @pane-click="graph.selectedId = null"
    >
      <template v-for="t in nodeTypes" :key="t" #[`node-${t}`]="props">
        <BaseNode v-bind="props" />
      </template>
      <Background />
      <Controls />
      <MiniMap />
    </VueFlow>
  </div>
</template>
<script setup lang="ts">
import { VueFlow, useVueFlow, type Connection } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { MiniMap } from '@vue-flow/minimap';
import { Controls } from '@vue-flow/controls';
import { useGraphStore, type NodeType } from '../stores/graph';
import BaseNode from './BaseNode.vue';

const graph = useGraphStore();

const { screenToFlowCoordinate, onConnect } = useVueFlow();

onConnect((c: Connection) => graph.edges.push({ id: crypto.randomUUID(), ...c }));

function onDragOver(e: DragEvent) {
  e.preventDefault();
  if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
}

function onDrop(e: DragEvent) {
  const type = e.dataTransfer?.getData('application/agent-studio-node') as NodeType | undefined;
  if (type) graph.addNode(type, screenToFlowCoordinate({ x: e.clientX, y: e.clientY }));
}

const nodeTypes: NodeType[] = ['start', 'llm', 'end'];
</script>
