<template>
  <QueryPage :billType="PriceType.PAYABLE" />
</template>

<script lang="tsx" setup>
import QueryPage from '@/components/business/statement/query_page.vue';
import { PriceType } from '~/src/typings/business/shared';
</script>