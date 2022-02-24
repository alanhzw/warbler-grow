<!--
 * @Author: 一尾流莺
 * @Description:点击查看更多权益按钮
 * @Date: 2021-08-27 16:29:48
 * @LastEditTime: 2021-08-30 10:14:57
 * @FilePath: \custom\src\pages\1000002983\99\2108100000298301\components\DrawMoreBtn.vue
-->
<template>
  <div class="draw-more"
       :style="optins"
       @click="drawMore"></div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps } from 'vue';

const emit = defineEmits(['drawMore']);
const props = defineProps({
  optins: {
    type: Object,
    default: () => ({}),
  },
});
// 进店逛逛
const drawMore = () => {
  emit('drawMore');
};
</script>

<style lang='scss'>
.draw-more {
  position: absolute;
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>
