<template>
  <div class="min-w-44 rounded-lg border-2 border-slate-200 bg-white px-3 py-2 text-left">
    <Handle v-if="type !== 'start'" type="target" :position="Position.Left" />
    <div class="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
      {{ type }} . {{ id }}
    </div>
    <div class="text-sm font-medium text-slate-800">{{ data.label }}</div>
    <Handle v-if="type !== 'end'" type="source" :position="Position.Right" />
  </div>
</template>
<script setup lang="ts">
import { Handle, Position, type NodeProps } from '@vue-flow/core';
defineProps<NodeProps>();
</script>
