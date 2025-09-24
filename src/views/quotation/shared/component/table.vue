<template>
  <div id="container" class="h-full flex flex-col">
    <!-- 搜索区域固定在顶部 -->
    <n-card id="search-area-container" class="mb-2">
      <search-area :formItems="searchFormItems" v-model="filter" @search="refresh" @reset="reset" />
    </n-card>

    <!-- 表格卡片 -->
    <n-card id="table-container" class="flex flex-col flex-1 min-h-0">
      <!-- 表格主体，滚动区域 -->
      <div class="flex-none mt-2 flex justify-end items-center py-2">
        <n-button type="primary" @click="handleAdd">新增</n-button>
      </div>
      <div class="flex-1 min-h-0 overflow-auto">
        <n-data-table :max-height="maxTableHeight" :single-line="false" :columns="columns" :data="data"
          :theme-overrides="themeOverrides" />
      </div>

      <!-- 底部分页固定 -->
      <div id="pagination-container" class="flex-none mt-2 flex justify-end items-center pt-2">
        <n-pagination v-model:page="filter.pageIndex" :page-size="filter.pageSize" :item-count="total"
          @update:page="refresh" @update:page-size="refresh" />
      </div>
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import { onMounted, PropType } from 'vue';
import { queryCustomerBaseInfoList, queryPriceList } from '~/src/service';
import { useRouter } from 'vue-router';
import { getEnumLabel } from '~/src/typings/business/shared/enum_label_map';
import { getPriceEnumLabel } from '../model/price';
import { PriceType } from '@/typings/business/shared';
import SearchArea from '@/components/search-area/index.vue';
import PriceOptions from '../../price_config/form_conf';
import { ElSelect } from 'element-plus';
import { FormItem } from '~/src/components/basic-form';

const themeOverrides = {
  tdColorHover: '#fff',
  tdColor: '#fff',
  tdTextColor: '#000'
};

const props = defineProps({
  priceType: {
    type: Number as PropType<PriceType>,
    required: true
  }
});

const router = useRouter();

let data = $ref<Price[]>([]);
let total = $ref(0);
let filter = $ref({
  customerId: undefined,
  businessType: undefined,
  goodType: undefined,
  pageIndex: 0,
  pageSize: 10,
  priceType: props.priceType
});

let options = $ref<{ label: string; value: number }[]>([]);

const searchFormItems: FormItem[] = [
  {
    label: '所属项目',
    name: 'customerId',
    component: 'Customer',
    render: () => <ElSelect clearable v-model={filter.customerId} options={options} />
  },
  {
    label: '业务节点',
    name: 'businessType',
    component: 'Select',
    attrs: {
      options: PriceOptions.businessNodeOptions,
      clearable: true
    }
  },
  {
    label: '货物属性',
    name: 'goodType',
    component: 'Select',
    attrs: {
      options: PriceOptions.goodTypeOptions,
      clearable: true
    }
  }
];

const columns = [
  {
    title: '所属项目',
    key: 'customerName'
  },
  {
    title: '业务模式',
    key: 'businessType',
    render: (row: Price) => {
      return <>{getEnumLabel('businessType', row.businessType!)}</>;
    }
  },
  {
    title: '报价类型',
    key: 'priceType',
    render: (row: Price) => {
      return <>{getEnumLabel('priceType', row.priceType!)}</>;
    }
  },
  {
    title: '业务节点',
    key: 'businessNode',
    render: (row: Price) => {
      return <>{getEnumLabel('businessNode', row.businessNode!)}</>;
    }
  },
  {
    title: '尾程服务',
    key: 'lastMileService',
    render: (row: Price) => {
      return <>{getEnumLabel('lastMileService', row.lastMileService!)}</>;
    }
  },
  {
    title: '货物类型',
    key: 'goodType',
    render: (row: Price) => {
      return <>{getEnumLabel('goodType', row.goodType!)}</>;
    }
  },
  {
    title: '计费方式',
    key: 'billingMethod',
    render: (row: Price) => {
      return <>{getPriceEnumLabel('billingMethod', row.billingMethod!)}</>;
    }
  },
  {
    title: '创建日期',
    key: 'createTime'
  },
  {
    title: '操作',
    key: 'action',
    render: (row: Price) => {
      return (
        <n-button
          type='primary'
          onClick={() => {
            router.push({
              name: 'quotation_price_config',
              query: {
                action: 'edit',
                id: row.id,
                priceType: props.priceType
              }
            });
          }}
        >
          编辑
        </n-button>
      );
    }
  }
];

const refresh = (_: any) => {
  // 过滤掉null属性
  queryPriceList(filter).then((res) => {
    data = res.data ?? [];
    total = res.total;
    console.log('dta', data);
  });
};

const reset = () => {
  filter.customerId = undefined;
  filter.businessType = undefined;
  filter.goodType = undefined;
  filter.pageIndex = 0;
  filter.pageSize = 10;
  refresh(filter);
};

const handleAdd = () => {
  router.push({
    name: 'quotation_price_config',
    query: {
      action: 'add',
      priceType: props.priceType
    }
  });
};

let maxTableHeight = $ref(500);

onMounted(() => {
  refresh(filter);
  queryCustomerBaseInfoList({}).then((res) => {
    options = res.map((item) => ({
      label: item.customerName,
      value: item.id
    }));
  });

  const containerHeight = document.getElementById('container')?.clientHeight;
  const searchAreaHeight = document.getElementById('search-area-container')?.clientHeight;
  const paginationHeight = document.getElementById('pagination-container')?.clientHeight;
  console.log(containerHeight, searchAreaHeight, paginationHeight);
  maxTableHeight = containerHeight! - searchAreaHeight! - paginationHeight! - 200;
});
</script>

<style scoped></style>
