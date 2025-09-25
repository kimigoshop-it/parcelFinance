<template>
  <ThreeSection ref="threeSectionRef" :padding="0">
    <template #header>
      <div class="header flex flex-y-center w-full">
        <div class="flex-1">{{ `${name}账单明细` }}</div>
        <n-space>
          <n-button type="primary" size="small">导出</n-button>
          <n-button ghost type="primary" size="small" @click="handleBack()">返回</n-button>
        </n-space>
      </div>
    </template>

    <!-- 主体部分 -->
    <div id="bill_content" class="m-3 flex-1">
      <div>基本信息</div>
      <n-divider dashed />
      <section style="border-bottom: 1px solid #e0e0e0" class="pb-3 mb3">
        <n-space vertical>
          <div class="flex flex-y-center">
            <div class=flex-1>所属项目: {{ finance?.customerName }}</div>
            <n-space>
              <div>币种: {{ finance?.currency }}</div>
              <div :style="{ color: billStatusColors[finance?.billStatus!] }">{{ getFinanceTag('billStatusPayable',
                finance?.billStatus!) }}</div>
            </n-space>
          </div>
          <div>账单编号: {{ finance?.bilNumber }}</div>
          <div>账单时间: {{ dayjs(finance?.billTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
          <div>总数: {{ financePage?.total }}</div>
          <div>总金额: {{ finance?.billAmount }}</div>
        </n-space>
      </section>

      <section id="table_bar" class="pb-1 mb3 flex flex-y-center" style="border-bottom: 1px dashed #e0e0e0">
        <div class="flex-1">对账详情</div>
        <n-button type="primary" size="small" @click="formRef?.open()">新增</n-button>
      </section>

      <!-- 表格 -->
      <StickyHeadTable v-model:page-index="financePage.pageIndex" v-model:page-size="financePage.pageSize"
        :sticky-top="33" :total="financePage.total" :columns="columns"
        :data="finance?.financialStatementDetailsList ?? []" :table-height="tableHeight" @update:page-index="query"
        @update:page-size="query" />

      <!-- 表单 -->
      <Form ref="formRef" :bill-type="billType" :financial-statement-id="id" :is-lading="isLading" @success="query" />

      <DelForm ref="delFormRef" :financial-statement-id="id" :is-lading="isLading" @success="query" />
    </div>

    <template #footer>
      <div class="footer flex justify-center items-center">
        <n-button type="primary" size="large">提交对账单</n-button>
      </div>
    </template>
  </ThreeSection>
</template>

<script lang="tsx" setup>
import { useRoute, useRouter } from 'vue-router';
import { queryFinancialStatementDetails } from '@/service/api/finance';
import { computed, onMounted, ref } from 'vue';
import ThreeSection from '~/src/components/layout/ThreeSection.vue';
import dayjs from 'dayjs';
import { getEnumLabel } from '~/src/typings/business/shared/enum_label_map';
import { billStatusColors, getFinanceTag } from '~/src/typings/business/finance';
import StickyHeadTable from '~/src/components/sticky-head-table/index.vue';
import Form from './form/form.vue';
import DelForm from './form/delForm.vue';
import { isNaN } from 'lodash-es';
import { PriceType } from '~/src/typings/business/shared';

const router = useRouter();
const route = useRoute();

const formRef = ref<InstanceType<typeof Form>>();
const delFormRef = ref<InstanceType<typeof DelForm>>();

const id = Number(route.query.id);
const billType = Number(route.query.billType);

const threeSectionRef = ref<InstanceType<typeof ThreeSection>>();
const tableHeight = $computed(() => {
  let tableHeight = (threeSectionRef?.value?.containerHeight ?? 400) - 180 - 33;
  return tableHeight;
});

const name = computed(() => {
  return getEnumLabel('priceType', isNaN(billType) ? finance?.billType! : billType);
})


let finance = $ref<FinancialStatement>();
let financePage = $ref<BaseQueryParams>({
  pageIndex: 1,
  pageSize: 10,
  total: 0,
});

let isLading = $computed(() => {
  return finance?.billNode === '清关' || finance?.billNode === '头程';
})

const columns = $computed(() => {
  const col = [
    {
      title: '账单明细编号',
      key: 'billNumber',
      width: '260px',
      render: ({ row }: { row: FinancialStatementDetails }) => {
        return <div class='text-blue-500 cursor-pointer' onClick={() => {
          router.push({
            name: 'statement_lading_detail',
            query: { id: row.id, detailId: finance?.id, billType: billType }
          })
        }}>{row.billNumber}</div>
      }
    },
    {
      title: '单号',
      key: 'businessNumber',
    },
    {
      title: '计费日期',
      key: 'billTime',
    },
    {
      title: '计费重量',
      key: 'billWeight',
    },
    {
      title: '货物类型',
      key: 'goodType',
      // render: (row: FinancialStatementDetails) => getEnumLabel('goodType', row.goodType!),
      render: ({ row }) => getEnumLabel('goodType', row.goodType!),
    },
    {
      title: '配送方式',
      key: 'lastMileService',
      render: ({ row }) => getFinanceTag('deliveryType', row.lastMileService!),
    },
    {
      title: '金额',
      key: 'billAmount',
    },
    {
      title: '操作',
      key: 'action',
      render: ({ row }: { row: FinancialStatementDetails }) => {
        return <n-button type="primary" size="small" onClick={() => {
          delFormRef.value?.openDialog(row.goodType!, row.businessNumber!, row.id);
        }}>删除</n-button>
      }
    }
  ]

  if (isLading) {
    return col.filter(item => item.key !== 'goodType' && item.key !== 'lastMileService');
  }

  if (!isLading) {
    col[0].render = undefined;
  }

  return col;
})

// 查询函数
function query() {
  queryFinancialStatementDetails(id, financePage).then(res => {
    finance = { ...res, financialStatementDetailsList: res.financialStatementDetailsList.data };
    // for (let i = 0; i < 4; i++) {
    //   finance.financialStatementDetailsList.push(...res.financialStatementDetailsList.data);
    // }
    financePage.total = res.financialStatementDetailsList.total;
  });
}

// 返回页面
function handleBack() {
  let namePayable = 'payable_statement_list'
  let nameReceivable = 'receivable_statement_list'
  let name = billType == PriceType.PAYABLE ? namePayable : nameReceivable

  router.push({
    name: name
  })
}

onMounted(() => {
  query();
});
</script>

<style scoped>
.header {
  font-size: 20px;
  font-weight: bold;
  height: 80px;
  background-color: #fff;
  padding: 0 25px;
}

.footer {
  height: 60px;
  padding: 0 25px;
  background-color: #fff;
  padding: 0 25px;
}

#bill_content {
  background-color: #fff;
  padding: 30px;
  border-radius: 15px;
  position: relative;
}

#table_bar {
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
  height: 80;
}
</style>