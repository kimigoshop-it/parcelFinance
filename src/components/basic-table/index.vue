<template>
  <ThreeSection ref="section">
    <template #header>
      <n-card>
        <slot name="search"></slot>
      </n-card>
    </template>

    <template #main>
      <n-card class="h-full">
        <n-data-table :min-row-height="37" :single-line="false" :columns="columns" :data="data"
          :max-height="contentHeight" :theme-overrides="themeOverrides" />
      </n-card>
    </template>

    <template #footer>
      <n-card>
        <div class="flex w-full justify-end">
          <n-pagination v-model:page="filterParams.pageIndex" v-model:page-size="filterParams.pageSize"
            @update:page="handlePageChange" :item-count="filterParams.total" show-size-picker show-quick-jumper
            @update:page-size="handlePageChange" :page-sizes="[10, 20, 50, 100]" />
        </div>
      </n-card>
    </template>
  </ThreeSection>
</template>

<script lang="tsx" setup>
import ThreeSection from '@/components/layout/ThreeSection.vue';
import { TableColumn, RowData } from 'naive-ui/es/data-table/src/interface';
import { ref } from 'vue';

const section = ref<InstanceType<typeof ThreeSection>>()
const contentHeight = $computed(() => section.value?.contentHeight ?? 400 - 115)

const themeOverrides = {
  tdColorHover: '#fff',
  tdColor: '#fff',
  tdTextColor: '#000'
};


const props = defineProps<{
  columns: TableColumn<RowData>[];
  data: RowData[];
  filters: BaseQueryParams
}>();

const emit = defineEmits(['update:filters', 'update:page'])

const filterParams = $computed({
  get: () => props.filters,
  set: (val) => {
    emit('update:filters', val)
  }
})

function handlePageChange(page: number) {
  emit('update:page', page)
}

</script>