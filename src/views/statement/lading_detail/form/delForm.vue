<template>
  <DialogForm :show-label="false" width="300px" :columns="1" v-model:visible="visible" title="删除账单"
    :form-items="formItems" v-model="model" @confirm="handleConfirm" @close="closeDialog" @negative-click="closeDialog"
    negative-text="取消" @positive-click="handleConfirm" />
</template>

<script setup lang="tsx">
import { ElRadio, ElRadioGroup } from 'element-plus';
import { FormItem } from '~/src/components/basic-form';
import DialogForm from '~/src/components/dialog-form';
import { delProductPlanFinancialStatementDetail } from '~/src/service';
import { GoodType } from '~/src/typings/business/shared';

const props = defineProps<{
  financialStatementDetailId: number;
}>();

const emit = defineEmits<{
  (e: 'success'): void;
}>();


const model = $ref<
  | {
    financialStatementDetailId: number;
    financialStatementProductPlanDetailId: number;
    delType: 1 | 2;
  }>({
    financialStatementDetailId: props.financialStatementDetailId,
    financialStatementProductPlanDetailId: 0,
    delType: 1,
  })


const openDialog = (financialStatementProductPlanDetailId: number) => {
  model.financialStatementProductPlanDetailId = financialStatementProductPlanDetailId;
  visible = true;
}

const closeDialog = () => {
  visible = false;
}

defineExpose({
  openDialog,
  closeDialog,
})


const formItems = $ref<FormItem[]>([
  {
    name: "delType",
    label: "转入下期账单",
    component: "Customer",
    render: () => {
      return <ElRadioGroup v-model={model.delType} >
        <ElRadio value={1} > 无需对账 </ElRadio>
        <ElRadio value={2} > 转入下期账单 </ElRadio>
      </ElRadioGroup>
    }
  }
]);

let visible = $ref(false);

const handleConfirm = async () => {
  await delProductPlanFinancialStatementDetail(model);
  emit('success');
  visible = false;
};
</script>