<template>
  <ThreeSection ref="threeSectionRef" :padding="0">
    <template #header>
      <div class="header flex flex-y-center w-full">
        提单明细
      </div>
    </template>


  </ThreeSection>
</template>

<script setup lang="ts">
import ThreeSection from '~/src/components/layout/ThreeSection.vue';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();
const router = useRouter();

const id = Number(route.query.id);


const query = () => {
  console.log(id);
}

onMounted(() => {
  query();
})

</script>

<style scoped>
.header {
  font-size: 20px;
  font-weight: bold;
  height: 80px;
  background-color: #fff;
  padding: 0 25px;
}
</style>