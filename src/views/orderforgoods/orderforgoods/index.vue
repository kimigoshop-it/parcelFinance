<template>
  <div class="h-full">
    <n-card class="shadow-sm rounded-16px" style="margin-bottom: 12px;">
      <SearchFrom @getSearch="getSearch" />
      <tabs :tablist="tablist" @tabsemit="getTable" :tabname="'分类'" />
    </n-card>
    <n-card class="shadow-sm rounded-16px">
      <n-button @click="cliderive" ghost style="margin-bottom: 10px;">
        <template #icon><svg-icon local-icon="uploadblue" style="color: #333;" />
        </template> 导出
      </n-button>
      <KYTable ref="table" style="height: calc(100vh - 380px)" :colums="tableColums.cl" :table-data="tableColums.data"
        :total="FromSearch.total" :selection="false" :serial-number="false" :pagination-show="true" class="current"
        @rowClick="rowClick" @page-change="pageChange($event)" @size-change="sizeChange($event)" :operationWidth="180">
        <template #customerName="scope">
          <div class="customerNames">
            <span class="mr-1">{{ scope.row.customerName }} </span><icon-local-yuan2
              v-if="scope.row.isSecondaryPackaging === 1" class="text-22px mr-1" /><icon-local-xz
              v-if="scope.row.isProhibited === 1" class="text-22px mr-1" />
            <icon-local-posun v-if="scope.row.isBlemishedItem === 1" class="text-22px mr-1" />
            <icon-local-xiaci v-if="scope.row.isBlemishedItem === 2" class="text-22px mr-1" />
          </div>
        </template>
        <template #orderNumber="scope">
          <span class="oprationp" @click="getClick(scope.row)">{{ scope.row.orderNumber }} </span>
        </template>
        <template #customerGoodsCategory="scope">
          <div @click.stop="">
            <n-select v-model:value="scope.row.customerGoodsCategory" :disabled="scope.row.goodsStatus != 0" size="tiny"
              label-field="dictionaryTag" value-field="dictionaryTagValue" filterable :options="codeAllSelect.categoryAll"
              placeholder="品类名称" @update:value="updatValue(scope.row)" />
          </div>
        </template>
        <template #customerOrderType="scope">
          <span v-if="scope.row.customerOrderType === 1">代购</span>
          <span v-else-if="scope.row.customerOrderType === 2">转运</span>
          <span v-else>--</span>
        </template>
        <template #isProhibited="scope">
          <div @click.stop="">
            <n-select v-model:value="scope.row.isProhibited" :disabled="scope.row.goodsStatus != 0" size="tiny"
              label-field="label" value-field="id" filterable :options="[
                {
                  id: 0,
                  label: '否'
                },
                {
                  id: 1,
                  label: '是'
                }
              ]" placeholder="请选择" @update:value="updatValueIsProhibited(scope.row)" />
          </div>
        </template>
        <template #realityCrossWeight="scope">
          <div>
            <n-input-number v-if="inputShow('realityCrossWeight', scope.index)" ref="realityCrossWeight"
              v-model:value="scope.row.realityCrossWeight" style="width: 100%" :show-button="false" clearable :min="0"
              placeholder="实际过线重量" @blur="inputNoShow(scope.index)" />
            <div v-else style="width: 100%; height: 43px; cursor: pointer; line-height: 43px"
              @click="inputShowClick('realityCrossWeight', scope.index)">
              {{ scope.row.realityCrossWeight }}
            </div>
          </div>
        </template>
        <template #realityCrossLength="scope">
          <div>
            <n-input-number v-if="inputShow('realityCrossLength', scope.index)" ref="realityCrossLength"
              v-model:value="scope.row.realityCrossLength" style="width: 100%" :min="1" :show-button="false" clearable
              placeholder="实际过线长度" @blur="inputNoShow(scope.index)" />
            <div v-else style="width: 100%; height: 43px; cursor: pointer; line-height: 43px"
              @click="inputShowClick('realityCrossLength', scope.index)">
              {{ scope.row.realityCrossLength }}
            </div>
          </div>
        </template>
        <template #realityCrossWidth="scope">
          <div>
            <n-input-number v-if="inputShow('realityCrossWidth', scope.index)" ref="realityCrossWidth"
              v-model:value="scope.row.realityCrossWidth" style="width: 100%" :show-button="false" clearable :min="1"
              placeholder="实际过线宽度" @blur="inputNoShow(scope.index)" />
            <div v-else style="width: 100%; height: 43px; cursor: pointer; line-height: 43px"
              @click="inputShowClick('realityCrossWidth', scope.index)">
              {{ scope.row.realityCrossWidth }}
            </div>
          </div>
        </template>
        <template #realityCrossHeight="scope">
          <div>
            <n-input-number v-if="inputShow('realityCrossHeight', scope.index)" ref="realityCrossHeight"
              v-model:value="scope.row.realityCrossHeight" style="width: 100%" :show-button="false" clearable :min="1"
              placeholder="实际过线高度" @blur="inputNoShow(scope.index)" />
            <div v-else style="width: 100%; height: 43px; cursor: pointer; line-height: 43px"
              @click="inputShowClick('realityCrossHeight', scope.index)">
              {{ scope.row.realityCrossHeight }}
            </div>
          </div>
        </template>
        <template #goodsStatus="scope">
          <div @click.stop="">
            <n-tag v-if="scope.row.goodsStatus === 0" type="warning"> {{ statusObj[scope.row.goodsStatus] }} </n-tag>
            <n-tag v-if="scope.row.goodsStatus === 1" type="success"> {{ statusObj[scope.row.goodsStatus] }} </n-tag>
            <n-tag v-if="scope.row.goodsStatus === 2" type="warning"> {{ statusObj[scope.row.goodsStatus] }} </n-tag>
            <n-tag v-if="scope.row.goodsStatus === 3" type="error"> {{ statusObj[scope.row.goodsStatus] }} </n-tag>
            <n-tag v-if="scope.row.goodsStatus === 4" type="info"> {{ statusObj[scope.row.goodsStatus] }} </n-tag>
            <n-tag v-if="scope.row.goodsStatus === 5"> {{ statusObj[scope.row.goodsStatus] }} </n-tag>
            <n-tag v-if="scope.row.goodsStatus === 6" type="success"> {{ statusObj[scope.row.goodsStatus] }} </n-tag>
            <n-tag v-if="scope.row.goodsStatus === 7" type="warning"> {{ statusObj[scope.row.goodsStatus] }} </n-tag>
            <n-tag v-if="scope.row.goodsStatus === 8" type="error"> {{ statusObj[scope.row.goodsStatus] }} </n-tag>
            <n-tag v-if="scope.row.goodsStatus === 9" type="info"> {{ statusObj[scope.row.goodsStatus] }} </n-tag>
            <n-tag v-if="scope.row.goodsStatus === 10"> {{ statusObj[scope.row.goodsStatus] }} </n-tag>
            <n-tag v-if="scope.row.goodsStatus === 11" type="success"> {{ statusObj[scope.row.goodsStatus] }} </n-tag>
            <n-tag v-if="scope.row.goodsStatus === 12" type="warning"> {{ statusObj[scope.row.goodsStatus] }} </n-tag>
            <n-tag v-if="scope.row.goodsStatus === 13" type="error"> {{ statusObj[scope.row.goodsStatus] }} </n-tag>
            <n-tag v-if="scope.row.goodsStatus === 14" type="error"> {{ statusObj[scope.row.goodsStatus] }} </n-tag>
            <n-tag v-if="scope.row.goodsStatus === 15" type="error"> {{ statusObj[scope.row.goodsStatus] }} </n-tag>
          </div>
        </template>
        <template #operation="scope">
          <div v-if="activeTabs && activeTabs[0] == 12">
            <n-button style="margin-right: 12px;" color="#0256ff" size="small" text @click="getClick(scope.row)">
              详情
            </n-button>
          </div>
          <div style="display:flex" v-else>
            <n-tooltip v-if="(scope.row.goodsStatus !== 1 && scope.row.goodsStatus !== 7) || scope.row.isSecondaryPackaging === 1
              " trigger="hover">
              <template #trigger>
                <div>
                  <n-button disabled style="margin-right: 12px;" color="#0256ff" size="small" text
                    @click.stop="upLoading(scope.row)">
                    上架
                  </n-button>
                </div>
              </template>
              {{ scope.row.isSecondaryPackaging === 1 ? '当前订单需要二次包装' : '当前订单状态不是已入库' }}
            </n-tooltip>
            <n-button v-else style="margin-right: 12px;" color="#0256ff" size="small" text
              @click.stop="upLoading(scope.row)">
              上架
            </n-button>
            <n-button style="margin-right: 12px;" color="#0256ff" size="small" text @click.stop="doload(scope.row)">
              下载面单
            </n-button>
          </div>
        </template>
      </KYTable>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, getCurrentInstance, nextTick, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import tabs from '@/components/tabs/index.vue';
