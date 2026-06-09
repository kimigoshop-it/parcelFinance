<template>
  <dialog-form title="新增" :columns="2" v-model="model" :visible="loading" :formItems="formItems"
    @positive-click="handleSubmit" @negative-click="close" @close="close" negative-text="取消" />
</template>

<script lang="tsx" setup>
import { ElInput } from 'element-plus';
import { onMounted } from 'vue';
import { FormItem } from '~/src/components/basic-form';
import DialogForm from '~/src/components/dialog-form';
import { addPayAndReceivableProductPlanTemuDetail, addPayFinancialStatementDetail, addReceivableFinancialStatementDetail } from '~/src/service';
import { GoodType, PriceType } from '~/src/typings/business/shared';

const props = defineProps<{
  billType: PriceType;
  financialStatementDetailId: number;
}>();

const emit = defineEmits<{
  (e: 'success'): void;
}>();

const close = () => {
  loading = false;
}

let loading = $ref(false);

const formItems = $computed<FormItem[]>(() => {
  const goodType: FormItem = {
    label: '货物类型',
    name: 'goodType',
    component: 'Select',
    colSpan: 24,
    attrs: {
      options: [
        {
          label: '普货',
          value: GoodType.NORMAL
        },
        {
          label: '其他',
          value: GoodType.OTHER
        }
      ],
      onChange: (value: GoodType) => {
        if (value !== GoodType.OTHER) {
          model.weight = undefined;
          model.fee = undefined;
        }
      }
    }
  }

  const enCode: FormItem =
  {
    label: '尾程单号',
    name: 'businessNumberList',
    component: 'Customer',
    colSpan: 24,
    render: () => (<ElInput v-model={model.businessNumberList[0]} onUpdate:modelValue={
      (value: string) => {
        model.businessNumberList = [value];
      }
    }></ElInput>)
  }

  const weight: FormItem = {
    label: '重量',
    name: 'weight',
    component: 'InputNumber',
    colSpan: 24,
    attrs: {
      disabled: model.amount !== undefined && model.amount !== null,
      clearable: true,
      controls: false,
      align: 'left',
    },
    placeholder: model.amount !== undefined && model.amount !== null ? '重量和价格只能输入一个' : '请输入重量'
  }

  const fee: FormItem =
  {
    label: '费用',
    name: 'amount',
    component: 'InputNumber',
    colSpan: 24,
    attrs: {
      disabled: model.weight !== undefined && model.weight !== null,
      clearable: true,
      controls: false,
      align: 'left',
    },
    placeholder: model.weight !== undefined && model.weight !== null ? '价格和重量只能输入一个' : '请输入费用'
  }

  if (model.goodType === undefined || model.goodType === null) {
    return [goodType];
  }

  if (model.goodType !== GoodType.OTHER) {
    return [goodType, enCode];
  }

  if (model.goodType === GoodType.OTHER) {
    return [goodType, weight, fee];
  }

  return [];
});

const model = $ref<Record<string, any>>({
  financialStatementDetailId: props.financialStatementDetailId,
  businessNumberList: [],
});

onMounted(() => {
  if (props.billType === PriceType.RECEIVABLE) {
    model.goodType = GoodType.OTHER;
  }
});

defineExpose({
  open: () => {
    loading = true;
  }
})

const handleSubmit = async () => {
  await addPayAndReceivableProductPlanTemuDetail({
    financialStatementDetailId: model.financialStatementDetailId,
    businessNumberList: model.businessNumberList,
    goodType: model.goodType,
    weight: model.weight,
    amount: model.amount,
  });

  close();
  emit('success');
};
</script>
