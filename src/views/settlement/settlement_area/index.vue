<template>
  <div class="h-full flex flex-col">
    <n-card class="shadow-sm rounded-16px" style="margin-bottom: 12px;">
      <SearchArea :formItems="formItems" v-model="filter" @search="handleSearch" @reset="handleReset" />
    </n-card>

    <n-card class="shadow-sm rounded-16px flex-1">
      <div class="flex justify-end mb-10px">
        <n-button type="error" color="#FB4A4C" @click="handleAdd">新增</n-button>
      </div>
      <el-table :data="data" border style="width: 100%">
        <el-table-column v-if="false" prop="id" label="ID" width="180" />
        <el-table-column prop="countryCode" label="国家编码" />
        <el-table-column prop="partitionCode" label="区域编码" />
        <el-table-column prop="partitionName" label="区域名称" />
				<el-table-column prop="customerBasicInfoNames" label="适用项目" />
        <el-table-column prop="createTime" sortable label="创建时间" />
        <el-table-column prop="amount2"  label="操作">
          <template #default="scope">
            <n-button text color="#0256ff" @click="handleEdit(scope.row)">编辑</n-button>
          </template>
        </el-table-column>
      </el-table>
    </n-card>

    <area-form-add @close="() => showForm.add = false" @success="handleSuccess('add')" :visible="showForm.add" />
    <area-form-edit @close="() => showForm.edit = false" @success="handleSuccess('edit')" v-if="showForm.edit"
      :partition="selectedPartition" :country="selectedCountry" />
  </div>
</template>

<script setup lang="ts">
import { FormItem } from '@/components/basic-form';
import AreaFormAdd from './component/area_form_add.vue';
import AreaFormEdit from './component/area_form_edit.vue';
import SearchArea from '@/components/search-area/index.vue';
import { queryPartitionList } from '~/src/service/api/partition';
import { onMounted } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';
import { QueryCustomerBaseInfoList } from '@/service';

const props = {
  value: 'id',
  label: 'label',
  options: 'options',
  disabled: 'disabled',
}

const refresh = (filter: PartitionFilter) => {
  queryPartitionList(filter).then((res) => {
    data = res.data;
  });
}

const customerOptions = $ref<{ label: string; value: number }[]>([]);

const formItems = $computed<FormItem[]>(() => [
  {
    label: '国家编码',
    name: 'countryCode',
    component: 'Input',
  },
  {
    label: '区域名称',
    name: 'partitionName',
    component: 'Input',
  }
]);


let filter = $ref<PartitionFilter>({
});

let data = $ref<IPartition[]>([]);

const handleAdd = () => {
  showForm.add = true;
}

const handleEdit = (row: IPartition) => {
  showForm.edit = true;
  selectedPartition = row;
  selectedCountry = {
    id: row.countryConfigId!,
    countryCode: row.countryCode ?? '',
    countryName: row['countryName'] ?? '',
    delFlag: 0,
  }
}

// 对话框
let selectedPartition = $ref<IPartition>({} as IPartition);
let selectedCountry = $ref<ICountryConfig>({} as ICountryConfig);

let showForm = $ref({
  add: false,
  edit: false,
});

const handleSearch = () => {
  refresh(filter);
}

const handleReset = () => {
  filter = {};
  refresh(filter);
}

const handleSuccess = (action: 'add' | 'edit') => {
  refresh(filter);
  showForm[action] = false;
}

onMounted(() => {
  refresh(filter);
  QueryCustomerBaseInfoList({}).then((res: any) => {
    let list = Array.isArray(res) ? res : (res?.data || []);
    if (!Array.isArray(list) && list?.data) {
      list = list.data;
    }
    customerOptions.push(...list.map((item: any) => ({
      label: item.customerName,
      value: item.id
    })));
  });
});




</script>

<style scoped></style>
