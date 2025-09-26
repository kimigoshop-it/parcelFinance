<template>
  <div class="boxorder">
    <div class="toptit">
      <span>退运订单详情</span>
      <n-button @click="handleBack">返回</n-button>
    </div>
    <n-card class="box shadow-sm rounded-1rem" style="margin-bottom: 12px">
      <n-steps
        :current="formData.returnGoodsStatus === 3 ? 1 : formData.returnGoodsStatus + 1"
        status="finish"
        size="small"
        style="margin-top: 30px"
      >
        <n-step>
          <template #title>
            <span class="step_title">下单</span>
          </template>
          <div class="step_time">{{ dayjs(formData.createTime).format("YYYY-MM-DD HH:mm:ss") }}</div>
        </n-step>
        <n-step>
          <template #title>
            <span class="step_title">揽收</span>
          </template>
          <div class="step_time" v-if="formData.returnGoodsStatus > 1 && formData.returnGoodsStatus < 3">
            {{ dayjs(formData.pickUpTime).format("YYYY-MM-DD HH:mm:ss") }}
          </div>
        </n-step>
        <n-step>
          <template #title>
            <span class="step_title">签收</span>
          </template>
          <div class="step_time" v-if="formData.returnGoodsStatus === 2">
            {{ dayjs(formData.signTime).format("YYYY-MM-DD HH:mm:ss") }}
          </div>
        </n-step>
      </n-steps>
    </n-card>
    <n-card class="addressee shadow-sm rounded-1rem">
      <p>基本信息</p>
      <n-grid y-gap="24" x-gap="12" cols="s:2 m:4" responsive="screen">
        <n-gi>
          <n-space :size="4">
            <div class="label">运单号</div>
            <div>{{ formData.returnSmallShipment }}</div>
          </n-space>
        </n-gi>
        <n-gi>
          <n-space :size="4">
            <div class="label">平台单号</div>
            <div>{{ formData.returnOrderNumber }}</div>
          </n-space>
        </n-gi>
        <n-gi>
          <n-space :size="4">
            <div class="label">平台</div>
            <div>
              {{ formData.customerName }}
            </div>
          </n-space>
        </n-gi>
        <n-gi>
          <n-space :size="4">
            <div class="label">下单时间</div>
            <div>
              {{ dayjs(formData.createTime).format("YYYY-MM-DD HH:mm:ss") }}
            </div>
          </n-space>
        </n-gi>
      </n-grid>
    </n-card>

    <n-card class="addressee shadow-sm rounded-1rem">
      <p>寄件信息</p>
      <n-grid y-gap="24" x-gap="12" cols="s:2 m:4" responsive="screen">
        <n-gi>
          <n-space :size="4">
            <div class="label">寄件人</div>
            <div>{{ formData?.consignerName }}</div>
          </n-space>
        </n-gi>
        <n-gi>
          <n-space :size="4">
            <div class="label">手机号</div>
            <div>{{ formData?.consignerMobile }}</div>
          </n-space>
        </n-gi>
        <n-gi :span="2">
          <n-space :size="4">
            <div class="label">寄件地址</div>
            <div>
              {{ formData?.consignerAddress }}
            </div>
          </n-space>
        </n-gi>
        <n-gi>
          <n-space :size="4">
            <div class="label">寄件城市</div>
            <div>
              {{ formData?.consignerCity }}
            </div>
          </n-space>
        </n-gi>
      </n-grid>
    </n-card>
    <n-card class="addressee shadow-sm rounded-1rem">
      <p>收件信息</p>
      <n-grid y-gap="24" x-gap="12" cols="s:2 m:4" responsive="screen">
        <n-gi>
          <n-space :size="4">
            <div class="label">收件人</div>
            <div>{{ formData.recipientName }}</div>
          </n-space>
        </n-gi>
        <n-gi>
          <n-space :size="4">
            <div class="label">手机号</div>
            <div>{{ formData.recipietnMobile }}</div>
          </n-space>
        </n-gi>
        <n-gi :span="2">
          <n-space :size="4">
            <div class="label">收件地址</div>
            <div>
              {{ formData.recipientProvince + "-" + formData.recipientCity + "-" + formData.recipetenAddressFirst }}
            </div>
          </n-space>
        </n-gi>
      </n-grid>
    </n-card>
    <n-card class="addressee shadow-sm rounded-1rem">
      <p>轨迹推送</p>
      <KYTable
        ref="table"
        style="height: 31.25rem; margin-top: 0.625rem"
        :colums="tableColumns.trackColumns"
        :table-data="tableColumns.trackData"
        :selection="false"
        :serial-number="{
          show: false
        }"
        @page-change="trackPageChange($event)"
        @size-change="trackSizeChange($event)"
        :total="trackTable.total"
        class="current"
      ></KYTable>
    </n-card>
    <n-card class="addressee shadow-sm rounded-1rem" style="margin-bottom: 70px">
      <p>操作日志</p>
      <KYTable
        ref="table"
        style="height: 31.25rem; margin-top: 0.625rem"
        :colums="tableColumns.logColumns"
        :table-data="tableColumns.logData"
        :selection="false"
        :serial-number="{
          show: false
        }"
        @page-change="logPageChange($event)"
        @size-change="logSizeChange($event)"
        :total="logTable.total"
        class="current"
      ></KYTable>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { QueryReturnOrderDetail, QueryReturnOrderRoute, QueryCustomerRetrunOrderLog } from "@/service";
