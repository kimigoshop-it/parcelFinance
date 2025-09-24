<template>
  <ThreeSection ref="threeSectionRef" :padding="0">
    <template #header>
      <div class="header flex flex-y-center w-full">
        提单明细
      </div>
    </template>

    <!-- 主体部分 -->
    <div id="bill_content" class="m-3 flex-1">
      <!-- 表格 -->
      <StickyHeadTable ref="threeSectionRef" v-model:page-index="ladingPage.pageIndex"
        v-model:page-size="ladingPage.pageSize" :sticky-top="33" :total="ladingPage.total" :columns="columns" :data="[]"
        :table-height="tableHeight" @update:page-index="query" @update:page-size="query" />

      <DelForm ref="delFormRef" :financial-statement-id="id" @success="query" />
    </div>
  </ThreeSection>
</template>

<script setup lang="tsx">
import ThreeSection from '~/src/components/layout/ThreeSection.vue';
import StickyHeadTable from '~/src/components/sticky-head-table/index.vue';
import DelForm from '../detail/form/delForm.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getEnumLabel } from '~/src/typings/business/shared/enum_label_map';
import { getFinanceTag } from '~/src/typings/business/finance';
import { TableColumn } from 'naive-ui/es/data-table/src/interface';
import { queryLadingDetails } from '~/src/service/api/finance';

const route = useRoute();
const router = useRouter();

const id = Number(route.query.id);
const orderNumber = route.query.orderNumber as string;

const threeSectionRef = ref<InstanceType<typeof ThreeSection>>();
const delFormRef = ref<InstanceType<typeof DelForm>>();
const tableHeight = $computed(() => {
  let tableHeight = (threeSectionRef?.value?.containerHeight ?? 400) - 180 - 33;
  return tableHeight;
});

const columns = $computed<TableColumn[]>(() => {
  const col = [
    {
      title: '账单明细编号',
      key: 'billNumber',
      width: '260px',
      render: ({ row }: { row: FinancialStatementDetails }) => {
        return <div class='text-blue-500 cursor-pointer' onClick={() => {
          router.push({
            name: 'statement_lading_detail',
            query: { id: row.id }
          })
        }}> {row.billNumber} </div>
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
      render: (row: FinancialStatementDetails) => getEnumLabel('goodType', row.goodType!),
    },
    {
      title: '配送方式',
      key: 'lastMileService',
      render: (row: FinancialStatementDetails) => getFinanceTag('deliveryType', row.lastMileService!),
    },
    {
      title: '费用',
      key: 'billAmount',
    },
    {
      title: '操作',
      key: 'action',
      render: ({ row }: { row: FinancialStatementDetails }) => {
        return <n-button type="primary" size="small" onClick={() => {
          {/* delFormRef.value?.openDialog(row.goodType!, row.businessNumber!, row.id, finance?.billNode !== '清关'); */ }
        }
        }> 删除 </n-button>
      }
    }
  ]

  // if ((finance?.billNode ?? '') === '清关') {
  //   return col.filter(item => item.key !== 'goodType' && item.key !== 'lastMileService');
  // }

  return col;
})

const ladingPage = $ref<BaseQueryParams>({
  pageIndex: 1,
  pageSize: 10,
  total: 0,
});

const query = () => {
  queryLadingDetails({
    financialStatementDetailId: id,
    pageIndex: ladingPage.pageIndex,
    pageSize: ladingPage.pageSize,
  }).then(res => {
    console.log(res);
  })
}

onMounted(() => {
  query();
})

</script>

<style scoped>
.header {
  font-size: 20px;
  font-weight: bold;
  height: 80px;
  background-color: #fff;
  padding: 0 25px;
}
</style>