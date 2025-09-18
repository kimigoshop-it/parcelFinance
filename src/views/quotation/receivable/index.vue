<template>
  <price-table :priceType="PriceType.RECEIVABLE"></price-table>
</template>

<script lang="ts" setup>
import PriceTable from '../shared/component/table.vue';
import { PriceType } from '../shared/model/price';
</script>