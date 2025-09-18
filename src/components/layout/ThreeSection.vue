<template>
  <div id="container" :style="{ height: containerHeight + 'px' }">
    <header id="ts_header">
      <slot name="header"></slot>
    </header>
    <main id="ts_main" :style="{ height: contentHeight + 'px' }">
      <slot name="main"></slot>
    </main>
    <footer id="ts_footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';

const containerHeight = ref(0);
const contentHeight = ref(0);

// admin-layout__header
// // admin-layout__tab

function computeHeight() {
  const main = Array.from(document.getElementsByTagName('main')).filter(dom => dom.className === 'admin-layout__content')[0];
  const header = document.getElementsByClassName('admin-layout__header')[0];
  const tab = document.getElementsByClassName('admin-layout__tab')[0];
  const child = main.children[0];
  const tsHeader = document.getElementById('ts_header');
  const tsFooter = document.getElementById('ts_footer');

  const style = window.getComputedStyle(child);

  const viewHeight = window.innerHeight;
  const paddingTop = parseFloat(style.paddingTop);
  const paddingBottom = parseFloat(style.paddingBottom);

  const headerHeight = header.clientHeight;
  const tabHeight = tab.clientHeight;

  const tsHeaderHeight = tsHeader!.clientHeight;
  const tsFooterHeight = tsFooter!.clientHeight;

  containerHeight.value = viewHeight - headerHeight - tabHeight - paddingTop - paddingBottom;
  contentHeight.value = containerHeight.value - tsHeaderHeight - tsFooterHeight;

  console.log(containerHeight.value, contentHeight.value);
}




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
  border: 1px solid #000;
  position: relative;
}

#ts_header {
  background: #f88;
}

#ts_footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #f44;
}

#ts_main {
  overflow: auto;
}
</style>
