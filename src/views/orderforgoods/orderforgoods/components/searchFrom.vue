<template>
  <div>
    <From :type="false" @getSearch="getSearch">
      <template #deflutContent>
        <div style="width: 100%">
          <n-form ref="formRef" label-placement="left" label-width="130" :model="model">
            <n-grid x-gap="12" :cols="4">
              <n-gi>
                <n-input v-model:value="model.polymericSerach" clearable @change="getSearch" @keydown.enter="getSearch"
                  style="width: 97%" placeholder="订单号/快递单号/运单号/入库单号/PN单号" />
              </n-gi>
              <n-gi>
                <n-date-picker v-model:formatted-value="model.orderBeginDateTime" value-format="yyyy-MM-dd" type="date"
                  style="width: 97%" clearable @update:value="getSearch" placeholder="下单开始时间" />
              </n-gi>
              <n-gi>
                <n-date-picker v-model:formatted-value="model.orderEndDateTime" value-format="yyyy-MM-dd" type="date"
                  style="width: 97%" clearable @update:value="getSearch" placeholder="下单结束时间" />
              </n-gi>
              <n-gi>
                <n-select v-model:value="model.customerGoodsCategory" clearable @update:value="getSearch"
                  style="width: 97%" label-field="dictionaryTag" value-field="dictionaryTagValue" placeholder="所属品类"
                  :options="options" />
              </n-gi>
            </n-grid>
          </n-form>
        </div>
      </template>
      <template #content>
        <div>
          <n-grid x-gap="12" :cols="4" style="margin-bottom: 10px;">
            <n-gi>
              <n-input v-model:value="model.kyShelfNumber" clearable @change="getSearch" @keydown.enter="getSearch"
                style="width: 97%" placeholder="肯亚货架号" />
            </n-gi>
            <n-gi>
              <n-date-picker v-model:formatted-value="model.kyBeginInStorageDatetime" value-format="yyyy-MM-dd"
                type="date" style="width: 97%" clearable @update:value="getSearch" placeholder="肯亚开始入库时间" />
            </n-gi>
            <n-gi>
              <n-date-picker v-model:formatted-value="model.kyEndInStorageDatetime" value-format="yyyy-MM-dd" type="date"
                style="width: 97%" clearable @update:value="getSearch" placeholder="肯亚结束入库时间" />
            </n-gi>
            <n-gi>
              <n-date-picker v-model:formatted-value="model.kyBeginOutStorageDateTime" value-format="yyyy-MM-dd"
                type="date" style="width: 97%" clearable @update:value="getSearch" placeholder="肯亚出库开始时间" />
            </n-gi>
          </n-grid>
          <n-grid x-gap="12" :cols="4">
            <n-gi>
              <n-date-picker v-model:formatted-value="model.kyEndOutStorageDateTime" value-format="yyyy-MM-dd" type="date"
                style="width: 97%" clearable @update:value="getSearch" placeholder="肯亚出库结束时间" />
            </n-gi>
            <n-gi>
              <n-input v-model:value="model.parcelhopNo" clearable @change="getSearch" @keydown.enter="getSearch"
                style="width: 97%" placeholder="包裹店编号" />
            </n-gi>
          </n-grid>
        </div>
      </template>
    </From>
    <div class="border"></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import From from '@/components/Form/index.vue';
import {
  QuerySystemDictionaryDetailList,
} from '@/service';
const emit = defineEmits(['getSearch']);

const model = reactive({
  polymericSerach: null,
  orderBeginDateTime: null,
  orderEndDateTime: null,
  kyShelfNumber: null,
  kyBeginInStorageDatetime: null,
  kyEndInStorageDatetime: null,
  kyBeginOutStorageDateTime: null,
  kyEndOutStorageDateTime: null,
  parcelhopNo: null,
  customerGoodsCategory: null
});
const options = ref([
])
// 获取所有品类
const getCategoryAll = async () => {
  const res = await QuerySystemDictionaryDetailList({
    dictionaryTypeCode: 'PL'
  });
  options.value = res.data.data.filter(option => option.state !== 1)
  console.log(options.value);
};
getCategoryAll();
const getSearch = () => {
  setTimeout(() => {
    emit('getSearch', model);
  }, 5);
};
</script>

<style scoped>
.border {
  width: 100%;
  opacity: 1;
  border: 1px dashed #E0E0E6;
  margin: 16px 0 16px;
  opacity: 0.3;
}
</style>
