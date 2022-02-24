<!--
 * @Author: 一尾流莺
 * @Description:页面组件
 * @Date: 2021-08-27 15:35:43
 * @LastEditTime: 2021-08-27 17:50:55
 * @FilePath: \custom\src\pages\1000002983\99\2108100000298301\components\Page.vue
-->
<template>
  <div class="page-box"
       :style="optins">
    <slot name="default"></slot>
  </div>
</template>

<script lang='ts' setup>
import { defineProps } from 'vue';

const props = defineProps({
  optins: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang='scss'>
.page-box {
  width: 7.5rem;
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
}
</style>
