<template>
  <div style="width: 100%">
    <n-form ref="formRef" label-placement="left">
      <n-grid x-gap="20" :cols="5">
        <n-gi>
          <n-form-item path="range">
            <n-date-picker
              style="width: 250px"
              v-model:value="range"
              type="daterange"
              update-value-on-close
              @update="handleDateChange"
              clearable
              :actions="['clear']"
              start-placeholder="开始日期"
              end-placeholder="结束日期" /></n-form-item
        ></n-gi>
        <n-gi>
          <n-button type="error" color="#FB4A4C" style="margin-left: 20px" @click="getSearch"> 查询 </n-button>
          <n-button style="margin-left: 20px" @click="editemits"> 重置 </n-button>
        </n-gi>
      </n-grid>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import moment from "moment";

const range = ref(null) as any;

const emit = defineEmits(["getSearch"]);

let model = reactive({
  beginDataTime: null as string | null,
  endDataTime: null as string | null
});

const handleDateChange = () => {
  getSearch();
};
const formatDateTime = (date: any) => {
  return date ? moment(date).format("YYYY-MM-DD") : null;
};
const getSearch = () => {
  model.beginDataTime = formatDateTime(range.value ? range.value[0] : null);
  model.endDataTime = formatDateTime(range.value ? range.value[1] : null);

  Object.assign(model);
  emit("getSearch", model);
};

const editemits = () => {
  Object.assign(model, {
    beginDataTime: null as string | null,
    endDataTime: null as string | null
  });
  emit("getSearch", model);
};
</script>
