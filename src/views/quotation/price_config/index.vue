<template>
  <n-card>
    <div class="flex justify-center py-10 items-center">
      <div class="text-2xl font-bold">{{ `${actionText}${priceTypeText}报价` }}</div>
    </div>
    <n-form ref="formRef" :model="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }" :rules="rules">
      <div class="grid grid-cols-3 gap-4">
        <n-form-item label-placement="left" label="所属项目" path="customerId">
          <!-- <n-select placeholder="请选择所属项目" v-model:value="form.customerId" :options="FormConf.customerOptions" /> -->
          <PartitionSelect v-model="form.customerId" />
        </n-form-item>
        <!-- <n-form-item label-placement="left" label="业务模式" path="businessType"> -->
        <n-form-item label-placement="left" label="业务模式">
          <n-select placeholder="请选择业务模式" v-model:value="form.businessType" :options="FormConf.businessTypeOptions" />
        </n-form-item>
        <!-- <n-form-item label-placement="left" label="业务节点" path="businessNode"> -->
        <n-form-item label-placement="left" label="业务节点" >
          <n-select placeholder="请选择业务节点" v-model:value="form.businessNode" :options="FormConf.businessNodeOptions" />
        </n-form-item>
        <n-form-item label-placement="left" label="结算货币" path="currencyId">
          <CurrencySelect v-model="form.currencyId" />
        </n-form-item>
        <!-- <n-form-item label-placement="left" label="货物类型" path="goodType"> -->
        <n-form-item label-placement="left" label="货物类型">
          <n-select placeholder="请选择货物类型" v-model:value="form.goodType" :options="FormConf.goodTypeOptions" />
        </n-form-item>
        <!-- <n-form-item label-placement="left" label="尾程服务" path="lastMileService"> -->
        <n-form-item label-placement="left" label="尾程服务">
          <n-select placeholder="请选择尾程服务" v-model:value="form.lastMileService"
            :options="FormConf.lastMileServiceOptions" />
        </n-form-item>
      </div>

      <div>
        <n-form-item label-placement="left" label="计价方式" path="billingMethod">
          <n-select placeholder="请选择计价方式" v-model:value="form.billingMethod" :options="FormConf.billingMethodOptions" />
        </n-form-item>
        <Billing ref="billingRef" :billingMethod="form.billingMethod" :customerId="form.customerId"
          v-model="form.priceRelatePartitionDtoModels" />
      </div>

      <div class="flex flex-center">
        <n-space>
          <n-button class="w-24" type="primary" @click="submit">保存</n-button>
          <n-button class="w-24" type="primary" @click="cancel" ghost>取消</n-button>
        </n-space>
      </div>
    </n-form>
  </n-card>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import FormConf from './form_conf';
import Billing, { BillingExpose, PricePartition } from '../shared/component/billing';
import PartitionSelect from '~/src/components/business/CustomerSelect.vue';
import CurrencySelect from '@/components/business/CurrencySelect.vue';
import { PriceType } from '@/typings/business/shared';
import { onMounted, ref, toRaw } from 'vue';
import { NForm } from 'naive-ui';
import { addPrice as addOrUpdatePrice, queryPriceDetail } from '~/src/service/api';


const route = useRoute();
const router = useRouter();

// 报价单id
const quotationId = $ref<number | undefined>(route.query.id ?? undefined as any);
// 报价类型
const priceType = $ref<PriceType>(Number(route.query.priceType)! as any);
// 操作类型
const action: 'edit' | 'add' = route.query.action as 'edit' | 'add';
const actionText = $computed(() => {
  return action === 'edit' ? '编辑' : '新增';
});

const priceTypeText = $computed(() => {
  return priceType === PriceType.RECEIVABLE ? '应收' : '应付';
});

const formRef = ref<InstanceType<typeof NForm> | undefined>(undefined);
const form = $ref<Price>({
  priceType: priceType,
  customerId: null,
  name: '',
  billingMethod: null,
  priceRelatePartitionDtoModels: []
} as any);

// 规则
const rules = {
  customerId: [{ required: true, message: '请选择所属项目' }],
  businessType: [{ required: true, message: '请选择业务模式' }],
  businessNode: [{ required: true, message: '请选择业务节点' }],
  currencyId: [{ required: true, message: '请选择结算货币' }],
  goodType: [{ required: true, message: '请选择货物类型' }],
  lastMileService: [{ required: true, message: '请选择尾程服务' }],
  billingMethod: [{ required: true, message: '请选择计价方式' }]
};

const billingRef = ref<BillingExpose | undefined>(undefined);

const validate = () => {
  const billingValidate = billingRef.value?.validate();
  const formValidate = formRef.value?.validate();
  return Promise.all([billingValidate, formValidate]);
};

const submit = () => {
  validate().then(() => {
    addOrUpdatePrice(form).then((res) => {
      router.back();
    });
  }).catch((err) => {
    console.log(toRaw(form));
    console.log(err);
  });
};

function queryQuotation() {
  queryPriceDetail(quotationId!).then((res) => {
    console.log(res);
    if (action === 'edit') {
      form.id = res.id;
    }
    form.customerId = res.customerId;
    form.businessType = res.businessType;
    form.businessNode = res.businessNode;
    form.currencyId = res.currencyId;
    form.goodType = res.goodType;
    form.lastMileService = res.lastMileService;
    form.billingMethod = res.billingMethod;
    form.priceRelatePartitionDtoModels = res.priceRelatePartitionList;
  });
}

const cancel = () => {
  router.back();
};

onMounted(() => {
  if (action === 'edit') {
    queryQuotation();
  }
});
</script>
