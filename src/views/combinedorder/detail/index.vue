<template>
  <n-card class="h-full shadow-sm rounded-1rem">
    <n-page-header @back="handleBack"><template #title>
        <span style="cursor: pointer" @click="handleBack">返回</span>
      </template>
    </n-page-header>
    <h2 class="title">基础信息</h2>
    <n-descriptions v-if="detailData.length > 0" label-placement="top" bordered :column="6">
      <n-descriptions-item v-for="item in tables.defaultMessage" :key="item.prop">
        <template #label> {{ item.label }} </template>
        {{ detailData[0][item.prop] || '--' }}
      </n-descriptions-item>
    </n-descriptions>
    <h2 class="title">订单信息</h2>
    <n-collapse v-if="shows" @update:expanded-names="getDetailColl">
      <n-collapse-item title="订单详情" name="1" @click="getDetail">
        <KYTable ref="table" style="height: 31.25rem; margin-top: .625rem" :loading="loading"
          :colums="tableColums.detailColums" :table-data="tableColums.detailData" :selection="false"
          :serial-number="false" :pagination-show="false" class="current"></KYTable>
      </n-collapse-item>
      <n-collapse-item title="订单路由" name="2" @click="getRoute">
        <KYTable ref="table" style="height: 31.25rem; margin-top: .625rem" :loading="loading"
          :colums="tableColums.routeColums" :table-data="tableColums.routeData" :selection="false" :serial-number="false"
          :pagination-show="false" class="current"></KYTable>
      </n-collapse-item>
      <n-collapse-item title="日志" name="3" @click="getDay">
        <KYTable ref="table" style="height: 31.25rem; margin-top: .625rem" :loading="loading"
          :colums="tableColums.dayColums" :table-data="tableColums.dayData" :selection="false" :serial-number="false"
          :pagination-show="false" class="current"></KYTable>
      </n-collapse-item>
      <n-collapse-item title="拒收信息" name="4" @click="getImgdata" v-if="showreject">
        <div class="rejectbox">
          <p> <span> 拒收原因：</span>{{ rejectivedata.cause }} <span v-if="!rejectivedata.cause"
              style="color: #ccc;font-size: .875rem;">无数据</span></p>
          <span>拒收图片：</span>
          <div> <n-image width="100" height="100" :src="item.url" alt="" v-for="item, index in rejectivedata.imgdata"
              :key="index" /></div>
        </div>
      </n-collapse-item>
    </n-collapse>
  </n-card>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  QueryCustomerOrderAllList,
  QueryCustomerOrderDetail,
  QueryCustomerOrderStorageLogsEntities,
  QueryCustomerOrderRoutingEntities,
  QueryParcelShopRejectList
} from '@/service';
import KYTable from '@/components/KY-table/KY-table.vue';

