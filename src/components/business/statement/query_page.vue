<template>
  <basic-table :columns="columns" :data="data" v-model:filters="filterParams" @update:page="queryPage">
    <template #search>
      <SearchArea :formItems="searchAreaItems" v-model="filterParams" @search="queryPage" @reset="queryPage" />
    </template>
  </basic-table>
</template>

<script lang="tsx" setup>
import BasicTable from '@/components/basic-table/index.vue';
import SearchArea from '@/components/search-area/index.vue';
import CustomerSelect from '@/components/business/CustomerSelect.vue';
import { FormItem } from '@/components/basic-form'
import { TableColumn } from 'naive-ui/es/data-table/src/interface';
import { queryFinancialStatement } from '@/service/api';
import { onMounted } from 'vue';
import { getEnumLabel } from '~/src/typings/business/shared/enum_label_map';
import { getFinanceTag } from "@/typings/business/finance"
import FinanceOptions from '@/typings/business/finance/options';
import { dayjs } from 'element-plus';
import { PriceType } from '~/src/typings/business/shared';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{
  billType: PriceType;
}>();

const filterParams = $ref<QueryFinancialStatementParams>({
  billType: props.billType,
  pageIndex: 1,
  pageSize: 10,
  total: 0
});

// 搜索区域
const searchAreaItems = $ref<FormItem[]>([
  {
    label: '账单日期',
    name: 'billDate',
    component: 'DatePicker',
    attrs: {
      clearable: true
    }
  },
  {
    label: '账单状态',
    name: 'status',
    component: 'Select',
    attrs: {
      options: FinanceOptions.BillStatusOptions,
      clearable: true
    }
  },
  {
    label: '所属项目',
    name: 'customerId',
    component: 'Customer',
    render: () => <CustomerSelect formType="element" v-model={filterParams.customerId} />
  }
]);


const columns = $ref<TableColumn<FinancialStatement>[]>([
  {
    key: 'billNumber',
    title: '账单编号',
    width: 200,
  },
  {
    key: 'billType',
    title: '账单类型',
    render: (row: FinancialStatement) => {
      return <div>{getEnumLabel('priceType', row.billType!)}</div>
    }
  },
  {
    key: 'billTime',
    title: '账单时间',
    width: 200,
    render: (row: FinancialStatement) => <div>{dayjs(row.billTime).format('YYYY-MM-DD HH:mm:ss')}</div>
  },
  {
    key: 'endBillTime',
    title: '结束账单时间',
    width: 200,
    render: (row: FinancialStatement) => <div>{dayjs(row.endBillTime).format('YYYY-MM-DD HH:mm:ss')}</div>
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
    render: (row) => <div>{getFinanceTag('billStatusPayable', row.billStatus!)}</div>
  },
  {
    key: 'billNode',
    title: '对账节点',
  },
  {
    key: 'actions',
    title: '操作',
    render: (row: FinancialStatement) => {
      return <n-button onClick={() => {
        router.push({
          name: 'statement_detail',
          query: {
            id: row.id,
            billType: row.billType
          }
        })
      }} type="primary" size="small">去对账</n-button>
    }
  }
]);

let data = $ref<FinancialStatement[]>([]);

function queryPage() {
  queryFinancialStatement(filterParams).then(res => {
    data = res.data;
    filterParams.total = res.total;
  });
}

onMounted(() => {
  queryPage();
});
</script>

<style scoped></style>
