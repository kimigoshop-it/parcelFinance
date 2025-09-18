<template>
  <n-select placeholder="请选择结算货币" :value="value" :options="options" clearable @update:value="handleUpdateValue" />
</template>

<script setup lang="ts">
import { onMounted, PropType } from 'vue';
import { querySystemDictionaryDetailList } from '@/service/api';

const props = defineProps({
  modelValue: {
    type: [Number, undefined, null] as PropType<number | null | undefined>,
  },
  options: {
    type: Array,
  }
});

const emit = defineEmits(['update:modelValue'])

let value = $computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

let options = $ref<{ label: string; value: number }[]>([])

const handleUpdateValue = (val: number | null | undefined) => {
  value = val
  emit('update:modelValue', value)
}

onMounted(() => {
  querySystemDictionaryDetailList({
    dictionaryTypeCode: "Currency",
    pageSize: 1000
  }).then((res: SystemDictionaryDetail[]) => {
    options = res.map((item) => ({
      label: item.dictionaryTag,
      value: item.id
    }))
    console.log(options)
  })
});
</script>