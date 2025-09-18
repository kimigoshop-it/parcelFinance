<template>
  <ThreeSection>
    <template #header>

    </template>

    <template #main>
      <n-data-table :columns="columns" :data="data" />
    </template>

    <template #footer>

    </template>
  </ThreeSection>
</template>

<script lang="tsx" setup>
import ThreeSection from '@/components/layout/ThreeSection.vue';
import { TableColumn } from 'naive-ui/es/data-table/src/interface';
import { queryFinancialStatement } from '@/service/api';
import { onMounted } from 'vue';
import { getPriceEnumLabel } from "@/views/quotation/shared/model/price"
import { getFinanceTag } from "@/typings/business/finance"
import { Row } from 'vant';

const filterParams = $ref<QueryFinancialStatementParams>({
  pageIndex: 1,
  pageSize: 10,
});

const columns = $ref<TableColumn<FinancialStatement>[]>([
  {
    key: 'bilNumber',
    title: '账单编号',
  },
  {
    key: 'billType',
    title: '账单类型',
    render: (row: FinancialStatement) => {
      return <div>{getPriceEnumLabel('priceType', row.billType!)}</div>
    }
  },
  {
    key: 'billTime',
    title: '账单时间',
  },
  {
    key: 'endBillTime',
    title: '结束账单时间',
  },
  {
    key: 'currency',
    title: '币种',
  },
  {
    key: 'billAmount',
    title: '账单金额',
  },
  {
    key: 'billStatus',
    title: '账单状态',
    render: (row) => <div>{getFinanceTag('billStatus', row.billStatus!)}</div>
  },
  {
    key: 'billNode',
    title: '对账节点',
  },
  {
    key: 'actions',
    title: '操作',
    render: (row: FinancialStatement) => {
      return <n-button>去对账</n-button>
    }
  }
]);

let data = $ref<FinancialStatement[]>([]);

function queryPage() {
  queryFinancialStatement(filterParams).then(res => {
    data = res.data;
  });
}

onMounted(() => {
  queryPage();
});
</script>

<style scoped></style>