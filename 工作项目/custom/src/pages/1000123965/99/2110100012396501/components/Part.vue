<!--
 * @Author: 一尾流莺
 * @Description:part部分组件
 * @Date: 2021-08-27 15:35:43
 * @LastEditTime: 2021-09-16 15:16:03
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\components\Part.vue
-->
<template>
  <div class="part-box"
       :style="options">
    <slot name="default"></slot>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, PropType } from 'vue';
import type { PartOptions } from '../config/index';

const props = defineProps({
  options: {
    type: Object as PropType<PartOptions>,
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
