<template>
  <!-- 表头 -->
  <div>
    <div :style="{ height: tableHeight + 'px' }">
      <table class="w-full border-collapse">
        <colgroup>
          <col v-for="col in columns" :key="col.key"
            :style="{ width: col.width ? (typeof col.width === 'number' ? col.width + 'px' : col.width) : 'auto' }" />
        </colgroup>

        <thead class="sticky_header bg-gray-100" :style="{ top: (stickyTop ?? 0) + 'px' }">
          <tr>
            <th v-for="col in columns" :key="col.key" class="p-2 text-left font-medium">
              {{ col.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in data" :key="rowIndex" class="hover:bg-gray-50">
            <td v-for="col in columns" :key="col.key" class="p-2">
              <div v-if="col.render === undefined">
                {{ row[col.key] }}
              </div>
              <div v-else>
                <component :is="col.render" :row="row" :value="row[col.key]" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <div class="pagination flex justify-end items-center py-2">
      <n-pagination v-model:page="pageIndex" v-model:page-size="pageSize" :item-count="total" show-size-picker
        show-quick-jumper :page-sizes="[10, 20, 50, 100]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { TableBaseColumn, TableColumn } from 'naive-ui/es/data-table/src/interface';

const props = defineProps<{
  columns: (TableBaseColumn & TableColumn)[];
  data: any[];
  pageIndex: number;
  pageSize: number;
  total: number;
  tableHeight: number;
  stickyTop?: number;
}>();


const emit = defineEmits([
  'update:page-index',
  'update:page-size'
]);

const pageIndex = $computed({
  get() {
    return props.pageIndex;
  },
  set(value) {
    emit('update:page-index', value);
  }
});

const pageSize = $computed({
  get() {
    return props.pageSize;
  },
  set(value) {
    emit('update:page-size', value);
  }
});


</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  /* 保持列宽固定 */
  font-size: 14px;
  color: #303133;
}

th,
td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #ebeef5;
  /* 仿 element-plus 边框颜色 */
  border-right: 1px solid #ebeef5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

th:last-child,
td:last-child {
  border-right: none;
}

tr:hover td {
  background-color: #f5f7fa;
  /* 仿 element-plus hover 行颜色 */
}

th {
  background-color: #f5f7fa;
  /* 表头浅灰 */
  font-weight: 600;
  border-bottom: 1px solid #dcdfe6;
}

.sticky_header {
  position: sticky;
  top: 0;
  z-index: 20;
}

.pagination {
  position: sticky;
  bottom: 0;
  z-index: 20;
  background: #fff;
}
</style>
