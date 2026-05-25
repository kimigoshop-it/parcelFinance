<template>
  <div>
    <DialogForm :columns="1" @close="handleClose" @positiveClick="add" title="新增区域" :visible="visible"
      :formItems="formItems" v-model="model" />
  </div>
</template>

<script setup lang="ts">
import DialogForm from "@/components/dialog-form";
import { queryCountryConfigList, addPartition } from "@/service/api/partition";
import { onMounted } from "vue";

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "success"): void;
}>();

const add = () => {
  addPartition(model).then((res) => {
    if (res.code === 200) {
      emit('success');
    }
  });
}


onMounted(() => {
  queryCountryConfigList({}).then((res) => {
    formItems[0].attrs!.options = res.data.map((item: ICountryConfig) => ({
      label: item.countryName,
      value: item.id,
    }));
  });
});

const handleClose = () => {
  emit('close');
}


// 表单定义
const formItems = $ref([
  {
    label: "国家编码",
    name: "countryConfigId",
    component: "Select",
    attrs: {
      options: [] as {
        label: string,
        value: number,
      }[],
    },
  },
  {
    label: "区域名称",
    name: "partitionName",
    component: "Input",
  }
])

const model = $ref<PartitionDto>({});

</script>

<style scoped lang="scss"></style>
