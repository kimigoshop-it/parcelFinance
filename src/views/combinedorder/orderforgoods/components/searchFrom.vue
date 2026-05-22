<template>
  <div>
    <From :type="false" @getSearch="getSearch">
      <template #deflutContent>
        <div style="width: 100%">
          <n-form ref="formRef" label-placement="left" label-width="130" :model="model">
            <n-grid x-gap="12" :cols="4">
              <n-gi>
                <n-input v-model:value="model.platformCombinedOrderNumber" clearable @change="getSearch" @keydown.enter="getSearch"
                  style="width: 97%" placeholder="平台合包单号" />
              </n-gi>
							<n-gi>
								<n-input v-model:value="model.tmsCombinedOrderNumber" clearable @change="getSearch" @keydown.enter="getSearch"
		                     style="width: 97%" placeholder="tms合包单号" />
							</n-gi>
							<n-gi>
								<n-input v-model:value="model.lastMileCombinedOrderNumber" clearable @change="getSearch" @keydown.enter="getSearch"
		                     style="width: 97%" placeholder="尾程合包单号" />
							</n-gi>
							<n-gi>
								<n-select
									v-model:value="model.customerId"
			            clearable
			            @update:value="getSearch"
			            style="width: 97%"
			            label-field="customerName"
			            value-field="id"
			            placeholder="客户名称"
			            :options="options.customer"
								/>
							</n-gi>
            </n-grid>
          </n-form>
        </div>
      </template>
      <template #content>
        <div>
          <n-grid x-gap="12" :cols="4" style="margin-bottom: 10px;">
						<n-gi>
							<n-date-picker v-model:formatted-value="model.beginCreateTime" value-format="yyyy-MM-dd" type="date"
		                         style="width: 97%" clearable @update:value="getSearch" placeholder="下单开始时间" />
						</n-gi>
						<n-gi>
							<n-date-picker v-model:formatted-value="model.endCreateTime" value-format="yyyy-MM-dd" type="date"
		                         style="width: 97%" clearable @update:value="getSearch" placeholder="下单结束时间" />
						</n-gi>
						<n-gi>
							<n-select
								style="width: 97%"
			          v-model:value="model.goodsType"
			          :options="[
                    {
                      value: 'NORMAL',
                      label: '普货'
                    },
                    {
                      value: 'SPECIAL',
                      label: '特货'
                    }
                  ]"
			          placeholder="货物类型"
			          @update:value="getSearch"
			          clearable
							/>
						</n-gi>
          </n-grid>
          <n-grid x-gap="12" :cols="4">

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
	QueryCustomerBaseInfoList,
	QuerySystemDictionaryDetailList,
} from '@/service';
const emit = defineEmits(['getSearch']);

const options = ref({dictionaryTag: [], customer: []});

const model = reactive({
	platformCombinedOrderNumber: null,
	tmsCombinedOrderNumber: null,
	lastMileCombinedOrderNumber: null,
	customerId: null,
	orderBeginDateTime: null,
	orderEndDateTime: null,
	goodsType: null,
	combinedStatus: null,
});
const getCategoryAll = async () => {
	const {data} = await QueryCustomerBaseInfoList({});
	options.value.customer = data;
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
