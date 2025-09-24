<template>
  <DialogForm :show-label="false" width="300px" :columns="1" v-model:visible="visible" title="删除账单"
    :form-items="formItems" v-model="model" @confirm="handleConfirm" @close="closeDialog" @negative-click="closeDialog"
    negative-text="取消" @positive-click="handleConfirm" />
</template>

<script setup lang="tsx">
import { ElRadio, ElRadioGroup } from 'element-plus';
import { FormItem } from '~/src/components/basic-form';
import DialogForm from '~/src/components/dialog-form';
import { GoodType } from '~/src/typings/business/shared';

const props = defineProps<{
  financialStatementId: number;
}>();

let showNext = $ref(true);

const model = $ref<
  | {
    financialStatementId: number;
    financialStatementDetailId?: number;
    delType: '1' | '2';
    goodType: GoodType | undefined;
    businessNumber: string | undefined;
  }>({
    financialStatementId: props.financialStatementId,
    financialStatementDetailId: undefined,
    delType: '1',
    goodType: undefined,
    businessNumber: undefined,
  })


const openDialog = (goodType: GoodType, businessNumber: string, financialStatementDetailId: number, _showNext: boolean = true) => {
  model.financialStatementDetailId = financialStatementDetailId;
  model.goodType = goodType;
  model.businessNumber = businessNumber;
  showNext = _showNext;
  visible = true;

  console.log(showNext);
  console.log(goodType);
  console.log(businessNumber);
  console.log(financialStatementDetailId);
  console.log(model);
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
        {showNext && <ElRadio value="2" > 转入下期账单 </ElRadio>}
        <ElRadio value="1" > 无需对账 </ElRadio>
      </ElRadioGroup>
    }
  }
]);

let visible = $ref(false);

const handleConfirm = () => {
  console.log(model);
  visible = false;
};
</script>