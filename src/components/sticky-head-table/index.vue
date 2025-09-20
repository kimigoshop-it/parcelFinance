<template>
  <!-- 表头 -->
  <div>
    <div :style="{ height: tableHeight + 'px' }">
      <table class="w-full border-collapse">
        <thead class="sticky_header bg-gray-100" :style="{ top: (stickyTop ?? 0) + 'px'}">
          <tr>
            <th v-for="col in columns" :key="col.key" class="border p-2 text-left font-medium">
              {{ col.title }}
            </th>
          </tr>
        </thead>

        <!-- 表体 -->
        <tbody>
          <tr v-for="(row, rowIndex) in data" :key="rowIndex" class="hover:bg-gray-50">
            <td v-for="col in columns" :key="col.key" class="border p-2">
              <!-- 支持插槽覆盖单元格 -->
              <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
                {{ row[col.key] }}
              </slot>
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
import { TableBaseColumn } from 'naive-ui/es/data-table/src/interface';

const props = defineProps<{
  columns: TableBaseColumn[];
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
  position: relative;
  border-collapse: separate;
  border-spacing: 0;
}

/* tr:nth-child(even) {
  background-color: lightgray;
}

th {
  background-color: lightblue;
  position: sticky;
  top: 0;
} */

th,
td {
  border-color: black;
  border-style: solid;
  border-width: 0 0 1px 1px;
  padding: 10px 20px;
}

th {
  border-top-width: 1px;
}

th:last-child,
td:last-child {
  border-right-width: 1px;
}

tr:last-child td {
  border-bottom-width: 1px;
}

.sticky_header {
  position: sticky;
  z-index: 20;
  background: #fff;
}

.pagination {
  position: sticky;
  bottom: 0;
  z-index: 20;
  background: #fff;
}
</style>
