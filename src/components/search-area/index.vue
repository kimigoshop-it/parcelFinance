<template>
  <div class="content">
    <div class="deflut">
      <BasicForm :showLabel="false" :columns="columns ?? 3" :formItems="formItems" v-model="model" :expand="isExpand" />
    </div>
    <div class="buttons">
      <n-button type="error" color="#FB4A4C">查询</n-button>
      <n-button type="error" color="#FB4A4C" ghost>重置</n-button>
      <n-button v-if="showExpandButton" @click="handleExpand" type="error" color="#FB4A4C">
        {{ isExpand ? '收起' : '展开' }}
      </n-button>
    </div>
  </div>
</template>

<script setup lang="tsx">
import BasicForm, { FormItem } from '@/components/basic-form';

const props = defineProps<{
  formItems: FormItem[];
  modelValue: Record<string, any>;
  columns?: number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: Record<string, any>): void;
}>();

const model = $ref(props.modelValue);

let isExpand = $ref(false);

const showExpandButton = $computed(() => {
  return props.formItems.length > (props.columns ?? 3);
});

const handleExpand = () => {
  isExpand = !isExpand;
};
</script>

<style scoped lang="scss">
.content {
  width: 100%;
  margin-bottom: 0px;
  display: flex;
  gap: 10px;

  .deflut {
    width: 100%;
  }

  .buttons {
    width: 20%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
}
</style>