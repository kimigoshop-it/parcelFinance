<template>
  <n-card :title="actionText + '应收报价'">
    <n-form :model="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
      <div class="grid grid-cols-3 gap-4">
        <n-form-item label-placement="left" label="所属项目">
          <n-select placeholder="请选择所属项目" v-model:value="form.customerId" :options="FormConf.customerOptions" />
        </n-form-item>
        <n-form-item label-placement="left" label="业务模式">
          <n-select placeholder="请选择业务模式" v-model:value="form.businessType" :options="FormConf.businessTypeOptions" />
        </n-form-item>
        <n-form-item label-placement="left" label="业务节点">
          <n-select placeholder="请选择业务节点" v-model:value="form.businessNode" :options="FormConf.businessNodeOptions" />
        </n-form-item>
        <n-form-item label-placement="left" label="结算货币">
          <n-select placeholder="请选择结算货币" v-model:value="form.currencyId" :options="FormConf.currencyOptions" />
        </n-form-item>
        <n-form-item label-placement="left" label="货物类型">
          <n-select placeholder="请选择货物类型" v-model:value="form.goodType" :options="FormConf.goodTypeOptions" />
        </n-form-item>
        <n-form-item label-placement="left" label="尾程服务">
          <n-select placeholder="请选择尾程服务" v-model:value="form.lastMileService" :options="FormConf.lastMileServiceOptions" />
        </n-form-item>
      </div>

      <div>
        <n-form-item label-placement="left" label="计价方式">
          <n-select placeholder="请选择计价方式" v-model:value="form.billingMethod" :options="FormConf.billingMethodOptions" />
        </n-form-item>
        <Billing :billingMethod="form.billingMethod" v-model="form.priceRelatePartitionDtoModels" @update:model-value="handleUpdateModelValue" />
      </div>

      <div class="flex flex-center">
        <n-button class="w-24" type="primary" @click="submit">保存</n-button>
      </div>
    </n-form>
  </n-card>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import FormConf from './form_conf';
import Billing, { PricePartition } from '../component/billing';

const route = useRoute();
const action: 'edit' | 'add' = route.query.action as 'edit' | 'add';
const actionText = $computed(() => {
  return action === 'edit' ? '编辑' : '新增';
});

const form = $ref<Price>({
  id: 0,
  name: '',
  billingMethod: null,
  priceRelatePartitionDtoModels: []
} as any);

const handleUpdateModelValue = (newVal: PriceRelatePartition[]) => {
  console.log(newVal);
};

const submit = () => {
  console.log(form);
};
</script>