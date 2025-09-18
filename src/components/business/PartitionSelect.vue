<template>
  <n-select placeholder="请选择分区" v-model:value="value" :options="computedOptions" clearable />
</template>

<script setup lang="ts">
import { computed, onMounted, PropType, watch } from 'vue';
import { queryPartitionListByCustomerId } from '@/service/api';

const props = defineProps({
  modelValue: {
    type: [String, Number, undefined, null] as PropType<string | number | null | undefined>,
  },
  disableValues: {
    type: Array as PropType<string[] | number[]>,
    required: false,
    default: () => []
  },
  options: {
    type: Array as PropType<{ label: string; value: string | number }[]>,
  },
  customerId: {
    type: [Number, null] as PropType<number | null>,
    required: true,
  }
});

let value = $computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  }
})
const emit = defineEmits(['update:modelValue'])

let options = $ref<{ label: string; value: string | number }[]>([])

const computedOptions = computed(() => {
  return options.map(option => {
    const disable = props.disableValues.some(v => v === option.value) && value !== option.value
    return {
      label: option.label,
      value: option.value,
      disabled: disable
    }
  })
})

const refreshOptions = () => {
  if (!props.customerId) {
    options = []
    return
  }
  queryPartitionListByCustomerId(props.customerId).then((res) => {
    options = res.map((item) => ({
      label: item.partitionName,
      value: item.id
    }))
  })
}

onMounted(() => {
  refreshOptions()
});

watch(() => props.customerId, () => {
  value = null
  refreshOptions()
  console.log('value', value)
})
</script>