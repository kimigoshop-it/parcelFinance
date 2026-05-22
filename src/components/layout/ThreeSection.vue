<template>
  <div id="container" :style="{ height: containerHeight + 'px' }">
    <div id="ts-header-bg" />
    <header id="ts_header">
      <slot name="header"></slot>
    </header>
    <main id="ts_main" :style="{ height: contentHeight + 'px' }">
      <slot name="default"></slot>
    </main>
    <footer id="ts_footer">
      <slot name="footer"></slot>
    </footer>
    <div id="ts-footer-bg" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, defineExpose } from 'vue';

const props = defineProps<{
  padding?: number;
}>();

const containerHeight = ref(0);
const contentHeight = ref(0);

// admin-layout__header 1
// // admin-layout__tab

function computeHeight() {
  const main = Array.from(document.getElementsByTagName('main')).filter(dom => dom.className === 'admin-layout__content')[0];
  const mainChild = main.children[0] as HTMLElement;
  const header = document.getElementsByClassName('admin-layout__header')[0];
  const tab = document.getElementsByClassName('admin-layout__tab')[0];
  const child = main.children[0];
  const tsHeader = document.getElementById('ts_header');
  const tsFooter = document.getElementById('ts_footer');

  const style = window.getComputedStyle(child);

  const viewHeight = window.innerHeight;
  let paddingTop = parseFloat(style.paddingTop);
  let paddingBottom = parseFloat(style.paddingBottom);

  const headerHeight = header.clientHeight;
  const tabHeight = tab.clientHeight;

  const tsHeaderHeight = tsHeader!.clientHeight;
  const tsFooterHeight = tsFooter!.clientHeight;

  // 不要padding
  if (props.padding !== undefined) {
    mainChild!.style.padding = '0';
    // 记得清零
    paddingBottom = 0;
    paddingTop = 0;
  }

  containerHeight.value = viewHeight - headerHeight - tabHeight - paddingTop - paddingBottom;
  contentHeight.value = containerHeight.value - tsHeaderHeight - tsFooterHeight;

  console.log('footer', tsFooterHeight);
}

defineExpose({
  contentHeight,
  containerHeight
})


onMounted(() => {
  computeHeight();
  console.log(containerHeight.value);
  window.addEventListener('resize', computeHeight);
});

onUnmounted(() => {
  window.removeEventListener('resize', computeHeight);
});
</script>

<style>
#container {
  display: flex;
  flex-direction: column;
  position: relative;
}

#ts_footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

#ts_main {
  display: flex;
  flex-direction: column;
  overflow: auto;
  margin-left: 0px;
  margin-right: 0px;
}
</style>
