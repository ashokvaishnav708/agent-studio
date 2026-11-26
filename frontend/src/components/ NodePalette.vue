<script setup lang="ts">
import type { NodeType } from '../stores/graph';

const items: { type: NodeType; label: string; color: string }[] = [
  { type: 'start', label: 'Start', color: 'bg-slate-100' },
  { type: 'llm', label: 'LLM call', color: 'bg-violet-100' },
  { type: 'end', label: 'End', color: 'bg-slate-100' },
];

function onDragStart(e: DragEvent, type: NodeType) {
  e.dataTransfer?.setData('application/agent-studio-node', type);
  if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move';
}
</script>

<template>
  <aside class="flex w-48 flex-col gap-2 border-r border-slate-200 p-3">
    <h2 class="text-xs font-semibold uppercase tracking-wide text-slate-500">Nodes</h2>
    <div
      v-for="item in items"
      :key="item.type"
      draggable="true"
      class="cursor-grab rounded-md px-3 py-2 text-sm font-medium"
      :class="item.color"
      @dragstart="onDragStart($event, item.type)"
    >
      {{ item.label }}
    </div>
  </aside>
</template>