import dayjs from "dayjs";

const router = useRouter();
const route: any = useRoute();
const title = ref("新建路由节点");

const tableColumns = reactive({
  trackColumns: [
    {
      minWidth: "180",
      prop: "createTime",
      label: "操作时间"
    },
    {
      minWidth: "180",
      prop: "operateLocal",
      label: "操作地点"
    },
    {
      minWidth: "180",
      prop: "customerRoutingNodeChineseName",
      label: "路由节点"
    },
    {
      minWidth: "180",
      prop: "customerRoutingNodeEnglishName",
      label: "路由节点(英语)"
    },
    {
      minWidth: "180",
      prop: "customerRoutingNodeRussiaName",
      label: "路由节点(俄语)"
    },
    {
      minWidth: "180",
      prop: "customerRoutingNodeKazakhstanName",
      label: "路由节点(哈语)"
    }
  ],
  trackData: [],
  logColumns: [
    {
      minWidth: "180",
      prop: "createTime",
      label: "操作时间"
    },
    {
      minWidth: "180",
      prop: "createUser",
      label: "操作人"
    },
    {
      minWidth: "180",
      prop: "logContent",
      label: "操作内容"
    }
  ],
  logData: []
});

const trackTable = reactive({
  pageSize: 10,
  pageIndex: 1,
  total: 0
});

const logTable = reactive({
  pageSize: 10,
  pageIndex: 1,
  total: 0
});

const trackPageChange = (pageIndex) => {
  trackTable.pageIndex = pageIndex.pageIndex;
  getOrderRoute();
};

const trackSizeChange = (pageSize) => {
  trackTable.pageSize = pageSize.pageSize;
  getOrderRoute();
};

const logPageChange = (pageIndex) => {
  logTable.pageIndex = pageIndex.pageIndex;
  getLogRes();
};
const logSizeChange = (pageSize) => {
  logTable.pageSize = pageSize.pageSize;
  getLogRes();
};
const formData = reactive({
  id: null,
  returnGoodsStatus: 0,
  returnSmallShipment: null,
  returnOrderNumber: null,
  createTime: null,
  customerName: null,
  recipientName: null,
  pickUpTime: null,
  signTime: null,
  recipietnMobile: null,
  recipientProvince: null,
  recipetenAddressFirst: null,
  recipientCity: null,
  consignerName: null,
  consignerMobile: null,
  consignerAddress: null,
  consignerCity: null
});

const getData = async () => {
  if (route.query.id) {
    title.value = "节点详情";
    const { data } = await QueryReturnOrderDetail({ id: route.query.id });
    if (data.code === 200) {
      Object.assign(formData, data.data);
      getOrderRoute();
      getLogRes();
    } else {
      errorHint(data.message);
    }
  }
};

const getOrderRoute = async () => {
  //轨迹推送记录
  const { data: orderRoute } = await QueryReturnOrderRoute({
    returnOrderNumber: formData.returnOrderNumber,
    ...trackTable
  });
  if (orderRoute.code === 200) {
    tableColumns.trackData = orderRoute.data;
    trackTable.total = orderRoute.total;
  } else {
    errorHint(orderRoute.message);
  }
};

const getLogRes = async () => {
  const { data: logRes } = await QueryCustomerRetrunOrderLog({ id: formData.id, ...logTable });
  if (logRes.code === 200) {
    tableColumns.logData = logRes.data;
    logTable.total = logRes.total;
  } else {
    errorHint(logRes.message);
  }
};

getData();

const errorHint = ({ message }) => {
  window.$notification?.error({
    title: "失败",
    content: message,
    duration: 3000
  });
};

const handleBack = () => {
  Object.assign(formData, {
    returnGoodsStatus: 0,
    returnSmallShipment: null,
    returnOrderNumber: null,
    createTime: null,
    customerName: null,
    parcelShop: null as { [key: string]: any } | null,
    recipientName: null,
    pickUpTime: null,
    signTime: null,
    recipietnMobile: null,
    recipientProvince: null,
    recipetenAddressFirst: null,
    recipientCity: null
  });
  router.push("/returnshipment/returnshipmentorder");
};
</script>

<style lang="scss" scoped>
.step_title {
  color: #000;
  font-size: 14px;
  font-weight: 600;
}

.step_time {
  color: #777777;
}

.boxorder {
  margin-top: 68px;
  width: 100%;

  .toptit {
    height: 68px;
    background: #fff;
    width: calc(100% - 204px);
    position: absolute;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.12);
    top: 90px;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 26px;

    > span {
      font-family: PingFang SC;
      font-size: 20px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.85);
    }
  }

  .addressee {
    margin-top: 12px;
  }

  .box {
    width: 100%;
    padding-bottom: 30px;
  }
}

p {
  font-family: PingFang SC;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  color: #333333;
  padding-bottom: 16px;
  border-bottom: 1px dashed #e0e0e6;
  margin-bottom: 20px;
}

.label {
  color: rgb(136, 136, 136);
  &::after {
    content: ":";
    margin: 0 8px 0 2px;
  }
}
</style>