import moment from "moment";
import {
  QueryCustomerOrderAllList,
  QuerySystemDictionaryDetailList,
  UpdateCustomerOrder,
  CustomerPutOnShelves
} from '@/service';
import KYTable from '@/components/KY-table/KY-table.vue';
import useMousePosition from '@/hooks/common/validation';
import SearchFrom from './components/searchFrom.vue';
const route = useRoute();
const router = useRouter();

// 获取Component实例
const proxy = getCurrentInstance()?.proxy as any;
// ref
const instance = getCurrentInstance() as any;
const activeTabs = ref<any[]>([]);

// 分页查询参数
const FromSearch = reactive({
  pageSize: 10,
  pageIndex: 1,
  total: null
});
const tablist = ref([
  { name: '全部', id: [] },
  { name: '已下单', id: [0] },
  { name: '已入库', id: [1] },
  { name: '已上架', id: [2] },
  { name: '上架失败', id: [7] },
  { name: '已合包', id: [4] },
  { name: '已出库', id: [5] },
  { name: '出库失败', id: [15] },
  { name: '转运中', id: [8] },
  { name: '中转站已入库', id: [9] },
  { name: '中转站已出库', id: [10] },
  { name: '包裹店已上架', id: [11] },
  { name: '包裹店上架失败', id: [14] },
  { name: '包裹店已取件', id: [13] },
  { name: '包裹店已拒收', id: [12] },
  { name: '已取消', id: [6] },
])
const statusObj = {
  0: '已下单',
  1: '已入库',
  2: '已上架',
  7: '上架失败',
  4: '已合包',
  5: '已出库',
  8: '转运中',
  9: '中转站已入库',
  10: '中转站已出库',
  11: '包裹店已上架',
  13: '包裹店已取件',
  12: '包裹店已拒收',
  14: '包裹店上架失败',
  15: '出库失败',
  6: '已取消'
};
const doload = (row) => {
  proxy?.$Utils.exports('/api/CustomerOrder/DownKySmallShipment', {
    id: row.id
  }, '小包面单');
}
let model = reactive({
  polymericSerach: '',
  orderBeginDateTime: null,
  orderEndDateTime: null,
  kyShelfNumber: '',
  kyBeginInStorageDatetime: null,
  kyEndInStorageDatetime: null,
  kyBeginOutStorageDateTime: null,
  kyEndOutStorageDateTime: null,
  parcelhopNo: '',
  customerId: 0,
  customerName: '',
  customerGoodsCategory: ''
});
// 表格参数
const tableColums = reactive({
  cl: [
    {
      minWidth: '180',
      prop: 'orderNumber',
      label: '订单号',
      slot: 'orderNumber',
      fixed: 'fixed'
    },
    {
      prop: 'customerName',
      minWidth: '180',
      label: '客户名称',
      slot: 'customerName'
    },
    {
      minWidth: '180',
      prop: 'trackingNumber',
      label: '快递单号'
    },
    {
      prop: 'kySmallShipment',
      minWidth: '250',
      label: '肯亚小包运单号'
    },
    {
      prop: 'kyInStorageNumber',
      minWidth: '180',
      label: '肯亚入库单号'
    },
    {
      prop: 'pnCode',
      minWidth: '180',
      label: 'PN单号'
    },
    {
      minWidth: '180',
      prop: 'goodsStatus',
      label: '订单状态',
      slot: 'goodsStatus'
    },
    {
      prop: 'customerOrderType',
      minWidth: '180',
      label: '订单类型',
      slot: 'customerOrderType'
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
      prop: 'isProhibited',
      label: '是否限运品',
      slot: 'isProhibited'
    },
    {
      prop: 'realityCrossLength',
      minWidth: '180',
      label: '实际过线长度(cm)',
      slot: 'realityCrossLength'
    },
    {
      prop: 'realityCrossWidth',
      minWidth: '180',
      label: '实际过线宽度(cm)',
      slot: 'realityCrossWidth'
    },
    {
      prop: 'realityCrossHeight',
      minWidth: '180',
      label: '实际过线高度(cm)',
      slot: 'realityCrossHeight'
    },
    {
      prop: 'realityCrossWeight',
      minWidth: '180',
      label: '实际过线重量(kg)',
      slot: 'realityCrossWeight'
    },
    {
      minWidth: '180',
      prop: 'volumetricWeight',
      label: '体积重量（Kg）'
    },
    {
      minWidth: '180',
      prop: 'chargeableWeight',
      label: '计费重量（Kg）'
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
      prop: 'recipientCity',
      label: '收件人城市'
    },
    {
      minWidth: '180',
      prop: 'recipietnMobile',
      label: '收件人电话'
    },
    {
      minWidth: '180',
      prop: 'recipietnPostCode',
      label: '收件人邮编'
    },
    {
      minWidth: '180',
      prop: 'recipietnNation',
      label: '收件人国家'
    },
    {
      minWidth: '180',
      prop: 'recipetenAddressFirst',
      label: '收件人地址一'
    },
    {
      minWidth: '180',
      prop: 'recipetenAddressSecond',
      label: '收件人地址二'
    },
    {
      minWidth: '180',
      prop: 'recipetenAddressThid',
      label: '收件人地址三'
    },
    {
      prop: 'consignerName',
      minWidth: '180',
      label: '发货人姓名'
    },
    {
      minWidth: '180',
      prop: 'consignerMobile',
      label: '发货人手机号'
    },
    {
      prop: 'consignerCity',
      minWidth: '180',
      label: '发货人城市'
    },
    {
      prop: 'consignerAddress',
      minWidth: '180',
      label: '发货人地址'
    },

    {
      prop: 'kyShelfNumber',
      minWidth: '180',
      label: '肯亚货架号'
    },
    {
      prop: 'kyInStorageUser',
      minWidth: '180',
      label: '肯亚入库人'
    },
    {
      prop: 'kyInStorageDatetime',
      minWidth: '180',
      label: '肯亚入库时间'
    },
    {
      prop: 'kyOutStorageUser',
      minWidth: '180',
      label: '肯亚出库人'
    },
    {
      prop: 'kyOutStorageNumber',
      minWidth: '180',
      label: '肯亚出库单号'
    },
    {
      prop: 'kyOutStorageDateTime',
      minWidth: '180',
      label: '肯亚出库时间'
    },

    {
      prop: 'declareCurrency',
      minWidth: '180',
      label: '申报币种'
    },

    {
      prop: 'remark',
      minWidth: '180',
      label: '备注'
    }
  ],
  data: [] as any
});

