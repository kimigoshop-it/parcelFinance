<template>
  <n-select v-if="formType === 'naive'" placeholder="请选择所属项目" v-model:value="value" :options="options" clearable />
  <el-select v-if="formType === 'element'" placeholder="请选择所属项目" v-model="value" :options="options" clearable />
</template>

<script setup lang="ts">
import { onMounted, PropType } from 'vue';
import { queryCustomerBaseInfoList } from '@/service/api';
import { ElSelect } from 'element-plus';

const props = defineProps({
  modelValue: {
    type: [String, Number, undefined, null] as PropType<string | number | null | undefined>,
  },
  formType: {
    type: String as PropType<'element' | 'naive'>,
    default: 'naive',
  }
});
const emit = defineEmits(['update:modelValue'])

let value = $computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
let options = $ref<{ label: string; value: number }[]>([])

// const handleUpdateValue = (val: string | number | null | undefined) => {
//   value = val
//   emit('update:modelValue', val)
// }

onMounted(() => {
  queryCustomerBaseInfoList({}).then((res) => {
    options = res.map((item) => ({
      label: item.customerName,
      value: item.id
    }))
  })
});
</script>