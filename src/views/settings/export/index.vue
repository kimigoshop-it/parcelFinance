<template>
  <div class="h-full" style="display: flex; flex-direction: column">
    <n-card class="shadow-sm rounded-1rem" style="margin-bottom: 12px">
      <SearchFrom @getSearch="getSearch" />
    </n-card>
    <n-card class="h-full shadow-sm rounded-16px">
      <KYTable
        ref="table"
        style="height: calc(100vh - 310px)"
        :colums="tableColums.cl"
        :table-data="tableColums.data"
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
        <template #exportProgress="scope">
          <span :style="{ color: getProgressColor(scope.row.exportProgress) }">
            {{ getProgressText(scope.row.exportProgress) }}
          </span>
        </template>

        <template #operation="scope">
          <n-button
            size="small"
            text
            :style="{ color: getButtonColor(scope.row.exportProgress) + ' !important' }"
            @click="handleButtonClick(scope.row)"
          >
            {{ getButtonText(scope.row.exportProgress) }}
          </n-button>
        </template></KYTable
      >
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, getCurrentInstance, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { QuerySystemExportList } from "~/src/service/api/system";
import moment from "moment";
import SearchFrom from "./components/SearchFrom.vue";

const route = useRoute();
const router = useRouter();
const range = ref(null) as any;

const AddAndUpdateRef = ref<any>(null);

const proxy = getCurrentInstance()?.proxy as any;

const FromSearch = reactive({
  pageSize: 10,
  pageIndex: 1,
  total: 0
});

let model = reactive({
  beginDataTime: null as string | null,
  endDataTime: null as string | null
});

const formatDateTime = (date: any) => {
  return date ? moment(date).format("YYYY-MM-DD") : null;
};

const tableColums = reactive({
  cl: [
    {
      prop: "createTime",
      minWidth: "180",
      label: "开始时间"
    },
    {
      prop: "updateTime",
      minWidth: "180",
      label: "结束时间"
    },
    {
      prop: "exportName",
      minWidth: "180",
      label: "导出名称"
    },
    {
      minWidth: "180",
      prop: "createUser",
      label: "操作人"
    },
    {
      minWidth: "180",
      prop: "exportGuid",
      label: "导出标识"
    },
    {
      prop: "exportCount",
      minWidth: "180",
      label: "导出数量"
    },
    {
      prop: "exportUrl",
      minWidth: "180",
      label: "导出链接"
    },
    {
      prop: "exportProgress",
      minWidth: "180",
      label: "导出进度",
      slot: "exportProgress"
    }
  ],
  data: [] as any
});

const handleButtonClick = (row) => {
  if (row.exportProgress === 2) {
    // 确保进度为 "完成"
    if (row.exportUrl) {
      // 创建一个隐藏的 <a> 元素用于下载
      const link = document.createElement("a");
      link.href = row.exportUrl; // 设置下载链接
      link.download = row.exportName || "下载文件"; // 设置文件名
      document.body.appendChild(link); // 将 <a> 元素添加到 DOM
      link.click(); // 触发点击事件
      document.body.removeChild(link); // 下载完成后移除 <a> 元素
      console.log("文件下载成功:", row.exportUrl);
    } else {
      // console.error("导出链接为空，无法下载");
      proxy?.$message.error("导出链接为空，无法下载");
    }
  } else {
    proxy?.$message.warning("当前进度未完成，无法下载");
  }
};

const getTable = async () => {
  try {
    const { data } = await QuerySystemExportList({ ...model, ...FromSearch });
    if (data && data.data) {
      tableColums.data = data.data; // 确保 data.data 存在
      FromSearch.total = data.total;
    } else {
      console.error("接口返回数据格式不正确", data);
    }
  } catch (error) {
    console.error("获取表格数据失败", error);
  }
};

const add = () => {
  AddAndUpdateRef.value.openAdd();
};

const getSearch = (models) => {
  Object.assign(model, models); // 合并 models 到 model 中
  getTable();
};

const pageChange = (pageIndex) => {
  FromSearch.pageIndex = pageIndex.pageIndex;
  getTable();
};

const sizeChange = (pageSize) => {
  FromSearch.pageSize = pageSize.pageSize;
  getTable();
};

const getProgressText = (exportProgress) => {
  if (exportProgress === 0) return "未开始";
  if (exportProgress === 1) return "进行中";
  if (exportProgress === 2) return "成功";
  return "未知状态";
};

const getProgressColor = (exportProgress) => {
  if (exportProgress === 0) return "#FF4D4F"; // 橙色
  if (exportProgress === 1) return "#FFA500"; // 绿色
  if (exportProgress === 2) return "#52C41A"; // 红色

  return "#000000"; // 默认黑色
};

const getButtonText = (exportProgress) => {
  if (exportProgress === 0) return "/";
  if (exportProgress === 1) return "/";
  if (exportProgress === 2) return "下载";
  return "未知状态";
};

const getButtonColor = (exportProgress) => {
  if (exportProgress === 0) return "#FF4D4F"; // 橙色
  if (exportProgress === 1) return "#FFA500"; // 蓝色
  if (exportProgress === 2) return "#0256FF"; // 红色
  return "#000000"; // 默认黑色
};

getTable();
</script>

<style scoped lang="scss">
.btn {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style>