// 判断参数
const is = reactive({
  inputShow: ''
});
// 判断是否显示输入框
const inputShow = (key, index) => {
  return key + index === is.inputShow;
};
// 显示输入框
const inputShowClick = async (key, index) => {
  tableColums.data[index][key] = tableColums.data[index][key] === '--' ? null : tableColums.data[index][key];
  is.inputShow = key + index;
  nextTick(() => {
    instance.refs[key].focus();
  });
};
// 获取表格数据
const getTable = async (val?: any) => {
  const loading = proxy?.$loading({
    lock: true,
    text: '查询中...',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  activeTabs.value = val
  console.log(activeTabs.value);
  const { data } = await QueryCustomerOrderAllList({ ...FromSearch, ...model, goodsStatusList: activeTabs.value });
  tableColums.data = proxy?.$Utils.placeholder(data.data);
  FromSearch.total = data.total;
  loading.close();
};
//导出
const cliderive = async () => {
  proxy?.$Utils.exportsPost('/api/CustomerOrder/ExportCustomerOrder', {
    ...FromSearch, ...model, goodsStatusList: activeTabs.value
  }, `小包订单${moment().format("YYYYMMDDHHmmss")}`);
}
// 隐藏输入框
const inputNoShow = async index => {
  const { data } = await UpdateCustomerOrder({
    realityCrossWeight:
      tableColums.data[index].realityCrossWeight === '--' ? null : tableColums.data[index].realityCrossWeight,
    realityCrossLength:
      tableColums.data[index].realityCrossLength === '--' ? null : tableColums.data[index].realityCrossLength,
    realityCrossWidth:
      tableColums.data[index].realityCrossWidth === '--' ? null : tableColums.data[index].realityCrossWidth,
    realityCrossHeight:
      tableColums.data[index].realityCrossHeight === '--' ? null : tableColums.data[index].realityCrossHeight,
    id: tableColums.data[index].id
  });
  if (data.code === 200) {
    window.$notification?.success({
      title: '成功',
      content: `${data.message}`,
      duration: 3000
    });
    is.inputShow = '';
    getTable(activeTabs.value);
  } else {
    window.$notification?.error({
      title: '失败',
      content: `${data.message}`,
      duration: 3000
    });
  }
};

const codeAllSelect = reactive({
  categoryAll: []
});
const rowClickNum = ref(0);

const getClick = (row: any) => {
  router.push({
    path: '/orderforgoods/detail',
    query: {
      id: row.id, activeTabs: activeTabs.value[0]
    }
  });
};
const rowClick = (row: any) => {
  rowClickNum.value += 1;
  console.log(row);
  setTimeout(() => {
    rowClickNum.value = 0;
  }, 200);
  if (rowClickNum.value >= 2) {
    router.push({
      path: '/orderforgoods/detail',
      query: {
        id: row.id
      }
    });
  }
};
// 获取所有品类
const getCategoryAll = async () => {
  const res = await QuerySystemDictionaryDetailList({
    dictionaryTypeCode: 'PL'
  });
  codeAllSelect.categoryAll = res.data.data;
};
getCategoryAll();

// 上架
const upLoading = async row => {
  const loading = proxy?.$loading({
    lock: true,
    text: '上架中...',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  const { data } = await CustomerPutOnShelves({
    kySmallShipment: row.kySmallShipment
  });
  if (data.code === 200) {
    window.$notification?.success({
      title: '成功',
      content: `${data.message}`,
      duration: 3000
    });
    getTable(activeTabs.value);
    loading.close();
  } else {
    row!.customerGoodsCategory = '--';
    window.$notification?.error({
      title: '失败',
      content: `${data.message}`,
      duration: 3000
    });
    loading.close();
  }
};
const updatValue = async row => {
  const { data } = await UpdateCustomerOrder({
    id: row.id,
    customerGoodsCategory: row.customerGoodsCategory
  });
  if (data.code === 200) {
    window.$notification?.success({
      title: '成功',
      content: `${data.message}`,
      duration: 3000
    });
    getTable(activeTabs.value);
  } else {
    row!.customerGoodsCategory = '--';
    window.$notification?.error({
      title: '失败',
      content: `${data.message}`,
      duration: 3000
    });
    // window.$dialog!.error({
    //   title: '错误',
    //   content: data.message
    // });
  }
};
const updatValueIsProhibited = async row => {
  const { data } = await UpdateCustomerOrder({
    id: row.id,
    isProhibited: row.isProhibited
  });
  if (data.code === 200) {
    window.$notification?.success({
      title: '成功',
      content: `${data.message}`,
      duration: 3000
    });
    getTable(activeTabs.value);
  } else {
    row!.customerGoodsCategory = '--';
    window.$notification?.error({
      title: '失败',
      content: `${data.message}`,
      duration: 3000
    });
    // window.$dialog!.error({
    //   title: '错误',
    //   content: data.message
    // });
  }
};
// 查询
const getSearch = models => {
  model = { ...models };
  getTable(activeTabs.value);
};
// 页码调整
const pageChange = pageIndex => {
  FromSearch.pageIndex = pageIndex.pageIndex;
  getTable(activeTabs.value);
};
const sizeChange = pageSize => {
  FromSearch.pageSize = pageSize.pageSize;
  getTable(activeTabs.value);
};
getTable(activeTabs.value);
</script>

<style scoped lang="scss">
.stybox {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .n-button {
    height: 30px;
  }
}

.btn {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.customerNames {
  display: flex;
  align-items: center;

  svg {
    color: red;
  }
}
</style>
