<!--
 * @Description:
 *    页面刷新组件
 * @Author:HJ
 * @Date: 2021-05-05
 * @LastEditTime: 2021-05-30
 * @FilePath: \intelligent-overhaul-app\src\components\LoadMore.vue
-->
<template>
  <div class="load-more" ref="content"  @scroll="scroll">
    <slot></slot>
  </div>
</template>
<script setup>

import { ref, getCurrentInstance, onMounted } from 'vue';
const content = ref(null)
const ctx = getCurrentInstance();
let contentEl = null;
// let containerEl = null
onMounted(() => {
  contentEl = content.value;
  // containerEl = contentEl.parentNode;
})
const scroll = (e) => {
  // if (contentEl.scrollHeight > containerEl.offsetHeight && containerEl.offsetHeight >= contentEl.scrollHeight - contentEl.scrollTop) {
  // console.log('🚀 ~ scroll ~ containerEl.offsetHeight', contentEl.offsetHeight);
  if (contentEl.offsetHeight >= (contentEl.scrollHeight - contentEl.scrollTop)-1) {
    ctx.emit('load')
  }
}
</script>
<style lang="scss" scoped>
.load-more {
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
}
</style>
