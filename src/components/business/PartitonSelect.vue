<template>
  <n-select v-model:value="value" :options="options" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useBusinessStore } from '@/store/modules';

const props = defineProps<{
  value: string;
  options: any[];
}>();

const partitionStore = useBusinessStore().partition;

onMounted(() => {
  partitionStore.init();
});
</script>