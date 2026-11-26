<script setup lang="ts">
import { ref } from 'vue';
import { useGraphStore } from './stores/graph';
import { api } from './api';
import NodePalette from './components/ NodePalette.vue';
import Canvas from './components/Canvas.vue';
import ConfigPanel from './components/ConfigPanel.vue';

const graph = useGraphStore();
const topic = ref('a lighthouse keeper');
const result = ref<unknown>(null);
const running = ref(false);

async function run() {
  running.value = true;
  result.value = null;
  try {
    result.value = await api.post('/runs', {
      graph: graph.toGraph(),
      input: { topic: topic.value },
    });
  } catch (e) {
    result.value = { error: String(e) };
  } finally {
    running.value = false;
  }
}
</script>

<template>
  <div class="flex h-screen flex-col">
    <header class="flex items-center gap-3 border-b border-slate-200 px-4 py-2">
      <span class="font-semibold">AgentFlow</span>
      <input v-model="topic" class="ml-auto rounded border px-2 py-1 text-sm" placeholder="topic" />
      <button
        :disabled="running"
        class="rounded bg-emerald-600 px-3 py-1 text-sm text-white"
        @click="run"
      >
        {{ running ? 'Running…' : 'Run ▶' }}
      </button>
    </header>
    <div class="flex min-h-0 flex-1">
      <NodePalette />
      <div class="flex-1"><Canvas /></div>
      <ConfigPanel />
    </div>
    <pre v-if="result" class="max-h-64 overflow-auto border-t bg-slate-50 p-3 text-xs">{{
      JSON.stringify(result, null, 2)
    }}</pre>
  </div>
</template>
