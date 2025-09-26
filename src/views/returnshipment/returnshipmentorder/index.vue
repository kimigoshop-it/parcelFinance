<template>
  <div class="h-full">
    <n-card class="shadow-sm rounded-16px" style="margin-bottom: 12px">
      <!-- <AddAndUpdate ref="AddAndUpdateRef" @getSearch="AddSearch" /> -->
      <SearchFrom @getSearch="getSearch" />
      <n-divider dashed style="margin: 0 0 16px 0"> </n-divider>
      <tabs :tablist="tablist" @tabsemit="(val) => getTable(val)" :tabname="'状态'" />
    </n-card>
    <n-card class="shadow-sm rounded-16px">
      <div class="flex justify-end">
        <n-button
          @click="exportFile"
          :disabled="tableColumns.data.length === 0"
          class="ml-2"
          ghost
          style="margin-bottom: 10px"
        >
          <template #icon><svg-icon local-icon="uploadblue" style="color: #333" /> </template> 导出
        </n-button>
      </div>
      <KYTable
        ref="table"
        style="height: calc(100vh - 310px)"
        :colums="tableColumns.cl"
        :table-data="tableColumns.data"
        :total="FromSearch.total"
        :selection="false"
        :serial-number="{
          show: false
        }"
        :pagination-show="true"
        class="current"
        @page-change="pageChange($event)"
        @size-change="sizeChange($event)"
      >
        <template #returnOrderNumber="scope">
          <span class="oprationp" @click="getClick(scope.row)">{{ scope.row.returnOrderNumber }}</span>
        </template>
        <template #sendingCity="scope">
          <div>{{ scope.row.consignerCity }}</div>
          <div>{{ scope.row.parcelShop.parcelShopCode }}</div>
        </template>
        <template #sendingInfo="scope">
          <div>{{ scope.row.consignerName }}</div>
          <div>{{ scope.row.consignerMobile }}</div>
          <div>
            {{ scope.row.consignerCity + "-" + scope.row.consignerAddress }}
          </div>
        </template>
        <template #receivingInfo="scope">
          <div>{{ scope.row.recipientName }}</div>
          <div>{{ scope.row.recipietnMobile }}</div>
          <div>
            {{ scope.row.recipientProvince + "-" + scope.row.recipientCity + "-" + scope.row.recipetenAddressFirst }}
          </div>
        </template>
				<template #createTime="scope">
					<div>下单时间：{{ scope.row.createTime }}</div>
					<div>揽收时间：{{ scope.row.pickUpTime }}</div>
					<div>签收时间：{{ scope.row.signTime }}</div>
				</template>
        <template #returnGoodsStatus="scope">
          <div style="display: flex; align-items: center">
            <div
              :style="{
                width: '8px',
                height: '8px',
                borderRadius: '50% 50%',
                marginLeft: '6px',
                marginRight: '6px',
                background: `${
                  scope.row.returnGoodsStatus === 0 || scope.row.returnGoodsStatus === 3
                    ? 'red'
                    : scope.row.returnGoodsStatus === 1
                    ? 'blue'
                    : 'green'
                }`
              }"
            ></div>
            <div>
              {{
                scope.row.returnGoodsStatus === 0
                  ? "待揽收"
                  : scope.row.returnGoodsStatus === 1
                  ? "运输中"
                  : scope.row.returnGoodsStatus === 2
                  ? "已签收"
                  : "已取消"
              }}
            </div>
          </div>
        </template>
        <template #operation="scope">
          <n-button
            size="small"
            :text-color="'#0256FF'"
            text
            style="margin-right: 12px"
            @click="downloadFile(scope.row)"
          >
            面单
          </n-button>
          <n-button size="small" :text-color="'#0256FF'" text @click="detail(scope.row)"> 详情 </n-button>
        </template>
      </KYTable>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, getCurrentInstance, ref, onMounted } from "vue";
import { QueryReturnOrderList } from "@/service";
import KYTable from "@/components/KY-table/KY-table.vue";
import SearchFrom from "./components/searchFrom.vue";
import tabs from "@/components/tabs/index.vue";
import { useRouter } from "vue-router";
import moment from "moment";
const router = useRouter();

const proxy = getCurrentInstance()?.proxy as any;
const tablist = ref([
  { name: "全部", id: [] },
  { name: "待揽收", id: [0] },
  { name: "运输中", id: [1] },
  { name: "已签收", id: [2] },
  { name: "已取消", id: [3] }
]);
const FromSearch = reactive({
  pageSize: 10,
  pageIndex: 1,
  total: 0
});
const models = reactive({
  customerRoutingNodeChineseName: "",
  pushPlatform: null,
  customerRoutingNodeLocalId: null
});
const tableColumns = reactive({
  cl: [
    {
      minWidth: "250",
      prop: "returnOrderNumber",
      label: "订单号",
      slot: "returnOrderNumber"
    },
    {
      minWidth: "180",
      prop: "returnSmallShipment",
      label: "运单号"
    },
    {
      minWidth: "120",
      prop: "customerName",
      label: "平台"
    },
    {
      minWidth: "180",
      prop: "sendingCity",
      label: "寄件城市",
      slot: "sendingCity"
    },
    {
      minWidth: "320",
      prop: "sendingInfo",
      label: "寄件信息",
      slot: "sendingInfo"
    },
    {
      minWidth: "320",
      prop: "receivingInfo",
      label: "收件信息",
      slot: "receivingInfo"
    },
    {
      minWidth: "320",
      prop: "createTime",
      label: "下单时间",
			slot: "createTime"
    },
    {
      minWidth: "180",
      prop: "returnGoodsStatus",
      label: "状态",
      slot: "returnGoodsStatus"
    }
  ],
  data: []
});

const active = ref(null) as any;
const getTable = async (val: any) => {
  active.value = val;
  console.log(val);
  const { data } = await QueryReturnOrderList({
    ...FromSearch,
    ...models,
    returnGoodsStatus: active.value ? active.value[0] : null
  });
  tableColumns.data = proxy?.$Utils.placeholder(data.data);

  FromSearch.total = data.total;
};

const getClick = (row: any) => {
  router.push({
    path: "/returnshipment/returnshipmentorder/detail",
    query: {
      id: row.id
    }
  });
};

const detail = async (row: any) => {
  router.push({
    path: "/returnshipment/returnshipmentorder/detail",
    query: { id: row.id }
  });
};

const downloadFile = async (row: any) => {
  proxy?.$Utils.exports(
    "/api/CustomerReturnOrder/DownCustomerRetrunOrderLabel",
    {
      returnOrderNumber: row.returnOrderNumber
    },
    "退运面单"
  );
};

//导出
const exportFile = () => {
  proxy?.$Utils.exportsWithoutDownload(
    "/api/CustomerReturnOrder/ExportCustomerReturnOrder",
    {
      ...FromSearch,
      ...models,
      returnGoodsStatus: active.value ? active.value[0] : null
    },
    `退运订单${moment().format("YYYYMMDDHHmmss")}`
  );
};

const getSearch = (model) => {
  Object.assign(models, model);
  getTable(active.value);
};

onMounted(() => {
  window.addEventListener("getTable", () => {
    getTable(active.value);
  });
});

const pageChange = (pageIndex) => {
  console.log(pageIndex);
  FromSearch.pageIndex = pageIndex.pageIndex;
  getTable(active.value);
};

const sizeChange = (pageSize) => {
  FromSearch.pageSize = pageSize.pageSize;
  getTable(active.value);
};

getTable(active.value);
</script>

<style scoped lang="scss">
.searchCard {
  margin-bottom: 12px;
}
</style>
