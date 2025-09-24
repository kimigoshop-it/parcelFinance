<template>
  <ThreeSection ref="threeSectionRef" :padding="0">
    <template #header>
      <div class="header flex flex-y-center w-full">
        提单明细
      </div>
    </template>

    <!-- 主体部分 -->
    <div id="bill_content" class="m-3 flex-1">
      <section style="border-bottom: 1px solid #e0e0e0" class="pb-3 mb3">
        <n-space vertical>
          <div class=flex-1>订单数量: {{ ladingBill.orderCount }}</div>
          <div class=flex-1>批次号: {{ ladingBill.batchBillNo }}</div>

          <div class="flex flex-y-center">
            <n-space>
              <div>计费重量: {{ ladingBill.billWeight }}</div>
              <div>总金额: {{ ladingBill.billAmount }}</div>
            </n-space>
          </div>
        </n-space>
      </section>

      <section id="table_bar" class="pb-1 mb3 flex flex-y-center" style="border-bottom: 1px dashed #e0e0e0">
        <div class="flex-1">对账详情</div>
        <n-button type="primary" size="small" @click="formRef?.open()">新增</n-button>
      </section>

      <!-- 表格 -->
      <StickyHeadTable ref="threeSectionRef" v-model:page-index="ladingPage.pageIndex"
        v-model:page-size="ladingPage.pageSize" :sticky-top="33" :total="ladingPage.total" :columns="columns"
        :data="ladingBill.details" :table-height="tableHeight" @update:page-index="query" @update:page-size="query" />

      <Form ref="formRef" :financial-statement-id="id" :bill-type="1" @success="query" />
      <DelForm ref="delFormRef" :financial-statement-id="id" @success="query" />
    </div>
  </ThreeSection>
</template>

<script setup lang="tsx">
import ThreeSection from '~/src/components/layout/ThreeSection.vue';
import StickyHeadTable from '~/src/components/sticky-head-table/index.vue';
import Form from './form/form.vue';
import DelForm from './form/delForm.vue';
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
const formRef = ref<InstanceType<typeof Form>>();
const delFormRef = ref<InstanceType<typeof DelForm>>();
const tableHeight = $computed(() => {
  let tableHeight = threeSectionRef?.value?.containerHeight! - 80 - 33 - 44;
  return tableHeight;
});

const columns = $computed<TableColumn[]>(() => {
  const col = [
    {
      title: '账单编号',
      key: 'billNumber',
      width: '260px',
    },
    {
      title: '总重量',
      key: 'billWeight',
    },
    {
      title: '金额',
      key: 'billAmount',
    },
    {
      title: '计费时间',
      key: 'billTime',
    },
    {
      title: '操作',
      key: 'action',
      render: ({ row }: { row: FinancialStatementDetails }) => {
        return <n-button type="primary" size="small" onClick={() => {
          delFormRef.value?.openDialog(row.goodType!, row.businessNumber!, row.id);
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

const ladingBill = $ref<LadingDetails>({} as any);

const query = () => {
  queryLadingDetails({
    financialStatementDetailId: id,
    pageIndex: ladingPage.pageIndex,
    pageSize: ladingPage.pageSize,
  }).then(res => {
    ladingBill.orderCount = res.orderCount;
    ladingBill.billWeight = res.billWeight;
    ladingBill.billAmount = res.billAmount;
    ladingBill.batchBillNo = res.batchBillNo;
    ladingBill.details = res.result.data;
    ladingPage.total = res.result.total;
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