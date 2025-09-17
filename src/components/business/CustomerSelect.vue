<template>
  <n-select placeholder="请选择所属项目" :value="value" @update:value="handleUpdateValue" :options="options" clearable />
</template>

<script setup lang="ts">
import { onMounted, PropType } from 'vue';
import { queryCustomerBaseInfoList } from '@/service/api';

const props = defineProps({
  modelValue: {
    type: [String, Number, undefined, null] as PropType<string | number | null | undefined>,
  },
  options: {
    type: Array,
  }
});
const emit = defineEmits(['update:modelValue'])

let value = $ref(props.modelValue)
let options = $ref<{ label: string; value: number }[]>([])

const handleUpdateValue = (val: string | number | null | undefined) => {
  value = val
  emit('update:modelValue', val)
}

onMounted(() => {
  queryCustomerBaseInfoList({}).then((res) => {
    options = res.map((item) => ({
      label: item.customerName,
      value: item.id
    }))
  })
});
</script>