<template>
  <n-select v-model:value="value" :options="options" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { businessStore } from '@/store/modules';

const props = defineProps<{
  value: string;
  options: any[];
}>();

const partitionStore = businessStore.partition;

onMounted(() => {
  partitionStore.init();
});
</script>