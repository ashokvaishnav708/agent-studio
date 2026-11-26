<script setup lang="ts">
import { useGraphStore } from '../stores/graph';
const graph = useGraphStore();
</script>

<template>
  <aside v-if="graph.selected" class="w-80 space-y-3 border-l border-slate-200 p-4">
    <label class="block text-xs font-semibold text-slate-500"
      >Label
      <input
        v-model="graph.selected.data.label"
        class="mt-1 w-full rounded border px-2 py-1 text-sm"
      />
    </label>
    <label v-if="graph.selected.type === 'llm'" class="block text-xs font-semibold text-slate-500"
      >Prompt
      <textarea
        v-model="graph.selected.data.prompt"
        rows="6"
        class="mt-1 w-full rounded border px-2 py-1 font-mono text-xs"
      />
    </label>
  </aside>
</template>
