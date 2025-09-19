<template>
  <ThreeSection ref="threeSectionRef" :padding="0">
    <template #header>
      <div class="header flex flex-y-center w-full">
        <div class="flex-1">应付账单明细</div>
        <n-space>
          <n-button type="primary" size="small">导出</n-button>
          <n-button ghost type="primary" size="small">返回</n-button>
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
              <div :style="{ color: billStatusColors[finance?.billStatus!] }">已付款</div>
            </n-space>
          </div>
          <div>账单编号: {{ finance?.bilNumber }}</div>
          <div>账单时间: {{ dayjs(finance?.billTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
          <div>总数: {{ detailPage?.total }}</div>
          <div>总金额: {{ finance?.billAmount }}</div>
        </n-space>
      </section>

      <section class="pb-1 mb3" style="border-bottom: 1px dashed #e0e0e0">对账详情</section>

      <!-- <n-data-table :header-height="80" :columns="columns" :data="finance?.financialStatementDetailsList"
        /> -->
      <StickyHeadTable v-model:page-index="detailPage.pageIndex" v-model:page-size="detailPage.pageSize" :total="detailPage.total"
        :columns="columns" :data="finance?.financialStatementDetailsList ?? []" :max-height="tableHeight" />
    </div>

    <template #footer>
      <div class="footer flex justify-center items-center">
        <n-button type="primary" size="small">提交对账单</n-button>
      </div>
    </template>
  </ThreeSection>
</template>

<script lang="tsx" setup>
import { useRoute } from 'vue-router';
import { queryFinancialStatementDetails } from '@/service/api/finance';
import { onMounted, ref } from 'vue';
import ThreeSection from '~/src/components/layout/ThreeSection.vue';
import dayjs from 'dayjs';
import { getEnumLabel } from '~/src/typings/business/shared/enum_label_map';
import { billStatusColors } from '~/src/typings/business/finance';
import StickyHeadTable from '~/src/components/sticky-head-table/index.vue';

const route = useRoute();
const id = Number(route.query.id) as number;

const threeSectionRef = ref<InstanceType<typeof ThreeSection>>();
const tableHeight = $computed(() => {
  let tableHeight = (threeSectionRef?.value?.containerHeight ?? 400) - 180;

  console.log("tableHeight", tableHeight);
  return tableHeight;
});


let finance = $ref<FinancialStatement>();
let detailPage = $ref<BaseQueryParams>({
  pageIndex: 1,
  pageSize: 10,
  total: 0,
});

const columns = [
  {
    title: '账单明细编号',
    key: 'billNumber',
  },
  {
    title: '单号',
    key: 'billCdoe',
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
  },
  {
    title: '配送方式',
    key: 'lastMileService',
    render: (row: FinancialStatementDetails) => getEnumLabel('lastMileService', row.lastMileService!),
  },
  {
    title: '费用',
    key: 'billAmount',
  }
];

// 查询函数
function query() {
  queryFinancialStatementDetails(id).then(res => {
    finance = { ...res, financialStatementDetailsList: res.financialStatementDetailsList.data };
    for (let i = 0; i < 4; i++) {
      finance.financialStatementDetailsList.push(...res.financialStatementDetailsList.data);
    }
    detailPage.total = res.financialStatementDetailsList.total + 100;
  });
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

:deep(.n-data-table .n-data-table-thead) {
  position: sticky;
  top: 80px;
  /* 吸顶位置 */
  z-index: 20;
  /* 防止被内容盖住 */
  background: #fff;
  /* 必须有背景，否则滚动时透明 */
}
</style>