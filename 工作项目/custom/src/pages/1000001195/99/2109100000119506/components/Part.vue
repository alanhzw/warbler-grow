<!--
 * @Author: 一尾流莺
 * @Description:part部分组件
 * @Date: 2021-08-27 15:35:43
 * @LastEditTime: 2021-09-01 10:36:05
 * @FilePath: \custom\src\pages\1001\99\123\components\Part.vue
-->
<template>
  <div class="part-box"
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
.part-box {
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
}
</style>