const loading = ref<boolean>(false)
const route = useRoute();
const router = useRouter();
const proxy = getCurrentInstance()?.proxy as any;
const tables = ref({
  defaultMessage: [
    {
      prop: 'customerName',
      minWidth: '180',
      label: '客户名称'
    },
    {
      minWidth: '180',
      prop: 'orderNumber',
      label: '订单号'
    },
    {
      minWidth: '180',
      prop: 'trackingNumber',
      label: '快递单号'
    },
    {
      prop: 'kySmallShipment',
      minWidth: '180',
      label: '肯亚小包运单号'
    },
    {
      prop: 'kyInStorageNumber',
      minWidth: '180',
      label: '肯亚入库单号'
    },
    {
      prop: 'parcelhopNo',
      minWidth: '180',
      label: '包裹店编号'
    },
    {
      minWidth: '180',
      prop: 'customerGoodsCategory',
      label: '所属品类',
      slot: 'customerGoodsCategory'
    },
    {
      minWidth: '180',
      prop: 'orderPerson',
      label: '下单人'
    },
    {
      minWidth: '180',
      prop: 'orderDateTime',
      label: '下单时间'
    },

    {
      prop: 'orderMobile',
      minWidth: '180',
      label: '下单手机号'
    },
    {
      minWidth: '180',
      prop: 'cartonNumber',
      label: '箱数'
    },

    {
      minWidth: '180',
      prop: 'recipientName',
      label: '收件人姓名'
    },
    {
      minWidth: '180',
      prop: 'recipientName',
      label: '收件人姓名'
    },
    {
      minWidth: '180',
      prop: 'recipientCity',
      label: '收件人城市'
    }
  ]
});
const detailData = ref([]);
const activeColl = ref([]);
const tableColums = reactive({
  detailColums: [
    {
      minWidth: '180',
      prop: 'orderNumber',
      label: '订单号'
    },
    {
      minWidth: '180',
      prop: 'trackingNumber',
      label: '快递单号'
    },
    {
      minWidth: '180',
      prop: 'brandChineseName',
      label: '中文品名'
    },
    {
      minWidth: '180',
      prop: 'brandEnglishName',
      label: '英文品名'
    },
    {
      minWidth: '180',
      prop: 'material',
      label: '材质'
    },
    {
      minWidth: '180',
      prop: 'purpose',
      label: '用途'
    },
    {
      minWidth: '180',
      prop: 'brand',
      label: '品牌'
    },
    {
      minWidth: '180',
      prop: 'model',
      label: '型号'
    },
    {
      minWidth: '180',
      prop: 'hsCode',
      label: 'HS编码'
    },
    {
      minWidth: '180',
      prop: 'customerName',
      label: '客户名称'
    },
    {
      minWidth: '180',
      prop: 'itemBarcode',
      label: '商品条码'
    },
    {
      minWidth: '180',
      prop: 'pcs',
      label: '件数'
    },
    {
      minWidth: '180',
      prop: 'crossWeight',
      label: '计算过线重量'
    },
    {
      minWidth: '180',
      prop: 'crossVolume',
      label: '计算过线体积'
    },
    {
      minWidth: '180',
      prop: 'crossLength',
      label: '计算过线长度'
    },
    {
      minWidth: '180',
      prop: 'crossWidth',
      label: '计算过线宽度'
    },
    {
      minWidth: '180',
      prop: 'crossHeight',
      label: '计算过线高度'
    }
  ],
  detailData: [],
  routeColums: [
    {
      minWidth: '180',
      prop: 'orderNumber',
      label: '客户订单号'
    },
    {
      minWidth: '180',
      prop: 'customerRoutingNodeCode',
      label: '客户路由节点Code'
    },
    {
      minWidth: '180',
      prop: 'customerName',
      label: '客户名称'
    },
    {
      minWidth: '180',
      prop: 'kySmallShipment',
      label: '肯亚小包单号'
    },
    {
      minWidth: '180',
      prop: 'kyInStorageNumber',
      label: '肯亚入库单号'
    },
    {
      minWidth: '180',
      prop: 'remark',
      label: '备注'
    },
    {
      minWidth: '180',
      prop: 'remarkEnglishName',
      label: '备注英语名称'
    },
    {
      minWidth: '180',
      prop: 'remarkRussiaName',
      label: '备注俄语名称'
    },
    {
      minWidth: '180',
      prop: 'remarkKazakhstanName',
      label: '备注哈语名称'
    },
    {
      minWidth: '180',
      prop: 'customerRoutingNodeChineseName',
      label: '客户路由节点中文名称'
    },
    {
      minWidth: '180',
      prop: 'customerRoutingNodeEnglishName',
      label: '客户路由节点英文名称'
    },
    {
      minWidth: '180',
      prop: 'customerRoutingNodeRussiaName',
      label: '客户路由节点俄语名称'
    },
    {
      minWidth: '180',
      prop: 'customerRoutingNodeKazakhstanName',
      label: '客户路由节点哈语名称'
    }
  ],
  routeData: [],
  dayColums: [
    {
      minWidth: '180',
      prop: 'orderNumber',
      label: '客户订单号'
    },
    {
      minWidth: '180',
      prop: 'customerName',
      label: '客户名称'
    },
    {
      minWidth: '180',
      prop: 'kyInStorageNumber',
      label: '肯亚入库单号'
    },
    {
      minWidth: '180',
      prop: 'kySmallShipment',
      label: '肯亚小包运单号'
    },
    {
      minWidth: '180',
      prop: 'logContent',
      label: '日志内容'
    }
  ],
  dayData: []
});
const rejectivedata = reactive({
  cause: '',
  imgdata: [] as any
})
const showreject = ref(false)
// 获取表格数据
const getTable = async () => {
  const loading = proxy?.$loading({
    lock: true,
    text: '查询中...',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  const { data } = await QueryCustomerOrderAllList({ id: Number(route.query.id) });
  detailData.value = data.data;
  loading.close();
  let obj = route.query.activeTabs;
  if (obj == '12') {
    showreject.value = true
  }

};
// 获取订单详情
const getDetail = async () => {
  if (activeColl.value.includes('1')) {
    const { data } = await QueryCustomerOrderDetail({
      customerOrderId: Number(route.query.id)
    });
    tableColums.detailData = proxy?.$Utils.placeholder(data);
  }
};
const shows = ref(false);
// 获取路由信息
const getRoute = async () => {
  if (activeColl.value.includes('2')) {
    const { data } = await QueryCustomerOrderRoutingEntities({
      customerOrderId: Number(route.query.id)
    });
    tableColums.routeData = proxy?.$Utils.placeholder(data);
  }
};
// 获取路由信息
const getDay = async () => {
  if (activeColl.value.includes('3')) {
    const { data } = await QueryCustomerOrderStorageLogsEntities({
      customerOrderId: Number(route.query.id)
    });
    tableColums.dayData = proxy?.$Utils.placeholder(data);
  }
};
//拒收信息
const getImgdata = async () => {
  let res = await QueryParcelShopRejectList({
    pageIndex: 1,
    pageSize: 1,
    waybillId: Number(route.query.id),
  })
  if (res.data.data[0]) {
    rejectivedata.cause = res.data.data[0].rejectReason
    rejectivedata.imgdata = JSON.parse(res.data.data[0].rejectUrl)
  }
}
const getDetailColl = (item: any) => {
  activeColl.value = item;
};
onMounted(() => {
  shows.value = false;
  getTable();
  setTimeout(() => {
    shows.value = true;
  });
});
// 返回
const handleBack = () => {
  router.push('/orderforgoods');
};
</script>

<style lang="scss" scoped>
.rejectbox {
  margin-left: 3%;

  p {
    margin-bottom: .9375rem;
  }

  span {
    font-size: 1.125rem;
    font-weight: 500;
  }

  >div {
    margin: .75rem 1.875rem;
    display: flex;

    img {
      width: 3.4375rem;
      height: 3.4375rem;
      margin: 0 .75rem;
    }
  }
}

.title {
  margin: .9375rem 0rem .625rem 0rem;
  font-weight: 700;
  font-size: 1.125rem;
}

.n-image {
  margin: 0 12px;
}
</style>
